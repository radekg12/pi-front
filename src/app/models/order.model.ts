import {DeliveryType} from "./delivery-type.model";
import {PaymentMethod} from "./payment-method.model";
import {OrderStatus} from "./order-status.model";
import {AddressModel} from "./address.model";
import {OrderPosition} from "./order-position.model";

export class Order {
  id: number;
  dateOfOrder: string;
  dateOfDelivery: string;
  totalAmount: number;

  orderStatus: OrderStatus;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  address: AddressModel;
  orderPositions: OrderPosition[];

}
