import { useState, useCallback } from "react";
import mockOrderService from "../services/mockOrderService";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async (fetcher) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllOrders = useCallback(
    () => loadOrders(() => mockOrderService.getAllOrders()),
    [loadOrders]
  );

  const fetchBuyerOrders = useCallback(
    (buyerId) =>
      loadOrders(() => mockOrderService.getBuyerOrders(buyerId)),
    [loadOrders]
  );

  const fetchFarmerOrders = useCallback(
    (farmerId) =>
      loadOrders(() => mockOrderService.getFarmerOrders(farmerId)),
    [loadOrders]
  );

  const fetchOrderById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockOrderService.getOrderById(id);
      return data;
    } catch (err) {
      setError(err.message || "Failed to load order");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData) => {
    try {
      const order = await mockOrderService.createOrder(orderData);
      setOrders((prev) => [order, ...prev]);
      return { success: true, data: order };
    } catch (err) {
      return { success: false, error: err.message || "Failed to create order" };
    }
  }, []);

  const updateOrderStatus = useCallback(async (id, status) => {
    try {
      const order = await mockOrderService.updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (String(o.id) === String(id) ? order : o))
      );
      return { success: true, data: order };
    } catch (err) {
      return { success: false, error: err.message || "Failed to update status" };
    }
  }, []);

  const cancelOrder = useCallback(async (id) => {
    try {
      const order = await mockOrderService.cancelOrder(id);
      setOrders((prev) =>
        prev.map((o) => (String(o.id) === String(id) ? order : o))
      );
      return { success: true, data: order };
    } catch (err) {
      return { success: false, error: err.message || "Failed to cancel order" };
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchAllOrders,
    fetchBuyerOrders,
    fetchFarmerOrders,
    fetchOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    refetch: fetchAllOrders,
  };
};

export default useOrders;
