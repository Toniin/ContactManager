import { Routes } from '@angular/router';
import {ContactsComponent} from "./Components/contacts/contacts.component";
import {AddContactFormComponent} from "./Components/add-contact-form/add-contact-form.component";
import {RegisterComponent} from "./Components/register/register.component";
import {LoginComponent} from "./Components/login/login.component";
import {AuthGuard} from "./Guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "contacts", component: ContactsComponent, canActivate: [AuthGuard]},
  { path: "contacts/add", component: AddContactFormComponent, canActivate: [AuthGuard]}
];
