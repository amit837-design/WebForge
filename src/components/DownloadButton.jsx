import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import generateHTML from "../utils/generateHTML";
import { FiDownload } from "react-icons/fi";

const DownloadButton = ({ formData, gradientColors }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleDownload = async () => {
    const zip = new JSZip();
    const assetsFolder = zip.folder("assets");

    const clonedFormData = JSON.parse(JSON.stringify(formData));

    // Fetch and add profile image
    if (clonedFormData.profilePic) {
      try {
        const response = await fetch(clonedFormData.profilePic);
        const blob = await response.blob();
        const ext = blob.type.split("/")[1] || "jpg";
        const fileName = `profile.${ext}`;
        assetsFolder.file(fileName, blob);
        clonedFormData.profilePic = `assets/${fileName}`;
      } catch (err) {
        console.warn("Failed to fetch profilePic");
      }
    }

    // Fetch and add work images
    const updatedWorks = await Promise.all(
      clonedFormData.works.map(async (work, index) => {
        if (work.image) {
          try {
            const response = await fetch(work.image);
            const blob = await response.blob();
            const ext = blob.type.split("/")[1] || "jpg";
            const fileName = `project-${index}.${ext}`;
            assetsFolder.file(fileName, blob);
            return { ...work, image: `assets/${fileName}` };
          } catch (err) {
            console.warn(`Failed to fetch project image ${index}`);
          }
        }
        return work;
      })
    );

    clonedFormData.works = updatedWorks;

    const html = generateHTML({
      ...clonedFormData,
      gradient: gradientColors,
    });

    zip.file("index.html", html);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "MyPortfolio.zip");
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {/* Custom Tooltip */}
      {tooltipVisible && (
        <div className="absolute bottom-14 right-1/2 translate-x-1/2 mb-2 px-3 py-1 text-sm bg-black text-white rounded shadow-md whitespace-nowrap transition-all duration-200 z-50">
          Download Website 🚀
        </div>
      )}

      <button
        onClick={handleDownload}
        className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg cursor-pointer opacity-75 hover:opacity-100 transition duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.9)]"
      >
        <FiDownload className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DownloadButton;
