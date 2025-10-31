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
    <div className="p-5 card bg-white shadow rounded mb-6 border border-4 border-amber-500 rounded-lg shadow">
      <div>
        <h2 className="text-lg font-semibold mb-4">Daftar Clients</h2>
        <button
          className="mb-4 relative px-6 py-2 font-semibold text-white rounded-xl 
             bg-gradient-to-r from-amber-500 to-yellow-700 
             shadow-lg hover:shadow-amber-500/50 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:from-amber-600 hover:to-amber-800"
          onClick={() => setShowModal(true)}
        >
          Tambah Client
        </button>
      </div>
      <div className="p-6 border border-2 border-amber-500 rounded-lg shadow hover:shadow-lg transition">
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
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-8 rounded shadow-md w-full max-w-md p-6 border border-4 border-amber-500 rounded-lg shadow bg-white/50">
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
              className="w-full mb-2 p-2 border rounded"
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
                className="mb-4 relative px-6 py-2 font-semibold text-white rounded-xl 
             bg-gradient-to-r from-red-500 to-red-700 
             shadow-lg hover:shadow-red-500/50 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:from-red-600 hover:to-red-800"
              >
                Batal
              </button>
              <button
                onClick={handleAddClient}
                className="mb-4 relative px-6 py-2 font-semibold text-white rounded-xl 
             bg-gradient-to-r from-green-500 to-green-700 
             shadow-lg hover:shadow-green-500/50 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:from-green-600 hover:to-green-800"
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
