import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import gsap from "gsap";
import { usePortfolioBuilder } from "./PortfolioBuilderContext.jsx";

const PreviewPage = () => {
  const { formData, gradientColors } = usePortfolioBuilder();

  if (!formData || !gradientColors) {
    return <div>Loading...</div>;
  }

  const {
    name = "Name",
    profession = "Your Profession",
    profilePic = "",
    portfolioImage1 = "",
    portfolioLink = "",
    tagline = "Amazing Developer",
    about = "Brief bio about yourself...",
    projects = [],
  } = formData;

  const { from: gradientFrom = "#f59e0b", to: gradientTo = "#ef4444" } =
    gradientColors;

  useEffect(() => {
    gsap.from("#hero-heading", { x: -50, opacity: 0, duration: 1, delay: 0.2 });
    gsap.from("#hero-subheading", {
      x: -30,
      opacity: 0,
      duration: 1,
      delay: 0.4,
    });
    gsap.from("#hero-desc", { y: 20, opacity: 0, duration: 1, delay: 0.6 });
    gsap.to("#hero-image", { scale: 1, opacity: 1, duration: 1, delay: 0.8 });

    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.style.willChange = "transform";
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { duration: 0, x: 0, y: 0 });
      });
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const moveX = ((relX - rect.width / 2) / rect.width) * 20;
        const moveY = ((relY - rect.height / 2) / rect.height) * 20;
        gsap.to(btn, { duration: 0, x: moveX, y: moveY });
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>SnapFolio - {name}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        <style>{`
          html {
            scroll-behavior: smooth;
            scrollbar-width: thin;
            scrollbar-color: ${gradientFrom} #111111;
          }
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: #111111;
          }
          ::-webkit-scrollbar-thumb {
            background-image: linear-gradient(to bottom, ${gradientFrom}, ${gradientTo});
            border-radius: 8px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-image: linear-gradient(to bottom, ${gradientTo}, ${gradientFrom});
          }
          body {
            font-family: "Inter", sans-serif;
            background-color: #111111;
            color: white;
          }
          nav a {
            position: relative;
          }
          nav a::after {
            content: "";
            position: absolute;
            width: 0%;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: linear-gradient(90deg, ${gradientFrom}, ${gradientTo});
            transition: width 0.3s;
            border-radius: 1px;
          }
          nav a:hover::after {
            width: 100%;
          }
          .magnetic {
            transition: transform 0.15s ease;
            will-change: transform;
            display: inline-block;
            cursor: pointer;
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </Helmet>

      <div className="min-h-screen" id="mainBody">
        {/* Navbar */}
        <nav
          className="mx-auto w-[90%] md:w-[60%] mt-6 px-4 md:px-8 py-4 rounded-xl backdrop-blur-md border border-white/10 shadow-lg flex justify-between items-center sticky top-4 z-50"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}20, ${gradientTo}20)`,
          }}
        >
          <h1
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r select-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            <span className="block max-[420px]:block hidden">SF</span>
            <span className="max-[420px]:hidden block">SnapFolio</span>
          </h1>
          <div className="flex items-center gap-6 text-base font-medium">
            <div className="min-[420px]:flex gap-10">
              <a
                href="#home"
                className="magnetic bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                Home
              </a>
              <a
                href="#portfolio"
                className="magnetic bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                Portfolio
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="px-8 md:px-28 py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2 space-y-6">
              <h2
                id="hero-heading"
                className="text-5xl font-extrabold leading-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                Hi, I’m {name}
              </h2>
              <p id="hero-subheading" className="text-xl text-gray-300">
                A{" "}
                <span className="underline decoration-pink-500 decoration-4 underline-offset-4 font-semibold">
                  {profession || tagline}
                </span>
              </p>
              <p
                id="hero-desc"
                className="text-gray-400 leading-relaxed max-w-md"
              >
                {about}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#portfolio"
                  className="magnetic relative inline-block px-6 py-3 rounded-full font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                  }}
                >
                  <span className="relative z-10">🚀 View My Work</span>
                  <span
                    className="absolute inset-0 rounded-full blur-md opacity-50 animate-pulse"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                    }}
                  ></span>
                </a>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-end relative">
              <div
                id="hero-image"
                className="relative rounded-[2rem] overflow-hidden shadow-2xl w-72 h-96 border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-105"
                style={{
                  boxShadow: `2px 2px 8px ${gradientTo}, 4px 4px 10px ${gradientFrom}`,
                }}
              >
                <img
                  src={profilePic || portfolioImage1}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-[2rem] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-8 py-20 text-center">
          <h2
            className="text-3xl font-bold mb-12 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            Portfolio
          </h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
            {projects.map(({ color }, idx) => (
              <div
                key={idx}
                className="break-inside-avoid rounded-xl h-48 hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-gray-400 py-12 px-6 text-center border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col items-center space-y-2">
            <h3
              className="text-2xl font-bold select-none bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
              }}
            >
              SnapFolio
            </h3>
            <p
              className="max-w-md text-sm select-none bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${gradientFrom}99, ${gradientTo}99)`,
              }}
            >
              Made with ❤️
            </p>
            <div
              className="text-sm select-none bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${gradientFrom}99, ${gradientTo}99)`,
              }}
            >
              © 2025 {name}. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PreviewPage;
