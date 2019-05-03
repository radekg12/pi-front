import {Authority} from './authority.model';

export class User {
  accessToken: string;
  tokenType: string;
  rememberMe: boolean;
  authorities: Authority[];
}
