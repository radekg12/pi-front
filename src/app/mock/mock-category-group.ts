import {Category} from '../models/category-group.model';

export const CATEGORY_GROUPS: Category[] = [
  {
    id: 1, name: 'Komputery stacjonarne', subcategories: [
      {id: 1, name: 'Komputery/Serwery'},
      {id: 2, name: 'Monitory'},
      {id: 3, name: 'Akcesoria komputerowe'},
      {id: 4, name: 'Akcesoria do monitorów'}
    ]
  },
  {
    id: 2, name: 'Laptopy i tablety', subcategories: [
      {id: 1, name: 'Laptopy/Notebooki/Ultrabooki'},
      {id: 2, name: 'Laptopy 2 w 1'},
      {id: 3, name: 'Tablety'},
      {id: 4, name: 'Czytniki ebook'}
    ]
  },
  {
    id: 2, name: 'Akcesoria', subcategories: [
      {id: 1, name: 'Głośniki'},
      {id: 2, name: 'Laptopy 2 w 1'},
      {id: 3, name: 'Tablety'},
      {id: 4, name: 'Czytniki ebook'},
      {id: 5, name: 'Pamięć flash'},
      {id: 6, name: 'Kable i przejściówki'}
    ]
  },
  {
    id: 2, name: 'Akcesoria', subcategories: [
      {id: 1, name: 'Głośniki'},
      {id: 2, name: 'Tablety'},
      {id: 3, name: 'Pamięć flash'},
      {id: 4, name: 'Kable i przejściówki'}
    ]
  }
];
