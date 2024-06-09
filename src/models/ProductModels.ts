
export interface ProductVariant {
    id: number;
    name: string;
    thumbnail?: string;
    color?: string;
    featuredImage:string;
  }
  
  export interface Product {
    id: number;
    name: string;
    motto?: string;
    price: number;
    images: ImagesDto;
    description: string;
    category: string;
    tags: string[];
    link: "/product-detail/";
    variants?: ProductVariant[];
    variantType?: "color" | "image";
    sizes?: string[];
    allOfSizes?: string[];
    status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
    rating?: string;
    numberOfReviews?: number;
  }

  export interface ImagesDto {
    thumbnail: string;
    thumbnailAlternate: string;
    image: string;
    imageAlternate: string;
  }
  
  export interface Frame {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
  }
  export interface Size {
    id: number;
    name: string;
    description: string;
    multiplier: number;
  }
  