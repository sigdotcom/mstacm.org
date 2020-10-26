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

interface IYearEvent {
    urlKey: string;
    numAttendees: number;
}

export type { IUser, IEvent, IYearEvent };