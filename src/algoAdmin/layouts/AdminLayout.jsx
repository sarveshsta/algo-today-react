import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const layoutStyles = {
  display: 'flex',
  minHeight: '100vh',
  overflowX: 'hidden',
  background: '#f8fafc',
};
const mainAreaStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};
const contentStyles = {
  padding: '1.5rem',
  flex: 1,
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={layoutStyles}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />
      <div style={mainAreaStyles}>
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
        <main style={contentStyles}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
