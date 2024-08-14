import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
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
import {ContactService} from "../../Services/contact.service";

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);
  private contactService = inject(ContactService)

  getContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getContacts),
      switchMap(() => this.contactService.getContacts().pipe(
          map(data => getContactsSuccess({payload: data})),
        )
      )
    )
  );

  getContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getContact),
      switchMap((data) => this.contactService.getContact(data.phoneNumber).pipe(
          map(data => getContactSuccess({payload: data})),
          catchError(error => {
            return of(getContactFailure({errors: error.error}))
          })
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      switchMap((contact) => this.contactService.deleteContact(contact.phoneNumber).pipe(
          map(data => deleteContactSuccess({payload: data, phoneNumber: contact.phoneNumber})),
          catchError(error => {
            return of(deleteContactFailure({errors: error.error}))
          })
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContact),
      switchMap((contactUpdated) => this.contactService.updateContact(contactUpdated.contact).pipe(
          map(data => updateContactSuccess({payload: data, contactUpdated: contactUpdated.contact})),
          catchError(error => {
            return of(updateContactFailure({errors: error.error}))
          })
        )
      )
    )
  );
}
