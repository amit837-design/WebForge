import React, { useState, useRef } from "react";
import gsap from "gsap";

import style1 from "../assets/style1.png";
import style2 from "../assets/style2.png";
import style3 from "../assets/style3.png";
import style4 from "../assets/style4.png";

const images = [style1, style2, style3, style4];

export default function BubbleImageReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const nextImageRef = useRef([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImageEl = nextImageRef.current[nextIndex];
    const rect = containerRef.current.getBoundingClientRect();
    const maxRadius = Math.hypot(rect.width, rect.height);

    // Start animation from cursor
    gsap.set(nextImageEl, {
      clipPath: `circle(0px at ${cursor.x}px ${cursor.y}px)`,
      opacity: 1,
      pointerEvents: "auto",
      zIndex: 2,
    });

    gsap.to(nextImageEl, {
      clipPath: `circle(${maxRadius}px at ${cursor.x}px ${cursor.y}px)`,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        setCurrentIndex(nextIndex);

        // Reset styles
        gsap.set(nextImageEl, {
          opacity: 0,
          clipPath: "none",
          pointerEvents: "none",
          zIndex: 0,
        });
      },
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-3xl aspect-[16/9] mx-auto cursor-pointer overflow-hidden select-none"
    >
      {images.map((img, i) => (
        <img
          key={i}
          ref={(el) => (nextImageRef.current[i] = el)}
          src={img}
          alt={`img-${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === currentIndex ? 1 : 0,
            zIndex: i === currentIndex ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      ))}
    </div>
  );
}
