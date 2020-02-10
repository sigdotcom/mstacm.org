export interface IUser {
    id: string;
    firstName: string | any;
    lastName: string;
    fullName?: string;
    email: string;
    membershipExpiration: string;
}