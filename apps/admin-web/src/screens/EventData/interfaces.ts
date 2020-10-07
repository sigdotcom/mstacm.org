interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

interface IEvent {
    eventTitle: string;
    attendees: IUser[];
    usersInterested: IUser[];
}

export type { IUser, IEvent };