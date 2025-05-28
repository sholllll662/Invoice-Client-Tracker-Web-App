import { useAuth } from "../../backend/AuthContext";
import { useEffect, useState } from "react";

const ListInvoices = () => {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [client, setClient] = useState([]);

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
  }, [token]);

  const handleViewDetail = (id) => {
    // Navigasi ke halaman detail atau tampilkan modal
    console.log("Lihat detail invoice ID:", id);
    // Misal: navigate(`/invoices/${id}`);
  };

  const handleEditInvoice = (id) => {
    // Navigasi ke halaman edit atau tampilkan modal form
    console.log("Edit invoice ID:", id);
    // Misal: navigate(`/invoices/edit/${id}`);
  };

  return (
    <div className="flex-1">
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
              <th className="px-4 py-2">Aksi</th> {/* Tambah kolom aksi */}
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
                      inv.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {inv.status}
                  </td>

                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleViewDetail(inv.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleEditInvoice(inv.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInvoices;
