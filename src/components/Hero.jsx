import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center py-20 px-4 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 max-w-2xl">
        Kelola Invoice & Klien Anda Lebih Mudah
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mb-6">
        Aplikasi khusus freelancer untuk membuat, mengelola, dan melacak invoice
        dengan cepat dan profesional.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 text-white py-3 px-6 rounded-full shadow hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </section>
  );
};

export default Hero;
