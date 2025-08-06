import React from "react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ open, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>{title || "Confirm Action"}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          {!loading && (
            <button className={styles.cancelBtn} onClick={onCancel}>{cancelText}</button>
          )}
          <button className={styles.confirmBtn} onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
