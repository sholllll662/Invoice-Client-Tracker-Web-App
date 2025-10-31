import React from "react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-20 px-6 text-black text-center">
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
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-600 
             text-black font-semibold shadow-lg 
             hover:scale-105 hover:shadow-amber-500/50 
             transition-all duration-300 ease-in-out"
        >
          SignUp Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;
