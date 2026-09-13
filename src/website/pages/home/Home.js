import React from "react";
import HeroBanner from "./homecomponents/HeroBanner";
import Highlights from "./homecomponents/Highlights";
import SeminaryApply from "./homecomponents/SeminaryApply";

function Home() {
  return (
    <div style={styles.page}>
      <HeroBanner />
      <Highlights />
      <SeminaryApply />
    </div>
  );
}

const styles = {
  page: {},
};

export default Home;