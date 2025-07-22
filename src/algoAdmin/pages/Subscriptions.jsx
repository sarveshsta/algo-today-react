import { useEffect, useState, useRef } from "react";
import { getAllSubsciptions } from '../routes/apiRoutes';
import Toast  from '../components/Toast.jsx';
import { ChevronDown } from 'lucide-react';

const DEFAULT_PAGE_SIZE = 5;

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


const Subscriptions = () => {
  const [subs, setSubs] = useState([]);
  const [totalSubs, setTotalSubs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageSizeInput, setPageSizeInput] = useState(DEFAULT_PAGE_SIZE);
  const [toastData, setToastData] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'pending'

  // Reset to first page on filter change
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const fetchSubs = async (pageNum = page, size = pageSize, filterType = filter) => {
    try {
      let extraParams = {};
      // Only two filters: 'all' and 'pending'
      if (filterType === 'pending') extraParams.status = 'pending';
      const response = await getAllSubsciptions(pageNum, size, extraParams);
      const apiData = response?.data?.data || [];
      const meta = response?.meta || response?.data?.meta || {};
      return {
        subsList: apiData,
        total: typeof meta.total_items === 'number' ? meta.total_items : apiData.length,
        totalPages: typeof meta.total_pages === 'number' ? meta.total_pages : 1,
        currentPage: typeof meta.current_page === 'number' ? meta.current_page : pageNum,
        pageSize: typeof meta.page_size === 'number' ? meta.page_size : size,
      };
    } catch (err) {
      return { subsList: [], total: 0, totalPages: 1, currentPage: 1, pageSize };
    }
  };

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    fetchSubs(page, pageSize, filter).then(({ subsList, total, totalPages, currentPage, pageSize }) => {
      if (!isMounted.current) return;
      setSubs(subsList);
      setTotalSubs(total);
      setTotalPages(totalPages);
      setPage(currentPage);
      setPageSize(pageSize);
    });
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [page, pageSize, filter]);

  useEffect(() => {
    setPageSizeInput(pageSize);
  }, [pageSize]);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Subscriptions Table</h2>

      {/* Filter Buttons */}
      <div style={filterRowStyle}>
        <button
          style={{
            ...filterBtnBase,
            ...(filter === 'all' ? filterBtnActive : {}),
          }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={{
            ...filterBtnBase,
            ...(filter === 'pending' ? filterBtnRed : {}),
          }}
          onClick={() => setFilter('pending')}
        >
         Pending
        </button>
      </div>

      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Razorpay Subscription ID</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Auto Renew</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Plan</th>
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  Loading or No Data
                </td>
              </tr>
            ) : (
              subs.map((sub, idx) => (
                <tr key={sub.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', fontSize: '0.97rem' }}>
                  <td style={tdStyle}>{sub.id}</td>
                  <td style={tdStyle}>{sub.razorpay_subscription_id}</td>
                  <td style={tdStyle}>{sub.status}</td>
                  <td style={tdStyle}>{sub.start_date ? new Date(sub.start_date).toLocaleString() : '-'}</td>
                  <td style={tdStyle}>{sub.end_date ? new Date(sub.end_date).toLocaleString() : '-'}</td>
                  <td style={tdStyle}>{sub.auto_renew ? 'Yes' : 'No'}</td>
                  <td style={tdStyle}>{sub.user_detail && sub.user_detail.name ? sub.user_detail.name : '-'}</td>
                  <td style={tdStyle}>{sub.plan_detail && sub.plan_detail.name ? sub.plan_detail.name : '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ textAlign: "right", color: "#888", marginTop: 8 }}>
          {totalSubs > 0
            ? `Showing ${Math.min(subs.length + (page - 1) * pageSize, totalSubs)} of ${totalSubs} subscriptions`
            : `Showing ${subs.length} subscriptions`}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: '16px 32px',
          }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: '1px solid #ddd',
                background: page <= 1 ? '#f5f5f5' : '#fff',
                color: page <= 1 ? '#bbb' : '#333',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                fontWeight: 500,
              }}
            >
              Previous
            </button>
            <span style={{ fontWeight: 600, fontSize: 16, margin: '0 8px' }}>{page}</span>
            <span style={{ color: '#888', fontSize: 14 }}>/ {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: '1px solid #ddd',
                background: page >= totalPages ? '#f5f5f5' : '#fff',
                color: page >= totalPages ? '#bbb' : '#333',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                marginLeft: 4,
              }}
            >
              Next
            </button>
            <span style={{ marginLeft: 16, color: '#888', fontSize: 14 }}>Per page:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={pageSizeInput}
              onChange={e => {
                let val = Number(e.target.value);
                if (val < 1) val = 1;
                if (val > 100) val = 100;
                setPageSizeInput(val);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setPageSize(pageSizeInput);
                  setPage(1);
                }
              }}
              style={{
                width: 60,
                padding: '6px 8px',
                borderRadius: 6,
                border: '1px solid #ddd',
                fontSize: 15,
                textAlign: 'center',
              }}
            />
          </div>
        </div>
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

export default Subscriptions;
