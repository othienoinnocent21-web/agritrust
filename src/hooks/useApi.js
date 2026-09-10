import { useState, useCallback } from "react";
import api from "../services/api";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (customUrl, customOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.request({
        url,
        ...options,
        ...customOptions,
        ...(customUrl && { url: customUrl }),
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, error, loading, execute };
};

export default useApi;
