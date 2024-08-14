import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectUserState = (state: AppState) => state.user

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.username,
)

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state) => state.isAuthenticated,
)

export const selectUserErrors = createSelector(
  selectUserState,
  (state) => state.errors,
)
