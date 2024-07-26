import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {ContactService} from "../../Services/contact.service";
import {ContactModel} from "../../Models/contact.model";
import {AsyncPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {AutoFocus} from "primeng/autofocus";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputGroupModule} from "primeng/inputgroup";

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
    InputGroupModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})

export class ContactsComponent implements OnInit {
  contacts$!: Observable<ContactModel[]>;
  contactFound!: ContactModel;
  isReset = true;
  isEditingContact = {isEditing: false, phoneNumber: 0} ;
  editContactForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.contacts$ = this.contactService.getContacts()

    this.editContactForm = this.formBuilder.group({
      name: [null],
    })
  }

  goToAddContact(): void {
    this.router.navigateByUrl('/contacts/add');
  }

  removeContact(phoneNumber: number) {
    this.confirmationService.confirm({
      accept: () => {
        this.contactService.removeContact(phoneNumber).pipe(
          tap(() => {
            this.messageService.add({key: 'delete-contact', severity:'success', summary:`Contact deleted successfully`, detail:`Contact with phone ${phoneNumber} is deleted`})
            this.contacts$ = this.contactService.getContacts()
            if (this.contactFound) {
              this.resetContactFound()
            }
          }
          )
        ).subscribe()
      }
    });
  }

  getContactFound(contactFound: ContactModel) {
    this.contactFound = contactFound;
    this.isReset = false;
  }

  resetContactFound() {
    this.isReset = true;
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
      const newContact = {
        name: this.editContactForm.value.name,
        phoneNumber: contact.phoneNumber
      }

      this.contactService.updateContact(newContact).pipe(
        tap(() => {
          this.messageService.add({key: 'update-contact', severity:'success', summary:`Contact updated successfully`, detail:`Contact with phone ${contact.phoneNumber} is updated`})
          this.isEditingContact = {
            isEditing: false,
            phoneNumber: 0,
          }
          this.editContactForm.reset()
          this.contacts$ = this.contactService.getContacts()

          if (this.contactFound) {
            this.contactFound = newContact;
          }
        })
      ).subscribe()
    }
  }
}
