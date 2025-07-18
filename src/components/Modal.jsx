import React from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: 32,
  borderRadius: 12,
  minWidth: 600,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

const closeBtnStyle = {
  position: "absolute",
  top: 12,
  right: 16,
  fontSize: 24,
  background: "none",
  border: "none",
  cursor: "pointer",
};

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtnStyle} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
} 