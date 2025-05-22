import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Buat Invoice Otomatis",
    description:
      "Hanya dalam beberapa klik, buat invoice profesional dan kirim ke klien Anda.",
  },
  {
    title: "Lacak Pembayaran",
    description: "Pantau status pembayaran dengan sistem reminder otomatis.",
  },
  {
    title: "Kelola Daftar Klien",
    description:
      "Simpan dan kelola data klien untuk mempermudah transaksi berikutnya.",
  },
  {
    title: "Export ke PDF",
    description:
      "Cetak invoice langsung ke PDF dan kirimkan via email atau WhatsApp.",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Fitur Utama</h2>
      <p className="text-gray-500 mb-12">
        Semua yang kamu butuhkan sebagai freelancer, dalam satu aplikasi.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-lg transition"
          >
            <CheckCircle className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
