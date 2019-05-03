import {AddressModel} from './address.model';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: AddressModel;
}
