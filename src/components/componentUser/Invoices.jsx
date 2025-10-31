import { useNavigate } from "react-router";
import ListInvoices from "./ListInvoices";

const Clients = () => {
  const navigate = useNavigate();

  const handleAddInvoice = () => {
    navigate("/invoice/add");
  };

  return (
    <div className="p-5 card bg-white shadow rounded mb-6 border border-4 border-amber-500 rounded-lg shadow">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold mb-4">Invoice</h2>
        <button
          onClick={handleAddInvoice}
          className="mb-3 relative px-6 py-2 font-semibold text-white rounded-xl 
             bg-gradient-to-r from-amber-500 to-yellow-700 
             shadow-lg hover:shadow-amber-500/50 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:from-amber-600 hover:to-amber-800"
        >
          Tambah Invoice
        </button>
      </div>

      <ListInvoices />
    </div>
  );
};

export default Clients;
