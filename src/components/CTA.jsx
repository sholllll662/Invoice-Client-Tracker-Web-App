import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-blue-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Siap Kelola Invoice Lebih Mudah?
        </h2>
        <p className="text-lg mb-8">
          Mulai gunakan aplikasi ini dan hemat waktumu untuk hal yang lebih
          penting.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-blue-100 transition"
        >
          Daftar Sekarang
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
