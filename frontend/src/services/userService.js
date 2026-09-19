import api from "./api";

const userService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  updatePassword: async (passwordData) => {
    const response = await api.patch("/users/password", passwordData);
    return response.data;
  },

  getAllUsers: async (params = {}) => {
    const response = await api.get("/users", { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getUserReviews: async (userId) => {
    const response = await api.get(`/users/${userId}/reviews`);
    return response.data;
  },
};

export default userService;
