export interface IUserCredentials {
  id: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  password:string;
  name:string;
  role:"student"|"lecturer";
}
