import React, { useEffect, useState } from "react";
import generateHTML from "../utils/generateHTML";
import DownloadButton from "./DownloadButton"; // Import the DownloadButton component

const EditorPage = () => {
  const [localFormData, setLocalFormData] = useState(null);
  const [localGradient, setLocalGradient] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");

  useEffect(() => {
    document.title = "WebForge - Live Preview";
    const stored = localStorage.getItem("portfolio-data");
    if (stored) {
      try {
        const { formData, gradientColors } = JSON.parse(stored);
        setLocalFormData(formData);
        setLocalGradient(gradientColors);

        const html = generateHTML({
          ...formData,
          gradient: gradientColors,
        });

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (err) {
        console.error("Failed to parse portfolio data:", err);
      }
    }
  }, []);

  if (!blobUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="animate-pulse text-lg">Loading Preview...</p>
      </div>
    );
  }

  return (
    <>
      <iframe
        title="Live Portfolio"
        src={blobUrl}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
      {/* Render DownloadButton only when data is ready */}
      {localFormData && localGradient && (
        <DownloadButton
          formData={localFormData}
          gradientColors={localGradient}
        />
      )}
    </>
  );
};

export default EditorPage;
