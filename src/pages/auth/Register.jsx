
import AuthForm from "../../components/auth/AuthForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import api from "../../services/api";

const Register = () => {
  const handleRegister = async (formData) => {
    try {
      const response = await api.post("/auth/register", formData);

      console.log("Registration successful:", response.data);

      alert("Account created successfully! You can now sign in.");

    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response?.status === 409) {
        alert("This email is already registered.");
      } else {
        alert(
          error.response?.data ||
            "Registration failed. Please try again."
        );
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-2">
        Create Your Account
      </h1>

      <p className="text-muted text-center mb-6">
        Join AgriTrust and start trading fairly
      </p>

      <AuthForm mode="register" onSubmit={handleRegister} />

      <p className="text-center text-sm text-muted mt-4">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="text-primary hover:text-primary/80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
