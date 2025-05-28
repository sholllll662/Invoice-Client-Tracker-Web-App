import { useState } from "react";
import Clients from "../components/componentUser/Clients";
import { useNavigate } from "react-router";
import CreateInvoice from "../components/componentUser/Invoices";
import { useAuth } from "../backend/AuthContext";
import Overview from "../components/componentUser/Overview";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "clients":
        return <Clients />;
      case "invoice":
        return <CreateInvoice />;
      case "dashboard":
      default:
        return <Overview />;
    }
  };

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">FreelanceTrack</h2>
        <nav className="space-y-4">
          <button
            className="block w-full text-left"
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left"
            onClick={() => setActiveTab("clients")}
          >
            Clients
          </button>
          <button
            className="block w-full text-left"
            onClick={() => setActiveTab("invoice")}
          >
            Invoice
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">
            Selamat datang, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
