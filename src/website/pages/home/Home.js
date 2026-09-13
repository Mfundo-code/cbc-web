import React from "react";
import HeroBanner from "./homecomponents/HeroBanner";
import Highlights from "./homecomponents/Highlights";
import SeminaryApply from "./homecomponents/SeminaryApply";
import GalleryPromoSection from "./homecomponents/GalleryPromoSection";

function Home() {
  return (
    <div style={styles.page}>
      <HeroBanner />
      <Highlights />
      
      <GalleryPromoSection />
      <SeminaryApply />
    </div>
  );
}

const styles = {
  page: {
    // Contains the negative-margin overlap used by HeroBanner/Highlights
    // so it can't collapse into this wrapper or leak into whatever
    // renders above/below <Home /> in your app shell.
    overflow: "hidden",
    position: "relative",
  },
};

export default Home;