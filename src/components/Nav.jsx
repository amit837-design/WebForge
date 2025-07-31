import React, { useState } from "react";
import FormPage from "./FormPage";

const Nav = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <nav
        className="mx-auto w-[90%] md:w-[60%] px-6 py-3 rounded-xl backdrop-blur-xl border border-white/20 shadow-lg flex justify-between items-center sticky top-4 z-50 bg-black/40"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 178, 0, 0.15), rgba(255, 87, 34, 0.15))",
        }}
      >
        {/* Logo */}
        <h1 className="text-2xl max-[355px]:text-lg font-extrabold tracking-tight text-white select-none bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          WebForge
        </h1>

        {/* Button */}
        <button
          onClick={() => setShowForm(true)}
          className="px-5 max-[355px]:px-3 py-2 max-[355px]:py-1 rounded-md font-semibold text-base max-[355px]:text-sm bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black shadow-md transition duration-300 ease-in-out hover:shadow-[0_0_40px_10px_rgba(255,115,0,0.6)] cursor-pointer"
        >
          Get Started
        </button>
      </nav>

      {showForm && (
        <FormPage
          isOpen={true}
          onClose={() => setShowForm(false)}
          onComplete={() => {
            setShowForm(false);
          }}
        />
      )}
    </>
  );
};

export default Nav;
