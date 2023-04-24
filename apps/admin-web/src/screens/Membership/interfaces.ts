export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  isActive?: boolean; //eventually, not optional
  membershipExpiration: string;
  shirtReceived: boolean; //eventually, not optional
}

export interface IStyles {
  display: string;
  cursor: string;
  marginLeft: string;
}
