const NotificationDropdown = ({
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  isOpen = false,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute top-12 right-0 w-80 bg-white border border-border rounded-lg shadow-lg z-50">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-text">Notifications</h3>
        {unreadCount > 0 && onMarkAllRead && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-primary hover:text-primary/80"
          >
            Mark all as read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-muted text-center py-6">
            No notifications yet
          </p>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => onNotificationClick && onNotificationClick(notification)}
              className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-border last:border-0"
            >
              <p className="font-medium text-sm text-text">
                {notification.title}
              </p>
              <p className="text-sm text-muted mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-muted mt-1">
                {notification.time || notification.createdAt}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
