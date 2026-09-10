import Badge from "../common/Badge";
import { ESCROW_STATUS } from "../../constants";
import { formatCurrency, formatDateTime } from "../../utils/formatters";

const statusConfig = {
  [ESCROW_STATUS.PENDING]: { label: "Pending", variant: "warning" },
  [ESCROW_STATUS.IN_ESCROW]: { label: "In Escrow", variant: "info" },
  [ESCROW_STATUS.RELEASED]: { label: "Released", variant: "success" },
  [ESCROW_STATUS.REFUNDED]: { label: "Refunded", variant: "warning" },
  [ESCROW_STATUS.DISPUTED]: { label: "Disputed", variant: "danger" },
};

const TransactionStatus = ({
  transaction = {},
  onAction,
  showActions = true,
}) => {
  const config = statusConfig[transaction.escrowStatus] || statusConfig[ESCROW_STATUS.PENDING];
  const isDisputed = transaction.escrowStatus === ESCROW_STATUS.DISPUTED;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-text">
            {transaction.id || transaction.orderId}
          </span>
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted">
          {formatCurrency(transaction.amount)} • {formatDateTime(transaction.createdAt)}
        </p>
        {isDisputed && transaction.disputeReason && (
          <p className="text-sm text-red-600 mt-1">
            Dispute: {transaction.disputeReason}
          </p>
        )}
      </div>

      {showActions && !isDisputed && (
        <div className="flex gap-2">
          {transaction.escrowStatus === ESCROW_STATUS.IN_ESCROW && onAction && (
            <>
              <button
                onClick={() => onAction(transaction, "release")}
                className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Release
              </button>
              <button
                onClick={() => onAction(transaction, "refund")}
                className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Refund
              </button>
            </>
          )}
        </div>
      )}

      {showActions && isDisputed && onAction && (
        <div className="flex gap-2">
          <button
            onClick={() => onAction(transaction, "resolve-farmer")}
            className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Rule in Favor of Farmer
          </button>
          <button
            onClick={() => onAction(transaction, "resolve-buyer")}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Rule in Favor of Buyer
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;
