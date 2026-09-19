import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ForgotPassword = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-muted text-center mb-6">
        Enter your email and we'll send you a reset link.
      </p>
      <form className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
        <Button type="submit" variant="primary" fullWidth>
          Send Reset Link
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

export default ForgotPassword;
