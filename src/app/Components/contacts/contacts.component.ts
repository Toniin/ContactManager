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

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    SearchBarComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})

export class ContactsComponent implements OnInit {
  contacts$!: Observable<ContactModel[]>;
  contactFound!: ContactModel;
  isReset = true;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.contacts$ = this.contactService.getContacts()
  }

  goToAddContact(): void {
    this.router.navigateByUrl('/contact/add');
  }

  removeContact(phoneNumber: number) {
    this.confirmationService.confirm({
      accept: () => {
        this.contactService.removeContact(phoneNumber).pipe(
          tap((contact ) => {
            this.messageService.add({key: 'delete-contact', severity:'success', summary:`Contact deleted successfully`, detail:`Contact with phone ${phoneNumber} is deleted`})
            this.contacts$ = this.contactService.getContacts()
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
}
