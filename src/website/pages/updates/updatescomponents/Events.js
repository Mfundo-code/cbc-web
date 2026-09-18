import React, { useEffect, useState } from "react";
import { getEvents } from "../../../../global/api";

const PAGE_SIZE = 3;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Events() {
  const [when, setWhen] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    setShowAll(false);
    getEvents(when)
      .then((res) => setEvents(res.data.results || res.data))
      .catch(() => setEvents([]));
  }, [when]);

  const visibleEvents = showAll ? events : events.slice(0, PAGE_SIZE);

  return (
    <section style={styles.section}>
      <div style={styles.intro}>
        <h2 style={styles.heading}>Events</h2>
        <p style={styles.subtext}>What's coming up, and what we've been part of.</p>
      </div>

      <div style={styles.toggle}>
        <button
          style={{ ...styles.toggleBtn, ...(when === "upcoming" ? styles.toggleBtnActive : {}) }}
          onClick={() => setWhen("upcoming")}
        >
          Upcoming
        </button>
        <button
          style={{ ...styles.toggleBtn, ...(when === "past" ? styles.toggleBtnActive : {}) }}
          onClick={() => setWhen("past")}
        >
          Past (Recaps)
        </button>
      </div>

      {visibleEvents.length > 0 ? (
        <div style={styles.grid}>
          {visibleEvents.map((ev) => (
            <div key={ev.id} style={styles.card}>
              {ev.cover_photo ? (
                <div style={styles.imageFrame}>
                  <img src={ev.cover_photo} alt={ev.title} style={styles.image} />
                </div>
              ) : (
                <div style={styles.imagePlaceholder}>
                  <span style={styles.placeholderText}>{ev.title.charAt(0)}</span>
                </div>
              )}
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{ev.title}</h3>
                <p style={styles.meta}>{formatDate(ev.event_date)}</p>
                {ev.location && <p style={styles.metaLocation}>{ev.location}</p>}
                <button style={styles.viewMoreBtn} onClick={() => setActiveEvent(ev)}>
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.empty}>
          {when === "upcoming" ? "Nothing on the calendar right now." : "No past events to show yet."}
        </p>
      )}

      {events.length > PAGE_SIZE && (
        <div style={styles.seeAllWrap}>
          <button style={styles.seeAllBtn} onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show less" : `See all events (${events.length})`}
          </button>
        </div>
      )}

      {activeEvent && <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />}
    </section>
  );
}

function EventModal({ event, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        {event.cover_photo && (
          <div style={styles.modalImageFrame}>
            <img src={event.cover_photo} alt={event.title} style={styles.modalImage} />
          </div>
        )}

        <div style={styles.modalBody}>
          <h3 style={styles.modalTitle}>{event.title}</h3>
          <p style={styles.meta}>{formatDate(event.event_date)}</p>
          {event.location && <p style={styles.metaLocation}>{event.location}</p>}
          {event.description && <p style={styles.modalText}>{event.description}</p>}

          {event.photos && event.photos.length > 0 && (
            <div style={styles.photoGrid}>
              {event.photos.map((p) => (
                <img key={p.id} src={p.image} alt={p.caption || event.title} style={styles.photoThumb} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {},
  intro: { textAlign: "center", marginBottom: "1.5rem" },
  heading: { color: "#1f2d3d", margin: "0 0 0.5rem", fontSize: "1.6rem" },
  subtext: { color: "#8a95a1", fontSize: "0.92rem" },

  toggle: { display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.75rem" },
  toggleBtn: {
    padding: "0.55rem 1.3rem",
    border: "1px solid #d7dce2",
    borderRadius: "20px",
    background: "#fff",
    color: "#51606f",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  toggleBtnActive: { backgroundColor: "#1f2d3d", color: "#fff", borderColor: "#1f2d3d" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.4rem",
  },
  card: {
    backgroundColor: "#fff",
    border: "1px solid #e7eaee",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 14px rgba(31,45,61,0.04)",
  },

  // Pamphlets/flyers keep their full aspect ratio — no crop, no zoom.
  imageFrame: {
    width: "100%",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    maxHeight: "360px",
    objectFit: "contain",
    display: "block",
  },
  imagePlaceholder: {
    width: "100%",
    height: "140px",
    backgroundColor: "#1f2d3d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: { color: "#c9a227", fontSize: "2rem", fontWeight: 800 },

  cardBody: { padding: "1.1rem 1.2rem 1.3rem", display: "flex", flexDirection: "column", flex: 1 },
  cardTitle: { color: "#1f2d3d", margin: "0 0 0.35rem", fontSize: "1.02rem" },
  meta: { color: "#51606f", fontSize: "0.85rem", margin: "0 0 0.15rem", fontWeight: 600 },
  metaLocation: { color: "#8a95a1", fontSize: "0.82rem", margin: "0 0 0.8rem" },
  text: { color: "#444", fontSize: "0.9rem", lineHeight: 1.5 },
  empty: { color: "#8a95a1", fontSize: "0.92rem", textAlign: "center", padding: "2rem 0" },

  viewMoreBtn: {
    marginTop: "auto",
    alignSelf: "flex-start",
    backgroundColor: "#1f2d3d",
    color: "#fff",
    border: "none",
    padding: "0.55rem 1.2rem",
    borderRadius: "20px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
  },

  seeAllWrap: { display: "flex", justifyContent: "center", marginTop: "1.75rem" },
  seeAllBtn: {
    backgroundColor: "#fff",
    color: "#1f2d3d",
    border: "1.5px solid #c9a227",
    padding: "0.65rem 1.6rem",
    borderRadius: "24px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 32, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 300,
    padding: "1.5rem",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    width: "min(640px, 100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: "0.75rem",
    right: "0.9rem",
    background: "rgba(15,23,32,0.55)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "34px",
    height: "34px",
    fontSize: "1.3rem",
    lineHeight: 1,
    cursor: "pointer",
    zIndex: 1,
  },
  modalImageFrame: {
    width: "100%",
    backgroundColor: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
  },
  modalImage: { width: "100%", height: "auto", objectFit: "contain", display: "block" },
  modalBody: { padding: "1.75rem" },
  modalTitle: { margin: "0 0 0.4rem", color: "#1f2d3d", fontSize: "1.3rem" },
  modalText: { color: "#444", lineHeight: 1.6, whiteSpace: "pre-wrap", marginTop: "1rem" },
  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: "0.5rem",
    marginTop: "1.2rem",
  },
  photoThumb: { width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px" },
};

export default Events;