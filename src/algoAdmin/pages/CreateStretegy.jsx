
import React, { useState, useRef, useEffect } from "react";
import { createStrategy } from "../routes/apiRoutes";
import styles from "./CreateStretegy.module.css";
import Modal from "../../components/Modal";

// Responsive helper: merge className with optional extra
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}


// Define the pre-condition types with backend keys and labels
const PRE_CONDITION_TYPES = [
  { value: "ohlc_vs_ohlc", label: "OHLC Compare" },
  { value: "ohlc_vs_indicator", label: "OHLC With Indicator" },
  { value: "indicator_vs_indicator", label: "Indicator vs Indicator" },
  { value: "indicator_vs_value", label: "Single Indicator" },
];

// Helper: get summary string for each type
function getSummary(type, data) {
  if (!data) return null;
  switch (type) {
    case "ohlc_vs_ohlc":
      return `${data.left_multiplier || 1} OHLC ${data.left_ohlc || "OHLC"} ${
        data.left_offset || 1
      } ${data.operator || ">"} ${data.right_multiplier || 1} OHLC ${
        data.right_ohlc || "OHLC"
      } ${data.right_offset || 1}`;
    case "ohlc_vs_indicator":
      return `${data.left_multiplier || 1} OHLC ${data.left_ohlc || "OHLC"} ${
        data.left_offset || 1
      } ${data.operator || ">"} ${data.right_indicator || "Indicator"} ${
        data.right_factor || 1
      } (${data.right_candle_count || 1})`;
    case "indicator_vs_indicator":
      return `${data.left_indicator || "Indicator"} ${data.left_factor || 1} (${
        data.left_candle_count || 1
      }) ${data.operator || ">"} ${data.right_indicator || "Indicator"} ${
        data.right_factor || 1
      } (${data.right_candle_count || 1})`;
    case "indicator_vs_value":
      return `${data.left_indicator || "Indicator"} ${data.left_factor || 1} (${
        data.left_candle_count || 1
      }) ${data.operator || ">"} ${data.constant_value || 1}`;
    default:
      return null;
  }
}

