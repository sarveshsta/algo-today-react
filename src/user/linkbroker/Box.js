import "./linkbroker.css";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../../utility";
import { getAngeloneStatusApi } from "../features/customdata/custAuthentication";
import { Modal } from "./Modal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const Box = ({ heading, imageUrl, altText, linkUrl }) => {
  const dispatch = useDispatch();

  const [angelOneStatus, setIsAngeloneStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleSetupClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (formData, clearSensitiveFields) => {
      try {
        const token = Cookies.get("accessToken");
        const response = await axios.post(
          `${BACKEND_URL}/connect-account/`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Account connected successfully");
        setIsModalOpen(false);
        clearSensitiveFields();
        showToast(
          "Account connected successfully! Your broker account is now linked.",
          "success",
        );
      } catch (error) {
        console.error("Error connecting account:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Network error occurred while connecting account";
        clearSensitiveFields();
        showToast(`Connection error: ${errorMessage}`);
      }
    },
    [showToast],
  );
  useEffect(() => {
    dispatch(getAngeloneStatusApi())
      .unwrap()
      .then((data) => {
        setIsAngeloneStatus(data.success);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("AngelOne status fetch error:", err);
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="box">
      <div className="headng-div">
        <h3 className="box-h3">{heading}</h3>
      </div>
      <div className="box-image-container">
        <img className="box-img" src={imageUrl} alt={altText} />
      </div>
      <div className="box-btnn-div">
        {isLoading ? (
          <span className="text-muted">Checking status...</span>
        ) : angelOneStatus === true ? (
          <span className="text-success fw-bold">Connected</span>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSetupClick}
          >
            Setup
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
