import 'reactn';

import { User } from "./utils/types"
 
declare module 'reactn/default' { 
  export interface State {
    communityFilters: {[ name: string ]: boolean},
    users: User[],
    filterFavorites: boolean,
    curPage: number,
    displayPerPage: number,
    isFavorite(id: string): boolean,
    flipFavorite(id: string): void
  }
}
