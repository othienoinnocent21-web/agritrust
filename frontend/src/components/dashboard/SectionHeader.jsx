import { Link } from "react-router-dom";

const SectionHeader = ({ title, actionLabel, actionTo, actionIcon: ActionIcon }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
