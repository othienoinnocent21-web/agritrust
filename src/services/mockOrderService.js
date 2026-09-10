/**
 * DEVELOPMENT-ONLY MOCK ORDER SERVICE
 *
 * A localStorage-backed service that mirrors the interface of
 * src/services/orderService.js. When the Spring Boot backend is ready,
 * switch the import in src/hooks/useOrders.js from mockOrderService
 * to orderService and this file can be deleted.
 *
 * A single source of truth (localStorage key `agritrust_orders`) is shared
 * across roles so that orders created by a buyer are immediately visible to
 * the farmer, and status updates by a farmer are immediately visible to the
 * buyer.
 */

import { ORDER_STATUS } from "../constants/app";
import { canTransition, ORDER_TIMELINE_STEPS } from "../utils/orderStatus";
import { calculateOrderTotal } from "../utils/orderCalculations";
import { generateId } from "../utils/helpers";
import { mockOrders } from "../data/mock/orders";

const STORAGE_KEY = "agritrust_orders";

const getAll = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const save = (orders) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const initMockData = () => {
  const stored = getAll();
  if (stored.length > 0) return stored;
  save(mockOrders);
  return mockOrders;
};

const now = () => new Date().toISOString();

const buildOrder = (orderData) => {
  const baseItems = orderData.items || [];
  const computed = {
    ...orderData,
    id: orderData.id || `ORD-${generateId()}`,
    items: baseItems,
    totalAmount: orderData.totalAmount ?? calculateOrderTotal(baseItems),
    status: orderData.status || ORDER_STATUS.PENDING,
    createdAt: orderData.createdAt || now(),
    updatedAt: orderData.updatedAt || now(),
  };
  if (computed.total === undefined) {
    computed.total = computed.totalAmount;
  }
  computed.products =
    orderData.products ||
    baseItems.map((item) => ({
      id: item.productId,
      title: item.productName,
      price: item.unitPrice,
      quantity: item.quantity,
    }));
  return computed;
};

const mockOrderService = {
  getAllOrders: () => Promise.resolve(initMockData()),

  getOrderById: (id) => {
    const order = initMockData().find((o) => String(o.id) === String(id));
    return Promise.resolve(order || null);
  },

  getFarmerOrders: (farmerId) =>
    Promise.resolve(
      initMockData().filter((o) => String(o.farmerId) === String(farmerId))
    ),

  getBuyerOrders: (buyerId) =>
    Promise.resolve(
      initMockData().filter((o) => String(o.buyerId) === String(buyerId))
    ),

  createOrder: (orderData) => {
    const order = buildOrder(orderData);
    const orders = initMockData();
    orders.unshift(order);
    save(orders);
    return Promise.resolve(order);
  },

  updateOrderStatus: (id, status) => {
    const orders = initMockData();
    const order = orders.find((o) => String(o.id) === String(id));
    if (!order) {
      return Promise.reject(new Error("Order not found"));
    }
    const current = order.status;
    const valid = canTransition(current, status);
    if (!valid) {
      return Promise.reject(
        new Error(
          `Invalid status transition from ${current} to ${status}`
        )
      );
    }
    order.status = status;
    order.updatedAt = now();
    save(orders);
    return Promise.resolve(order);
  },

  cancelOrder: (id) => {
    const orders = initMockData();
    const order = orders.find((o) => String(o.id) === String(id));
    if (!order) {
      return Promise.reject(new Error("Order not found"));
    }
    const timelineIndex = ORDER_TIMELINE_STEPS.indexOf(order.status);
    if (timelineIndex > 0) {
      return Promise.reject(
        new Error("Order can no longer be cancelled")
      );
    }
    if (!canTransition(order.status, ORDER_STATUS.CANCELLED)) {
      return Promise.reject(new Error("Order cannot be cancelled"));
    }
    order.status = ORDER_STATUS.CANCELLED;
    order.updatedAt = now();
    save(orders);
    return Promise.resolve(order);
  },
};

export default mockOrderService;
