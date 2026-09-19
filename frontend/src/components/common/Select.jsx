import clsx from "clsx";

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select an option",
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  selectClassName = "",
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
        className={clsx(
          "w-full px-3 py-2 border rounded-lg bg-white transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-border",
          disabled && "bg-gray-100 cursor-not-allowed",
          selectClassName
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${name}-helper`} className="text-sm text-muted">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
