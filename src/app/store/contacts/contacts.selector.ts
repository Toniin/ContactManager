import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectContactsState = (state: AppState) => state.contacts

export const selectContacts = createSelector(
  selectContactsState,
  (state) => state.contacts,
)

export const selectIsContactFound = createSelector(
  selectContactsState,
  (state) => state.isContactFound,
)

export const selectContactsErrors = createSelector(
  selectContactsState,
  (state) => state.errors,
)
