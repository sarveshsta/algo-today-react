
import { useState, useRef, useEffect } from "react";
import { createplans } from '../routes/apiRoutes';
import Toast from '../components/Toast.jsx';
import styles from './CreateStretegy.module.css';

const defaultForm = {
  name: '',
  description: '',
  price: '',
  duration_type: 'monthly',
  duration_value: '',
  features: '', // comma separated
  is_active: true,
  razorpay_plan_id: '',
};

export  function Plans() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isMounted.current) return;
    setLoading(true);
    setToastData(null);
    // Prepare features as array
    const payload = {
      ...form,
      price: parseFloat(form.price),
      duration_value: parseInt(form.duration_value, 10),
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
    };
    try {
      const res = await createplans(payload);
      if (!isMounted.current) return;
      if (res?.success === true  ) {
        setToastData({
          title: 'Success',
          description: res.message || 'Subscription created successfully',
          variant: 'success',
          duration: 3000,
        });
        setForm(defaultForm);
      } else {
        setToastData({
          title: 'Error',
          description: res?.message || 'Failed to create plan',
          variant: 'error',
          duration: 3000,
        });
      }
    } catch (err) {
      if (!isMounted.current) return;
      setToastData({
        title: 'Error',
        description: err?.message || 'Failed to create plan',
        variant: 'error',
        duration: 3000,
      });
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topInputs}>
          <div className={styles.inputGroup} style={{ flex: 1 }}>
            <label className={styles.inputLabel}>Plan Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter plan name"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.inputGroup} style={{ flex: 1 }}>
            <label className={styles.inputLabel}>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className={styles.inputField}
              required
            />
          </div>
        </div>
        <form className={styles.formGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Price (INR)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Duration Type</label>
            <select
              name="duration_type"
              value={form.duration_type}
              onChange={handleChange}
              className={styles.inputField}
              required
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="days">Days</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Duration Value </label>
            <input
              type="number"
              name="duration_value"
              min="1"
              value={form.duration_value}
              onChange={handleChange}
              placeholder="Enter duration in days"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Features (comma separated)</label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="e.g. Unlimited access, Priority support"
              className={styles.inputField}
              required
            />
          </div>
          {/* Removed is_active checkbox as requested */}
          <div className={styles.inputGroup} style={{ gridColumn: '2 / 3' }}>
            <label className={styles.inputLabel}>Razorpay Plan ID</label>
            <input
              type="text"
              name="razorpay_plan_id"
              value={form.razorpay_plan_id}
              onChange={handleChange}
              placeholder="Enter Razorpay Plan ID"
              className={styles.inputField}
              required
            />
          </div>
          <div style={{ gridColumn: '1 / 3', display: 'flex', gap: 16, marginTop: 24, justifyContent: 'center' }}>
            <button type="submit" className={styles.amountBtn} disabled={loading}>
              {loading ? 'Creating...' : 'Create Plan'}
            </button>
            <button type="button" className={styles.paperBtn} onClick={() => setForm(defaultForm)} disabled={loading}>
              Reset
            </button>
            {loading && <div className={styles.loader}>Loading...</div>}
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
}
