import { useAuth } from "../../backend/AuthContext";
import { useEffect, useState } from "react";

const Clients = () => {
  const { token } = useAuth();
  const [client, setClient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    nama: "",
    email: "",
    no_tlp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async () => {
    try {
      console.log("Mengirim data:", newClient);
      const resAddclient = await fetch(`http://localhost:8080/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });

      if (!resAddclient.ok) throw new Error("Gagal menambah Client");

      const data = await resAddclient.json();
      setClient([...client, data.client]);
      setShowModal(false);
      setNewClient({ nama: "", email: "", no_tlp: "" });
    } catch (error) {
      console.error("GAGAL TAMBAH CLIENT", error.message);
      alert("Gagal menambah client.");
      console.log("Mengirim data:", newClient);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const listClients = await fetch(`http://localhost:8080/api/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!listClients.ok) throw new Error("Gagal mengambil data invoice");

        const data = await listClients.json();
        setClient(data.clients);
      } catch (error) {
        console.error("Error data invoices:", error.message);
      }
    };

    fetchClients();
  }, [token]);

  return (
    <div className="bg-white shadow rounded p-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Daftar Clients</h2>
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Tambah Client
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">No Telpon</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {client.map((cli, index) => (
            <tr key={cli.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{cli.name}</td>
              <td className="px-4 py-2">{cli.no_tlp}</td>
              <td className="px-4 py-2">{cli.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Tambah Client</h3>
            <input
              type="text"
              name="nama"
              value={newClient.nama}
              onChange={handleInputChange}
              placeholder="Nama"
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              type="email"
              name="email"
              value={newClient.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              name="no_tlp"
              value={newClient.no_tlp}
              onChange={handleInputChange}
              placeholder="No Telpon"
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleAddClient}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
