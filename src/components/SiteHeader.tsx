import { useMemo } from "react";
import HeaderLogged from "../components/Header/HeaderLogged";

const SiteHeader = () => {
  const memoizedHeader = useMemo(() => <HeaderLogged />, []);

  return memoizedHeader;
};

export default SiteHeader;
