import React, { useState } from "react";
import mammoth from "mammoth";
import html2pdf from "html2pdf.js";
import { useFileViewer } from "./FileViewerContext";

/**
 * Every document link on the site — PDF or .docx — opens inline in the
 * app's viewer modal (see FileViewerContext), never a new tab.
 *
 * Both PDFs and converted .docx files are always loaded as a blob: URL
 * before being handed to the <iframe>. This matters: Django sets
 * X-Frame-Options on every response (including served media files), and
 * since the backend runs on a different origin than the frontend in dev
 * (localhost:8000 vs localhost:3000), the browser refuses to frame the
 * raw file URL directly — that's the "localhost refused to connect"
 * error. A blob: URL is always same-origin to the page that created it,
 * so that header never applies to it. No backend change needed.
 *
 * npm install mammoth html2pdf.js
 */

export const isDocxFile = (url = "") => /\.docx($|\?)/i.test(url);

export async function convertDocxUrlToPdfBlob(fileUrl) {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch the document (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

  // Render into an off-screen container so html2pdf has real DOM to rasterize.
  const container = document.createElement("div");
  container.innerHTML = html;
  Object.assign(container.style, {
    padding: "32px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#222",
  });

  const pdfBlob = await html2pdf()
    .from(container)
    .set({
      margin: 10,
      filename: "document.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    })
    .outputPdf("blob");

  return pdfBlob;
}

async function fetchAsBlob(fileUrl) {
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch the document (${response.status})`);
  }
  return response.blob();
}

function fileNameFromUrl(url = "") {
  try {
    const clean = url.split("?")[0];
    return decodeURIComponent(clean.split("/").pop()) || "Document";
  } catch {
    return "Document";
  }
}

/**
 * Drop-in replacement for a plain <a href={file}> link. Clicking it never
 * leaves the page and never gets blocked by X-Frame-Options:
 * - PDFs: fetched as a blob, then opened in the in-app viewer modal.
 * - .docx files: converted to a PDF blob first, then opened the same way.
 * - If fetching/conversion fails, falls back to a normal download.
 */
function FileViewerLink({ file, children, style, className }) {
  const { openFile } = useFileViewer();
  const [status, setStatus] = useState("idle"); // idle | loading | error

  if (!file) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const blob = isDocxFile(file) ? await convertDocxUrlToPdfBlob(file) : await fetchAsBlob(file);
      const blobUrl = URL.createObjectURL(blob);
      const title = fileNameFromUrl(file).replace(/\.docx$/i, "");
      openFile(blobUrl, title, true);
    } catch (err) {
      // Fall back to a normal download so the user isn't stuck.
      const link = document.createElement("a");
      link.href = file;
      link.download = fileNameFromUrl(file);
      link.click();
    } finally {
      setStatus("idle");
    }
  };

  return (
    <a href={file} onClick={handleClick} style={style} className={className}>
      {status === "loading" ? "Opening…" : children}
    </a>
  );
}

/**
 * Actual save-as download of the ORIGINAL file (no PDF conversion — if
 * it's a .docx application form, the person downloading it needs the
 * editable Word doc, not a flattened PDF). Fetches it as a blob first so
 * the `download` attribute is honored reliably even when the file is
 * served from a different origin than the frontend (browsers ignore
 * `download` on cross-origin URLs, but always honor it on a blob: URL).
 */
export function FileDownloadButton({ file, children, style, className }) {
  const [status, setStatus] = useState("idle"); // idle | loading

  if (!file) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const blob = await fetchAsBlob(file);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileNameFromUrl(file);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Last-resort fallback: let the browser try to handle it directly.
      window.open(file, "_blank", "noopener,noreferrer");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <a href={file} onClick={handleClick} style={style} className={className}>
      {status === "loading" ? "Downloading…" : children}
    </a>
  );
}

export default FileViewerLink;