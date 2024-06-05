import { PrintSize } from "../enums/PrintSize";
import { v4 as uuidv4 } from 'uuid'; // Importing the UUID function


export class CartItem {
  constructor(public productId: number, public productName: string, public unitPrice: number, public quantity: number, public pictureUrl: string, public oldUnitPrice?: number, public size?: PrintSize) {
    this.id = uuidv4();
  }
  public id:string;
}