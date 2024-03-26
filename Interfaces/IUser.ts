export interface ICreditCard {
  cardNumber: string;
  expDate: string;
}

export interface IUser {
  name: string;
  email: string;
  creditCards: ICreditCard[];
}

export interface IUserComplete extends IUser {
  password: string;
  confirmPassword: string;
}
