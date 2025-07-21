import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllStrategiesApi } from "../features/customdata/custAuthentication";

export function Stretegies() {
  const dispatch = useDispatch();
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);
  // Modal state
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const fetchStrategies = async (pageNum = page, size = pageSize) => {
    setLoading(true);
    setError("");
    console.log("Fetching strategies with params:", { page: pageNum, page_size: size });
    try {
      const action = await dispatch(getAllStrategiesApi({ page: pageNum, page_size: size }));
      const res = action.payload;
      console.log("API response:", res);
      console.log("res.data type:", Array.isArray(res?.data), res?.data);
      const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
      if (arr.length > 0) {
        setStrategies(arr);
        const meta = res.meta || {};
        setTotalItems(typeof meta.total_items === 'number' ? meta.total_items : arr.length);
        setTotalPages(typeof meta.total_pages === 'number' ? meta.total_pages : 1);
        setPage(typeof meta.current_page === 'number' ? meta.current_page : 1);
        setPageSize(typeof meta.page_size === 'number' ? meta.page_size : size);
        console.log("Set strategies:", arr);
        console.log("Meta:", meta);
      } else {
        setStrategies([]);
        setError(res?.message || "Failed to fetch strategies");
        console.log("API error (not array or empty):", res?.message || res);
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch strategies");
      console.log("Caught error in fetchStrategies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect: page, pageSize", { page, pageSize });
    fetchStrategies(page, pageSize);
    // eslint-disable-next-line
  }, [page, pageSize]);

  useEffect(() => {
    setPageSizeInput(pageSize);
  }, [pageSize]);

  useEffect(() => {
    console.log("Current state:", {
      strategies,
      loading,
      error,
      page,
      pageSize,
      totalPages,
      totalItems
    });
  }, [strategies, loading, error, page, pageSize, totalPages, totalItems]);

  // Modal close handler
  const closeModal = () => setSelectedStrategy(null);

  return (
    <div style={{  minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 28 }}>All Strategies</div>
          <button
            onClick={() => fetchStrategies(page, pageSize)}
            style={{ minWidth: 120, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", margin: 40 }}>
            <div style={{ width: 36, height: 36, border: '4px solid #eee', borderTop: '4px solid #1976d2', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <div style={{ marginTop: 12, color: "#888" }}>Loading strategies...</div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ color: "#d32f2f", textAlign: "center", margin: 40 }}>{error}</div>
        ) : strategies.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", margin: 40 }}>
            No strategies found.
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              marginTop: 12
            }}>
              {strategies.map((s) => (
                <div
                  key={s.id}
                  style={{
                    minHeight: 180,
                    maxHeight: 180,
                    height: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#fafbfc',
                    borderRadius: 12,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    padding: 20,
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={() => setSelectedStrategy(s)}
                >
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 8 }}>{s.name}</div>
                    <div
                      style={{
                        color: '#666',
                        fontSize: 16,
                        marginBottom: 12,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}
                      title={s.description}
                    >
                      {s.description}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
                    <div>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 12px',
                        borderRadius: 8,
                        background: s.is_active ? '#e0f7fa' : '#ffebee',
                        color: s.is_active ? '#00796b' : '#d32f2f',
                        fontWeight: 600,
                        fontSize: 14,
                        marginRight: 8
                      }}>{s.is_active ? 'Active' : 'Inactive'}</span>
                      <span style={{ color: '#888', fontSize: 13 }}>
                        {new Date(s.created_at).toLocaleDateString()} {new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", color: "#888", marginTop: 8 }}>
              {totalItems > 0
                ? `Showing ${Math.min(strategies.length + (page - 1) * pageSize, totalItems)} of ${totalItems} strategies`
                : `Showing ${strategies.length} strategies`}
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
          </>
        )}
      </div>
      {/* Modal for strategy details */}
      {selectedStrategy && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
              padding: 40,
              minWidth: 420,
              maxWidth: 700,
              minHeight: 220,
              width: '95vw',
              maxHeight: '80vh',
              position: 'relative',
              cursor: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'transparent',
                border: 'none',
                fontSize: 26,
                color: '#888',
                cursor: 'pointer',
                fontWeight: 700,
                zIndex: 2,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{
              overflowY: 'auto',
              maxHeight: 'calc(80vh - 60px)',
              paddingRight: 8,
              flex: 1,
            }}>
              <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 12 }}>{selectedStrategy.name}</div>
              <div style={{ color: '#666', fontSize: 17, marginBottom: 20, whiteSpace: 'pre-line' }}>{selectedStrategy.description}</div>
              <div style={{ marginBottom: 12 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 12px',
                  borderRadius: 8,
                  background: selectedStrategy.is_active ? '#e0f7fa' : '#ffebee',
                  color: selectedStrategy.is_active ? '#00796b' : '#d32f2f',
                  fontWeight: 600,
                  fontSize: 15,
                  marginRight: 8
                }}>{selectedStrategy.is_active ? 'Active' : 'Inactive'}</span>
                <span style={{ color: '#888', fontSize: 14 }}>
                  {new Date(selectedStrategy.created_at).toLocaleDateString()} {new Date(selectedStrategy.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {/* Show more details if available */}
              {selectedStrategy.details && (
                <div style={{ marginTop: 20, color: '#444', fontSize: 16 }}>
                  <b>Details:</b> {selectedStrategy.details}
                </div>
              )}
              {/* You can add more fields here as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
