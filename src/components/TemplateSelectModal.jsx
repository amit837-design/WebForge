import React, { useState } from "react";
import style1 from "../assets/style1.png";
import style2 from "../assets/style2.png";
import style3 from "../assets/style3.png";
import style4 from "../assets/style4.png";
import { useNavigate } from "react-router-dom";
import { usePortfolioBuilder } from "./PortfolioBuilderContext";

const templates = [
  { id: 1, img: style1, gradient: { from: "#a855f7", to: "#ec4899" } },
  { id: 2, img: style2, gradient: { from: "#22d3ee", to: "#a3e635" } },
  { id: 3, img: style3, gradient: { from: "#f97316", to: "#be123c" } },
  { id: 4, img: style4, gradient: { from: "#0d9488", to: "#be123c" } },
];

const TemplateSelectModal = ({ isOpen, onClose, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customColorsChosen, setCustomColorsChosen] = useState(false);
  const [customFrom, setCustomFrom] = useState("#8b5cf6");
  const [customTo, setCustomTo] = useState("#ec4899");

  const { setGradientColors, formData } = usePortfolioBuilder();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const disabled = !selectedTemplate && !customColorsChosen;

  const handleSelectTemplate = (temp) => {
    setSelectedTemplate(temp);
    setCustomColorsChosen(false);
  };

  const handleCustomColorRadio = () => {
    setCustomColorsChosen(true);
    setSelectedTemplate(null);
  };

  const finalGradient = customColorsChosen
    ? { from: customFrom, to: customTo }
    : selectedTemplate?.gradient || null;

  const handleConfirm = () => {
    if (disabled) return;

    setGradientColors(finalGradient);

    // ✅ Save form data + gradient to localStorage
    localStorage.setItem(
      "portfolio-data",
      JSON.stringify({ formData, gradientColors: finalGradient })
    );

    // ✅ Open Editor in new tab
    window.open("/editor", "_blank");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="custom-scroll w-full max-w-md max-h-[90vh] mx-4 my-8 overflow-y-auto bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6 text-white relative"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        <style>{`
          .custom-scroll::-webkit-scrollbar {
            width: 2px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #facc15, #fb923c, #ef4444);
            border-radius: 40px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .masonry-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
          .masonry-item {
            width: 80%;
            max-width: 80%;
            cursor: pointer;
            border-radius: 0.75rem;
            border: 2px solid transparent;
            transition: 0.3s ease;
            overflow: hidden;
          }
          @media (min-width: 640px) {
            .masonry-item {
              width: calc(40% - 0.5rem);
              max-width: 40%;
            }
          }
          .masonry-item.selected {
            border-color: #f97316;
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.6);
          }
          .masonry-item img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 0.75rem;
            user-select: none;
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-white text-4xl cursor-pointer select-none"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center select-none bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Choose Template
        </h2>

        <div className="masonry-grid">
          {templates.map((temp) => (
            <div
              key={temp.id}
              onClick={() => handleSelectTemplate(temp)}
              className={`masonry-item ${
                selectedTemplate?.id === temp.id ? "selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectTemplate(temp);
                }
              }}
              aria-pressed={selectedTemplate?.id === temp.id}
            >
              <img
                src={temp.img}
                alt={`Template ${temp.id}`}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input
            type="radio"
            id="customColors"
            name="colorOption"
            checked={customColorsChosen}
            onChange={handleCustomColorRadio}
            className="accent-orange-400 cursor-pointer"
          />
          <label
            htmlFor="customColors"
            className="select-none cursor-pointer text-white font-medium"
          >
            Choose Custom Colors
          </label>
        </div>

        {customColorsChosen && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-8 items-center">
              <div className="flex flex-col gap-1">
                <label className="text-sm select-none">From</label>
                <input
                  type="color"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer border border-white/20"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm select-none">To</label>
                <input
                  type="color"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer border border-white/20"
                />
              </div>
            </div>

            <div
              className="h-4 rounded shadow-inner"
              style={{
                background: `linear-gradient(to right, ${customFrom}, ${customTo})`,
              }}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-between items-center pt-6 sm:flex-nowrap sm:gap-6">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-2 border border-white/20 text-sm rounded-md hover:bg-white/10 transition select-none cursor-pointer"
          >
            ← Back
          </button>

          <button
            disabled={disabled}
            onClick={handleConfirm}
            className={`w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold px-6 py-3 rounded-md text-lg transition duration-300 ease-in-out shadow-md hover:shadow-[0_0_45px_12px_rgba(255,115,0,0.6)] ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Generate My Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectModal;
