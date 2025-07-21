import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import algoIcon from "../assests/algo.svg"
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiStockFill } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa";
import { TbTopologyStar } from 'react-icons/tb'; 
import { MdManageAccounts } from "react-icons/md";
const SIDEBAR_WIDTH = 256;

const sidebarBaseStyles = {
  width: SIDEBAR_WIDTH,
  height: 'inherit',
  background: '#3498DB',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 40,
  transition: 'transform 0.3s',
  position: 'static',
  borderTopRightRadius: 32,
};
const sidebarFixed = {
  position: 'fixed',
  top: 0,
  left: 0,
  transform: 'translateX(0)',
};
const sidebarHidden = {
  transform: 'translateX(-100%)',
};
const sidebarHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1.2rem 1rem 1.2rem 1.2rem',
  minHeight: 64,
  position: 'relative',
};
const radiantLine = {
  position: 'absolute',
  left: '10%',
  right: '10%',
  bottom: 0,
  height: 2,
  background: 'linear-gradient(to right, transparent, #fff 60%, transparent)',
  borderRadius: 2,
  pointerEvents: 'none',
};
const sidebarTitle = {
  fontSize: '1.5rem',
  fontWeight: 600,
  letterSpacing: '0.02em',
  marginLeft: 8,
};
const closeBtnStyles = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 24,
  marginRight: 8,
  marginLeft: -4,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
};
const navStyles = {
  marginTop: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'auto',
  flex: 1,
};
const linkBase = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',

  borderRadius: '0.5rem',
  fontWeight: 500,
  fontSize: '1rem',
  color: '#fffffff0',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s',
};
const linkActive = {
  background: 'linear-gradient(90deg, #fff -60%, #3498DB 40%)',
  color: '#fff',
  boxShadow: '0 2px 8px 0 rgba(52,152,219,0.10)',
};
const linkHover = {
  background: 'linear-gradient(90deg, rgba(227,240,252,0.2) 0%, rgba(52,152,219,0.2) 50%, transparent 50%, transparent 100%)',
  color: '#fff',
  boxShadow: '0 2px 8px 0 rgba(52,152,219,0.05)',
};
const iconWrapper = {
  
  marginLeft:12,
marginBottom:8,
  fontSize: 22,
  height: 32,
  width: 32,
};
const backdropStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',
  zIndex: 30,
};

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const [hovered, setHovered] = React.useState(null);

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
    // eslint-disable-next-line
  }, [isMobile]);

  const navItems = [
    
    { name: "Users", path: "/admin/users", icon: <span role="img" aria-label="users"><FaUsers /></span> },
    { name: "Strategies", path: "/adminstrategies", icon: <span role="img" aria-label="strategies"><RiStockFill /></span> },
    { name: "User Subscriptions", path: "/subscriptions", icon: <span role="img" aria-label="subscriptions"><FaMoneyBillTrendUp /></span> },
    { name: "Create Stretegy", path: "/createStretegy", icon: <span role="img" aria-label="CreateStretegy"><TbTopologyStar  style={{ fontWeight: "bold" }} /></span> },
    { name: "Create Plans", path: "/plans", icon: <span role="img" aria-label="plans"><FaLayerGroup style={{ fontWeight: "bold" }} /></span> },
    { name: "Manage Plans", path: "/manageplans", icon: <span role="img" aria-label="plans"><MdManageAccounts style={{ fontWeight: "bold" }} /></span> },
  ];

  return (
    <>
      {/* Sidebar */}
      {(!isMobile || isOpen) && (
        <aside
          style={{
            ...sidebarBaseStyles,
            ...(isMobile ? sidebarFixed : { position: 'static' }),
            ...(isMobile && !isOpen ? sidebarHidden : {}),
          }}
        >
          <div style={sidebarHeader}>
            {isMobile && isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar"
                style={closeBtnStyles}
              >
                <X size={24} />
              </button>
            )}
            <img src={algoIcon} alt="Algo Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
            <span style={sidebarTitle}>Algo Admin</span>
            <div style={radiantLine} />
          </div>
          <nav style={navStyles}>
            {navItems.map((item, idx) => (
              <NavLink
                key={item.name}
                to={item.path}
                style={({ isActive }) => ({
                  ...linkBase,
                  ...(isActive ? linkActive : {}),
                  ...(hovered === idx && !isActive ? linkHover : {}),
                  display: 'flex',
                  alignItems: 'center',
                })}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span style={iconWrapper}>
                  {item.icon}
                </span>
                <span style={{lineHeight: 1}}>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div
          style={backdropStyles}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
