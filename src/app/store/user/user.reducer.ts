import {createReducer, on} from "@ngrx/store";
import {signIn, signInFailure, signInSuccess, signOut, signUp, signUpFailure, signUpSuccess} from "./user.actions";
import {userState} from "../../Models/user.model";

export const initialUserState: userState = {
  username: "",
  isAuthenticated: false,
  errors: {isError: false, message: ""}
}

export const userReducer = createReducer(
  initialUserState,
  // SIGN UP
  on(signUp, (state, {user}) => {
    return {
      ...state,
    };
  }),
  on(signUpSuccess, (state, {payload}) => {
    return {
      ...state,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  on(signUpFailure, (state, {errors}) => {
    return {
      ...state,
      errors: errors
    };
  }),
  // SIGN IN
  on(signIn, (state, {user}) => {
    return {
      ...state,
    };
  }),
  on(signInSuccess, (state, {payload}) => {
    localStorage.setItem("Token", payload.token);
    localStorage.setItem("isAuthenticated", "true");

    return {
      ...state,
      username: payload.username,
      isAuthenticated: true,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  on(signInFailure, (state, {errors}) => {
    return {
      ...state,
      errors: errors
    };
  }),
  // SIGN OUT
  on(signOut, (state) => {
    localStorage.clear();

    return {
      ...state,
      username: "",
      isAuthenticated: false,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
)
