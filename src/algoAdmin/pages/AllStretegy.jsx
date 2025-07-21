import React, { useEffect, useState } from "react";
import { getAllStrategies } from "../routes/apiRoutes";
import styles from "./AllStretegy.module.css";

export function AllStretegy() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);
  // Modal state for strategy details
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const fetchStrategies = async (pageNum = page, size = pageSize) => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllStrategies(pageNum, size);
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setStrategies(res.data.data);
        // Use meta from response only
        const meta = res.meta || {};
        setTotalItems(typeof meta.total_items === 'number' ? meta.total_items : res.data.data.length);
        setTotalPages(typeof meta.total_pages === 'number' ? meta.total_pages : 1);
        setPage(typeof meta.current_page === 'number' ? meta.current_page : 1);
        setPageSize(typeof meta.page_size === 'number' ? meta.page_size : size);
      } else {
        setError(res?.data?.message || "Failed to fetch strategies");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch strategies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStrategies(page, pageSize);
    // eslint-disable-next-line
  }, [page, pageSize]);

  useEffect(() => {
    setPageSizeInput(pageSize);
  }, [pageSize]);

  // Modal close handler
  const closeModal = () => setSelectedStrategy(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div className={styles.cardTitle}>All Strategies</div>
          <button className={styles.addConditionBtn} onClick={() => fetchStrategies(page, pageSize)}>Refresh</button>
        </div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader} />
            <div className={styles.loadingText}>Loading strategies...</div>
          </div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : strategies.length === 0 ? (
          <div className={styles.noStrategies}>No strategies found.</div>
        ) : (
          <>
            <div className={styles.grid}>
              {strategies.map((s) => (
                <div
                  key={s.id}
                  className={styles.card}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedStrategy(s)}
                >
                  <div>
                    <div className={styles.cardName}>{s.name}</div>
                    <div className={styles.cardDescription}>{s.description}</div>
                  </div>
                  <div className={styles.cardFooter}>
                    <div>
                      <span className={s.is_active ? styles.active : styles.inactive}>
                        {s.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className={styles.cardDate}>
                        {new Date(s.created_at).toLocaleDateString()} {new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.showingText}>
              {totalItems > 0
                ? `Showing ${Math.min(strategies.length + (page - 1) * pageSize, totalItems)} of ${totalItems} strategies`
                : `Showing ${strategies.length} strategies`}
            </div>
            <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className={styles.paginationBtn + (page <= 1 ? ' ' + styles.disabled : '')}
                >
                  Previous
                </button>
                <span className={styles.pageNumber}>{page}</span>
                <span className={styles.totalPages}>/ {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className={styles.paginationBtn + (page >= totalPages ? ' ' + styles.disabled : '')}
                >
                  Next
                </button>
                <span className={styles.perPageLabel}>Per page:</span>
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
                  className={styles.pageSizeInput}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* Modal for strategy details */}
      {selectedStrategy && (
        <div
          style={{
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
