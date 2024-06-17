export interface ImageProps {
  sizes?: string;
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any; 
  priority?: boolean;
  fill?: boolean;
}

const Image = ({ sizes, src, alt, priority, fill, ...props }: ImageProps) => {
  return <img src={src} alt={alt} sizes={sizes} {...props} />;
};
export default Image;

