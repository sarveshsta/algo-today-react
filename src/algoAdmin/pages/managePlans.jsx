import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlans, updatePlanStatus } from "../routes/apiRoutes";
import styles from "./ManagePlans.module.css";
import { showToast } from "../../utility";


export function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // plan id for which action is loading
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getAllPlans()
      .then((res) => {
        if (isMounted) {
          setPlans(res?.results || res || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError("Failed to fetch plans");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [refresh]);

  // Integrate activate/deactivate API
  const handleStatusChange = async (plan, is_active) => {
    setActionLoading(plan.id);
    try {
      const res = await updatePlanStatus(plan.id, is_active);
      if (res && res.success === true) {
        setPlans((prev) =>
          prev.map((p) =>
            p.id === plan.id ? { ...p, is_active } : p
          )
        );
      } else {
        showToast("Error", "Failed to update plan status", "error");
      }
    } catch (err) {
      showToast("Error", "Failed to update plan status", "error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Manage Plans</div>
          <button className={styles.addBtn} onClick={() => navigate("/plans")}>+ Add Plan</button>
        </div>
        {/* Error toast handled, no inline error */}
        {loading ? (
          <div style={{ textAlign: "center", margin: 40 }}>Loading...</div>
        ) : plans.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", margin: 40 }}>No plans found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.98rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>Price</th>
                  <th style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>Duration</th>
                  <th style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.7rem 1rem', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, idx) => (
                  <tr key={plan.id || idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f1f1', fontWeight: 600 }}>{plan.name}</td>
                    <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f1f1' }}>₹{plan.price}</td>
                    <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f1f1' }}>{plan.duration_type} ({plan.duration_value})</td>
                    <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f1f1' }}>
                      <span className={plan.is_active ? styles.status : `${styles.status} ${styles.inactive}`}>{plan.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td style={{ padding: '0.7rem 1rem', borderBottom: '1px solid #f1f1f1' }}>
                      {plan.is_active ? (
                        <button
                          className={styles.deactivateBtn}
                          disabled={actionLoading === plan.id}
                          onClick={() => handleStatusChange(plan, false)}
                        >
                          {actionLoading === plan.id ? 'Updating...' : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          className={styles.activateBtn}
                          disabled={actionLoading === plan.id}
                          onClick={() => handleStatusChange(plan, true)}
                        >
                          {actionLoading === plan.id ? 'Updating...' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
