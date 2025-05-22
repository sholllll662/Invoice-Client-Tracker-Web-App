import React from "react";

const About = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="/images/about.jpg"
            alt="About our app"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tentang Aplikasi Ini
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Kami tahu betapa ribetnya urusan administrasi buat freelancer. Dari
            bikin invoice sampai ngingetin pembayaran klien, semua itu bisa
            nyita waktu dan tenaga. Aplikasi ini hadir untuk jadi asisten
            digital kamu — praktis, cepat, dan profesional.
          </p>
          <p className="text-gray-500 text-sm">
            Dibuat dengan cinta oleh developer independen untuk mendukung
            komunitas freelance yang terus berkembang di Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
