interface Hero2DataType {
  image: string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: string; 
}
const image1 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/main-slider-1.webp'
const image2 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/main-slider-3.webp'
const image3 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/main-slider-4.webp' 

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: image1,
    heading: "Affordable High-Quality Art Prints",
    subHeading: "Shop Stunning Prints & Frames for Your Home Decor.",
    btnText: "Explore Art Prints",
    btnLink: "/search",
  },
  {
    image: image2,
    heading: "Custom Photo Prints & Framed Art",
    subHeading: "Upload, Customize, and Order Your Own Design.",
    btnText: "Create Your Custom Print",
    btnLink: "/your-design",
  },
  {
    image: image3,
    heading: "Expert Giclée Printing Service",
    subHeading: "Superior Quality Prints with Archival Inks & Paper.",
    btnText: "Learn About Giclée Printing",
    btnLink: "/",
  },
];
