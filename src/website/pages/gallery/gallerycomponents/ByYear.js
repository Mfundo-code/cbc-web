import React, { useEffect, useState } from "react";
import { getGallery } from "../../../../global/api";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

function ByYear() {
  const [year, setYear] = useState(currentYear);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getGallery({ year })
      .then((res) => setPhotos(res.data.results || res.data))
      .catch(() => setPhotos([]));
  }, [year]);

  return (
    <div style={styles.panel}>
      <select style={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
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

export default ByYear;
