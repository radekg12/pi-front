import {Subcategory} from './category.model';
import {SpecificationPosition} from './specification-position.model';

export class Product {

  id: number;
  name: string;
  description?: string;
  company?: string;
  logicalQuantityInStock?: string;
  physicalQuantityInStock?: string;
  unitPrice: number;
  imageUrl?: string;

  subcategory?: Subcategory;
  specificationPositions?: SpecificationPosition[];
}
