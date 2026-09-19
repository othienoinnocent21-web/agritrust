import clsx from "clsx";

const LoadingSpinner = ({
  size = "md",
  variant = "primary",
  text = "",
  fullScreen = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const variantClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted",
  };

  const spinner = (
    <>
      <svg
        className={clsx(
          "animate-spin",
          sizeClasses[size] || sizeClasses.md,
          variantClasses[variant] || variantClasses.primary,
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="img"
        aria-label={text || "Loading"}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.172 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{text || "Loading"}</span>
    </>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          {text && <p className="text-sm text-muted">{text}</p>}
        </div>
      </div>
    );
  }

  if (text) {
    return (
      <div className="flex items-center gap-3">
        {spinner}
        <span className="text-sm text-muted">{text}</span>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
