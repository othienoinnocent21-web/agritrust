import clsx from "clsx";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  outline: "border border-primary text-primary hover:bg-primary/10",
  danger: "bg-red-600 text-white hover:bg-red-600/90",
  ghost: "text-muted hover:bg-gray-100",
  success: "bg-green-600 text-white hover:bg-green-600/90",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  icon: Icon,
  iconPosition = "left",
  onClick,
  type = "button",
  className = "",
  as,
  to,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth && "w-full",
    className
  );

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  const hasContent = Boolean(children);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader2
            className={clsx(
              "animate-spin",
              hasContent ? "w-4 h-4 mr-2" : "w-5 h-5"
            )}
          />
          {children}
        </>
      );
    }

    return (
      <>
        {LeftIcon && <LeftIcon className="w-4 h-4 mr-2" />}
        {Icon && iconPosition === "left" && (
          <Icon className={clsx("w-4 h-4", hasContent && "mr-2")} />
        )}
        {children}
        {RightIcon && <RightIcon className="w-4 h-4 ml-2" />}
        {Icon && iconPosition === "right" && (
          <Icon className={clsx("w-4 h-4", hasContent && "ml-2")} />
        )}
      </>
    );
  };

  if (to !== undefined) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        onClick={handleClick}
        aria-busy={loading}
        {...props}
      >
        {renderContent()}
      </Link>
    );
  }

  if (as === "Link" && props.href !== undefined) {
    return (
      <a href={props.href} className={buttonClasses} onClick={handleClick} aria-busy={loading}>
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={buttonClasses}
      aria-busy={loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
