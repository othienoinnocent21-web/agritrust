import ReputationCard from "../../components/farmer/ReputationCard";
import { mockUsers } from "../../data/mock/users";

const Reputation = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Reputation</h1>
      <div className="max-w-2xl">
        <ReputationCard farmer={mockUsers[0]} />
      </div>
    </div>
  );
};

export default Reputation;
