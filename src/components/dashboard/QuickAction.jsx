import { Link } from "react-router-dom";
import Card from "../common/Card";

const QuickAction = ({ label, icon: Icon, to, className = "" }) => {
  return (
    <Link to={to} className={`block ${className}`}>
      <Card className="text-center cursor-pointer transition-all duration-200 hover:shadow-md border-2 border-transparent hover:border-primary/20">
        <div className="flex flex-col items-center gap-3 py-5">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-medium text-text">{label}</span>
        </div>
      </Card>
    </Link>
  );
};

export default QuickAction;
