import { useEffect, useState } from "react";
import { users as fetchUsersApi, updateUserStatus } from '../routes/apiRoutes';
import Toast  from '../components/Toast.jsx';
import { ChevronDown } from 'lucide-react';

const PAGE_SIZE = 5;

const containerStyle = {
  padding: '1.5rem',
};
const titleStyle = {
  fontSize: '1.3rem',
  fontWeight: 700,
  marginBottom: '0.75rem',
};
const filterRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1.5rem',
  marginBottom: '1rem',
};
const filterBtnBase = {
  padding: '0.4rem 1.1rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
  background: '#e5e7eb',
  color: '#222',
  transition: 'background 0.2s, color 0.2s',
};
const filterBtnActive = {
  background: '#2563eb',
  color: '#fff',
};
const filterBtnGreen = {
  background: '#22c55e',
  color: '#fff',
};
const filterBtnRed = {
  background: '#ef4444',
  color: '#fff',
};
const searchInputStyle = {
  border: '1px solid #d1d5db',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  width: '100%',
  maxWidth: 340,
  fontSize: '1rem',
  marginBottom: '1rem',
};
const cardStyle = {
  background: '#fff',
  borderRadius: '0.7rem',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)',
  padding: '1.5rem',
};
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.98rem',
};
const thStyle = {
  background: '#f3f4f6',
  textAlign: 'left',
  padding: '0.7rem 1rem',
  fontWeight: 600,
};
const tdStyle = {
  padding: '0.7rem 1rem',
  borderBottom: '1px solid #f1f1f1',
};
const statusActive = {
  background: '#bbf7d0',
  color: '#16a34a',
  borderRadius: '999px',
  padding: '0.2rem 0.9rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  display: 'inline-block',
};
const statusInactive = {
  background: '#fecaca',
  color: '#dc2626',
  borderRadius: '999px',
  padding: '0.2rem 0.9rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  display: 'inline-block',
};
const deleteBtnStyle = {
  background: '#ef4444',
  color: '#fff',
  padding: '0.3rem 0.9rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 500,
  fontSize: '0.98rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const deleteBtnHover = {
  background: '#dc2626',
};
const paginationRow = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '1.5rem',
  gap: '0.5rem',
};
const pageBtnBase = {
  padding: '0.4rem 1.1rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  cursor: 'pointer',
  background: '#e5e7eb',
  color: '#222',
  transition: 'background 0.2s, color 0.2s',
};
const pageBtnActive = {
  background: '#2563eb',
  color: '#fff',
};
const actionBtnStyle = {
  background: '#f3f4f6',
  color: '#222',
  border: '1px solid #d1d5db',
  borderRadius: '0.5rem',
  fontWeight: 500,
  fontSize: '0.98rem',
  cursor: 'pointer',
  padding: '0.3rem 1.1rem 0.3rem 0.9rem',
  minWidth: 110,
  height: 38,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  outline: 'none',
};
const dropdownMenuStyle = {
  position: 'absolute',
  top: 42,
  left: 0,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
  zIndex: 10,
  minWidth: 130,
  padding: '0.3rem 0',
};
const dropdownItemStyle = {
  padding: '0.5rem 1.2rem',
  fontSize: '0.97rem',
  color: '#222',
  background: 'none',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const dropdownItemHover = {
  background: '#f3f4f6',
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [searchQuery, setSearchQuery] = useState("");
  const [toastData, setToastData] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchUsers = async (page, filterType, query = "") => {
    const params = {
      page,
      page_size: PAGE_SIZE,
    };
    if (filterType === "active") params.is_active = true;
    if (filterType === "inactive") params.is_active = false;
    if (query.trim() !== "") params.search = query.trim();

    try {
      const response = await fetchUsersApi(params);
      const apiData = response?.data?.data || [];
      const meta = response?.meta || {};
      const usersList = apiData.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isactive: user.is_active,
        lastlogin: user.last_login ? new Date(user.last_login).toLocaleString() : '',
        is_superuser: user.is_superuser,
      }));
      return {
        usersList,
        total: meta.total_items || usersList.length,
        totalPages: meta.total_pages || 1,
        currentPage: meta.current_page || page,
      };
    } catch (err) {
      return { usersList: [], total: 0, totalPages: 1, currentPage: 1 };
    }
  };

  // Reset to first page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  useEffect(() => {
    fetchUsers(currentPage, filter, searchQuery).then(({ usersList, total, totalPages }) => {
      setUsers(usersList);
      setTotalUsers(total);
      setTotalPages(totalPages);
    });
  }, [currentPage, filter, searchQuery]);

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Handle activate/inactivate
  const handleStatusChange = async (userId, currentStatus) => {
    try {
      await updateUserStatus(userId, !currentStatus);
      setUsers((prev) => prev.map((user) =>
        user.id === userId ? { ...user, isactive: !currentStatus } : user
      ));
      setToastData({
        title: 'Success',
        description: `User status updated to ${!currentStatus ? 'Active' : 'Inactive'}.`,
        variant: 'success',
        duration: 2500,
      });
    } catch (err) {
      setToastData({
        title: 'Error',
        description: err.message || 'Failed to update user status.',
        variant: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>User Table</h2>

      {/* Filter Buttons */}
      <div style={filterRowStyle}>
        <button
          style={{
            ...filterBtnBase,
            ...(filter === 'all' ? filterBtnActive : {}),
          }}
          onClick={() => setFilter("all")}
        >
          All Users
        </button>
        <button
          style={{
            ...filterBtnBase,
            ...(filter === 'active' ? filterBtnGreen : {}),
          }}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          style={{
            ...filterBtnBase,
            ...(filter === 'inactive' ? filterBtnRed : {}),
          }}
          onClick={() => setFilter("inactive")}
        >
          Inactive
        </button>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.2rem' }}>
        <input
          type="text"
          placeholder="Search by username, name, email, phone..."
          style={searchInputStyle}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Active</th>
              <th style={thStyle}>Last Login</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  Loading or No Data
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', fontSize: '0.97rem' }}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>
                    <span style={user.isactive ? statusActive : statusInactive}>
                      {user.isactive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={tdStyle}>{user.lastlogin}</td>
                  <td style={tdStyle}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <button
                        style={actionBtnStyle}
                        onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                        tabIndex={0}
                        aria-haspopup="true"
                        aria-expanded={openDropdown === user.id}
                      >
                        Actions <ChevronDown size={18} style={{ marginLeft: 6 }} />
                      </button>
                      {openDropdown === user.id && (
                        <div style={dropdownMenuStyle} onMouseLeave={() => setOpenDropdown(null)}>
                          {user.isactive ? (
                            <button
                              style={dropdownItemStyle}
                              onClick={() => { setOpenDropdown(null); handleStatusChange(user.id, true); }}
                              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                              onMouseOut={e => e.currentTarget.style.background = 'none'}
                            >
                              Set Inactive
                            </button>
                          ) : (
                            <button
                              style={dropdownItemStyle}
                              onClick={() => { setOpenDropdown(null); handleStatusChange(user.id, false); }}
                              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                              onMouseOut={e => e.currentTarget.style.background = 'none'}
                            >
                              Set Active
                            </button>
                          )}
                          <button
                            style={dropdownItemStyle}
                            onClick={() => { setOpenDropdown(null); handleDelete(user.id); }}
                            onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseOut={e => e.currentTarget.style.background = 'none'}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={paginationRow}>
            <button
              style={pageBtnBase}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={
                  currentPage === i + 1
                    ? { ...pageBtnBase, ...pageBtnActive }
                    : pageBtnBase
                }
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button
              style={pageBtnBase}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
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

export default User;
