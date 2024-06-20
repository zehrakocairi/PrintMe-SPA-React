import { Product, ProductVariant } from "../models/ProductModels";
import { CardCategory3Props } from "../components/CardCategories/CardCategory3";


export const DEMO_VARIANTS: ProductVariant[] = [
 
];

export const PRODUCTS: Product[] = [
  {
    name: "Product 1",

  } as Product
];


export const FRAMES: CardCategory3Props[] = [
  {
    name: "Diverse Art Styles",
    desc: "Vintage, <br />modern, nature,<br />abstract prints.",
    featuredImage: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/illustaration-hang-picture-in-frame.jpg',
    color: "bg-yellow-50",
  },
  {
    name: "Quality You Can Feel",
    desc: "Experience our<br /> premium Giclée<br /> prints",
    featuredImage: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/epson-printer.png',
    color: "bg-red-50",
  },
  {
    name: "Visit Our Space",
    desc: "Pick up prints,<br />enjoy coffee.",
    featuredImage: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/coffee-invitation.webp',
    color: "bg-blue-50",
  },
  {
    name: "Exclusive Discounts",
    desc: "Up to <br /> 80% off selected art",
    featuredImage: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/illustaration-hang-picture-in-frame.jpg',
    color: "bg-green-50",
  },
];
