import { useNavigate } from "react-router";
import { useAuth } from "../backend/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [client, setClient] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileAndInvoice = async () => {
      try {
        const invoiceRes = await fetch(`http://localhost:8080/api/invoices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!invoiceRes.ok) throw new Error("Gagal mengambil data invoice");

        const data = await invoiceRes.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error("Error data invoices:", error.message);
      }
      try {
        const nameClient = await fetch(`http://localhost:8080/api/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!nameClient.ok) throw new Error("Gagal mengambil nama Client");

        const data = await nameClient.json();
        setClient(data.clients);
      } catch (error) {
        console.error("Error data client:", error.message);
      }
    };

    fetchProfileAndInvoice();
  }, [token, user]);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {/* Navbar */}
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

        {/* Invoice Table */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Invoice</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => {
                const clientData = client.find((c) => c.id === inv.client_id);
                return (
                  <tr key={inv.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {clientData?.name || "Unknown Client"}
                    </td>

                    <td className="px-4 py-2">
                      Rp. {inv.amount.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        inv.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {inv.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
