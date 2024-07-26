import { Routes } from '@angular/router';
import {ContactsComponent} from "./Components/contacts/contacts.component";
import {AddContactFormComponent} from "./Components/add-contact-form/add-contact-form.component";

export const routes: Routes = [
  { path: "contacts", component: ContactsComponent},
  { path: "contacts/add", component: AddContactFormComponent}
];
