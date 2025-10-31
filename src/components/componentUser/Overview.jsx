import { useEffect, useState } from "react";
import { useAuth } from "../../backend/AuthContext";
import RevenueChart from "./RevenueChart";

const Overview = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState({
    totalClients: 0,
    totalInvoices: 0,
    totalPaid: 0,
    totalUnpaid: 0,
  });
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice
        const invoiceRes = await fetch("http://localhost:8080/api/invoices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!invoiceRes.ok) throw new Error("Gagal fetch invoice");
        const invoiceData = await invoiceRes.json();
        const invoices = invoiceData.invoices || [];

        const paidCount = invoices.filter(
          (inv) => inv.status.toLowerCase() === "paid"
        ).length;
        const unpaidCount = invoices.filter(
          (inv) => inv.status.toLowerCase() === "unpaid"
        ).length;

        // Inisialisasi semua bulan dengan nilai 0
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthlyRevenue = {};
        monthOrder.forEach((month) => {
          monthlyRevenue[month] = 0;
        });

        // Tambahkan pendapatan ke bulan yang sesuai
        invoices.forEach((inv) => {
          const month = new Date(inv.issue_date).toLocaleString("default", {
            month: "short",
          });
          monthlyRevenue[month] += inv.amount;
        });

        // Format data sesuai urutan bulan
        const formattedRevenue = monthOrder.map((month) => ({
          month,
          total: monthlyRevenue[month],
        }));

        setSummary((prev) => ({
          ...prev,
          totalInvoices: invoices.length,
          totalPaid: paidCount,
          totalUnpaid: unpaidCount,
        }));

        setRevenueData(formattedRevenue);
      } catch (err) {
        console.error("Invoice fetch error:", err.message);
      }

      try {
        // Fetch client
        const clientRes = await fetch("http://localhost:8080/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!clientRes.ok) throw new Error("Gagal fetch clients");
        const clientData = await clientRes.json();
        setSummary((prev) => ({
          ...prev,
          totalClients: clientData.clients?.length || 0,
        }));
      } catch (err) {
        console.error("Client fetch error:", err.message);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div>
      <div
        className="p-5
      md:p-5 card bg-white shadow rounded mb-6 border border-4 border-amber-500 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Ringkasan</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <SummaryCard title="Total Client" value={summary.totalClients} />
          <SummaryCard title="Total Invoice" value={summary.totalInvoices} />
          <SummaryCard title="Paid" value={summary.totalPaid} />
          <SummaryCard title="Unpaid" value={summary.totalUnpaid} />
        </div>
      </div>

      <div className="p-5 card bg-white shadow rounded mb-6 border border-4 border-amber-500 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Ringkasan Pendapatan</h1>
        <RevenueChart data={revenueData} />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="content-center p-3 border border-2 border-amber-500 rounded-lg shadow content-center hover:shadow-lg transition text-center">
    <h2 className="text-sm text-gray-500 font-semibold">{title}</h2>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

export default Overview;
