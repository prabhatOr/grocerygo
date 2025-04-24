import mongoose from "mongoose";
import Product from "../models/productModel.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    let {
      name, sku, videoURL, category, subCategory, type,
      hasExtras, extras, hasVariants, variants,
      originalPrice, sellingPrice, stockManagement, stock, description, tax,
    } = req.body;

    // Normalize boolean-like strings
    hasExtras = hasExtras === "true" || hasExtras === true;
    hasVariants = hasVariants === "true" || hasVariants === true;
    stockManagement = stockManagement === "true" || stockManagement === true;

    // Handle images
    const domainName = req.protocol + "://" + req.get("host");
    const productImage = req.files?.map(file => `${domainName}/uploads/products/${file.filename}`) || [];

    if (!name || !category || !type || productImage.length === 0) {
      return res.status(400).json({ message: "Name, category, type, and at least one image are required." });
    }

    if (!hasVariants && (!originalPrice || !sellingPrice)) {
      return res.status(400).json({ message: "Original and selling prices are required when hasVariants is false." });
    }

    let parsedExtras = [], parsedVariants = [], parsedStockManagement = [], parsedTax = [];
    try {
      parsedExtras = extras ? JSON.parse(extras) : [];
      parsedVariants = variants ? JSON.parse(variants) : [];
      parsedStockManagement = stock ? JSON.parse(stock) : [];
      parsedTax = tax ? Array.isArray(tax) ? tax : [tax] : [];

      // Ensure attributes are stored as Maps in variants
      parsedVariants = parsedVariants.map(variant => ({
        ...variant,
        attributes: new Map(Object.entries(variant.attributes || {}))
      }));
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in extras, variants, or stock." });
    }

    // Check if SKU already exists
    const normalizedSku = sku.trim().toLowerCase();
    const existingProduct = await Product.findOne({ sku: normalizedSku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
    const categoryId = isValidObjectId(category) ? new mongoose.Types.ObjectId(category) : null;
    const subCategoryId = isValidObjectId(subCategory) ? new mongoose.Types.ObjectId(subCategory) : null;

    if (!categoryId) return res.status(400).json({ message: "Invalid category ID" });

    // Parse and validate tax
    let taxIds = [];
    try {
      const parsedTax = typeof tax === "string" ? JSON.parse(tax) : tax;
      if (Array.isArray(parsedTax)) {
        taxIds = parsedTax.filter(id => mongoose.Types.ObjectId.isValid(id)).map(id => new mongoose.Types.ObjectId(id));
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid tax format" });
    }

    // Build product data object
    const productData = {
      name,
      sku: normalizedSku,
      videoURL,
      category: categoryId,
      subCategory: subCategoryId,
      type,
      hasExtras,
      extras: parsedExtras,
      hasVariants,
      variants: parsedVariants,
      stockManagement,
      stock: parsedStockManagement,
      productImage,
      tax: taxIds,
      description,
    };

    // If not variant-based, include price & stock
    if (!hasVariants) {
      productData.originalPrice = originalPrice;
      productData.sellingPrice = sellingPrice;
    }

    const product = new Product(productData);
    const createdProduct = await product.save();

    const savedProduct = await Product.findById(createdProduct._id)
      .populate('category')
      .populate('subCategory')
      .populate('tax');

    res.status(201).json({ message: "Product created", product: savedProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name").populate("subCategory", "name").populate("tax");

    const total = await Product.countDocuments();
    res.json({ total, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category").populate("subCategory").populate("tax");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, sku, videoURL, category, subCategory, type,
      hasExtras, extras, hasVariants, variants,
      originalPrice, sellingPrice, stockManagement, stock, description, tax,
    } = req.body;

    let parsedExtras = [], parsedVariants = [], parsedStockManagement = [], parsedTax = [];

    // Parse JSON data for extras, variants, and stockManagement
    try {
      parsedExtras = extras ? JSON.parse(extras) : [];
      parsedVariants = variants ? JSON.parse(variants) : [];
      parsedStockManagement = stock ? JSON.parse(stock) : [];
      parsedTax = tax ? Array.isArray(tax) ? tax : [tax] : [];

      // Convert attributes object to Map
      parsedVariants = parsedVariants.map(variant => ({
        ...variant,
        attributes: new Map(Object.entries(variant.attributes || {}))
      }));
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in extras, variants, or stock." });
    }

    // Find the existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if SKU is updated and already exists
    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku: sku.trim().toLowerCase() });
      if (existingProduct) {
        return res.status(400).json({ message: "SKU already exists" });
      }
    }

    // If `hasVariants` is false, ensure `originalPrice` and `sellingPrice` are provided
    if (!hasVariants && (!originalPrice || !sellingPrice)) {
      return res.status(400).json({ message: "Original and selling prices are required when hasVariants is false." });
    }

    // Update product fields
    product.name = name || product.name;
    product.sku = sku || product.sku;
    product.videoURL = videoURL || product.videoURL;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.type = type || product.type;
    product.hasExtras = hasExtras !== undefined ? hasExtras : product.hasExtras;
    product.extras = parsedExtras.length > 0 ? parsedExtras : product.extras;
    product.hasVariants = hasVariants !== undefined ? hasVariants : product.hasVariants;
    product.variants = parsedVariants.length > 0 ? parsedVariants : product.variants;
    product.originalPrice = originalPrice || product.originalPrice;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.stockManagement = stockManagement !== undefined ? stockManagement : product.stockManagement;
    product.stock = parsedStockManagement.length > 0 ? parsedStockManagement : product.stock;
    product.description = description || product.description;
    product.tax = parsedTax.length > 0 ? parsedTax : product.tax;

    // Handle image uploads (if any)
    if (req.files && req.files.length > 0) {
      const domainName = req.protocol + "://" + req.get("host");
      const updatedImages = req.files.map(file => `${domainName}/uploads/products/${file.filename}`);
      product.productImage = updatedImages;
    }

    // Save the updated product
    await product.save();

    // Return the updated product with populated fields (category, subCategory, tax)
    const updatedProduct = await Product.findById(product._id)
      .populate('category')
      .populate('subCategory')
      .populate('tax');

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Toggle product Status
export const toggleProductStatus = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "product not found" });

        product.status = !product.status;
        await product.save();

        res.status(200).json({ message: "product status updated", status: product.status });
    } catch (err) {
        console.error("Toggle Status Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Toggle product TodaySpecial Status
export const toggleTodaySpecialStatus = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "product not found" });

      product.todaySpecial = !product.todaySpecial; 
      await product.save();

      res.status(200).json({ message: "Today Special status updated", todaySpecial: product.todaySpecial });
  } catch (err) {
      console.error("Toggle Today Special Status Error:", err);
      res.status(500).json({ message: "Server error" });
  }
};


// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find().populate("category").lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by subcategory
export const getProductsBySubcategory = async (req, res) => {
  try {
    const products = await Product.find({ subCategory: req.params.subCategoryId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by search query
export const getProductsBySearchQuery = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { sku: { $regex: query, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Recently added products
export const getRecentlyAddedProducts = async (req, res) => {
  try {
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const products = await Product.find().sort({ [sort]: order }).limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Best-selling products (placeholder logic)
export const getBestSellingProducts = async (req, res) => {
  try {
    // Assume future sales tracking feature
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Top deals products (e.g., high discount)
export const getTopDealsProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: {
        $gt: ["$originalPrice", "$sellingPrice"]
      }
    }).sort({ createdAt: -1 }).limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};