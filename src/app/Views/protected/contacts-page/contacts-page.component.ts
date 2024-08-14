import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {ContactsComponent} from "../../../Components/contacts/contacts.component";
import {SearchBarComponent} from "../../../Components/search-bar/search-bar.component";
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getContacts} from "../../../store/contacts/contacts.actions";

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
  private store = inject(Store<AppState>)

  isContactFound$ = this.store.select(state => state.contacts.isContactFound);

  resetContacts() {
    this.store.dispatch(getContacts())
  }
}
