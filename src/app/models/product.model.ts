import {Subcategory} from './category.model';
import {SpecificationPosition} from './specification-position.model';

export class Product {

  id?: string;
  name: string;
  description?: string;
  company?: string;
  quantityInStock?: string;
  unitPrice: number;
  imageUrl?: string;

  subcategory?: Subcategory;
  specificationPositions?: SpecificationPosition[];
}
