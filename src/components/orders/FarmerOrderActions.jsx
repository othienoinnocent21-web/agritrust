import Button from "../common/Button";
import { ORDER_STATUS } from "../../constants/app";
import { getFarmerActions } from "../../utils/orderStatus";

const FarmerOrderActions = ({ order, onSubmit, loading = false }) => {
  const actions = getFarmerActions(order.status);
  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={
            action.to === ORDER_STATUS.REJECTED ||
            action.to === ORDER_STATUS.CANCELLED
              ? "danger"
              : "primary"
          }
          onClick={() => onSubmit(action.to)}
          loading={loading}
          disabled={loading}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default FarmerOrderActions;
