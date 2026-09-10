import clsx from "clsx";

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
  autoComplete,
  className = "",
  inputClassName = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) => {
  const inputClasses = clsx(
    "w-full px-3 py-2 border rounded-lg transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-border hover:border-muted",
    disabled && "bg-gray-100 cursor-not-allowed",
    LeftIcon && "pl-10",
    RightIcon && "pr-10",
    inputClassName
  );

  const errorId = error ? `${name}-error` : null;
  const helperId = helperText ? `${name}-helper` : null;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ");

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {RightIcon && (
          <RightIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        )}
      </div>
      {error && (
        <span id={errorId} className="text-sm text-red-500">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="text-sm text-muted">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
