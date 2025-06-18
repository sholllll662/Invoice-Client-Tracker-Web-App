import { useAuth } from "../../backend/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListInvoices = () => {
  const navigate = useNavigate();
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

  const handlePreviewPDF = async (invoiceId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/invoices/${invoiceId}/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Gagal mengambil PDF");

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error saat preview PDF: ", error.message);
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Daftar Invoice</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
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
                      onClick={() => navigate(`/invoice/${inv.id}/view`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => navigate(`/invoice/${inv.id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePreviewPDF(inv.id)}
                      className="bg-green-400 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Preview
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
