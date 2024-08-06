import {Component, EventEmitter, inject, Input, Output, WritableSignal} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {ContactService} from "../../Services/contact.service";
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

export class ContactsComponent {
  private contactService = inject(ContactService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);

  @Input() contacts!: WritableSignal<Observable<ContactModel[]>>;
  @Input() contactFound!: WritableSignal<Observable<ContactModel[]>>;
  @Input() isContactFound!: boolean;
  @Output() isContactFoundChange = new EventEmitter<boolean>();

  isSubmitting = false;
  isEditingContact = {isEditing: false, phoneNumber: 0};

  editContactForm: FormGroup = this.formBuilder.group({
    name: [null],
  })


  removeContact(phoneNumber: number) {
    this.confirmationService.confirm({
      accept: () => {
        this.contactService.removeContact(phoneNumber).pipe(
          tap(async () => {
              this.messageService.add({
                key: 'delete-contact',
                severity: 'success',
                summary: `Contact deleted successfully`,
                detail: `Contact with phone ${phoneNumber} is deleted`
              })
              if (this.isContactFound) {
                this.resetContactFound()
              } else {
                this.contacts.set(this.contactService.getContacts())
              }
            }
          ),
          catchError(async (error) => {
            this.isSubmitting = false;
            this.messageService.add({
              key: 'delete-contact',
              severity: 'error',
              summary: `Contact deleted failed`,
              detail: `You do not have permission`
            })
            return of([]);
          })
        ).subscribe()
      }
    });
  }

  resetContactFound() {
    this.isContactFound = false
    this.isContactFoundChange.emit(this.isContactFound)
  }

  editContact(contact: ContactModel) {
    this.isEditingContact = {
      isEditing: true,
      phoneNumber: contact.phoneNumber,
    }

    this.editContactForm.controls['name'].setValue(contact.name);
  }

  cancelEditing() {
    this.isEditingContact = {
      isEditing: false,
      phoneNumber: 0,
    }
    this.editContactForm.reset()
  }

  onEditContactSubmit(contact: ContactModel) {
    if (this.editContactForm.value.name.length === 0 || this.editContactForm.value.name === contact.name) {
      this.cancelEditing()
    } else {
      this.isSubmitting = true;

      const newContact = {
        name: this.editContactForm.value.name,
        phoneNumber: contact.phoneNumber
      }

      this.contactService.updateContact(newContact).pipe(
        tap(async () => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.messageService.add({
            key: 'update-contact',
            severity: 'success',
            summary: `Contact updated successfully`,
            detail: `Contact with phone ${contact.phoneNumber} is updated`
          })
          this.isSubmitting = false;
          this.cancelEditing()

          if (this.isContactFound) {
            this.contactFound.set(of([
              newContact
            ]))
          } else {
            this.contacts.set(this.contactService.getContacts())
          }
        }),
        catchError(async (error) => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.messageService.add({
            key: 'update-contact',
            severity: 'error',
            summary: `Contact updated failed`,
            detail: `You do not have permission`
          })
          return of([]);
        })
      ).subscribe()
    }
  }
}
