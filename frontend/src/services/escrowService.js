import api from "./api";

const escrowService = {
  getAllEscrows: async (params = {}) => {
    const response = await api.get("/escrows", { params });
    return response.data;
  },

  getEscrowById: async (id) => {
    const response = await api.get(`/escrows/${id}`);
    return response.data;
  },

  releaseEscrow: async (id) => {
    const response = await api.patch(`/escrows/${id}/release`);
    return response.data;
  },

  refundEscrow: async (id) => {
    const response = await api.patch(`/escrows/${id}/refund`);
    return response.data;
  },

  disputeEscrow: async (id, reason) => {
    const response = await api.post(`/escrows/${id}/dispute`, { reason });
    return response.data;
  },
};

export default escrowService;
