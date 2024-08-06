import { Routes } from '@angular/router';
import {AuthGuard} from "./Guards/auth.guard";
import {LoginPageComponent} from "./Views/public/login-page/login-page.component";
import {RegisterPageComponent} from "./Views/public/register-page/register-page.component";
import {ErrorPageComponent} from "./Views/public/error-page/error-page.component";
import {AddContactPageComponent} from "./Views/protected/add-contact-page/add-contact-page.component";
import {ContactsPageComponent} from "./Views/protected/contacts-page/contacts-page.component";

const appName = "ContactManager"

export const routes: Routes = [
  { path: '',
    redirectTo: "login",
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginPageComponent,
    title: `Login - ${appName}`
  },
  { path: 'register',
    component: RegisterPageComponent,
    title: `Register - ${appName}`
  },
  { path: "contacts",
    component: ContactsPageComponent,
    canActivate: [AuthGuard],
    title: `Contacts - ${appName}`
  },
  { path: "contacts/add",
    component: AddContactPageComponent,
    canActivate: [AuthGuard],
    title: `Add contact - ${appName}`
  },
  { path: "**",
    component: ErrorPageComponent,
    title: `Not found - ${appName}` }
];
