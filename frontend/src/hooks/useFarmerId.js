import { mockProducts } from "../data/mock/products";
import useAuth from "./useAuth";

const MOCK_FARMER_ID = mockProducts[0]?.farmerId ?? 1;

/**
 * Resolves the farmer id to use when querying a farmer's orders.
 *
 * In the development mock, all marketplace products belong to a single
 * farmer (farmerId 1, "John Farmer"). The logged-in dev farmer
 * (id `dev_farmer_*`) is a stand-in for that mock farmer, so we query
 * the mock farmer id on their behalf. In production this resolves to the
 * actual user id, matching `GET /api/orders/farmer/{userId}`.
 */
const useFarmerId = () => {
  const { user } = useAuth();
  if (!user) return null;
  if (import.meta.env.DEV && String(user.id).startsWith("dev_")) {
    return MOCK_FARMER_ID;
  }
  return user.id;
};

export default useFarmerId;
