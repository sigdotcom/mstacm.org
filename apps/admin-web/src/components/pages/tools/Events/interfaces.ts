export interface ISig {
  dateFounded: Date;
  description: string;
  name: string;
}

export interface IHostSig {
  name: string;
}

export interface IEvent {
  dateCreated: Date;
  dateExpire: Date;
  dateHosted: Date;
  description: string;
  eventLink: string | null;
  eventTitle: string;
  flierLink: string | null;
  id: number;
  location: string;
  hostSig: ISig;
}
