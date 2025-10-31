import { useState } from "react";
import Clients from "../components/componentUser/Clients";
import { useNavigate } from "react-router";
import CreateInvoice from "../components/componentUser/Invoices";
import { useAuth } from "../backend/AuthContext";
import Overview from "../components/componentUser/Overview";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);

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
    navigate("/");
  };

  return (
    <div className="flex min-w-screen min-h-screen ">
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center pl-3 py-3 bg-black/60 backdrop-blur-sm rounded-2xl shadow-lg w-[100%] max-w-md">
        <div
          className="logo cursor-pointer"
          onClick={() => setIsNavOpen(!isNavOpen)}
        ></div>
        <div className="flex flex-row text-xl font-bold text-amber-500 ">
          <div className="hidden md:flex flex-row text-xl font-bold text-amber-500">
            <button
              className="block w-full text-left mx-5"
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className="block w-full text-left mx-5"
              onClick={() => setActiveTab("clients")}
            >
              Clients
            </button>
            <button
              className="block w-full text-left mx-5"
              onClick={() => setActiveTab("invoice")}
            >
              Invoice
            </button>
          </div>
        </div>
        {/* Menu di HP (tampil kalau logo di klik) */}
        {isNavOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full bg-black/90 backdrop-blur-md rounded-b-xl flex flex-col text-lg font-semibold text-amber-500 p-4 space-y-3">
            <button
              className="py-2 w-full text-center hover:text-white"
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className="py-2 w-full text-center hover:text-white"
              onClick={() => setActiveTab("clients")}
            >
              Clients
            </button>
            <button
              className="py-2 w-full text-center hover:text-white"
              onClick={() => setActiveTab("invoice")}
            >
              Invoice
            </button>
          </div>
        )}
      </nav>
      {/* <aside className="w-50 bg-black text-white p-6 ">
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
        </aside> */}
      <main className="md:flex-1 bg-gray-700 p-10">
        <div className="flex justify-between items-center mb-10 text-white">
          <h1 className="text-xl font-semibold">
            Selamat datang, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="relative px-6 py-2 font-semibold text-white rounded-xl 
             bg-gradient-to-r from-red-500 to-red-700 
             shadow-lg hover:shadow-red-500/50 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:from-red-600 hover:to-red-800"
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
