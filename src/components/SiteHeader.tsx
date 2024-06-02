import HeaderLogged from "../components/Header/HeaderLogged";
import { useThemeMode } from "../hooks/useThemeMode";

const SiteHeader = () => {
  useThemeMode();

  return <HeaderLogged />;
};

export default SiteHeader;
