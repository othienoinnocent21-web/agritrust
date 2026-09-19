/**
 * DEVELOPMENT-ONLY MOCK PRODUCT SERVICE
 *
 * A localStorage-backed CRUD service that mirrors the interface of
 * src/services/productService.js. When the Spring Boot backend is ready,
 * switch the import in src/hooks/useProducts.js from mockProductService
 * to productService and this file can be deleted.
 */

import { mockProducts } from "../data/mock/products";

const STORAGE_KEY = "agritrust_products";

const getStored = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const save = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const initMockData = () => {
  const stored = getStored();
  if (stored) return stored;
  save(mockProducts);
  return mockProducts;
};

const mockProductService = {
  getAllProducts: () => Promise.resolve(initMockData()),

  getProductById: (id) => {
    const products = initMockData();
    const product = products.find((p) => p.id === Number(id));
    return Promise.resolve(product || null);
  },

  createProduct: (productData) => {
    const products = initMockData();
    const newProduct = {
      ...productData,
      id: Date.now(),
      images: productData.images || [],
      isOrganic: productData.isOrganic ?? false,
      isAvailable: productData.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    save(products);
    return Promise.resolve(newProduct);
  },

  updateProduct: (id, productData) => {
    const products = initMockData();
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      return Promise.reject(new Error("Product not found"));
    }
    const updated = { ...products[index], ...productData, id: products[index].id };
    products[index] = updated;
    save(products);
    return Promise.resolve(updated);
  },

  deleteProduct: (id) => {
    const products = initMockData();
    const filtered = products.filter((p) => p.id !== Number(id));
    if (filtered.length === products.length) {
      return Promise.reject(new Error("Product not found"));
    }
    save(filtered);
    return Promise.resolve({ success: true, id: Number(id) });
  },
};

export default mockProductService;
