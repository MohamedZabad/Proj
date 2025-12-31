import React from "react";

function Notification({ message, show }) {
  const style = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    opacity: show ? 0.9 : 0,      // fade in/out
    pointerEvents: "none",        // prevents clicks
    transition: "opacity 0.5s ease",
    zIndex: 1000,
  };

  return <div style={style}>{message}</div>;
}

export default Notification;
