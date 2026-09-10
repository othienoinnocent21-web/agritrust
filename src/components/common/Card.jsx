import clsx from "clsx";

const Card = ({
  children,
  title,
  subtitle,
  description,
  headerAction,
  footer,
  padding = "md",
  variant = "default",
  className = "",
  ...props
}) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    none: "p-0",
  };

  const variantClasses = {
    default: "bg-white border border-border shadow-sm",
    outline: "bg-white border border-border",
    elevated: "bg-white border border-border shadow-md",
  };

  return (
    <div
      className={clsx(
        "rounded-lg",
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            {title && <h3 className="font-semibold text-text">{title}</h3>}
            {(description || subtitle) && (
              <p className="text-sm text-muted">{description || subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={paddingClasses[padding] || paddingClasses.md}>
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-border bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
