import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import { VERIFICATION_STATUS } from "../../constants";

const statusConfig = {
  [VERIFICATION_STATUS.PENDING]: { label: "Pending", variant: "warning" },
  [VERIFICATION_STATUS.APPROVED]: { label: "Approved", variant: "success" },
  [VERIFICATION_STATUS.REJECTED]: { label: "Rejected", variant: "danger" },
};

const UserStatus = ({
  user = {},
  onStatusChange,
  showActions = true,
}) => {
  const config = statusConfig[user.verificationStatus] || statusConfig[VERIFICATION_STATUS.PENDING];

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-border rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar src={user.avatar} name={user.name} size="md" />
        <div>
          <p className="font-medium text-text">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
          <p className="text-xs text-muted">{user.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={config.variant} dot>
          {config.label}
        </Badge>
        {user.isVerified && (
          <Badge variant="success" size="sm">
            Verified
          </Badge>
        )}
        {showActions && onStatusChange && (
          <select
            onChange={(e) => onStatusChange(user, e.target.value)}
            className="text-xs border border-border rounded px-2 py-1"
          >
            <option value="">Change Status</option>
            <option value={VERIFICATION_STATUS.APPROVED}>Approve</option>
            <option value={VERIFICATION_STATUS.REJECTED}>Reject</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default UserStatus;
