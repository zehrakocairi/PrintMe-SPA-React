import { PrintSize } from "../enums/PrintSize";
import { v4 as uuidv4 } from "uuid"; // Importing the UUID function

// export class CartItem {
//   constructor(public productId: number, public productName: string, public unitPrice: number, public quantity: number, public pictureUrl: string, public size: PrintSize, public frameId: number, public oldUnitPrice?: number, public frameName?: string, public isMatIncluded?: boolean) {
//     this.id = uuidv4();
//   }
//   public id:string;
// }

export class CustomerCart {
  constructor(items: CartItem[], id?: string) {
    this.id = id;
    this.items = items;
  }
  public id?: string;
  public items: CartItem[] = [];
}

// TODO : Apply these as option
// public size: PrintSize, public frameId: number, public oldUnitPrice?: number, public frameName?: string, public isMatIncluded?: boolean

export class CartItem {
  public id: string;
  public productId: number;
  public variantId: number;
  public productName: string;
  public unitPrice: number;
  public noDiscountPrice: number;
  public oldUnitPrice?: number;
  public quantity: number;
  public pictureUrl: string;
  public isPriceChanged: boolean;
  public isAvailable: boolean;

  constructor(data: Partial<CartItem>) {
    this.id = uuidv4(); // Generate a unique ID if not provided
    this.productId = data.productId || 0;
    this.variantId = data.variantId || 0;
    this.productName = data.productName || "";
    this.unitPrice = data.unitPrice || 0;
    this.noDiscountPrice = data.noDiscountPrice || 0;
    this.oldUnitPrice = data.oldUnitPrice;
    this.quantity = data.quantity || 1; // Default to 1
    this.pictureUrl = data.pictureUrl || "";
    this.isPriceChanged = data.isPriceChanged || false;
    this.isAvailable = data.isAvailable ?? true; // Default to true
  }
}
