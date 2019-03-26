import {AddressModel} from './address.model';

export class Customer {
  id: number;
  companyName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: AddressModel;
}
