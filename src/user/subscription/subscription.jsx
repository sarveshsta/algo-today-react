import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./subscription.css";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";

const SUBSCRIPTION_DETAILS = {
  id: "1e4bdb1c-3171-470f-89f1-099d8987dd0e", // Unique plan identifier
  name: "Pro Subscription",
  price: 499, // in INR
  description: "Unlock all premium features, expert strategies, and priority support.",
  features: [
    "Full access to all strategies",
    "Priority customer support",
    "Advanced analytics",
    "Early access to new features",
    "Exclusive webinars and content",
  ],
};

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || "YOUR_RAZORPAY_KEY"; // Replace with your key or use env
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL  // Replace with your backend URL

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleSubscribe = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      setLoading(false);
      return;
    }
    try {
      // Get token from cookies only
      const accessToken = Cookies.get("accessToken");
      // 1. Create order on backend
      const { data } = await axios.post(
        `${BACKEND_URL}/api/subscription/create/`,
        {
          plan_id: SUBSCRIPTION_DETAILS.id, // Use the plan ID
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
        }
      );
      const orderId = data.orderId || data.id;
      // 2. Open Razorpay modal
      const options = {
        key: RAZORPAY_KEY,
        amount: SUBSCRIPTION_DETAILS.price * 100,
        currency: "INR",
        name: SUBSCRIPTION_DETAILS.name,
        description: SUBSCRIPTION_DETAILS.description,
        order_id: orderId,
        handler: async function (response) {
          setPaymentDetails(response);
          console.log(response)
          // Backend verification logic using axios
          try {
            // Get token from cookies only
            const accessToken = Cookies.get("accessToken");
            const verifyRes = await axios.post(
              "http://127.0.0.1:5000/api/subscription/verify/",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                },
              }
            );
            toast.success(verifyRes.data.message || "Subscription verified successfully!");
          } catch (err) {
            toast.error(
              err?.response?.data?.message || "Subscription verification failed."
            );
          }
        },
        prefill: {
          name: "Your Name", // Optionally, use user data
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error initiating payment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="subscription-root">
      <HorizontalNav />
      <Navbar />
      <div className="subscription-main-container">
        <ToastContainer autoClose={2000} pauseOnFocusLoss closeOnClick draggable />
        <div className="subscription-card">
          <h2 className="subscription-title">{SUBSCRIPTION_DETAILS.name}</h2>
          <h3 className="subscription-price">₹{SUBSCRIPTION_DETAILS.price} <span className="subscription-per">/ month</span></h3>
          <p className="subscription-description">{SUBSCRIPTION_DETAILS.description}</p>
          <ul className="subscription-features">
            {SUBSCRIPTION_DETAILS.features.map((f, i) => (
              <li key={i} className="subscription-feature-item">{f}</li>
            ))}
          </ul>
          <button
            className="subscription-btn"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
          {paymentDetails && (
            <div className="subscription-payment-details">
              <h4>Payment Details</h4>
              <div><b>Payment ID:</b> {paymentDetails.razorpay_payment_id}</div>
              <div><b>Order ID:</b> {paymentDetails.razorpay_order_id}</div>
              <div><b>Signature:</b> {paymentDetails.razorpay_signature}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


