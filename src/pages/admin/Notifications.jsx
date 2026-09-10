import { mockNotifications } from "../../data/mock/notifications";

const Notifications = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Admin Notifications</h1>
      <p className="text-muted">
        {mockNotifications.length} notifications.
      </p>
    </div>
  );
};

export default Notifications;
