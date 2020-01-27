export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    membershipExpiration: string | null;
}