import { useNavigate } from "react-router";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useAuth } from "../backend/AuthContext";

const AddInvoice = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { item_name: "", quantity: "", unit_price: "" },
  ]);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client_id: "",
    note: "",
    status: "",
    issue_date: "",
    due_date: "",
  });

  // Fetch client list from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`, // Ganti token
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data client");
        }

        const data = await response.json();
        setClients(data.clients || []);
      } catch (err) {
        console.error("Error fetch clients:", err);
      }
    };
    fetchClients();
  }, [token]);

  const handleAddItem = () => {
    setItems([...items, { item_name: "", quantity: "", unit_price: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleBackDashboard = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      client_id: parseInt(form.client_id),
      issue_date: new Date().toISOString().split("T")[0],
      due_date: new Date().toISOString().split("T")[0],
      status,
      note,
      items: items.map((item) => ({
        item_name: item.item_name,
        quantity: parseInt(item.quantity),
        unit_price: parseInt(item.unit_price),
      })),
    };

    if (
      !form.client_id ||
      !issueDate ||
      !dueDate ||
      !status ||
      items.length === 0
    ) {
      alert("Mohon lengkapi semua field sebelum submit.");
      return;
    }

    console.log("Data yang dikirim:", data);
    console.log("Token:", token);

    try {
      const response = await fetch("http://localhost:8080/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim invoice");
      }

      const result = await response.json();
      console.log("Invoice berhasil:", result);
      alert("Invoice berhasil dibuat!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim invoice.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <nav className="flex justify-between items-center p-4 bg-blue-800 text-white rounded-md shadow">
        <h1 className="text-lg sm:text-xl font-bold">Tambah Data Invoice</h1>
        <button
          onClick={handleBackDashboard}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
        >
          Dashboard
        </button>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="bg-white mt-8 p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
      >
        <div className="space-y-10">
          {/* Profile Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
            <p className="text-sm text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <select
                  type="text"
                  value={form.client_id}
                  onChange={(e) =>
                    handleFormChange("client_id", e.target.value)
                  }
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                >
                  <option value="">-- Pilih Client --</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Write a few sentences..."
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Items</h2>
            <p className="text-sm text-gray-600 pb-5">
              Isi dengan jenis sub pekerjaan
            </p>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative border p-4 rounded-md shadow-sm"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Item
                  </label>
                  <input
                    value={item.item_name}
                    type="text"
                    onChange={(e) =>
                      handleChange(index, "item_name", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    value={item.quantity}
                    type="number"
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Harga Item
                  </label>
                  <input
                    onChange={(e) =>
                      handleChange(index, "unit_price", e.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                  />
                </div>
                {/* Tombol Hapus Item */}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                  title="Hapus Item"
                >
                  &times;
                </button>
              </div>
            ))}
            <div className="flex justify-between items-end p-4 text-white ">
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
              >
                Tambah Item
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="issue_date"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Dibuat
              </label>
              <input
                type="date"
                id="issue_date"
                name="issue_date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="due_date"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Jatuh Tempo
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="sm:max-w-sm">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-2 relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
              >
                <option value="">-- Pilih Status --</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInvoice;
