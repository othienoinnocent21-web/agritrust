import { ORDER_STATUS, ORDER_STATUS_LABELS } from "../constants/app";

export const ORDER_TIMELINE_STEPS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.READY,
  ORDER_STATUS.COMPLETED,
];

export const STATUS_BADGE_VARIANTS = {
  [ORDER_STATUS.PENDING]: "pending",
  [ORDER_STATUS.ACCEPTED]: "info",
  [ORDER_STATUS.PROCESSING]: "primary",
  [ORDER_STATUS.READY]: "success",
  [ORDER_STATUS.COMPLETED]: "success",
  [ORDER_STATUS.REJECTED]: "danger",
  [ORDER_STATUS.CANCELLED]: "danger",
};

export const getStatusVariant = (status) =>
  STATUS_BADGE_VARIANTS[status] || "default";

export const TERMINAL_STATUSES = [
  ORDER_STATUS.COMPLETED,
  ORDER_STATUS.REJECTED,
  ORDER_STATUS.CANCELLED,
];

export const ORDER_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.REJECTED,
    ORDER_STATUS.CANCELLED,
  ],
  [ORDER_STATUS.ACCEPTED]: [ORDER_STATUS.PROCESSING],
  [ORDER_STATUS.PROCESSING]: [ORDER_STATUS.READY],
  [ORDER_STATUS.READY]: [ORDER_STATUS.COMPLETED],
  [ORDER_STATUS.COMPLETED]: [],
  [ORDER_STATUS.REJECTED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

export const FARMER_ORDER_ACTIONS = {
  [ORDER_STATUS.PENDING]: [
    { label: "Accept Order", to: ORDER_STATUS.ACCEPTED },
    { label: "Reject Order", to: ORDER_STATUS.REJECTED },
  ],
  [ORDER_STATUS.ACCEPTED]: [{ label: "Start Processing", to: ORDER_STATUS.PROCESSING }],
  [ORDER_STATUS.PROCESSING]: [{ label: "Mark Ready", to: ORDER_STATUS.READY }],
  [ORDER_STATUS.READY]: [{ label: "Mark Completed", to: ORDER_STATUS.COMPLETED }],
  [ORDER_STATUS.COMPLETED]: [],
  [ORDER_STATUS.REJECTED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

export const isTerminalStatus = (status) =>
  TERMINAL_STATUSES.includes(status);

export const canTransition = (from, to) =>
  Boolean(ORDER_TRANSITIONS[from]?.includes(to));

export const getNextStatuses = (from) =>
  ORDER_TRANSITIONS[from] || [];

export const getFarmerActions = (status) =>
  FARMER_ORDER_ACTIONS[status] || [];

export const canCancelOrder = (status) =>
  status === ORDER_STATUS.PENDING;

export const isTerminalLabel = (status) =>
  status === ORDER_STATUS.REJECTED || status === ORDER_STATUS.CANCELLED;

export const getOrderTimelineSteps = (status) => {
  const currentIndex = ORDER_TIMELINE_STEPS.indexOf(status);
  return ORDER_TIMELINE_STEPS.map((step, index) => {
    let state = "pending";
    if (index < currentIndex) {
      state = "complete";
    } else if (index === currentIndex) {
      state = "current";
    }
    return {
      status: step,
      label: ORDER_STATUS_LABELS[step],
      state,
    };
  });
};
