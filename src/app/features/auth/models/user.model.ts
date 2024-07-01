export interface User {
  id?: number;
  username: string;
  email: string;
  permissions: string;
  isActive?: boolean;
  password?: string;
  updatedAt?: string;
  createdAt?: string;
}
