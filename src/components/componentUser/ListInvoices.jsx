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

  // added delete handler
  const handleDelete = async (invoiceId) => {
    if (!invoiceId) return;
    if (!window.confirm("Yakin ingin menghapus invoice ini?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/invoices/${invoiceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || "Gagal menghapus invoice");
      }

      // remove from local state so UI updates immediately
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
      alert("Invoice berhasil dihapus!");
    } catch (err) {
      console.error("Error hapus invoice:", err);
      alert("Terjadi kesalahan saat menghapus invoice.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-6 mx-4 border border-2 border-amber-500 rounded-lg shadow hover:shadow-lg transition -my-2 -mx-4 sm-mx-6 lg: overflow-x-auto ">
        <h2 className="text-lg font-semibold mb-4">Daftar Invoice</h2>

        <div className="overflow-x-auto">
          <table className=" editor_listing_table min-w-[900px] text-center border-collapse ">
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
                        inv.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
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
                        onClick={() => handleDelete(inv.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                      {/* <button
                        onClick={() => navigate(`/invoice/${inv.id}/delete`)}
                        class="button"
                      >
                        <svg viewBox="0 0 448 512" class="svgIcon">
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                        </svg>
                      </button> */}
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
    </div>
  );
};

export default ListInvoices;
