import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import FramesCatalog from "../../components/FramesCatalog";
import FrameFeatures from "../../components/FrameFeatures";
import SalesPromo from "../../components/SalesPromo";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const PageOurServices = ({}) => {
  const { i18n, t } = useTranslation();
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      <Helmet>
        <title>PrintMeArt - {t("Printed Art, Posters, and Photos")}</title>
        <link rel="canonical" href={`${window.location.origin}/our-services?lang=${i18n.language}`} />
      </Helmet>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={"https://genstorageaccount3116.blob.core.windows.net/printme-images/colorfull-frames.webp"}
          heading="Our Services"
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
          {/* <BackgroundSection zIndex={-1} className="z-index-minus"/> */}
        </div>
        <div className="relative py-32">
          <SalesPromo />
        </div>
      </div>
    </div>
  );
};

export default PageOurServices;
