import React, { useEffect, useState } from "react";

const TransitionPage = () => {
  const [startFade, setStartFade] = useState(false);

  useEffect(() => {
    // Trigger the fade-out effect after the component mounts
    const timer = setTimeout(() => {
      setStartFade(true);
    }, 500); // Adjust this delay if needed before the fade starts

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "gray",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "100",
        transition: "transform 4s ease-in-out, opacity 8s ease-in-out",
        opacity: startFade ? 0.2 : 1,
        transform: !startFade ? "translateX(100%)" : "translateX(0)",
      }}
    >
      {/* You can replace this content with anything */}
    </div>
  );
};

export default TransitionPage;
