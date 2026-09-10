import { VERIFICATION_STATUS } from "../../constants";
import { formatDateTime } from "../../utils/formatters";

const statusConfig = {
  [VERIFICATION_STATUS.PENDING]: {
    label: "Pending Review",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
  },
  [VERIFICATION_STATUS.APPROVED]: {
    label: "Approved",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  [VERIFICATION_STATUS.REJECTED]: {
    label: "Rejected",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-200",
  },
};

const VerificationStatus = ({
  request = {},
  onApprove,
  onReject,
  showActions = true,
}) => {
  const config = statusConfig[request.status] || statusConfig[VERIFICATION_STATUS.PENDING];

  return (
    <div
      className={`border rounded-lg p-4 ${config.borderColor} ${config.bgColor}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-text">{request.userName}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${config.textColor}`}
        >
          {config.label}
        </span>
      </div>

      <p className="text-sm text-muted mb-2">{request.userEmail}</p>
      <p className="text-xs text-muted mb-2">
        Submitted: {formatDateTime(request.submittedAt)}
      </p>

      {request.documents && (
        <ul className="text-xs text-muted space-y-1 mb-3">
          {request.documents.map((doc, idx) => (
            <li key={idx}>📎 {doc.name}</li>
          ))}
        </ul>
      )}

      {showActions && request.status === VERIFICATION_STATUS.PENDING && (
        <div className="flex gap-2 mt-3">
          {onApprove && (
            <button
              onClick={() => onApprove(request)}
              className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Approve
            </button>
          )}
          {onReject && (
            <button
              onClick={() => onReject(request)}
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationStatus;
