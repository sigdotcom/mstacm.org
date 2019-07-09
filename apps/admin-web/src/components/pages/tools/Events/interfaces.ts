export interface ISig {
  dateFounded: Date;
  description: string;
  name: string;
}

export interface IEvent {
  dateCreated: Date;
  dateExpire: Date;
  dateHosted: Date;
  description: string;
  eventLink: string;
  eventTitle: string;
  flierLink: string;
  id: number;
  location: string;
  hostSigs: ISig;
}

