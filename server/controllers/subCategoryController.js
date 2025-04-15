import SubCategory from "../models/subCategoryModel.js";

// Create a new subcategory
export const createSubCategory = async (req, res) => {
    try {
        const { name, category, status } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const newSubCategory = new SubCategory({
            name,
            category,
            status
        });

        await newSubCategory.save();
        res.status(201).json(newSubCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all subcategories
export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category", "name");
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a subcategory by ID
export const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate("category", "name");
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a subcategory
export const updateSubCategory = async (req, res) => {
    try {
        const { name, category } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subcategory
export const deleteSubCategory = async (req, res) => {
    try {
        const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!deletedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};