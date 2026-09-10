import { VERIFICATION_STATUS } from "../../constants";
import Badge from "../../components/common/Badge";

const Verification = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Account Verification</h1>
      <p className="text-muted mb-4">
        Verify your account to access all platform features.
      </p>
      <p>
        Current status:{" "}
        <Badge variant="warning" dot>
          {VERIFICATION_STATUS.PENDING}
        </Badge>
      </p>
    </div>
  );
};

export default Verification;
