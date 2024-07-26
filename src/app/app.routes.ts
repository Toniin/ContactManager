import { Routes } from '@angular/router';
import {ContactsComponent} from "./Components/contacts/contacts.component";
import {AddContactFormComponent} from "./Components/add-contact-form/add-contact-form.component";
import {RegisterComponent} from "./Components/register/register.component";

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: "contacts", component: ContactsComponent},
  { path: "contacts/add", component: AddContactFormComponent}
];
