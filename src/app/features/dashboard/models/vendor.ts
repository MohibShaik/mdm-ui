import { User } from '../../auth/models/user.model';

export interface IVendor {
  _id: string;
  companyName: string;
  phone: string;
  address: string;
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
