import {createAction, props} from "@ngrx/store";
import {ContactModel} from "../../Models/contact.model";

/* GET CONTACTS */
export const getContacts = createAction('[Contacts API] get contacts')

export const getContactsSuccess = createAction(
  '[Contacts API] get contacts success',
  props<{ payload: ContactModel[] }>()
)

/* GET CONTACT */
export const getContact = createAction(
  '[Contacts API] get contact',
  (phoneNumber: string) => ({phoneNumber})
)

export const getContactSuccess = createAction(
  '[Contacts API] get contact success',
  props<{ payload: ContactModel }>()
)

export const getContactFailure = createAction(
  '[Contacts API] get contact failure',
  props<{ errors: {isError: boolean, message: string} }>()
)

/* DELETE CONTACT */
export const deleteContact = createAction(
  '[Contacts API] delete contact',
  (phoneNumber: string) => ({phoneNumber})
)

export const deleteContactSuccess = createAction(
  '[Contacts API] delete contact success',
  props<{ payload: any, phoneNumber: string }>()
)

export const deleteContactFailure = createAction(
  '[Contacts API] delete contact failure',
  props<{ errors: {isError: boolean, message: string} }>()
)

/* UPDATE CONTACT */
export const updateContact = createAction(
  '[Contacts API] update contact',
  (contact: ContactModel) => ({contact})
)

export const updateContactSuccess = createAction(
  '[Contacts API] update contact success',
  props<{ payload: any, contactUpdated: ContactModel }>()
)

export const updateContactFailure = createAction(
  '[Contacts API] update contact failure',
  props<{ errors: {isError: boolean, message: string} }>()
)
