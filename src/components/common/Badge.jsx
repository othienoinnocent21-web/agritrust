import clsx from "clsx";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium",
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "w-2 h-2 rounded-full mr-1.5",
            variant === "success" || variant === "verified" ? "bg-green-500" :
            variant === "warning" || variant === "pending" ? "bg-amber-500" :
            variant === "danger" ? "bg-red-500" :
            variant === "info" ? "bg-blue-500" :
            variant === "primary" ? "bg-primary" :
            variant === "secondary" ? "bg-secondary" :
            "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
