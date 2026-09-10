import { formatDateTime } from "../../utils/formatters";
import { ORDER_STATUS_LABELS, ORDER_STATUS } from "../../constants";
import { isTerminalLabel, getOrderTimelineSteps, getStatusVariant } from "../../utils/orderStatus";
import Badge from "../common/Badge";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

const stateIcons = {
  complete: <CheckCircle className="w-4 h-4 text-green-600" />,
  current: <Circle className="w-4 h-4 text-primary fill-primary/10" />,
  pending: <Circle className="w-4 h-4 text-gray-300" />,
};

const OrderTimeline = ({ order }) => {
  const steps = getOrderTimelineSteps(order.status);
  const terminal = isTerminalLabel(order.status);

  const labelDate = (stepStatus) => {
    if (stepStatus === order.status && order.updatedAt) {
      return formatDateTime(order.updatedAt);
    }
    return "";
  };

  if (terminal) {
    const label = ORDER_STATUS_LABELS[order.status] || order.status;
    const variant =
      order.status === ORDER_STATUS.REJECTED ? "danger" : "warning";
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-amber-600" />
        <div>
          <p className="font-medium text-text">
            Order{" "}
            {order.status === ORDER_STATUS.REJECTED
              ? "rejected"
              : "cancelled"}
          </p>
          <p className="text-sm text-muted mt-1">{label}</p>
          {order.updatedAt && (
            <p className="text-xs text-muted mt-1">
              {formatDateTime(order.updatedAt)}
            </p>
          )}
        </div>
        <Badge variant={variant} size="sm">
          {label}
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-text">
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </p>
        <Badge variant={getStatusVariant(order.status)} size="sm">
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </Badge>
      </div>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = step.state === "current";
        const isComplete = step.state === "complete";
        return (
          <div
            key={step.status}
            className="relative flex items-start last:pb-0 pb-4"
          >
            {!isLast && (
              <div
                className={`absolute left-3.5 top-4 -bottom-4 w-px ${
                  isComplete ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
            <div
              className={
                isActive || isComplete
                  ? "relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white"
                  : "relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-400"
              }
            >
              {stateIcons[step.state]}
            </div>
            <div className="ml-4 flex-1">
              <span
                className={
                  isActive ? "font-medium text-text" : "text-muted"
                }
              >
                {step.label}
              </span>
              {labelDate(step.status) && (
                <p className="text-xs text-muted mt-0.5">
                  {labelDate(step.status)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
