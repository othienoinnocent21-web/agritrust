import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import EmptyState from "../components/common/EmptyState";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <EmptyState
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
          actionLabel="Go Home"
          onAction={() => navigate("/")}
          icon={Home}
          className="bg-white rounded-xl border border-border p-8 shadow-sm"
        />
      </div>
    </div>
  );
};

export default NotFound;
