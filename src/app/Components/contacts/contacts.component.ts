import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ContactService} from "../../Services/contact.service";
import {ContactModel} from "../../Models/contact.model";
import {AsyncPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    AsyncPipe,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  contacts$!: Observable<ContactModel[]>;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.contacts$ = this.contactService.getContacts()
  }

  goToAddContact(): void {
    this.router.navigateByUrl('/contact/add');
  }
}
