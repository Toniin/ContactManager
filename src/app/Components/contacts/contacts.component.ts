import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ContactService} from "../../Services/contact.service";
import {ContactModel} from "../../Models/contact.model";
import {AsyncPipe} from "@angular/common";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    AsyncPipe,
    TableModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  contacts$!: Observable<ContactModel[]>;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts$ = this.contactService.getContacts()
  }
}
