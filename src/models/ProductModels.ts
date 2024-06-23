
export interface ProductVariant {
    id: number;
    name: string;
    thumbnail?: string;
    color?: string;
    featuredImage:string;
  }

export class Product {
  id: number;
  name: string;
  motto?: string;
  price: number;
  images: ImageDto[];
  description: string;
  category: string;
  tags: string[];
  link: string = "/product-detail/";
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
  rating?: string;
  numberOfReviews?: number;
  isMatIncluded?: boolean;

  constructor(data: Partial<Product>) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.motto = data.motto;
    this.price = data.price || 0;
    this.images = data.images || [];
    this.description = data.description || '';
    this.category = data.category || '';
    this.tags = data.tags || [];
    this.link = data.link || "/product-detail/";
    this.variants = data.variants;
    this.variantType = data.variantType;
    this.sizes = data.sizes;
    this.allOfSizes = data.allOfSizes;
    this.status = data.status;
    this.rating = data.rating;
    this.numberOfReviews = data.numberOfReviews;
    this.isMatIncluded = data.isMatIncluded;
  }

  get image(): string {
    return this.images[0]?.image ?? '';
  }

  get imageThumbnail(): string {
    return this.images[0]?.thumbnail ?? this.image;
  }

  get image2(): string {
    return this.images[1]?.image ?? this.image;
  }

  get image2Thumbnail(): string {
    return this.images[1]?.thumbnail ?? this.image2;
  }

  get image3(): string {
    return this.images[2]?.image ?? this.image2;
  }

  get image3Thumbnail(): string {
    return this.images[2]?.thumbnail ?? this.image3;;
  }

  get image4(): string {
    return this.images[3]?.image ?? this.image3;
  }

  get image4Thumbnail(): string {
    return this.images[3]?.thumbnail ?? this.image4;;
  }
}

  export interface ImageDto {
    image: string;
    thumbnail: string;
    category: number;
    // thumbnail: string;
    // thumbnailAlternate: string;
    // image: string;
    // imageAlternate: string;
  }
  
  export interface Frame {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string;
    allImages: string[];
    mask: string;
  }
  export interface Size {
    id: number;
    name: string;
    description: string;
    multiplier: number;
  }
  