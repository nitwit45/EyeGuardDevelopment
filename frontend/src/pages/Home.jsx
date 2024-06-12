import React from "react";

import Footer from "../containers/footer/Footer";
import Blog from "../containers/blog/Blog";
import Features from "../containers/features/Features";
import Header from "../containers/header/Header";
import Possibility from "../containers/possibility/Possibility";
import WhatGPT3 from "../containers/whatGPT3/WhatGPT3";
import CTA from "../components/cta/CTA";
import Brand from "../components/brand/Brand";
import Navbar from "../components/navbar/Navbar";
import "../App.css";

const Home = () => {
  return (
    <div className="APP">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      {/* <Brand /> */}
      <WhatGPT3 />
      {/* <Features />
      <Possibility />
      <CTA />
      <Blog /> */}
      <Footer />
    </div>
  );
};

export default Home;
