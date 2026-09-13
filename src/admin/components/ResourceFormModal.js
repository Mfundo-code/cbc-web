import React, { useEffect, useState } from "react";
import { resourceConfig } from "../config/resourceConfig";

function buildInitialValues(fields, record) {
  const values = {};
  fields.forEach((f) => {
    if (f.type === "file" || f.type === "image") {
      values[f.name] = null; // file inputs always start empty
      return;
    }
    if (record && record[f.name] !== undefined && record[f.name] !== null) {
      values[f.name] = record[f.name];
    } else {
      values[f.name] = f.type === "checkbox" ? Boolean(f.default) : f.default ?? "";
    }
  });
  return values;
}

function ResourceFormModal({ resourceKey, record, onClose, onSubmit, busy, errorMessage }) {
  const config = resourceConfig[resourceKey];
  const isEdit = Boolean(record);
  const [values, setValues] = useState(() => buildInitialValues(config.fields, record));
  const [relatedOptions, setRelatedOptions] = useState({});

  useEffect(() => {
    setValues(buildInitialValues(config.fields, record));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey, record]);

  useEffect(() => {
    config.fields
      .filter((f) => f.relatedResource)
      .forEach((f) => {
        const relatedConfig = resourceConfig[f.relatedResource];
        relatedConfig.api
          .list()
          .then((res) => {
            const data = res.data.results || res.data;
            setRelatedOptions((prev) => ({ ...prev, [f.name]: data }));
          })
          .catch(() => setRelatedOptions((prev) => ({ ...prev, [f.name]: [] })));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field.name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Drop nulls for untouched file fields on edit so we don't wipe existing files.
    const payload = { ...values };
    config.fields.forEach((f) => {
      if ((f.type === "file" || f.type === "image") && payload[f.name] === null) {
        delete payload[f.name];
      }
    });
    onSubmit(payload);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            {isEdit ? `Edit ${config.singular}` : `Add ${config.singular}`}
          </h3>
          <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {config.fields.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={(val) => handleChange(field, val)}
              options={field.relatedResource ? relatedOptions[field.name] : field.options}
            />
          ))}

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}

          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose} disabled={busy}>
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn} disabled={busy}>
              {busy ? "Saving…" : isEdit ? "Save changes" : `Add ${config.singular}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange, options }) {
  const disabled = Boolean(field.readOnly);

  if (field.type === "textarea") {
    return (
      <Field label={field.label} hint={field.hint}>
        <textarea
          style={styles.textarea}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        />
      </Field>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label style={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === "select" || field.relatedResource) {
    const opts = field.relatedResource
      ? (options || []).map((o) => ({
          value: o.id,
          label: o.title || o.name || `#${o.id}`,
        }))
      : field.options || [];
    return (
      <Field label={field.label} hint={field.hint}>
        <select
          style={styles.input}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          disabled={disabled}
        >
          <option value="">{field.relatedResource ? "None" : "Select..."}</option>
          {opts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  if (field.type === "file" || field.type === "image") {
    return (
      <Field label={field.label} hint={field.hint}>
        <input
          type="file"
          accept={field.type === "image" ? "image/*" : undefined}
          style={styles.input}
          onChange={(e) => onChange(e.target.files[0] || null)}
          required={field.required && !field.readOnly}
        />
      </Field>
    );
  }

  return (
    <Field label={field.label} hint={field.hint}>
      <input
        type={field.type === "url" ? "url" : field.type}
        style={styles.input}
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        disabled={disabled}
      />
    </Field>
  );
}

function Field({ label, hint, children }) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>{label}</span>
      {children}
      {hint && <span style={styles.hint}>{hint}</span>}
    </label>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 32, 0.45)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 200,
  },
  panel: {
    backgroundColor: "#fff",
    width: "min(480px, 100%)",
    height: "100%",
    overflowY: "auto",
    boxShadow: "-8px 0 24px rgba(0,0,0,0.12)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid #eceff2",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
  },
  title: { margin: 0, color: "#1f2d3d", fontSize: "1.15rem" },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    lineHeight: 1,
    cursor: "pointer",
    color: "#8a95a1",
  },
  form: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.35rem" },
  label: { fontSize: "0.85rem", fontWeight: 600, color: "#1f2d3d" },
  hint: { fontSize: "0.78rem", color: "#8a95a1" },
  input: {
    padding: "0.6rem 0.7rem",
    border: "1px solid #d7dce2",
    borderRadius: "6px",
    fontSize: "0.92rem",
    fontFamily: "inherit",
  },
  textarea: {
    padding: "0.6rem 0.7rem",
    border: "1px solid #d7dce2",
    borderRadius: "6px",
    fontSize: "0.92rem",
    minHeight: "100px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  checkboxRow: { display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.92rem", color: "#1f2d3d" },
  error: { color: "#a33333", fontSize: "0.88rem", margin: 0 },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.6rem",
    paddingTop: "0.5rem",
    borderTop: "1px solid #eceff2",
  },
  cancelBtn: {
    padding: "0.6rem 1.1rem",
    borderRadius: "6px",
    border: "1px solid #d7dce2",
    backgroundColor: "#fff",
    color: "#1f2d3d",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  saveBtn: {
    padding: "0.6rem 1.3rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default ResourceFormModal;
