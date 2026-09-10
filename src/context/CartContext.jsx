import { createContext, useState, useCallback, useEffect } from "react";

const CART_STORAGE_KEY = "agritrust_cart";

const readCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeCart = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const safeQty = Math.max(1, Math.min(quantity, product.quantity || quantity));
      if (existing) {
        const nextQty = Math.min(
          existing.quantity + safeQty,
          product.quantity || existing.quantity + safeQty
        );
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: nextQty } : i
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}_${Date.now()}`,
          productId: product.id,
          productName: product.title,
          productImage: product.images?.[0] || "",
          unitPrice: product.price,
          unit: product.unit,
          quantity: safeQty,
          availableQuantity: product.quantity || 0,
          farmerId: product.farmerId,
          farmerName: product.farmer?.name || "Unknown Farmer",
          farmerAvatar: product.farmer?.avatar || null,
          farmerLocation: product.location || product.farmer?.location || "",
        },
      ];
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const qty = Math.max(1, Math.min(quantity, i.availableQuantity));
        return { ...i, quantity: qty };
      })
    );
  }, []);

  const increaseQuantity = useCallback((itemId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, quantity: Math.min(i.quantity + 1, i.availableQuantity) }
          : i
      )
    );
  }, []);

  const decreaseQuantity = useCallback((itemId) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + Number(i.quantity || 0), 0);

  const totalPrice = items.reduce(
    (sum, i) => sum + Number(i.unitPrice || 0) * Number(i.quantity || 0),
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isEmpty: items.length === 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
