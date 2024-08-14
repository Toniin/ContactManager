import {createAction, props} from "@ngrx/store";
import {SignInForm, SignUpForm} from "../../Models/forms.model";

/* SIGN UP */
export const signUp = createAction(
  '[Contacts API] sign up',
  (user: SignUpForm) => ({user})
)

export const signUpSuccess = createAction(
  '[Contacts API] sign up success',
  props<{ payload: any }>()
)

export const signUpFailure = createAction(
  '[Contacts API] sign up failure',
  props<{ errors: { isError: boolean, message: string } }>()
)

/* SIGN IN */
export const signIn = createAction(
  '[Contacts API] sign in',
  (user: SignInForm) => ({user})
)

export const signInSuccess = createAction(
  '[Contacts API] sign in success',
  props<{ payload: any }>()
)

export const signInFailure = createAction(
  '[Contacts API] sign in failure',
  props<{ errors: { isError: boolean, message: string } }>()
)

/* SIGN OUT */
export const signOut = createAction('[Contacts API] sign out')
