export interface IUser {
    id: string;
    firstName: string | any;
    lastName: string;
    email: string;
    membershipExpiration: string | null;
}