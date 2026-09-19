import Avatar from "../common/Avatar";
import Rating from "../common/Rating";
import { Quote } from "lucide-react";

const TestimonialCard = ({
  name = "User Name",
  role = "Farmer",
  rating = 5,
  comment = "This is a great platform!",
  avatar,
  className = "",
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Quote className="absolute -right-2 -top-2 h-24 w-24 rotate-12 text-emerald-50 transition-transform duration-300 group-hover:rotate-0" fill="currentColor" />
      <div className="relative"><div className="mb-5 inline-flex rounded-full bg-amber-50 px-3 py-1.5"><Rating rating={rating} readOnly size="sm" /></div>
      <p className="mb-7 text-base leading-7 text-slate-600">&quot;{comment}&quot;</p>
      <div className="flex items-center gap-3">
        <Avatar src={avatar} alt={`${name} profile`} name={name} size="md" className="ring-2 ring-white" />
        <div>
          <p className="font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
