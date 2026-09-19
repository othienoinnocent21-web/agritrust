import { useRouteError } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full">
        <ErrorState
          title="Something went wrong"
          description={
            error?.message ||
            "An unexpected error occurred while loading this page."
          }
          onRetry={() => window.location.reload()}
        />
      </div>
    </div>
  );
};

export default ErrorBoundary;
