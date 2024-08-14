import { ContactsState } from "./contacts/contacts.reducer";
import {userState} from "../Models/user.model";

export interface AppState {
  contacts: ContactsState,
  user: userState
}
