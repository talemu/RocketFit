import create from "./http-service";

export interface RfAuthUser {
  id: number;
  username: string;
  emailAddress: string;
}

export default create("/auth");
