import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/products`;

export const useProduct = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(BASE_URL);
            setProducts(data.products);
        } catch (err) {
            const message = err.response?.data?.message || "Error fetching products";
            setError(message);
            console.error("Fetch error:", message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            setProducts(data.product);
            console.log("Fetched product data in useProduct hook:", data);
            return data.product;
        } catch (err) {
            const message = err.response?.data?.message || "Error fetching product";
            setError(message);
            console.error("Fetch product by ID error:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        console.log("Creating product with data:", formData);
        try {
            const { data } = await axios.post(BASE_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            return data.product;
        } catch (err) {
            const message = err.response?.data?.message || "Error creating product";
            setError(message);
            console.error("Create product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return data.product;
        } catch (err) {
            const message = err.response?.data?.message || "Error updating product";
            setError(message);
            console.error("Update product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            const message = err.response?.data?.message || "Error deleting product";
            setError(message);
            console.error("Delete product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const toggleProductStatus = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.patch(`${BASE_URL}/toggle-status/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(prev =>
                prev.map(product =>
                    product._id === id ? { ...product, status: data.status } : product
                )
            );

            return data.status;
        } catch (err) {
            const message = err.response?.data?.message || "Error toggling product status";
            setError(message);
            console.error("Toggle product status error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const toggleTodaySpecialStatus = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.patch(`${BASE_URL}/toggle-today-special/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(prev =>
                prev.map(product =>
                    product._id === id ? { ...product, todaySpecial: data.todaySpecial } : product
                )
            );

            return data.todaySpecial;
        } catch (err) {
            const message = err.response?.data?.message || "Error toggling today special status";
            setError(message);
            console.error("Toggle today special status error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };



    const searchProducts = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${BASE_URL}/search/query`, {
                params: { query },
            });
            setProducts(data.products || []);
        } catch (err) {
            const message = err.response?.data?.message || "Error searching products";
            setError(message);
            console.error("Search products error:", message);
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        product,
        loading,
        error,
        fetchAllProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        toggleProductStatus,
        toggleTodaySpecialStatus,
        deleteProduct,
        searchProducts,
    };
};
