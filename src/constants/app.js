export const APP_NAME = "AgriTrust";
export const APP_TAGLINE = "Fair Prices for Farmers, Fresh Produce for Buyers";
export const APP_VERSION = "0.1.0";

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  PROCESSING: "PROCESSING",
  READY: "READY",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.ACCEPTED]: "Accepted",
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.READY]: "Ready for Pickup",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.REJECTED]: "Rejected",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
};

export const ESCROW_STATUS = {
  PENDING: "PENDING",
  IN_ESCROW: "IN_ESCROW",
  RELEASED: "RELEASED",
  REFUNDED: "REFUNDED",
  DISPUTED: "DISPUTED",
};

export const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};
