export interface ImageProps {
  sizes?: string;
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any; 
  priority?: boolean;
  fill?: boolean;
  showMobileImage?: boolean;
}

const Image = ({ sizes, src, alt, priority, fill, showMobileImage, ...props }: ImageProps) => {
  const getMobileSrc = (src: string): string => {
    const parts = src.split('.');
    if (parts.length > 1) {
      parts[parts.length - 2] += '-m';
      return parts.join('.');
    }
    return src;
  };
  return (
    <picture className="flex h-full">
    { showMobileImage && <source media="(max-width: 767px)" srcSet={getMobileSrc(src)} />}
    {!showMobileImage && <source media="(min-width: 768px)" srcSet={src} />}
    <img src={src} alt={alt} sizes={sizes} {...props} />
  </picture>
  )
};
export default Image;

