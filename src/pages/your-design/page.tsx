import SectionHero from "./SectionHero";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import CustomDesign from "./CustomDesign";
import SectionHeroBottom from "./SectionHeroBottom";

const PageYourDesign = ({}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      <Helmet>
        <title>PrintMeArt - {t("Design Your Poster - Art - Photo")}</title>
        <link rel="canonical" href={`${window.location.origin}/your-design?lang=${i18n.language}`} />
      </Helmet>

      <div className="container py-16 lg:pt-28 space-y-16 lg:space-y-28">
        <SectionHero />
      </div>
      <div className="container py-8 lg:py-12 space-y-12 lg:space-y-12">
        <CustomDesign />
      </div>

      <div className="container py-16 lg:pt-28 space-y-16 lg:space-y-28">
        <SectionHeroBottom />
      </div>
    </div>
  );
};

export default PageYourDesign;
