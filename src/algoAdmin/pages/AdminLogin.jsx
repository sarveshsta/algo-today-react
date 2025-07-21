import { useState } from 'react';
import {useNavigate} from 'react-router'
import { login} from '../routes/apiRoutes.js'
import Cookies from 'js-cookie';
import Toast from '../components/Toast.jsx'
import './adminlogin.css';

// Eye icon SVGs
const EyeIcon = ({ open }) => open ? (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
) : (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/></svg>
);

const AdminLogin = () => {
  const [toastData, setToastData] = useState(null);
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await login(formData);
      console.log(response);
      
      if (response && response.access) {
        // Store the access token in both cookies and localStorage for redundancy
        localStorage.setItem('adminAccessToken', response.access);
        Cookies.set('adminAccessToken', response.access, { expires: 1 }); // Expires in 1 day
        
        // Store the refresh token if available
        if (response.refresh) {
          localStorage.setItem('adminRefreshToken', response.refresh);
          Cookies.set('adminRefreshToken', response.refresh, { expires: 7 }); // Expires in 7 days
        }
        
        // Navigate only on successful login
        navigate('/admin/users');
      } else {
        setToastData({
          title: 'Login Error',
          message: response.message || 'Login failed.',
          type: 'error',
          duration: 3000,
          position: 'top-right',
        });
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setToastData({
        title: 'Login Error',
        message: err.message || 'Login failed.',
        type: 'error',
        duration: 3000,
        position: 'top-right',
      });
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="adminlogin-root">
      <div className="adminlogin-container">
        <div>
          <h2 className="adminlogin-title">
            Welcome Back
          </h2>
          <p className="adminlogin-subtitle">
            Please sign in to your account
          </p>
          {error && (
            <div className="adminlogin-error">
              {error}
            </div>
          )}
        </div>
        <form className="adminlogin-form" onSubmit={handleSubmit}>
          <div className="adminlogin-fields">
            <div>
              <label htmlFor="phone" className="adminlogin-sronly">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="adminlogin-input"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <label htmlFor="password" className="adminlogin-sronly">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="adminlogin-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{ paddingRight: 38 }}
              />
              <span
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  bottom: 0,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  background: 'transparent'
                }}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                role="button"
              >
                <EyeIcon open={showPassword} />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="adminlogin-button"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      {toastData && (
        <Toast
          {...toastData}
          onClose={() => setToastData(null)}
        />
      )}
    </div>
  );
};

export default AdminLogin;
