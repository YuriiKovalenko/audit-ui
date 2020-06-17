export interface User {
  id: number;
  username: string;
  roles: { id: number; name: string }[];
  isAdmin?: boolean;
}
