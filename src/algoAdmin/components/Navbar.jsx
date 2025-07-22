import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { logout } from '../routes/apiRoutes.js'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast.jsx';

const navStyles = {
  background: '#fff',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
};
const leftGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};
const titleStyles = {
  fontSize: '1.25rem',
  fontWeight: 700,
  margin: 0,
};
const buttonBase = {
  background: '#ef4444',
  color: '#fff',
  padding: '0.5rem 1.2rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const buttonHover = {
  background: '#dc2626',
};
const hamburgerBtn = {
  background: 'none',
  border: 'none',
  color: '#1e293b',
  cursor: 'pointer',
  fontSize: 28,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50%',
  marginRight: 8,
  marginLeft: -4,
  width: 44,
  height: 44,
  justifyContent: 'center',
};

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
  
    Cookies.remove("adminAccessToken");
    Cookies.remove("adminAccessToken", { path: "/" });
    Cookies.remove("adminRefreshToken");
    Cookies.remove("adminRefreshToken", { path: "/" });
    
    if (!isMounted.current) return;
    setToastData({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
      variant: 'success',
      duration: 1500,
    });
    setTimeout(() => {
      if (isMounted.current) navigate('/admin');
    }, 1500);
  };

  return (
    <nav style={navStyles}>
      <div style={leftGroup}>
        {isMobile && !isSidebarOpen && (
          <button
            style={hamburgerBtn}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={28} />
          </button>
        )}
        <h1 style={titleStyles}>Admin Dashboard</h1>
      </div>
      <button
        style={hover ? { ...buttonBase, ...buttonHover } : buttonBase}
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Logout
      </button>
      {toastData && (
        <Toast
          {...toastData}
          onClose={() => setToastData(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;
