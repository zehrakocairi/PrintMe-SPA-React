import { PrintSize } from "../enums/PrintSize";
import { v4 as uuidv4 } from 'uuid'; // Importing the UUID function


export class CartItem {
  constructor(public productId: number, public productName: string, public unitPrice: number, public quantity: number, public pictureUrl: string, public size: PrintSize, public frameId: number, public oldUnitPrice?: number, public frameName?: string) {
    this.id = uuidv4();
  }
  public id:string;
}