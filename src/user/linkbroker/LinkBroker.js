import "./linkbroker.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import zerodhaLogo from "../../assets/Group.png";
import Navbar from "../../components/navbar/Navbar";
import HorizontalNav from "../../components/navbar/HorizontalNav";
import angelLogo from "../../assets/angel-one-logos-id-Z21xHlt.png";
import axios from "axios";
import Cookies from 'js-cookie';


// Toast Component
const Toast = ({ message, type, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '8px',
      color: 'white',
      fontSize: '16px',
      fontWeight: '500',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '300px',
      maxWidth: '500px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: 'slideInRight 0.3s ease-out',
      cursor: 'pointer'
    };

    const typeStyles = {
      success: {
        backgroundColor: '#10b981',
        border: '1px solid #059669'
      },
      error: {
        backgroundColor: '#ef4444',
        border: '1px solid #dc2626'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  return (
    <>
      <div style={getToastStyles()} onClick={onClose}>
        {getIcon()}
        <span style={{ flex: 1 }}>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    client_code: "",
    password: "",
    TOTP: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearSensitiveFields = () => {
    setFormData(prev => ({
      ...prev,
      password: "",
      TOTP: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, clearSensitiveFields);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        width:'100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          width: '450px',
          maxWidth: '90%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          animation: 'slideIn 0.3s ease-out',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '25px',
          borderBottom: '1px solid #e9ecef',
          paddingBottom: '15px'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Connect Account
          </h3>
          <button 
            onClick={onClose} 
            style={{ 
              border: 'none', 
              background: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: '#6c757d',
              padding: '5px',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.color = '#495057';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6c757d';
            }}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }} >
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#495057',
              fontSize: '18px',
               fontWeight: '600',
               textAlign: "left"
            }}>
              Client Code
            </label>
            <input
              type="text"
              name="client_code"
              value={formData.client_code}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e9ecef', 
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#495057',
              fontSize: '18px',
               fontWeight: '600',
                textAlign: "left"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e9ecef', 
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#495057',
              fontSize: '18px',
            fontWeight: '600',
             textAlign: "left"
            }}>
              TOTP
            </label>
            <input
              type="text"
              name="TOTP"
              value={formData.TOTP}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                border: '2px solid #e9ecef', 
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ 
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
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
      `}</style>
    </div>
  );
};

const Box = ({ heading, imageUrl, altText, linkUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleSetupClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData, clearSensitiveFields) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await axios.post('http://localhost:5000/connect-account/', formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Account connected successfully');
  setIsModalOpen(false);
  clearSensitiveFields(); // Clear password and TOTP after success
  showToast('Account connected successfully! Your broker account is now linked.', 'success');
}
     catch (error) {
      console.error('Error connecting account:', error);
      const errorMessage = error.message || 'Network error occurred while connecting account';
      clearSensitiveFields(); // Clear password and TOTP after network error
      showToast(`Connection error: ${errorMessage}`, 'error');
    }
  };

  return (
    <div className="box">
      <div className="headng-div">
        <h3 className="box-h3">{heading}</h3>
      </div>
      <div>
        <img className="box-img" src={imageUrl} alt={altText} />
      </div>
      <div className="box-btnn-div">
        <button type="button" className="btn btn-primary" onClick={handleSetupClick}>
          Setup
        </button>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

const LinkBroker = () => (
  <div>
    <HorizontalNav />
    <Navbar />
    <div className="container" id="linkbroker-main-container">
      <div className="row" id="linkbroker-row-div">
        <Box
          heading="Link your Broker Account with Zerodha"
          imageUrl={zerodhaLogo}
          altText="Zerodha logo"
          linkUrl="https://smartapi.angelone.in/publisher-login?api_key=FJrreQAW&state=statevariable"
        />
        <Box
          heading="Link your Broker Account with Zerodha"
          imageUrl={zerodhaLogo}
          altText="Zerodha logo"
          linkUrl="https://smartapi.angelbroking.com/publisher-login"
        />
      </div>

      <div className="row">
        <Box
          heading={
            <>
              Link your Broker Account with <span className="angle">Angel</span>
              <span className="one">One</span>
            </>
          }
          imageUrl={angelLogo}
          altText="Angel One logo"
          linkUrl="https://angelbroking.com"
        />
        <Box
          heading={
            <>
              Link your Broker Account with <span className="angle">Angel</span>
              <span className="one">One</span>
            </>
          }
          imageUrl={angelLogo}
          altText="Angel One logo"
          linkUrl="https://angelbroking.com"
        />
      </div>
    </div>
  </div>
);

export default React.memo(LinkBroker);