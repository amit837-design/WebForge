import React, { useState } from "react";
import { usePortfolioBuilder } from "./PortfolioBuilderContext";

const FormPage = ({ isOpen, onClose, onComplete }) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [works, setWorks] = useState([{ image: null, link: "" }]);
  
  const [errors, setErrors] = useState({});

  const { setFormData } = usePortfolioBuilder();

  const handleWorkChange = (index, field, value) => {
    const updated = [...works];
    updated[index][field] = value;
    setWorks(updated);
  };

  const addMoreWorks = () => {
    setWorks([...works, { image: null, link: "" }]);
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!profession.trim()) newErrors.profession = "Profession is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!profilePic) newErrors.profilePic = "Profile picture is required";

    works.forEach((work, i) => {
      if (!work.image) {
        newErrors[`workImage${i}`] = "Portfolio image is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormData({
      name,
      profession,
      description,
      profilePic,
      works,
    });

    onComplete({
      name,
      profession,
      description,
      profilePic,
      works,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md max-h-[90vh] mx-4 my-8 overflow-y-auto custom-scroll bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 text-white relative scroll-smooth"
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
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-white text-4xl cursor-pointer"
          aria-label="Close form"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent select-none">
          Get Started
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.name ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Profession */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="profession"
            >
              Your Profession
            </label>
            <input
              id="profession"
              type="text"
              placeholder="UI/UX Designer"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-black/20 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.profession ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.profession && (
              <p className="text-red-500 mt-1 text-sm">{errors.profession}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="profilePic"
            >
              Upload Your Picture
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfilePic(
                  e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null
                )
              }
              className={`w-full file:px-4 file:py-2 file:bg-orange-500 file:text-black file:rounded-md bg-black/20 border text-white focus:outline-none ${
                errors.profilePic ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.profilePic && (
              <p className="text-red-500 mt-1 text-sm">{errors.profilePic}</p>
            )}
            {profilePic && (
              <img
                src={profilePic}
                alt="Preview"
                className="mt-3 w-42 rounded h-32 object-cover mx-auto shadow"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Short Description (max 100 characters)
            </label>
            <textarea
              id="description"
              placeholder="Tell us something about you..."
              maxLength={100}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-black/20 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none ${
                errors.description ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {description.length}/100
            </p>
          </div>


          {/* Works Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">
              Portfolio Works (Image + Link)
            </label>

            {works.map((work, index) => (
              <div
                key={index}
                className="space-y-2 border border-white/10 p-4 rounded-lg bg-black/10"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleWorkChange(
                      index,
                      "image",
                      e.target.files[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : null
                    )
                  }
                  className={`w-full file:px-4 file:py-2 file:bg-orange-500 file:text-black file:rounded-md bg-black/20 border text-white focus:outline-none ${
                    errors[`workImage${index}`]
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />
                {errors[`workImage${index}`] && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors[`workImage${index}`]}
                  </p>
                )}
                {work.image && (
                  <img
                    src={work.image}
                    alt="Portfolio Preview"
                    className="rounded-md h-32 object-cover w-full border border-orange-400 shadow-sm"
                  />
                )}
                <input
                  type="text"
                  placeholder="Link to project (optional)"
                  value={work.link}
                  onChange={(e) =>
                    handleWorkChange(index, "link", e.target.value)
                  }
                  className="w-full px-4 py-2 rounded-md bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-4 justify-between items-center mt-4 sm:flex-nowrap sm:gap-6">
              <button
                type="button"
                onClick={addMoreWorks}
                className="w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-semibold py-3 px-6 rounded-md text-sm transition duration-300 ease-in-out shadow-md hover:shadow-[0_0_25px_8px_rgba(255,115,0,0.5)] cursor-pointer"
              >
                ➕ Add More Work
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto sm:flex-1 bg-transparent border border-white/20 text-sm rounded-md hover:bg-white/10 transition select-none px-6 py-2 cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
