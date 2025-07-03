import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  // For trailing effect
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop for trailing
    let animationFrameId;
    const animate = () => {
      // Lerp: adjust 0.18 for more/less trailing
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Hide system cursor when custom cursor is active
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = '';
    };
  }, []);

  // Build the transform value based on clicked state
  const cursorTransform = clicked
    ? "scale(0.8) translate(-50%, -50%)"
    : "translate(-50%, -50%)";

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "2.5px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        background: "rgba(59,130,246,0.08)",
        boxShadow: "0 0 16px 4px rgba(228, 28, 28, 0.33), 0 2px 12px 0 rgba(228, 28, 28, 0.33)",
        transition:
          "background 0.2s, border 0.2s, box-shadow 0.2s, transform 0.15s, opacity 0.2s",
        padding: 6,
        opacity: hovering ? 0.7 : 1,
        transform: cursorTransform,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 0 8px 2px #3b82f655",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
};

export default CustomCursor;