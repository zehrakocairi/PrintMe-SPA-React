import React, { FC } from "react";
import Image, { ImageProps } from "../../shared/Image";

export interface NcImageProps extends Omit<ImageProps, "alt"> {
  containerClassName?: string;
  alt?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-image",
  className = "object-cover w-full h-full",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image src={""} className={className} alt={alt} {...args} />
    </div>
  );
};

export default NcImage;
