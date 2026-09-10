import { Search, X } from "lucide-react";
import clsx from "clsx";

const SearchInput = ({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  disabled = false,
  className = "",
  inputClassName = "",
}) => {
  const hasValue = value && value.length > 0;

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: "" } });
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={clsx("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full pl-10 pr-3 py-2 border border-border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          disabled && "bg-gray-100 cursor-not-allowed",
          hasValue && "pr-10",
          inputClassName
        )}
        aria-label="Search"
      />
      {hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3 h-3 text-muted" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
