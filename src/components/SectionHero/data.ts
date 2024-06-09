interface Hero2DataType {
  image: string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: string;
}
const image1 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/home-2.png' 
// const image1 = 'https://wallpapers.com/images/high/bouquet-of-flowers-famous-painting-se4ude7nwqzjp7uf.webp'
const image2 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/pexels-axp-photography-500641970-17377188.jpg' 
const image3 = 'https://genstorageaccount3116.blob.core.windows.net/printme-images/pexels-ekrulila-18879508.jpg' 

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
    subHeading: "Print, frame, and ship with care. 🚀",
    btnText: "Customize Now",
    btnLink: "/search",
  },
  {
    image: image3,
    heading: "Expert Giclée Printing Service",
    subHeading: "Superior reproduction for art and photos.",
    btnText: "Learn More",
    btnLink: "/",
  },
];
