import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";

const VerifyAccount = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-2">
        Verify Your Account
      </h1>
      <p className="text-muted text-center mb-6">
        Enter the verification code sent to your email.
      </p>
      <form className="space-y-4">
        <Input
          label="Verification Code"
          name="code"
          placeholder="Enter code"
        />
        <Button type="submit" variant="primary" fullWidth>
          Verify Account
        </Button>
      </form>
      <p className="text-center text-sm text-muted mt-4">
        <Link
          to={ROUTES.LOGIN}
          className="text-primary hover:text-primary/80"
        >
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};

export default VerifyAccount;
