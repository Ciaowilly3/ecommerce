export interface IUser {
  name: string;
  email: string;
}

export interface IUserComplete extends IUser {
  password: string;
  confirmPassword: string;
}
