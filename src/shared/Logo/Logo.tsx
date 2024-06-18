import React from "react";
import Link from "../../shared/Link";
import Image from "../Image";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = "https://genstorageaccount3116.blob.core.windows.net/printme-images/logo.svg",
  imgLight = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/logo.svg',
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <Image
          className={`block h-28 sm:h-24 w-auto main-logo ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={img}
          alt="Logo"
          sizes="200px"
          width="235"
          height="112"
          priority
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <Image
          className="hidden h-8 sm:h-10 w-auto dark:block"
          src={imgLight}
          alt="Logo-Light"
          sizes="200px"
          width="235"
          height="112"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
