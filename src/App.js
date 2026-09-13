import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./global/Header";
import Footer from "./global/Footer";
import ScrollTop from "./global/ScrollTop";

import Home from "./website/pages/home/Home";
import PlanYourVisit from "./website/pages/plan-your-visit/PlanYourVisit";
import About from "./website/pages/about/About";
import Church from "./website/pages/church/Church";
import Seminary from "./website/pages/seminary/Seminary";
import Missions from "./website/pages/missions/Missions";
import Sermons from "./website/pages/sermons/Sermons";
import Gallery from "./website/pages/gallery/Gallery";
import PersonalGrowth from "./website/pages/personal-growth/PersonalGrowth";
import Updates from "./website/pages/updates/Updates";
import Donate from "./website/pages/donate/Donate";

// The entire admin experience — login, dashboard, and every management
// page — lives under src/admin and is mounted here as one router.
// There is no separate "AdminApp" wrapper; this is the only App.js.
import AdminRoutes from "./admin/AdminRoutes";
import { FileViewerProvider } from "./global/FileViewerContext";

function App() {
  return (
    <FileViewerProvider>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {/* Admin portal has its own layout, no public Header/Footer */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Public website */}
          <Route
            path="/*"
            element={
              <div style={styles.siteWrapper}>
                <Header />
                <main style={styles.main}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/plan-your-visit" element={<PlanYourVisit />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/church" element={<Church />} />
                    <Route path="/seminary" element={<Seminary />} />
                    <Route path="/missions" element={<Missions />} />
                    <Route path="/sermons" element={<Sermons />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/personal-growth" element={<PersonalGrowth />} />
                    <Route path="/updates" element={<Updates />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route
                      path="*"
                      element={<div style={styles.notFound}>Page not found.</div>}
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FileViewerProvider>
  );
}

const styles = {
  siteWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#222",
  },
  main: {
    flex: 1,
    width: "100%",
  },
  notFound: {
    padding: "4rem 2rem",
    textAlign: "center",
    fontSize: "1.2rem",
  },
};

export default App;
