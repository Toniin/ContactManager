import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Observable, of} from "rxjs";
import {ContactModel} from "../../../Models/contact.model";
import {ContactService} from "../../../Services/contact.service";
import {ContactsComponent} from "../../../Components/contacts/contacts.component";
import {SearchBarComponent} from "../../../Components/search-bar/search-bar.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [
    Button,
    ContactsComponent,
    SearchBarComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.css'
})
export class ContactsPageComponent {
  private contactService = inject(ContactService);

  contacts = signal(this.contactService.getContacts())
  contactFound!: WritableSignal<Observable<ContactModel[]>>;
  isContactFound = false;

  resetContactFound() {
    this.isContactFound = false
  }

  getContactFound(contactFound: ContactModel) {
    this.contactFound = signal(of([
      contactFound
    ]));
    this.isContactFound = true;
  }
}
