import { Product, ProductVariant } from "../models/ProductModels";
import { Frame } from "../models/ProductModels";


export const DEMO_VARIANTS: ProductVariant[] = [
 
];

export const PRODUCTS: Product[] = [
  {
    name: "Product 1",

  } as Product
];
export const FRAMES: Frame[] = [
  {
    id: 1,
    name: `Black Frame | RÖDALM`,
    description: "RÖDALM frame has a modern look that does your favourite motifs justice. Place the picture in the front or back of the frame.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame1-rodalm-mat.png',
    maskWithoutMat: "https://genstorageaccount3116.blob.core.windows.net/printme-images/frame1-rodalm.png",
    image: "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=s",
    allImages: ["https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251232_pe924196_s5.jpg?f=s","https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298269_pe936170_s5.jpg?f=s", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=s", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298276_pe936177_s5.jpg?f=s", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1298259_pe936159_s5.jpg?f=s", "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1330544_pe945716_s5.jpg?f=s"],
  },
  {
    id: 2,
    name: `Black Frame | KNOPPANG`,
    description: "Decorate with pictures you love. This frame has a thin edge with a profile that has a traditional look and comes in many sizes. The plastic front protection is safe ― and does justice to the motif.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/knoppang-frame-black__0638249_pe698799_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame2-knoppang-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0902161_pe597470_s5.jpg?f=s",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661045_pe711296_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs"],
  },
  {
    id: 3,
    name: `Black Frame | LOMVIKEN`,
    description: "Decorate with pictures you love. This frame comes in many sizes and has a thin metal edge with a profile that creates a shadow. The plastic front protection is safe ― and does justice to the motif.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638245_pe698795_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame3-lomviken-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0902941_pe661098_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs"],
  },
  {
    id: 4,
    name: `Gold Frame | SILVERHÖJDEN`,
    description: "Decorate with pictures you love. This frame has a matt metal-like finish and comes in many sizes, perfect for a picture wall. The plastic front protection is safe ― and does justice to the motif.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/silverhojden-frame-gold-colour__1179571_pe895993_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame4-silverhojden-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0902161_pe597470_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs"],
  },
  {
    id: 5,
    name: `White Frame | EDSBRUK`,
    description: "Decorate with pictures you love. This traditional, robust frame has a soft profile and comes in many sizes, perfect for a picture wall. The plastic front protection is safe ― and does justice to the motif.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/edsbruk-frame-white__0706506_pe725889_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame5-edsbruk.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251232_pe924196_s5.jpg?f=xxs, https://www.ikea.com/nl/en/images/products/rodalm-frame-black__1251233_pe924195_s5.jpg?f=xxs"],
  },
  {
    id: 6,
    name: `white stained pine effect | PLOMMONTRÄD`,
    description: "The pattern of PLOMMONTRÄD frame has small variations, making each frame unique – and the slightly wider dimensions create a robust and traditional expression. Choose between 3 sizes, or combine them all.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/plommontrad-frame-white-stained-pine-effect__1202413_pe905936_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame6-plommon-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661045_pe711296_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-gold-colour__0661047_pe711292_s5.jpg?f=xxs"],
  },
  {
    id: 7,
    name: `Brown Frame | RAMSBORG`,
    description: "Sustainable beauty from sustainably-sourced solid wood, a durable and renewable material that maintains its genuine character with each passing year.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/ramsborg-frame-brown__0726700_pe735389_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame7-ramsborg-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0902941_pe661098_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/lomviken-frame-black__0638227_pe698778_s5.jpg?f=xxs"],
  },
  {
    id: 8,
    name: `Black Frame | EDSBRUK`,
    description: "Decorate with pictures you love. This traditional, robust frame has a soft profile and comes in many sizes, perfect for a picture wall. The plastic front protection is safe ― and does justice to the motif.",
    thumbnail: "https://www.ikea.com/nl/en/images/products/edsbruk-frame-black-stained__0723741_pe734158_s5.jpg?f=xxs",
    price: 6,
    mask: 'https://genstorageaccount3116.blob.core.windows.net/printme-images/frame8-edsbruk-mat.png',
    maskWithoutMat: "",
    image:
      "https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs",
    allImages: ["https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0902161_pe597470_s5.jpg?f=xxs","https://www.ikea.com/nl/en/images/products/fiskbo-frame-black__0638101_pe698706_s5.jpg?f=xxs"],
  },
];
