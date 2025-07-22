import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfo , requestPhoneOtpAPI ,verifyPhoneOtpAPI} from "../features/auth/authAuthentication";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import Navbar from "../../components/navbar/Navbar";
import "./profile.css";


const Formcomp = ({ type, placeholder, name, onChange, onBlur, value, maxLength, className, readOnly, style }) => {
  return (
    <>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        maxLength={maxLength}
        readOnly={readOnly}
        style={style}
      />
    </>
  );
};


const Formbutton = ({ type, text, className, style, ...rest }) => {
    return (
      <>
        <button
          className={className ? className : "profile-submit-btn"}
          type={type}
          style={style}
          {...rest}
        >
          {text}
        </button>
      </>
    );
  };


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  // Local state for editable fields
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Fetch user info on mount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) dispatch(userInfo());
    return () => {
      isMounted.current = false;
    };
  }, [dispatch]);

  // Populate local state when user info loads
  useEffect(() => {
    if (isMounted.current && user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
    }
  }, [user]);

  // Simulate verify button click
  const handleVerifyClick = async () => {
    setOtp("");
    setOtpError("");
    // Call the requestPhoneOtpAPI with the phone number
    try {
      const result = await dispatch(requestPhoneOtpAPI({ phone: editPhone }));
      if (result?.payload?.data?.success === true) {
        setShowOtpModal(true);
      } else if (result?.payload?.data?.message) {
        setOtpError(result.payload.data.message);
      }
    } catch (err) {
      setOtpError("Failed to send OTP. Please try again.");
    }
  };

  // Simulate OTP submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setOtpError("");
    try {
      const result = await dispatch(verifyPhoneOtpAPI({ phone: editPhone, otp }));
      if (result?.payload?.data?.success === true) {
        setShowOtpModal(false);
        setOtp("");
        setOtpError("");
        // Refetch user info to update UI
        dispatch(userInfo());
      } else if (result?.payload?.data?.message) {
        setOtpError(result.payload.data.message);
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setOtpError("Failed to verify OTP. Please try again.");
    }
    setVerifying(false);
  };

  // Handle name edit and submit
  const handleNameChange = (e) => setEditName(e.target.value);
  const handlePhoneChange = (e) => setEditPhone(e.target.value);
  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Here you would dispatch an action to update the user profile
    // For now, just log the values
    // dispatch(updateUserProfile({ name: editName, phone: editPhone }))
  };

  return (
    <>
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <HorizontalNav />
      <div className="profile-page-bg profile-full-bg" >
        <div className="profile-main-content">
          <h2 className="profile-title">My Profile</h2>
          <form onSubmit={handleNameSubmit} className="profile-form profile-form-full">
            <div className="profile-field-group">
              <label className="profile-label">Name</label>
              <Formcomp
                type="text"
                name="name"
                value={editName}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="profile-input"
              />
            </div>
            <div className="profile-field-group">
              <label className="profile-label">Email</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Formcomp
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="profile-input profile-input-readonly"
                  style={{ flex: 1 }}
                />
                {user && user.email_verified && (
                  <span className="profile-verified-badge">Verified</span>
                )}
              </div>
            </div>
            <div className="profile-field-group profile-mobile-group">
              <label className="profile-label">Mobile Number</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Formcomp
                  type="text"
                  name="mobile"
                  value={editPhone}
                  onChange={
                    user && user.phone_verified === false
                      ? handlePhoneChange
                      : undefined
                  }
                  readOnly={user && user.phone_verified}
                  className="profile-input profile-input-readonly"
                />
                {user && user.phone_verified === false && (
                  <button
                    type="button"
                    className="profile-verify-btn"
                    onClick={handleVerifyClick}
                  >
                    Verify
                  </button>
                )}
                {user && user.phone_verified && (
                  <span className="profile-verified-badge">Verified</span>
                )}
              </div>
            </div>
            <div className="profile-submit-wrap">
              <Formbutton type="submit" text="Save Changes" />
            </div>
          </form>
        </div>

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="profile-modal-overlay">
            <div className="profile-modal">
              <h3 className="profile-modal-title">Verify Mobile</h3>
              <form onSubmit={handleOtpSubmit} className="profile-modal-form">
                <Formcomp
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  maxLength={6}
                  className="profile-input"
                />
                {otpError && <div className="profile-otp-error">{otpError}</div>}
                <div className="profile-modal-btns">
                  <Formbutton type="submit" text={verifying ? "Verifying..." : "Submit OTP"} />
                  <button
                    type="button"
                    className="profile-modal-cancel"
                    onClick={() => setShowOtpModal(false)}
                    disabled={verifying}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Profile;
