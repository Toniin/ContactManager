import { Routes } from '@angular/router';
import {ContactsComponent} from "./Components/contacts/contacts.component";
import {AddContactFormComponent} from "./Components/add-contact-form/add-contact-form.component";
import {RegisterComponent} from "./Components/register/register.component";
import {LoginComponent} from "./Components/login/login.component";
import {AuthGuard} from "./Guards/auth.guard";
import {NotFoundComponent} from "./Components/not-found/not-found.component";

const appName = "ContactManager"

export const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: `Login - ${appName}` },
  { path: 'register', component: RegisterComponent, title: `Register - ${appName}` },
  { path: "contacts", component: ContactsComponent, canActivate: [AuthGuard], title: `Contacts - ${appName}`},
  { path: "contacts/add", component: AddContactFormComponent, canActivate: [AuthGuard], title: `Add contact - ${appName}`},
  { path: "**", component: NotFoundComponent, title: `Not found - ${appName}` }
];
