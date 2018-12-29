export class OrderStatusCategory {
  id: number;
  name: string;
}

interface EnumColor {
  id: number;
  color: string;
}

export const OrderStatusCategoryColor: EnumColor[] = [
  {id: 1, color: '#e0e0e0'},
  {id: 2, color: '#ffc107'},
  {id: 3, color: '#28a745'},
  {id: 4, color: '#dc3545'},
];
