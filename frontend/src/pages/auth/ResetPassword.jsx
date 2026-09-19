import Button from "../../components/common/Button";
import PasswordInput from "../../components/auth/PasswordInput";

const ResetPassword = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-2">
        Reset Password
      </h1>
      <p className="text-muted text-center mb-6">
        Enter your new password below.
      </p>
      <form className="space-y-4">
        <PasswordInput name="password" placeholder="New password" />
        <PasswordInput name="confirmPassword" placeholder="Confirm password" />
        <Button type="submit" variant="primary" fullWidth>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
