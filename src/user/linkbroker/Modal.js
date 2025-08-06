import "./linkbroker.css";
import React, { useState, useCallback, useMemo } from "react";

export const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client_code: "",
    password: "",
    totp_secret: "",
    api_key: "",
  });

  // Memoize handlers to prevent re-renders
  const handleInputChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const clearSensitiveFields = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      password: "",
      totp_secret: "",
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(formData, clearSensitiveFields);
    },
    [formData, onSubmit, clearSensitiveFields],
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  // Memoize styles to prevent recalculation
  const modalStyles = useMemo(
    () => ({
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        animation: "fadeIn 0.2s ease-out",
      },
      content: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        width: "450px",
        maxWidth: "90%",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        animation: "slideIn 0.2s ease-out",
        fontFamily: "Arial, sans-serif",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        borderBottom: "1px solid #e9ecef",
        paddingBottom: "15px",
      },
      title: {
        margin: 0,
        color: "#2c3e50",
        fontSize: "24px",
        fontWeight: "600",
      },
      closeButton: {
        border: "none",
        background: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "#6c757d",
        padding: "5px",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
      },
      inputGroup: {
        marginBottom: "20px",
      },
      label: {
        display: "block",
        marginBottom: "8px",
        color: "#495057",
        fontSize: "18px",
        fontWeight: "600",
        textAlign: "left",
      },
      input: {
        width: "100%",
        padding: "12px 16px",
        border: "2px solid #e9ecef",
        borderRadius: "8px",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.2s ease",
        boxSizing: "border-box",
      },
      submitButton: {
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        cursor: "pointer",
      },
    }),
    [],
  );

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={modalStyles.overlay}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={modalStyles.content}
      >
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>Connect Account</h3>
          <button
            onClick={onClose}
            className="modal-close-btn"
            style={modalStyles.closeButton}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={modalStyles.inputGroup}>
            <label style={modalStyles.label}>Client Code</label>
            <input
              type="text"
              name="client_code"
              value={formData.client_code}
              onChange={handleInputChange}
              required
              style={modalStyles.input}
              className="modal-input"
            />
          </div>

          <div style={modalStyles.inputGroup}>
            <label style={modalStyles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={modalStyles.input}
              className="modal-input"
            />
          </div>

          <div style={modalStyles.inputGroup}>
            <label style={modalStyles.label}>API Key</label>
            <input
              type="text"
              name="api_key"
              value={formData.api_key}
              onChange={handleInputChange}
              required
              style={modalStyles.input}
              className="modal-input"
            />
          </div>

          <div style={{ ...modalStyles.inputGroup, marginBottom: "25px" }}>
            <label style={modalStyles.label}>TOTP</label>
            <input
              type="text"
              name="totp_secret"
              value={formData.totp_secret}
              onChange={handleInputChange}
              required
              style={modalStyles.input}
              className="modal-input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary modal-submit-btn"
            style={modalStyles.submitButton}
          >
            Connect Account
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close-btn:hover {
          background-color: #f8f9fa !important;
          color: #495057 !important;
        }

        .modal-input:focus {
          border-color: #007bff !important;
        }

        .modal-submit-btn:hover {
          background-color: #0056b3 !important;
        }
      `}</style>
    </div>
  );
};
