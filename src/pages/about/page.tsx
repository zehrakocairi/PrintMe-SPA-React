import rightImg from "../../data/images/hero-right1.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "../../components/SectionClientSay/SectionClientSay";
import SectionPromo3 from "../../components/SectionPromo3";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const PageAbout = ({ }) => {
  const { t } = useTranslation();
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
       <Helmet>
        <title>PrintMeArt - About us</title>
        <link rel="canonical" href="/about" />
      </Helmet>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={'https://genstorageaccount3116.blob.core.windows.net/printme-images/about-us.webp'}
          heading={t("About Us.")}
          btnText=""
          subHeading={t("Welcome to PrintMeArt! We're a family-run business turning your favorite memories and artworks into stunning prints. Using top-notch Giclée printing, we ensure vibrant colors and fine detail in every piece. We believe in the magic of art to brighten your space. With a personal touch and genuine care, we offer a wide range of printing and framing options to suit your style.Join our PrintMeArt family and let us help you create something special. Your masterpiece awaits!")}
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />

          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionPromo3 />
      </div>
    </div>
  );
};

export default PageAbout;
