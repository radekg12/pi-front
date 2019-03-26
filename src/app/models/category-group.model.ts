import {Subcategory} from './category.model';

export class Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
