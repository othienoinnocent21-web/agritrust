import api from "./api";

const orderService = {
  getAllOrders: async (params = {}) => {
    const response = await api.get("/orders", { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getFarmerOrders: async (farmerId) => {
    const response = await api.get(`/orders/farmer/${farmerId}`);
    return response.data;
  },

  getBuyerOrders: async (buyerId) => {
    const response = await api.get(`/orders/buyer/${buyerId}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.patch(`/orders/${id}/cancel`);
    return response.data;
  },
};

export default orderService;
