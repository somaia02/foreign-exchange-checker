import { useState, useEffect } from "react";

export function useWindowWidth() {
  // Initialize state with current window width if available (client-side)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Fail-safe for Server-Side Rendering (SSR) environments like Next.js
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set up the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return windowWidth;
}
