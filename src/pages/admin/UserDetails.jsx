import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">
        User Details #{id}
      </h1>
      <p className="text-muted">
        Detailed user information will be displayed here.
      </p>
    </div>
  );
};

export default UserDetails;
