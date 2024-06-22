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
    heading: "High-Quality Art Prints for Your Home",
    subHeading: "Stunning prints with various frames.",
    btnText: "Explore now",
    btnLink: "/search",
  },
  {
    image: image2,
    heading: "Custom Prints Made Just for You",
    subHeading: "Print, frame, and ship with care.🚀",
    btnText: "Customize Now",
    btnLink: "/search",
  },
  {
    image: image3,
    heading: "Expert Giclée Printing Service",
    subHeading: "Superior reproduction for art and photos.",
    btnText: "What is Giclée?",
    btnLink: "/",
  },
];
