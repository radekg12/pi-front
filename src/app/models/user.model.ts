import {Customer} from "./customer.model";

export class User {
  accessToken: string;
  tokenType: string;
  userDTO: {
    id: number;
    username: string;
    password: string;
    role: {
      id: number;
      name: string;
    };
    customer: Customer;
  }
}
