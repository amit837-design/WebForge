import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { FaCode } from "react-icons/fa";
import FormPage from "../components/FormPage";
import TemplateSelectModal from "../components/TemplateSelectModal";
import { usePortfolioBuilder } from "../components/PortfolioBuilderContext";
import BubbleImageReveal from "./BubbleImageReveal.jsx";

const TheMainPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const navigate = useNavigate();
  const { setFormData } = usePortfolioBuilder();

  const handleFormComplete = (data) => {
    if (!data) {
      console.error("No form data received.");
      return;
    }

    const {
      name = "",
      profession = "",
      description = "",
      profilePic = "",
      works = [],
      socialLinks = {},
    } = data;

    const structuredData = {
      name,
      profession,
      description,
      profilePic,
      works: Array.isArray(works) ? works : [],
      socialLinks: socialLinks || {},
    };

    console.log("📦 Sending to context:", structuredData);
    setFormData(structuredData);
    setShowForm(false);
    setShowTemplateModal(true);
  };

  const handleTemplateConfirm = () => {
    setShowTemplateModal(false);
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      <Nav />

      <section className="px-6 md:px-8 py-16 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-white flex justify-center items-center gap-3 flex-wrap select-none">
          The
          <span className="inline-flex items-center justify-center bg-blue-600 rounded-lg px-3 py-2">
            <FaCode className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </span>
          Portfolio
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-2 text-white select-none">
          Builder
        </h2>
        <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed px-2">
          🎉 Create stylish & functional portfolios in minutes — zero coding!
          <br />
          Pick cool templates or add your own gradient magic! 🌈✨
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-semibold px-6 py-3 rounded-md text-lg transition duration-300 ease-in-out shadow-md hover:shadow-[0_0_45px_12px_rgba(255,115,0,0.6)] cursor-pointer"
        >
          Give It A Try
        </button>
      </section>

      <section className="flex justify-center mb-2 px-4">
        <div className="relative w-full max-w-5xl">
          <BubbleImageReveal />
        </div>
      </section>

      <p className="text-sm font-semibold text-white pt-0 pb-4 text-center mb-12">
        ✨ Click on the image to see magical color transitions! ✨
      </p>

      <section className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-gray-400 mb-20 leading-relaxed text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-white pt-6">
          Start building instantly,
          <br /> right from your browser🪄
        </h2>
        <p className="mb-4 text-base sm:text-lg">
          Go from filling a simple form to a fully downloadable website in just
          minutes — no coding required. Choose from curated templates or design
          your own look with color gradients. Preview your site in real-time,
          and export it as a production-ready HTML zip file.
        </p>
        <p className="mb-4 text-sm sm:text-base">
          Whether you're showcasing your portfolio, launching a product, or
          experimenting with ideas, this tool helps you build and ship your site
          fast.
        </p>
        <p className="font-medium text-gray-200 text-sm sm:text-base">
          Currently in preview — all users can create and download unlimited
          sites for free.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold px-6 py-3 rounded-md text-lg transition duration-300 ease-in-out shadow-md hover:shadow-[0_0_45px_12px_rgba(255,115,0,0.6)] cursor-pointer"
        >
          Try WebForge
        </button>
      </section>

      <footer className="py-6 border-t border-gray-800 text-center text-sm select-none bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent px-4">
        © {new Date().getFullYear()} WebForge — Build your site, your way.
      </footer>

      {/* Modals */}
      <FormPage
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onComplete={handleFormComplete}
      />

      <TemplateSelectModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onBack={() => {
          setShowTemplateModal(false);
          setShowForm(true);
        }}
        onConfirm={handleTemplateConfirm}
      />
    </div>
  );
};

export default TheMainPage;
