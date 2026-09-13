import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resourceConfig } from "../config/resourceConfig";
import DataTable from "../components/DataTable";
import ResourceFormModal from "../components/ResourceFormModal";
import ConfirmDialog from "../components/ConfirmDialog";

function ResourceList() {
  const { resourceKey } = useParams();
  const config = resourceConfig[resourceKey];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    config.api
      .list()
      .then((res) => setRows(res.data.results || res.data))
      .catch(() => setLoadError("Couldn't load this list. Please try again."))
      .finally(() => setLoading(false));
  }, [config]);

  useEffect(() => {
    load();
    setEditing(null);
    setDeleteTarget(null);
  }, [resourceKey, load]);

  const handleSubmit = (values) => {
    setSaving(true);
    setFormError(null);
    const isEdit = editing && editing.id;
    const action = isEdit ? config.api.update(editing.id, values) : config.api.create(values);
    action
      .then(() => {
        setEditing(null);
        load();
      })
      .catch((err) => {
        const data = err.response?.data;
        const message =
          (data && typeof data === "object" && Object.values(data)[0]) ||
          "Something went wrong saving this. Please check the fields and try again.";
        setFormError(Array.isArray(message) ? message[0] : String(message));
      })
      .finally(() => setSaving(false));
  };

  const handleDelete = () => {
    setDeleting(true);
    config.api
      .remove(deleteTarget.id)
      .then(() => {
        setDeleteTarget(null);
        load();
      })
      .catch(() => setLoadError("Couldn't delete this item. Please try again."))
      .finally(() => setDeleting(false));
  };

  if (!config) {
    return <p>Unknown section.</p>;
  }

  return (
    <div>
      <div style={styles.headerRow}>
        <p style={styles.count}>
          {loading ? "Loading…" : `${rows.length} ${rows.length === 1 ? config.singular : config.label}`}
        </p>
        {config.allowCreate !== false && (
          <button style={styles.addBtn} onClick={() => setEditing({})}>
            + Add {config.singular}
          </button>
        )}
      </div>

      {loadError && <p style={styles.error}>{loadError}</p>}

      {!loading && (
        <DataTable
          columns={config.columns}
          rows={rows}
          emptyMessage={config.emptyMessage}
          getRowKey={(r) => r.id}
          onEdit={(row) => setEditing(row)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      )}

      {editing && (
        <ResourceFormModal
          resourceKey={resourceKey}
          record={editing.id ? editing : null}
          onClose={() => {
            setEditing(null);
            setFormError(null);
          }}
          onSubmit={handleSubmit}
          busy={saving}
          errorMessage={formError}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        message="This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        busy={deleting}
      />
    </div>
  );
}

const styles = {
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  count: { color: "#51606f", fontSize: "0.9rem", margin: 0 },
  addBtn: {
    padding: "0.6rem 1.1rem",
    backgroundColor: "#c9a227",
    color: "#1f2d3d",
    border: "none",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "0.88rem",
    cursor: "pointer",
  },
  error: { color: "#a33333", marginBottom: "1rem" },
};

export default ResourceList;
