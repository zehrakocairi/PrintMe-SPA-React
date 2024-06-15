import rightImg from "../../data/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "../../components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "../../components/SectionPromo3";
import FramesCatalog from "../../components/FramesCatalog";
import FrameFeatures from "../../components/FrameFeatures";
import SalesPromo from "../../components/SalesPromo";

const PageOurServices = ({ }) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={'https://images.unsplash.com/photo-1465161191540-aac346fcbaff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          heading="👋 Test."
          btnText=""
          subHeading="Welcome to PrintMeArt! We're a family-run business turning your favorite memories and artworks into stunning prints. Using top-notch Giclée printing, we ensure vibrant colors and fine detail in every piece.</br>

          We believe in the magic of art to brighten your space. With a personal touch and genuine care, we offer a wide range of printing and framing options to suit your style.
          
          Join our PrintMeArt family and let us help you create something special. Your masterpiece awaits!"
        />

        <div id="frames">
          <FramesCatalog />
        </div>
        <div className="relative py-16">
          <FrameFeatures />
          <BackgroundSection zIndex={-1} />
        </div>
        <div className="relative py-32">
        <SalesPromo />
        </div>
      </div>
    </div>
  );
};

export default PageOurServices;
