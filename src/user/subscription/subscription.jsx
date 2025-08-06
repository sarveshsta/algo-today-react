import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./subscription.module.css";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";
import { showToast } from "../../utility";
import { useDispatch } from "react-redux";
import { getSubscriptionStatusApi } from "../features/customdata/custAuthentication";
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || "YOUR_RAZORPAY_KEY"; // Replace with your key or use env
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // Replace with your backend URL

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
  const dispatch = useDispatch();
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getSubscriptionStatusApi())
      .unwrap()
      .then((data) => {
        setSubscriptionStatus(data.success);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("AngelOne status fetch error:", err);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchPlans = async () => {
      setPlansLoading(true);
      setError(null);
      try {
        const accessToken = Cookies.get("accessToken");
        const { data } = await axios.get(
          `${BACKEND_URL}/api/subscription/plans/`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            },
            signal: controller.signal,
          },
        );
        if (isMounted) {
          // Always show only active plans
          setPlans(
            Array.isArray(data)
              ? data.filter((plan) => plan.is_active === true)
              : [],
          );
        }
      } catch (err) {
        if (isMounted) {
          showToast(err.response.data.message);
        }
      }
      if (isMounted) setPlansLoading(false);
    };
    fetchPlans();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const isMountedRef = useRef(true);
  const handleSubscribe = async (plan) => {
    isMountedRef.current = true;
    setLoadingPlanId(plan.id);
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      if (isMountedRef.current) setLoadingPlanId(null);
      return;
    }
    const controller = new AbortController();
    try {
      // Get token from cookies only
      const accessToken = Cookies.get("accessToken");
      // 1. Create order on backend
      const { data } = await axios.post(
        `${BACKEND_URL}/api/subscription/create/`,
        {
          plan_id: plan.id, // Use the selected plan ID
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          signal: controller.signal,
        },
      );
      const orderId = data.razorpay_order_id || data.orderId || data.id;
      // 2. Open Razorpay modal
      const options = {
        key: RAZORPAY_KEY,
        amount: Math.round(Number(plan.price) * 100),
        currency: "INR",
        name: plan.name,
        description: plan.description,
        order_id: orderId, // Use this for orders
        handler: async function (response) {
          if (!isMountedRef.current) return;
          setPaymentDetails(response);
          // Backend verification logic using axios
          try {
            // Get token from cookies only
            const accessToken = Cookies.get("accessToken");
            const verifyRes = await axios.post(
              `${BACKEND_URL}/api/subscription/verify/`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  ...(accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {}),
                },
              },
            );
            if (isMountedRef.current)
              toast.success(
                verifyRes.data.message || "Subscription verified successfully!",
              );
          } catch (err) {
            if (isMountedRef.current)
              toast.error(
                err?.response?.data?.message ||
                  "Subscription verification failed.",
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
      if (isMountedRef.current)
        alert("Error initiating payment. Please try again.");
    }
    if (isMountedRef.current) setLoadingPlanId(null);
    // Cleanup for async
    return () => {
      isMountedRef.current = false;
      controller.abort();
    };
  };

  return (
    <div className="subscription-root">
      <HorizontalNav />
      <Navbar />
      <div className={styles.subscriptionMain}>
        <div className={styles.container}>
          <ToastContainer
            autoClose={2000}
            pauseOnFocusLoss
            closeOnClick
            draggable
          />
          {plansLoading ? (
            <div>Loading plans...</div>
          ) : error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : plans.length === 0 ? (
            <div>No active subscription plans available.</div>
          ) : (
            <div className={styles.subscriptionGrid}>
              {plans.map((plan, idx) => {
                // If the first feature is a summary (e.g., "Everything in Pro, plus"), separate it
                let featureIntro = null;
                let features = plan.features || [];
                if (
                  features.length > 0 &&
                  features[0].toLowerCase().includes("plus")
                ) {
                  featureIntro = features[0];
                  features = features.slice(1);
                }
                return (
                  <div className={styles.subscriptionCard} key={plan.id}>
                    <h2 className={styles.subscriptionTitle}>{plan.name}</h2>
                    <div className={styles.subscriptionRow}>
                      <span className={styles.subscriptionPrice}>
                        ₹{Number(plan.price).toFixed(2)}
                      </span>
                      <span className={styles.subscriptionDuration}>
                        {plan.duration_type} ({plan.duration_value})
                      </span>
                    </div>
                    <hr className={styles.subscriptionDivider} />
                    <p className={styles.subscriptionDesc}>
                      {plan.description || "No description available."}
                    </p>
                    {featureIntro && (
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#2563eb",
                          marginBottom: 8,
                          fontSize: "1.08rem",
                        }}
                      >
                        {featureIntro}
                      </div>
                    )}
                    <ul className={styles.subscriptionFeatures}>
                      {features.length > 0 ? (
                        features.map((f, i) => <li key={i}>{f}</li>)
                      ) : (
                        <li>No features listed.</li>
                      )}
                    </ul>
                    {isLoading ? (
                      <span className="text-muted">Checking status...</span>
                    ) : subscriptionStatus === true ? (
                      <span className="text-success fw-bold">Subscribed</span>
                    ) : (
                      <button
                        className={styles.subscriptionBtn}
                        onClick={() => handleSubscribe(plan)}
                        disabled={loadingPlanId === plan.id}
                      >
                        {loadingPlanId === plan.id
                          ? "Processing..."
                          : "Subscribe"}
                      </button>
                    )}

                    {paymentDetails &&
                      paymentDetails.razorpay_order_id ===
                        plan.razorpay_order_id && (
                        <div className="subscription-payment-details">
                          <h4>Payment Details</h4>
                          <div>
                            <b>Payment ID:</b>{" "}
                            {paymentDetails.razorpay_payment_id}
                          </div>
                          <div>
                            <b>Order ID:</b> {paymentDetails.razorpay_order_id}
                          </div>
                          <div>
                            <b>Signature:</b>{" "}
                            {paymentDetails.razorpay_signature}
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
