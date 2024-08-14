import {Component, inject, OnInit} from '@angular/core';
import {lastValueFrom, take} from "rxjs";
import {ContactModel} from "../../Models/contact.model";
import {AsyncPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {AutoFocus} from "primeng/autofocus";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputGroupModule} from "primeng/inputgroup";
import {AvatarModule} from "primeng/avatar";
import {phoneFormatInternational_FR_fr} from "../../../utils/phone.validator";
import {Store} from "@ngrx/store"
import {AppState} from "../../store/app.state";
import {selectContacts, selectContactsErrors} from "../../store/contacts/contacts.selector";
import {deleteContact, getContacts, updateContact} from "../../store/contacts/contacts.actions";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    SearchBarComponent,
    AutoFocus,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    InputGroupModule,
    AvatarModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})

export class ContactsComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>)

  contacts$ = this.store.select(selectContacts)
  errors$ = this.store.select(selectContactsErrors);

  isSubmitting = false;
  onContact = {isEditing: false, phoneNumber: ""};

  editContactForm: FormGroup = this.formBuilder.group({
    name: [null],
  })

  ngOnInit() {
    this.store.dispatch(getContacts())
  }

  deleteContact(phoneNumber: string) {
    this.confirmationService.confirm({
      accept: async () => {
        this.isSubmitting = true;
        this.onContact.phoneNumber = phoneNumber;

        // Promise of 1s to show the loading button when form is submitting
        await new Promise((resolve) => {
          return setTimeout(() => {
            resolve(true)
          }, 1000)
        })

        this.store.dispatch(deleteContact(phoneNumber))
        this.isSubmitting = false;

        const errors = await lastValueFrom(this.errors$.pipe(take(2)));

        if (errors.isError) {
          this.messageService.add({
            key: 'delete-contact',
            severity: 'error',
            summary: `Contact deleted failed`,
            detail: errors.message
          })
        } else {
          this.messageService.add({
            key: 'delete-contact',
            severity: 'success',
            summary: `Contact deleted successfully`,
            detail: `Contact with phone ${phoneNumber} is deleted`
          })

          this.store.dispatch(getContacts())
        }
      }
    });
  }

  onEditContact(contact: ContactModel) {
    this.onContact = {
      isEditing: true,
      phoneNumber: contact.phoneNumber,
    }

    this.editContactForm.controls['name'].setValue(contact.name);
  }

  cancelEditing() {
    this.onContact = {
      isEditing: false,
      phoneNumber: "",
    }
    this.editContactForm.reset()
  }

  async onSubmitEditedContact(contact: ContactModel) {
    if (this.editContactForm.value.name.length === 0 || this.editContactForm.value.name === contact.name) {
      this.cancelEditing()
    } else {
      this.isSubmitting = true;

      const contactUpdated = {
        name: this.editContactForm.value.name,
        phoneNumber: phoneFormatInternational_FR_fr(contact.phoneNumber),
      }

      // Promise of 1s to show the loading button when form is submitting
      await new Promise((resolve) => {
        return setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      this.store.dispatch(updateContact(contactUpdated))
      this.isSubmitting = false;
      this.cancelEditing()

      const errors = await lastValueFrom(this.errors$.pipe(take(2)));

      if (errors.isError) {
        this.messageService.add({
          key: 'update-contact',
          severity: 'error',
          summary: `Contact updated failed`,
          detail: errors.message
        })
      } else {
        this.messageService.add({
          key: 'update-contact',
          severity: 'success',
          summary: `Contact updated successfully`,
          detail: `Contact with phone ${contact.phoneNumber} is updated`
        })
      }
    }
  }
}
