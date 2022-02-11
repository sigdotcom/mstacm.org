import "reactn";

import { IEvent } from "./components/pages/tools/Events/interfaces";

declare module "reactn/default" {
  export interface State {
    events: IEvent[];
    eventFormVisible: boolean;
    activeEvent: number;
  }
}
