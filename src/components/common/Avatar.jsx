import clsx from "clsx";

const Avatar = ({
  src,
  image,
  alt = "Avatar",
  name,
  size = "md",
  status,
  className = "",
  ...props
}) => {
  const avatarSrc = src || image;
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={clsx("relative inline-block", className)} {...props}>
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={alt}
          className={clsx(
            "rounded-full object-cover",
            sizeClasses[size] || sizeClasses.md
          )}
        />
      ) : (
        <div
          className={clsx(
            "rounded-full flex items-center justify-center font-medium bg-primary text-white",
            sizeClasses[size] || sizeClasses.md
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            status === "online" ? "w-2.5 h-2.5 bg-green-500" :
            status === "offline" ? "w-2.5 h-2.5 bg-gray-400" :
            status === "busy" ? "w-2.5 h-2.5 bg-red-500" :
            status === "away" ? "w-2.5 h-2.5 bg-amber-500" : "w-2.5 h-2.5 bg-gray-400"
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
