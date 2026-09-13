import React, { useEffect, useState } from "react";
import { getEvents, getGallery } from "../../../../global/api";

function ByEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data.results || res.data))
      .catch(() => setEvents([]));
  }, []);

  useEffect(() => {
    if (!selectedEvent) {
      setPhotos([]);
      return;
    }
    getGallery({ event: selectedEvent })
      .then((res) => setPhotos(res.data.results || res.data))
      .catch(() => setPhotos([]));
  }, [selectedEvent]);

  return (
    <div style={styles.panel}>
      <select
        style={styles.select}
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">Choose an event...</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.title}
          </option>
        ))}
      </select>
      <div style={styles.grid}>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.image} alt={photo.caption} style={styles.photo} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  panel: { padding: "1rem 0" },
  select: { padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "0.8rem",
  },
  photo: { width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" },
};

export default ByEvent;
