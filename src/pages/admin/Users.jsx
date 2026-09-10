import { mockUsers } from "../../data/mock/users";
import UserStatus from "../../components/admin/UserStatus";

const Users = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Users</h1>
      <div className="space-y-4">
        {mockUsers.map((user) => (
          <UserStatus key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
