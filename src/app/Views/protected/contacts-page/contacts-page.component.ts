import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
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

  contacts$: Observable<ContactModel[]> = this.contactService.getContacts()
  contactFound$!: Observable<ContactModel[]>;
  isReset = true;

  resetContactFound() {
    this.isReset = true
  }

  getContactFound(contactFound: ContactModel) {
    this.contactFound$ = of([
      contactFound
    ]);
    this.isReset = false;
  }}
