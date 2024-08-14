import {ContactModel} from "../../Models/contact.model";
import {createReducer, on} from "@ngrx/store";
import {
  deleteContact,
  deleteContactFailure,
  deleteContactSuccess,
  getContact,
  getContactFailure,
  getContacts,
  getContactsSuccess,
  getContactSuccess,
  updateContact,
  updateContactFailure,
  updateContactSuccess
} from "./contacts.actions";
import {phoneFormatLocal_FR_fr} from "../../../utils/phone.validator";

export interface ContactsState {
  contacts: ContactModel[];
  isContactFound: boolean,
  errors: { isError: boolean, message: string };
}

export const initialContactsState: ContactsState = {
  contacts: [],
  isContactFound: false,
  errors: {isError: false, message: ""}
}

export const contactsReducer = createReducer(
  initialContactsState,
  // GET CONTACTS
  on(getContacts, state => {
    return {
      ...state,
    };
  }),
  on(getContactsSuccess, (state, {payload}) => {
    const contactsFormatLocal_FR_fr = payload.map(contact => {
      return {
        name: contact.name,
        phoneNumber: phoneFormatLocal_FR_fr(contact.phoneNumber)
      }
    })

    return {
      ...state,
      contacts: contactsFormatLocal_FR_fr,
      isContactFound: false,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  // GET CONTACT
  on(getContact, (state, {phoneNumber}) => {
    return {
      ...state,
    };
  }),
  on(getContactSuccess, (state, {payload}) => {
    const contactFormatLocal_FR_fr = [{
      name: payload.name,
      phoneNumber: phoneFormatLocal_FR_fr(payload.phoneNumber)
    }]

    return {
      ...state,
      contacts: contactFormatLocal_FR_fr,
      isContactFound: true,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  on(getContactFailure, (state, {errors}) => {
    return {
      ...state,
      isContactFound: false,
      errors: errors
    };
  }),
  // DELETE CONTACT
  on(deleteContact, (state, {phoneNumber}) => {
    return {
      ...state,
    };
  }),
  on(deleteContactSuccess, (state, {payload, phoneNumber}) => {
    const arrayFiltered = state.contacts.filter(contact => contact.phoneNumber !== phoneNumber)

    return {
      ...state,
      contacts: arrayFiltered,
      isContactFound: false,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  on(deleteContactFailure, (state, {errors}) => {
    return {
      ...state,
      errors: {
        isError: true,
        message: "You do not have permission"
      }
    };
  }),
  // UPDATE CONTACT
  on(updateContact, (state, {contact}) => {
    return {
      ...state,
    };
  }),
  on(updateContactSuccess, (state, {payload, contactUpdated}) => {

    const contacts = state.contacts.map(contact => {
      if (contact.phoneNumber === phoneFormatLocal_FR_fr(contactUpdated.phoneNumber)) {
        return {
          name: contactUpdated.name,
          phoneNumber: phoneFormatLocal_FR_fr(contact.phoneNumber)
        }
      } else {
        return {
          name: contact.name,
          phoneNumber: phoneFormatLocal_FR_fr(contact.phoneNumber)
        }
      }
    })

    return {
      ...state,
      contacts: contacts,
      errors: {
        isError: false,
        message: ""
      }
    };
  }),
  on(updateContactFailure, (state, {errors}) => {
    return {
      ...state,
      errors: {
        isError: true,
        message: "You do not have permission"
      }
    };
  }),
)
