import FarmerCard from "../../components/buyer/FarmerCard";
import { mockUsers } from "../../data/mock/users";

const Farmers = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text mb-6">Farmer Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockUsers
          .filter((u) => u.role === "FARMER")
          .map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
      </div>
    </div>
  );
};

export default Farmers;
