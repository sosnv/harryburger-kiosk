import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

const Welcome = () => {
  const [orderType, setOrderType] = useState(null);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Logo container */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-transparent bg-opacity-100 rounded-full shadow-md">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-52 h-52 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Content container with semi-transparent background */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl p-16 bg-white bg-opacity-75 rounded-2xl shadow-lg space-y-12 text-center transform scale-105">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Witaj w restauracji HarryBurger
          </h1>

          <div className="pb-12 flex justify-center space-x-12">
            {/* Na miejscu */}
            <button
              className={`flex flex-col items-center justify-center p-10 rounded-xl border-2 text-gray-800 text-2xl transition transform ${
                orderType === "naMiejscu"
                  ? "border-yellow-500 bg-yellow-500 text-white"
                  : "border-gray-800"
              }`}
              onClick={() => setOrderType("naMiejscu")}
            >
              <MdRestaurant size={60} />
              <b>Na miejscu</b>
            </button>

            {/* Na wynos */}
            <button
              className={`flex flex-col items-center justify-center p-10 rounded-xl border-2 text-gray-800 text-2xl transition transform ${
                orderType === "naWynos"
                  ? "border-yellow-500 bg-yellow-500 text-white"
                  : "border-gray-800"
              }`}
              onClick={() => setOrderType("naWynos")}
            >
              <FaShoppingBag size={60} />
              <b>Na wynos</b>
            </button>
          </div>

          <Link to="/menu" state={{ orderType }}>
            <button
              className="text-3xl py-8 px-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              disabled={!orderType} // Przycisk aktywny dopiero po wyborze typu zamówienia
            >
              <b>Złóż zamówienie</b>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
