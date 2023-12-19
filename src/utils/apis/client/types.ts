export type RoleType = "client" | "pekerja";

export interface ProfileType {
  id: number;
  username: string;
  name: string;
  email: string;
  role: RoleType;
  image: string;
  phone: string;
  address: string;
}
