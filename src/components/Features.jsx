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
    <section className="py-16 px-6 text-center">
      <h2 className="text-5xl font-bold mb-4 text-black">Fitur Utama</h2>
      <p className="text-2xl text-black mb-12">
        Semua yang kamu butuhkan untuk Mencatat keuangan, dalam satu aplikasi.
      </p>
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-4 border-amber-500 rounded-lg shadow hover:shadow-lg transition"
          >
            <CheckCircle className="mx-auto text-amber-500 mb-4" size={32} />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h2>
            <p className="text-1xl text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
