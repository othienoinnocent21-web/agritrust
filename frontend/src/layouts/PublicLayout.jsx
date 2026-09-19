import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/website/PublicNavbar";
import PublicFooter from "../components/website/PublicFooter";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
