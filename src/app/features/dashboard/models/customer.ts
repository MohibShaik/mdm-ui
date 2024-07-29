export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  isActive: boolean;
  membershipType: string;
  createdBy: any;
  approvers: any;
  status: string;
  createdOn: Date;
}
