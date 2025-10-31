import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center justify-center px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl shadow-lg w-[90%] max-w-sm">
        <div className="logo"></div>
        <div className="text-xl font-bold text-amber-500">Finance Tracker</div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-200 max-w-2xl">
          Kelola Keuangan & Klien Anda Lebih Mudah
        </h1>
        <p className="text-gray-100 text-lg max-w-xl mb-6">
          Aplikasi Pencatatan Keuangan untuk membuat, mengelola, dan melacak
          invoice dengan cepat dan profesional.
        </p>
        <Link
          to="/login"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-600 
             text-black font-semibold shadow-lg 
             hover:scale-105 hover:shadow-amber-500/50 
             transition-all duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Hero;
