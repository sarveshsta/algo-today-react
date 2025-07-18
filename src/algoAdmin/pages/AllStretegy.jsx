import React, { useEffect, useState } from "react";
import { getAllStrategies } from "../routes/apiRoutes";
import styles from "./CreateStretegy.module.css";

export function AllStretegy() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSizeInput, setPageSizeInput] = useState(pageSize);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div className={styles.cardTitle} style={{ fontSize: 28 }}>All Strategies</div>
          <button className={styles.addConditionBtn} onClick={() => fetchStrategies(page, pageSize)} style={{ minWidth: 120 }}>Refresh</button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", margin: 40 }}>
            <div className={styles.loader} />
            <div style={{ marginTop: 12, color: "#888" }}>Loading strategies...</div>
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
                <div key={s.id} className={styles.card} style={{ minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 8 }}>{s.name}</div>
                    <div style={{ color: '#666', fontSize: 16, marginBottom: 12 }}>{s.description}</div>
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
    </div>
  );
}
