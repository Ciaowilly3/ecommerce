export interface IUser {
  name: string;
  password: string;
}

export interface IUserComplete extends IUser {
  email: string;
  confirmPassword: string;
}
