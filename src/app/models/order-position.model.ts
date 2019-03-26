import {Product} from './product.model';

export class OrderPosition {
  id: number;
  quantity: number;
  unitPrice: number;
  product: Product;

}
