export default function generateHTML({
  name = "Your Name",
  profession = "Your Profession",
  description = "Your description here.",
  profilePic = "",
  works = [],
  gradient = { from: "#8b5cf6", to: "#ec4899" },
  image = profilePic || "https://via.placeholder.com/300",
}) {
  const from = gradient.from || "#8b5cf6";
  const to = gradient.to || "#ec4899";

  const projectHTML = works
    .filter((project) => project.image)
    .map(
      (project) => `
      ${
        project.link
          ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">`
          : ""
      }
        <div
          class="portfolio-item"
          title="${project.title || "Project"}"
        >
          <img
            src="${project.image}"
            alt="${project.title || "Project Image"}"
            loading="lazy"
          />
        </div>
      ${project.link ? `</a>` : ""}
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SnapFolio - ${name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" />
    <style>
      html {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: ${from} #111111;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: #111111;
      }

      ::-webkit-scrollbar-thumb {
        background-image: linear-gradient(to bottom, ${from}, ${to});
        border-radius: 8px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-image: linear-gradient(to bottom, ${to}, ${from});
      }

      body {
        font-family: "Inter", sans-serif;
        background-color: #111111;
        color: white;
        margin: 0;
        padding: 0;
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
        background: linear-gradient(90deg, ${from}, ${to});
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
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.7; }
      }

      /* Portfolio Masonry Styles */
#portfolio {
  padding: 4rem 2rem 6rem;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#portfolio h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, ${from}, ${to});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.masonry {
  column-count: 3;
  column-gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .masonry {
    column-count: 2;
    max-width: 700px;
  }
}

@media (max-width: 640px) {
  .masonry {
    column-count: 1;
    max-width: 90%;
  }
}

.portfolio-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  background-color: #222;
}

.portfolio-item:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(255, 115, 0, 0.6);
  z-index: 10;
}

.portfolio-item img {
  width: 100%;
  display: block;
  border-radius: 1rem;
  object-fit: cover;
}

    </style>
  </head>
  <body class="min-h-screen" id="mainBody">
    <nav class="mx-auto w-[90%] md:w-[60%] mt-6 px-4 md:px-8 py-4 rounded-xl backdrop-blur-md border border-white/10 shadow-lg flex justify-between items-center sticky top-4 z-50" style="background: linear-gradient(135deg, ${from}20, ${to}20);">
      <h1 class="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[${from}] to-[${to}] select-none">
        <span class="block max-[420px]:block hidden">SF</span>
        <span class="max-[420px]:hidden block">SnapFolio</span>
      </h1>
      <div class="flex items-center gap-6 text-base font-medium">
        <div class="min-[420px]:flex gap-10">
          <a href="#home" class="magnetic bg-clip-text text-transparent bg-gradient-to-r from-[${from}] to-[${to}] hover:from-[${to}] hover:to-[${from}] font-semibold">Home</a>
          <a href="#portfolio" class="magnetic bg-clip-text text-transparent bg-gradient-to-r from-[${from}] to-[${to}] hover:from-[${to}] hover:to-[${from}] font-semibold">Portfolio</a>
        </div>
      </div>
    </nav>

    <section id="home" class="px-8 md:px-28 py-16">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div class="md:w-1/2 space-y-6">
          <h2 id="hero-heading" class="text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[${from}] to-[${to}]">Hi, I’m ${name}</h2>
          <h3 id="hero-profession" class="text-2xl font-semibold text-gray-300">${profession}</h3>
          <p id="hero-description" class="text-gray-400 leading-relaxed max-w-md">${description}</p>

          <div class="flex flex-wrap gap-4 pt-4">
            <a href="#portfolio" class="magnetic relative inline-block px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[${from}] to-[${to}] shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none">
              <span class="relative z-10">🚀 View My Work</span>
              <span class="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-[${from}] to-[${to}] opacity-50 animate-pulse"></span>
            </a>
          </div>
        </div>

        <div class="md:w-1/2 flex justify-end relative">
          <div id="hero-image" class="relative rounded-[2rem] overflow-hidden shadow-2xl w-72 h-96 border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-105" style="box-shadow: 2px 2px 8px ${to}, 4px 4px 10px ${from};">
            <img src="${image}" alt="${name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-[2rem] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio" class="text-center">
      <h2>Portfolio</h2>
      <div class="masonry">
        ${projectHTML}
      </div>
    </section>

    <footer class="text-gray-400 py-12 px-6 text-center border-t border-white/5">
      <div class="max-w-6xl mx-auto flex flex-col items-center space-y-2">
        <h3 class="text-2xl font-bold select-none bg-clip-text text-transparent bg-gradient-to-r from-[${from}] to-[${to}]">SnapFolio</h3>
        <p class="max-w-md text-sm select-none bg-clip-text text-transparent" style="background-image: linear-gradient(90deg, ${from}99, ${to}99);">Made with ❤️</p>
        <div class="text-sm select-none bg-clip-text text-transparent" style="background-image: linear-gradient(90deg, ${from}99, ${to}99);">© 2025 ${name}. All rights reserved.</div>
      </div>
    </footer>

    <script>
      gsap.from("#hero-heading", { x: -50, opacity: 0, duration: 1, delay: 0.2 });
      gsap.from("#hero-profession", { x: -50, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from("#hero-description", { y: 20, opacity: 0, duration: 1, delay: 0.4 });
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
    </script>
  </body>
</html>`;
}
