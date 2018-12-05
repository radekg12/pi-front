import {Product} from "./product.model";

export class ShoppingCartPosition {

  id: string;
  quantity: number;
  productByProductId: Product;
  customerId: number;
}
