import { User } from '../../auth/models/user.model';
import { IVendor } from './vendor';

export interface IEmployee {
  userId: User;
  vendorId: IVendor;
  createdAt: string;
  updatedAt: string;
  skills: string[];
  experience: string;
  visaStatus: string;
}
