import { useState, useCallback, useEffect } from "react";
import productService from "../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);

    try {
      const newProduct = await productService.createProduct(productData);

      setProducts((prev) => [newProduct, ...prev]);

      return {
        success: true,
        data: newProduct,
      };
    } catch (err) {
      setError(err.message || "Failed to create product");

      return {
        success: false,
        error: err.message || "Failed to create product",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await productService.updateProduct(id, productData);

      setProducts((prev) =>
        prev.map((p) => (p.id === Number(id) ? updated : p))
      );

      return {
        success: true,
        data: updated,
      };
    } catch (err) {
      setError(err.message || "Failed to update product");

      return {
        success: false,
        error: err.message || "Failed to update product",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await productService.deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== Number(id))
      );

      return {
        success: true,
      };
    } catch (err) {
      setError(err.message || "Failed to delete product");

      return {
        success: false,
        error: err.message || "Failed to delete product",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      return await productService.getProductById(id);
    } catch (err) {
      console.error("Failed to get product:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts,
  };
};

export default useProducts;