import { useState, useCallback } from "react";
import mockProductService from "../services/mockProductService";
import { mockProducts } from "../data/mock/products";

const STORAGE_KEY = "agritrust_products";

const useProducts = () => {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockProducts;
    } catch {
      return mockProducts;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockProductService.getAllProducts();
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
      const newProduct = await mockProductService.createProduct(productData);
      setProducts((prev) => [newProduct, ...prev]);
      return { success: true, data: newProduct };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message || "Failed to create product" };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await mockProductService.updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === Number(id) ? updated : p))
      );
      return { success: true, data: updated };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message || "Failed to update product" };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await mockProductService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message || "Failed to delete product" };
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      return await mockProductService.getProductById(id);
    } catch {
      return null;
    }
  }, []);

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
