import { useNavigate } from "react-router";
import ListInvoices from "./ListInvoices";

const Clients = () => {
  const navigate = useNavigate();

  const handleAddInvoice = () => {
    navigate("/invoice/add");
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold mb-4">Invoice</h2>
        <button
          onClick={handleAddInvoice}
          className="bg-green-500 text-white px-4 py-2 rounded "
        >
          Tambah Invoice
        </button>
      </div>

      <ListInvoices />
    </div>
  );
};

export default Clients;
