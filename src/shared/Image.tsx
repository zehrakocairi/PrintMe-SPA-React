import React, { FC } from 'react';

export interface ImageProps {
  sizes?: string;
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any; 
}

const Image = ({ sizes, src, alt, ...props }: ImageProps) => {
  return <img src={src} alt={alt} sizes={sizes} {...props} />;
};
export default Image;