function PreConditionFields({ type, value, onSave, onCancel }) {
  // Ensure operator is set to default if not present in value.fields
  const getInitialForm = () => {
    const f = value.fields || {};
    // For all types that use operator, set default if not present
    if ((type === 'ohlc_vs_ohlc' || type === 'ohlc_vs_indicator' || type === 'indicator_vs_indicator' || type === 'indicator_vs_value') && !f.operator) {
      return { ...f, operator: '>' };
    }
    return f;
  };
  const [form, setForm] = useState(getInitialForm());
  return (
    <div style={{ margin: "16px 0" }}>
      {/* Fields for each type */}
      {type === "ohlc_vs_ohlc" && (
        <>
          <input
            type="number"
            step="0.01"
            placeholder="Multiplier"
            value={form.left_multiplier || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_multiplier: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          />
          <select
            value={form.left_ohlc || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_ohlc: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option value="" disabled>
              Select OHLC
            </option>
            <option value="Open">Open</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Close">Close</option>
          </select>
          <select
            value={form.left_offset || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_offset: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option value="" disabled>
              Candle Offset
            </option>
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select value={form.operator} onChange={e => setForm(f => ({ ...f, operator: e.target.value }))} className={styles.inputField} style={{ width: 170, marginRight: 8 }}>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">&gt;</option>
            <option value=">=">&gt;=</option>
            <option value="==">==</option>
            <option value="!=">!=</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Multiplier"
            value={form.right_multiplier || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_multiplier: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          />
          <select
            value={form.right_ohlc || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_ohlc: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option value="" disabled>
              Select OHLC
            </option>
            <option value="Open">Open</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Close">Close</option>
          </select>
          <select
            value={form.right_offset || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_offset: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option value="" disabled>
              Candle Offset
            </option>
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      )}
      {type === "ohlc_vs_indicator" && (
        <>
          <input
            type="number"
            step="0.01"
            placeholder="Multiplier"
            value={form.left_multiplier || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_multiplier: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          />
          <select
            value={form.left_ohlc || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_ohlc: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option value="" disabled>
              Select OHLC
            </option>
            <option value="Open">Open</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Close">Close</option>
          </select>
          <select
            value={form.left_offset || 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_offset: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 170, marginRight: 8 }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select value={form.operator} onChange={e => setForm(f => ({ ...f, operator: e.target.value }))} className={styles.inputField} style={{ width: 170, marginRight: 8 }}>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">&gt;</option>
            <option value=">=">&gt;=</option>
            <option value="==">==</option>
            <option value="!=">!=</option>
          </select>
          <select
            value={form.right_indicator || "Select Indicator"}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_indicator: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 220, marginRight: 8 }}
          >
            <option>Select Indicator</option>
            <option>RSI</option>
            <option>EMA</option>
            <option>SMA</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Factor"
            value={form.right_factor || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_factor: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 200, marginRight: 8 }}
          />
          <select
            value={form.right_candle_count || 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_candle_count: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 120, marginRight: 8 }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>14</option>
            <option>9</option>
          </select>
        </>
      )}
      {type === "indicator_vs_indicator" && (
        <>
          <select
            value={form.left_indicator || "Select Indicator"}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_indicator: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 220, marginRight: 8 }}
          >
            <option>Select Indicator</option>
            <option>RSI</option>
            <option>EMA</option>
            <option>SMA</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Factor"
            value={form.left_factor || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_factor: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 200, marginRight: 8 }}
          />
          <select
            value={form.left_candle_count || 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_candle_count: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 120, marginRight: 8 }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>14</option>
            <option>9</option>
          </select>
          <select value={form.operator} onChange={e => setForm(f => ({ ...f, operator: e.target.value }))} className={styles.inputField} style={{ width: 170, marginRight: 8 }}>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">&gt;</option>
            <option value=">=">&gt;=</option>
            <option value="==">==</option>
            <option value="!=">!=</option>
          </select>
          <select
            value={form.right_indicator || "Select Indicator"}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_indicator: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 220, marginRight: 8 }}
          >
            <option>Select Indicator</option>
            <option>RSI</option>
            <option>EMA</option>
            <option>SMA</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Factor"
            value={form.right_factor || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_factor: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 200, marginRight: 8 }}
          />
          <select
            value={form.right_candle_count || 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, right_candle_count: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 120, marginRight: 8 }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>14</option>
            <option>9</option>
          </select>
        </>
      )}
      {type === "indicator_vs_value" && (
        <>
          <select
            value={form.left_indicator || "Select Indicator"}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_indicator: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 220, marginRight: 8 }}
          >
            <option>Select Indicator</option>
            <option>RSI</option>
            <option>EMA</option>
            <option>SMA</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Factor"
            value={form.left_factor || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_factor: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 200, marginRight: 8 }}
          />
          <select
            value={form.left_candle_count || 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, left_candle_count: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 120, marginRight: 8 }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>14</option>
            <option>9</option>
          </select>
          <select value={form.operator} onChange={e => setForm(f => ({ ...f, operator: e.target.value }))} className={styles.inputField} style={{ width: 170, marginRight: 8 }}>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">&gt;</option>
            <option value=">=">&gt;=</option>
            <option value="==">==</option>
            <option value="!=">!=</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Constant Value"
            value={form.constant_value || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, constant_value: e.target.value }))
            }
            className={styles.inputField}
            style={{ width: 200, marginRight: 8 }}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          gap: 12,
          margin: "12px 0",
          justifyContent: "flex-end",
        }}
      >
        <button
          className={styles.submitBtn}
          style={{ marginRight: 8 }}
          onClick={() => onSave(form)}
        >
          Save
        </button>
        <button className={styles.addBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function PreConditionGroup({
  value,
  onTypeSelect,
  onAdd,
  onSave,
  onCancel,
  onDelete,
  canDelete,
  showLogic,
  logicType,
  onLogicClick,
  showFields,
  summary,
}) {
  // Disable checkboxes only if fields are being shown or summary exists
  const disableCheckboxes = showFields || !!summary;
  // Only show Remove button if not yet saved (no summary)
  const showRemove = canDelete && !summary;
  // Disable Submit button unless a type is selected and not yet saved
  const disableSubmit = !value.type || !!summary;
  return (
    <div style={{ marginBottom: 24 }}>
      {showLogic && (
        <div className={styles.logicBtns}>
          <button
            className={
              logicType === "AND"
                ? `${styles.logicBtn} ${styles.logicBtnActive}`
                : styles.logicBtn
            }
            onClick={() => onLogicClick("AND")}
            type="button"
          >
            AND
          </button>
          <button
            className={
              logicType === "OR"
                ? `${styles.logicBtn} ${styles.logicBtnActive}`
                : styles.logicBtn
            }
            onClick={() => onLogicClick("OR")}
            type="button"
          >
            OR
          </button>
        </div>
      )}
      <div className={styles.card}>
        {/* Type selection (checkboxes) */}
        <div className={styles.radioGroup + " " + styles.checkboxGrid}>
          {PRE_CONDITION_TYPES.map((opt) => (
            <label className={styles.blueCheckbox} key={opt.value}>
              <input
                type="checkbox"
                checked={value.type === opt.value}
                onChange={() => onTypeSelect(opt.value)}
                disabled={disableCheckboxes && value.type !== opt.value}
              />{" "}
              {opt.label}
            </label>
          ))}
        </div>
        {/* Add button */}
        {!showFields && !summary && value.type && (
          <div className={styles.addConditionWrapper}>
            <button
              onClick={onAdd}
              type="button"
              className={styles.addConditionBtn}
            >
              Add
            </button>
          </div>
        )}
        {/* Fields */}
        {showFields && value.type && (
          <PreConditionFields
            type={value.type}
            value={value}
            onSave={onSave}
            onCancel={onCancel}
          />
        )}
        {/* Summary */}
        {summary && !showFields && (
          <div style={{ marginTop: 12 }}>
            <span style={{ color: "#ff6600", fontWeight: 600, fontSize: 18 }}>
              {summary}
            </span>
            <button
              onClick={onAdd}
              style={{
                marginLeft: 16,
                background: "#fff3e0",
                color: "#ff6600",
                border: "1px solid #ff6600",
                borderRadius: 8,
                padding: "4px 12px",
                fontWeight: 600,
              }}
            >
              Edit
            </button>
          </div>
        )}
        {/* Remove button (only for unsaved/adding) */}
        {showRemove && (
          <button
            type="button"
            onClick={onDelete}
            style={{
              marginLeft: 8,
              background: "#ffebee",
              color: "#d32f2f",
              border: "1px solid #d32f2f",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 600,
              marginTop: 12,
            }}
            title="Remove this condition"
          >
            🗑️ Remove
          </button>
        )}
      </div>
    </div>
  );
}

export function CreateStretegy() {
  const [strategyName, setStrategyName] = useState("");
  const [description, setDescription] = useState("");
  const [buyPreGroups, setBuyPreGroups] = useState([
    { id: 1, type: "", fields: null, showFields: false, summary: null },
  ]);
  const [buyLogic, setBuyLogic] = useState([]); // e.g. ["AND", "OR"]
  const [sellPreGroups, setSellPreGroups] = useState([
    { id: 1, type: "", fields: null, showFields: false, summary: null },
  ]);
  const [sellLogic, setSellLogic] = useState([]);
  const [buyValue, setBuyValue] = useState("");
  const [sellValue, setSellValue] = useState("");
  const [target, setTarget] = useState("");
  const [targetType, setTargetType] = useState("Points");
  const [stopLoss, setStopLoss] = useState("");
  const [stopLossType, setStopLossType] = useState("Points");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "buy" or "sell"
  const [modalIdx, setModalIdx] = useState(null);
  const [modalConditionType, setModalConditionType] = useState("");
  const [modalFields, setModalFields] = useState({});

  // Add state for buy/sell condition type and modal
  const [buyConditionType, setBuyConditionType] = useState(""); // 'spot' or 'ohlc_vs_ltp'
  const [buySpotValue, setBuySpotValue] = useState("");
  const [buyOhlcLtpFields, setBuyOhlcLtpFields] = useState({
    operator: "",
    left_ohlc: "",
    left_multiplier: "",
    left_candle_offset: "",
  });
  const [buyOhlcLtpModalOpen, setBuyOhlcLtpModalOpen] = useState(false);

  const [sellConditionType, setSellConditionType] = useState("");
  const [sellSpotValue, setSellSpotValue] = useState("");
  const [sellOhlcLtpFields, setSellOhlcLtpFields] = useState({
    operator: "",
    left_ohlc: "",
    left_multiplier: "",
    left_candle_offset: "",
  });
  const [sellOhlcLtpModalOpen, setSellOhlcLtpModalOpen] = useState(false);

  // Add state for summary of buy/sell condition
  const [buyConditionSummary, setBuyConditionSummary] = useState(null);
  const [sellConditionSummary, setSellConditionSummary] = useState(null);

  // Open modal for pre-condition
  const openPreConditionModal = (type, idx, conditionType, fields = {}) => {
    setModalType(type);
    setModalIdx(idx);
    setModalConditionType(conditionType);
    setModalFields(fields || {});
    setModalOpen(true);
  };

  // Handlers for buying
  const handleBuyTypeSelect = (idx, type) => {
    setBuyPreGroups((groups) =>
      groups.map((g, i) =>
        i === idx ? { ...g, type: g.type === type ? "" : type } : g
      )
    );
  };
  const handleBuyAdd = (idx) => {
    setBuyPreGroups((groups) =>
      groups.map((g, i) => (i === idx ? { ...g, showFields: true } : g))
    );
  };
  const handleBuySave = (idx, fields) => {
    setBuyPreGroups((groups) =>
      groups.map((g, i) =>
        i === idx
          ? {
              ...g,
              fields,
              showFields: false,
              summary: getSummary(g.type, fields),
            }
          : g
      )
    );
  };
  const handleBuyCancel = (idx) => {
    setBuyPreGroups((groups) =>
      groups.map((g, i) => {
        if (i !== idx) return g;
        if (g.fields && g.summary) {
          // If already saved, just hide fields (return to summary view)
          return { ...g, showFields: false };
        } else {
          // If not saved, reset type and fields
          return {
            ...g,
            showFields: false,
            type: "",
            fields: null,
            summary: null,
          };
        }
      })
    );
  };
  const handleBuyEdit = (idx) => {
    setBuyPreGroups((groups) =>
      groups.map((g, i) => (i === idx ? { ...g, showFields: true } : g))
    );
  };
  const handleBuyAddCondition = () => {
    setBuyPreGroups((groups) => [
      ...groups,
      {
        id: Date.now(),
        type: "",
        fields: null,
        showFields: false,
        summary: null,
      },
    ]);
    setBuyLogic((logics) => [...logics, "AND"]);
  };
  const handleBuyLogicClick = (idx, logic) => {
    setBuyLogic((logics) => logics.map((l, i) => (i === idx ? logic : l)));
  };
  const handleBuyDelete = (idx) => {
    setBuyPreGroups((groups) => groups.filter((_, i) => i !== idx));
    setBuyLogic((logics) => logics.filter((_, i) => i !== idx - 1));
  };

  // Handlers for selling (same as buying)
  const handleSellTypeSelect = (idx, type) => {
    setSellPreGroups((groups) =>
      groups.map((g, i) =>
        i === idx ? { ...g, type: g.type === type ? "" : type } : g
      )
    );
  };
  const handleSellAdd = (idx) => {
    setSellPreGroups((groups) =>
      groups.map((g, i) => (i === idx ? { ...g, showFields: true } : g))
    );
  };
  const handleSellSave = (idx, fields) => {
    setSellPreGroups((groups) =>
      groups.map((g, i) =>
        i === idx
          ? {
              ...g,
              fields,
              showFields: false,
              summary: getSummary(g.type, fields),
            }
          : g
      )
    );
  };
  const handleSellCancel = (idx) => {
    setSellPreGroups((groups) =>
      groups.map((g, i) => {
        if (i !== idx) return g;
        if (g.fields && g.summary) {
          return { ...g, showFields: false };
        } else {
          return {
            ...g,
            showFields: false,
            type: "",
            fields: null,
            summary: null,
          };
        }
      })
    );
  };
  const handleSellEdit = (idx) => {
    setSellPreGroups((groups) =>
      groups.map((g, i) => (i === idx ? { ...g, showFields: true } : g))
    );
  };
  const handleSellAddCondition = () => {
    setSellPreGroups((groups) => [
      ...groups,
      {
        id: Date.now(),
        type: "",
        fields: null,
        showFields: false,
        summary: null,
      },
    ]);
    setSellLogic((logics) => [...logics, "AND"]);
  };
  const handleSellLogicClick = (idx, logic) => {
    setSellLogic((logics) => logics.map((l, i) => (i === idx ? logic : l)));
  };
  const handleSellDelete = (idx) => {
    setSellPreGroups((groups) => groups.filter((_, i) => i !== idx));
    setSellLogic((logics) => logics.filter((_, i) => i !== idx - 1));
  };

  // Helper to build the payload as per user structure
  const buildPayload = () => {
    const conditions = [];

    // Helper to map fields to payload for each type, using exact key names from the provided example
    function mapFieldsToPayload(type, fields) {
      if (!fields) return {};
      switch (type) {
        case "ohlc_vs_ohlc":
          return {
            comparison_type: "ohlc_vs_ohlc",
            operator: fields.operator,
            left_ohlc: fields.left_ohlc
              ? fields.left_ohlc.toLowerCase()
              : undefined,
            left_multiplier: fields.left_multiplier
              ? parseFloat(fields.left_multiplier)
              : 1,
            left_candle_offset: fields.left_offset
              ? parseInt(fields.left_offset)
              : 1,
            right_ohlc: fields.right_ohlc
              ? fields.right_ohlc.toLowerCase()
              : undefined,
            right_multiplier: fields.right_multiplier
              ? parseFloat(fields.right_multiplier)
              : 1,
            right_candle_offset: fields.right_offset
              ? parseInt(fields.right_offset)
              : 1,
          };
        case "ohlc_vs_indicator":
          return {
            comparison_type: "ohlc_vs_indicator",
            operator: fields.operator,
            left_ohlc: fields.left_ohlc
              ? fields.left_ohlc.toLowerCase()
              : undefined,
            left_multiplier: fields.left_multiplier
              ? parseFloat(fields.left_multiplier)
              : 1,
            left_candle_offset: fields.left_offset
              ? parseInt(fields.left_offset)
              : 1,
            right_indicator: fields.right_indicator
              ? fields.right_indicator.toLowerCase()
              : undefined,
            right_factor: fields.right_factor
              ? parseFloat(fields.right_factor)
              : 1,
            right_candle_count: fields.right_candle_count
              ? parseInt(fields.right_candle_count)
              : 1,
          };
        case "indicator_vs_indicator":
          return {
            comparison_type: "indicator_vs_indicator",
            operator: fields.operator,
            left_indicator: fields.left_indicator
              ? fields.left_indicator.toLowerCase()
              : undefined,
            left_factor: fields.left_factor
              ? parseFloat(fields.left_factor)
              : 1,
            left_candle_count: fields.left_candle_count
              ? parseInt(fields.left_candle_count)
              : 1,
            right_indicator: fields.right_indicator
              ? fields.right_indicator.toLowerCase()
              : undefined,
            right_factor: fields.right_factor
              ? parseFloat(fields.right_factor)
              : 1,
            right_candle_count: fields.right_candle_count
              ? parseInt(fields.right_candle_count)
              : 1,
          };
        case "indicator_vs_value":
          return {
            comparison_type: "indicator_vs_value",
            operator: fields.operator,
            left_indicator: fields.left_indicator
              ? fields.left_indicator.toLowerCase()
              : undefined,
            left_factor: fields.left_factor
              ? parseFloat(fields.left_factor)
              : 1,
            left_candle_count: fields.left_candle_count
              ? parseInt(fields.left_candle_count)
              : 1,
            constant_value: fields.constant_value
              ? parseFloat(fields.constant_value)
              : 0,
          };
        default:
          return {};
      }
    }

    // Buying pre-conditions
    buyPreGroups.forEach((group, idx) => {
      if (group.type && group.fields) {
        const cond = {
          type: "pre_buy",
          ...mapFieldsToPayload(group.type, group.fields),
        };
        if (idx < buyPreGroups.length - 1) {
          cond.logic_operator = buyLogic[idx];
        }
        conditions.push(cond);
      }
    });

    // Buying Condition (right side)
    if (buyConditionType === "spot") {
      conditions.push({ type: "buy", comparison_type: "spot" });
    } else if (
      buyConditionType === "ohlc_vs_ltp" &&
      buyOhlcLtpFields.operator &&
      buyOhlcLtpFields.left_ohlc
    ) {
      conditions.push({
        type: "buy",
        comparison_type: "ohlc_vs_ltp",
        operator: buyOhlcLtpFields.operator,
        left_ohlc: buyOhlcLtpFields.left_ohlc
          ? buyOhlcLtpFields.left_ohlc.toLowerCase()
          : undefined,
        left_multiplier: buyOhlcLtpFields.left_multiplier
          ? parseFloat(buyOhlcLtpFields.left_multiplier)
          : 1,
        left_candle_offset: buyOhlcLtpFields.left_candle_offset
          ? parseInt(buyOhlcLtpFields.left_candle_offset)
          : 1,
      });
    }

    // Selling pre-conditions
    sellPreGroups.forEach((group, idx) => {
      if (group.type && group.fields) {
        const cond = {
          type: "pre_sell",
          ...mapFieldsToPayload(group.type, group.fields),
        };
        if (idx < sellPreGroups.length - 1) {
          cond.logic_operator = sellLogic[idx];
        }
        conditions.push(cond);
      }
    });

    // Selling Condition (right side)
    if (sellConditionType === "spot") {
      conditions.push({ type: "sell", comparison_type: "spot" });
    } else if (
      sellConditionType === "ohlc_vs_ltp" &&
      sellOhlcLtpFields.operator &&
      sellOhlcLtpFields.left_ohlc
    ) {
      conditions.push({
        type: "sell",
        comparison_type: "ohlc_vs_ltp",
        operator: sellOhlcLtpFields.operator,
        left_ohlc: sellOhlcLtpFields.left_ohlc
          ? sellOhlcLtpFields.left_ohlc.toLowerCase()
          : undefined,
        left_multiplier: sellOhlcLtpFields.left_multiplier
          ? parseFloat(sellOhlcLtpFields.left_multiplier)
          : 1,
        left_candle_offset: sellOhlcLtpFields.left_candle_offset
          ? parseInt(sellOhlcLtpFields.left_candle_offset)
          : 1,
      });
    }

    // Target
    if (target) {
      conditions.push({
        type: "target",
        value_type: targetType.toLowerCase(),
        sl_tp_value: parseFloat(target),
      });
    }
    // Stop Loss
    if (stopLoss) {
      conditions.push({
        type: "stop_loss",
        value_type: stopLossType.toLowerCase(),
        sl_tp_value: parseFloat(stopLoss),
      });
    }
    return {
      name: strategyName,
      description,
      conditions,
    };
  };

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!isMounted.current) return;
    const payload = buildPayload();
    console.log("Sending payload:", JSON.stringify(payload, null, 2));
    try {
      const response = await createStrategy(payload);
      if (!isMounted.current) return;
      console.log("Strategy created:", response);
      
    } catch (error) {
      if (!isMounted.current) return;
      console.error("Error creating strategy:", error);
 
    }
  };

  // Check if at least one group in each section is saved
  const canSubmit =
    buyPreGroups.some((g) => g.summary) && sellPreGroups.some((g) => g.summary);

  // Reset handler
  const handleReset = () => {
    setStrategyName("");
    setDescription("");
    setBuyPreGroups([
      { id: 1, type: "", fields: null, showFields: false, summary: null },
    ]);
    setBuyLogic([]);
    setSellPreGroups([
      { id: 1, type: "", fields: null, showFields: false, summary: null },
    ]);
    setSellLogic([]);
    setBuyValue("");
    setSellValue("");
    setTarget("");
    setTargetType("Points");
    setStopLoss("");
    setStopLossType("Points");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Strategy Name and Description */}
        <div className={styles.topInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Strategy Name</label>
            <input
              type="text"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              placeholder="Enter strategy name"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup} style={{ flex: 2 }}>
            <label className={styles.inputLabel}>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className={styles.inputField}
            />
          </div>
        </div>

        {/* Main Form Grid */}
        <div className={styles.formGrid}>
          {/* Left: Pre Conditions */}
          <div>
            {/* Buying Pre Conditions */}
            <div className={styles.card}>
              <div className={styles.cardTitle}> Pre Buying Conditions</div>
              {buyPreGroups.map((group, idx) => (
                <PreConditionGroup
                  key={group.id}
                  value={group}
                  onTypeSelect={(type) => handleBuyTypeSelect(idx, type)}
                  onAdd={() =>
                    openPreConditionModal("buy", idx, group.type, group.fields)
                  }
                  onSave={(fields) => handleBuySave(idx, fields)}
                  onCancel={() => handleBuyCancel(idx)}
                  onEdit={() =>
                    openPreConditionModal("buy", idx, group.type, group.fields)
                  }
                  onDelete={() => handleBuyDelete(idx)}
                  canDelete={buyPreGroups.length > 1 && idx > 0}
                  showLogic={idx > 0}
                  logicType={buyLogic[idx - 1]}
                  onLogicClick={(logic) => handleBuyLogicClick(idx - 1, logic)}
                  showFields={false} // Always false, handled by modal
                  summary={group.summary}
                />
              ))}
              {/* Add Condition button for Buying */}
              <div className={styles.addConditionWrapper}>
                <button
                  onClick={() => handleBuyAddCondition()}
                  type="button"
                  className={styles.addConditionBtn}
                >
                  + Add Condition
                </button>
              </div>
            </div>
            {/* Selling Pre Conditions */}
            <div className={styles.card}>
              <div className={styles.cardTitle}> Pre Selling Conditions</div>
              {sellPreGroups.map((group, idx) => (
                <PreConditionGroup
                  key={group.id}
                  value={group}
                  onTypeSelect={(type) => handleSellTypeSelect(idx, type)}
                  onAdd={() =>
                    openPreConditionModal("sell", idx, group.type, group.fields)
                  }
                  onSave={(fields) => handleSellSave(idx, fields)}
                  onCancel={() => handleSellCancel(idx)}
                  onEdit={() =>
                    openPreConditionModal("sell", idx, group.type, group.fields)
                  }
                  onDelete={() => handleSellDelete(idx)}
                  canDelete={sellPreGroups.length > 1 && idx > 0}
                  showLogic={idx > 0}
                  logicType={sellLogic[idx - 1]}
                  onLogicClick={(logic) => handleSellLogicClick(idx - 1, logic)}
                  showFields={false} // Always false, handled by modal
                  summary={group.summary}
                />
              ))}
              {/* Add Condition button for Selling */}
              <div className={styles.addConditionWrapper}>
                <button
                  onClick={() => handleSellAddCondition()}
                  type="button"
                  className={styles.addConditionBtn}
                >
                  + Add Condition
                </button>
              </div>
            </div>
          </div>
          {/* Right: Value Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Buying Value */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Buying Condition</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <label className={styles.blueCheckbox}>
                  <input
                    type="checkbox"
                    checked={buyConditionType === "spot"}
                    onChange={() => {
                      setBuyConditionType(
                        buyConditionType === "spot" ? "" : "spot"
                      );
                      setBuyOhlcLtpModalOpen(false);
                    }}
                  />{" "}
                  Spot
                </label>
                <label className={styles.blueCheckbox}>
                  <input
                    type="checkbox"
                    checked={buyConditionType === "ohlc_vs_ltp"}
                    onChange={() => {
                      setBuyConditionType(
                        buyConditionType === "ohlc_vs_ltp" ? "" : "ohlc_vs_ltp"
                      );
                      setBuyOhlcLtpModalOpen(
                        buyConditionType !== "ohlc_vs_ltp"
                      );
                    }}
                  />{" "}
                  OHLC vs LTP
                </label>
              </div>
              {buyConditionType === "spot" && null}
              {buyConditionType === "ohlc_vs_ltp" && buyConditionSummary && (
                <div style={{ marginTop: 12 }}>
                  <span
                    style={{ color: "#ff6600", fontWeight: 600, fontSize: 18 }}
                  >
                    {buyConditionSummary}
                  </span>
                  <button
                    onClick={() => setBuyOhlcLtpModalOpen(true)}
                    style={{
                      marginLeft: 16,
                      background: "#fff3e0",
                      color: "#ff6600",
                      border: "1px solid #ff6600",
                      borderRadius: 8,
                      padding: "4px 12px",
                      fontWeight: 600,
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            {/* Selling Value */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>Selling Condition</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <label className={styles.blueCheckbox}>
                  <input
                    type="checkbox"
                    checked={sellConditionType === "spot"}
                    onChange={() => {
                      setSellConditionType(
                        sellConditionType === "spot" ? "" : "spot"
                      );
                      setSellOhlcLtpModalOpen(false);
                    }}
                  />{" "}
                  Spot
                </label>
                <label className={styles.blueCheckbox}>
                  <input
                    type="checkbox"
                    checked={sellConditionType === "ohlc_vs_ltp"}
                    onChange={() => {
                      setSellConditionType(
                        sellConditionType === "ohlc_vs_ltp" ? "" : "ohlc_vs_ltp"
                      );
                      setSellOhlcLtpModalOpen(
                        sellConditionType !== "ohlc_vs_ltp"
                      );
                    }}
                  />{" "}
                  OHLC vs LTP
                </label>
              </div>
              {sellConditionType === "spot" && null}
              {sellConditionType === "ohlc_vs_ltp" && sellConditionSummary && (
                <div style={{ marginTop: 12 }}>
                  <span
                    style={{ color: "#ff6600", fontWeight: 600, fontSize: 18 }}
                  >
                    {sellConditionSummary}
                  </span>
                  <button
                    onClick={() => setSellOhlcLtpModalOpen(true)}
                    style={{
                      marginLeft: 16,
                      background: "#fff3e0",
                      color: "#ff6600",
                      border: "1px solid #ff6600",
                      borderRadius: 8,
                      padding: "4px 12px",
                      fontWeight: 600,
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Target and Stop Loss */}
        <div className={styles.targetStopWrapper}>
          <div className={styles.targetStopCard}>
            <div className={styles.targetStopLabel}>Target</div>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter Target"
              className={styles.targetStopInput}
            />
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className={styles.targetStopSelect}
            >
              <option>Points</option>
              <option>Percent</option>
            </select>
          </div>
          <div className={styles.targetStopCard}>
            <div className={styles.targetStopLabel} style={{ minWidth: 80 }}>
              Stop Loss
            </div>
            <input
              type="text"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="Enter Target"
              className={styles.targetStopInput}
            />
            <select
              value={stopLossType}
              onChange={(e) => setStopLossType(e.target.value)}
              className={styles.targetStopSelect}
            >
              <option>Points</option>
              <option>Percent</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionBtns}>
          <button
            onClick={handleSubmit}
            className={styles.amountBtn}
            disabled={!canSubmit}
          >
            Save Strategy
          </button>
          <button className={styles.paperBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {/* Modal for PreConditionFields */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          // Reset the selected type for pre-buying/selling when modal is closed
          if (modalType === "buy") {
            setBuyPreGroups((groups) =>
              groups.map((g, i) =>
                i === modalIdx
                  ? { ...g, type: "", fields: null, summary: null }
                  : g
              )
            );
          } else if (modalType === "sell") {
            setSellPreGroups((groups) =>
              groups.map((g, i) =>
                i === modalIdx
                  ? { ...g, type: "", fields: null, summary: null }
                  : g
              )
            );
          }
        }}
      >
        {modalConditionType && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Modal heading based on selected checkbox */}
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                marginBottom: 18,
                color: "#222",
              }}
            >
              {(() => {
                const found = PRE_CONDITION_TYPES.find(
                  (opt) => opt.value === modalConditionType
                );
                return found
                  ? `${
                      modalType === "buy" ? "Pre Buying" : "Pre Selling"
                    } Condition: ${found.label}`
                  : "";
              })()}
            </div>
            <PreConditionFields
              type={modalConditionType}
              value={{ fields: modalFields }}
              onSave={(fields) => {
                if (modalType === "buy") handleBuySave(modalIdx, fields);
                else handleSellSave(modalIdx, fields);
                setModalOpen(false);
              }}
              onCancel={() => {
                setModalOpen(false);
                // Reset the selected type for pre-buying/selling when Cancel is clicked
                if (modalType === "buy") {
                  setBuyPreGroups((groups) =>
                    groups.map((g, i) =>
                      i === modalIdx
                        ? { ...g, type: "", fields: null, summary: null }
                        : g
                    )
                  );
                } else if (modalType === "sell") {
                  setSellPreGroups((groups) =>
                    groups.map((g, i) =>
                      i === modalIdx
                        ? { ...g, type: "", fields: null, summary: null }
                        : g
                    )
                  );
                }
              }}
            />
          </div>
        )}
      </Modal>
      {/* Modal for OHLC vs LTP */}
      <Modal
        isOpen={buyOhlcLtpModalOpen}
        onClose={() => {
          setBuyOhlcLtpModalOpen(false);
          setBuyConditionType("");
        }}
      >
        <div style={{ minWidth: 400 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 18,
              color: "#222",
            }}
          >
            OHLC vs LTP Condition
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <input
              type="number"
              step="0.01"
              placeholder="Multiplier"
              value={
                buyOhlcLtpFields.left_multiplier === ""
                  ? 1
                  : buyOhlcLtpFields.left_multiplier
              }
              onChange={(e) =>
                setBuyOhlcLtpFields((f) => ({
                  ...f,
                  left_multiplier: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            />
            <select
              value={buyOhlcLtpFields.left_ohlc}
              onChange={(e) =>
                setBuyOhlcLtpFields((f) => ({
                  ...f,
                  left_ohlc: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="" disabled>
                Select OHLC
              </option>
              <option value="Open">Open</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Close">Close</option>
            </select>
            <select
              value={buyOhlcLtpFields.left_candle_offset}
              onChange={(e) =>
                setBuyOhlcLtpFields((f) => ({
                  ...f,
                  left_candle_offset: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="" disabled>
                Candle Offset
              </option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={buyOhlcLtpFields.operator}
              onChange={(e) =>
                setBuyOhlcLtpFields((f) => ({ ...f, operator: e.target.value }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <button
              className={styles.submitBtn}
              onClick={() => {
                setBuyOhlcLtpModalOpen(false);
                setBuyConditionSummary(
                  `${buyOhlcLtpFields.left_multiplier || 1} ${
                    buyOhlcLtpFields.left_ohlc || "OHLC"
                  } ${buyOhlcLtpFields.left_candle_offset || 1} ${
                    buyOhlcLtpFields.operator || ">"
                  }`
                );
              }}
            >
              Save
            </button>
            <button
              className={styles.addBtn}
              onClick={() => setBuyOhlcLtpModalOpen(false)}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal for OHLC vs LTP */}
      <Modal
        isOpen={sellOhlcLtpModalOpen}
        onClose={() => {
          setSellOhlcLtpModalOpen(false);
          setSellConditionType("");
        }}
      >
        <div style={{ minWidth: 400 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 18,
              color: "#222",
            }}
          >
            OHLC vs LTP Condition
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <input
              type="number"
              step="0.01"
              placeholder="Multiplier"
              value={
                sellOhlcLtpFields.left_multiplier === ""
                  ? 1
                  : sellOhlcLtpFields.left_multiplier
              }
              onChange={(e) =>
                setSellOhlcLtpFields((f) => ({
                  ...f,
                  left_multiplier: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            />
            <select
              value={sellOhlcLtpFields.left_ohlc}
              onChange={(e) =>
                setSellOhlcLtpFields((f) => ({
                  ...f,
                  left_ohlc: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="" disabled>
                Select OHLC
              </option>
              <option value="Open">Open</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Close">Close</option>
            </select>
            <select
              value={sellOhlcLtpFields.left_candle_offset}
              onChange={(e) =>
                setSellOhlcLtpFields((f) => ({
                  ...f,
                  left_candle_offset: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="" disabled>
                Candle Offset
              </option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={sellOhlcLtpFields.operator}
              onChange={(e) =>
                setSellOhlcLtpFields((f) => ({
                  ...f,
                  operator: e.target.value,
                }))
              }
              className={styles.inputField}
              style={{ width: 160 }}
            >
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <button
              className={styles.submitBtn}
              onClick={() => {
                setSellOhlcLtpModalOpen(false);
                setSellConditionSummary(
                  `${sellOhlcLtpFields.left_multiplier || 1} ${
                    sellOhlcLtpFields.left_ohlc || "OHLC"
                  } ${sellOhlcLtpFields.left_candle_offset || 1} ${
                    sellOhlcLtpFields.operator || ">"
                  }`
                );
              }}
            >
              Save
            </button>
            <button
              className={styles.addBtn}
              onClick={() => setSellOhlcLtpModalOpen(false)}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
