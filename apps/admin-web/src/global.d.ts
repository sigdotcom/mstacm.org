import "reactn";

declare module "reactn/default" {
  export interface State {
    events: any;
    eventFormVisible: boolean;
    activeEvent: number;
  }
}
