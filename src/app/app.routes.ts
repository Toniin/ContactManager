import { Routes } from '@angular/router';
import {AuthGuard} from "./Guards/auth.guard";
// import {LoginPageComponent} from "./Views/public/login-page/login-page.component";
// import {RegisterPageComponent} from "./Views/public/register-page/register-page.component";
// import {ErrorPageComponent} from "./Views/public/error-page/error-page.component";
// import {AddContactPageComponent} from "./Views/protected/add-contact-page/add-contact-page.component";
// import {ContactsPageComponent} from "./Views/protected/contacts-page/contacts-page.component";

const appName = "ContactManager"

export const routes: Routes = [
  { path: '',
    redirectTo: "login",
    pathMatch: 'full'
  },
  { path: 'login',
    loadComponent: () => import('./Views/public/login-page/login-page.component').then(mod => mod.LoginPageComponent),
    // component: LoginPageComponent,
    title: `Login - ${appName}`
  },
  { path: 'register',
    loadComponent: () => import('./Views/public/register-page/register-page.component').then(mod => mod.RegisterPageComponent),
    // component: RegisterPageComponent,
    title: `Register - ${appName}`
  },
  { path: "contacts",
    loadComponent: () => import('./Views/protected/contacts-page/contacts-page.component').then(mod => mod.ContactsPageComponent),
    // component: ContactsPageComponent,
    canActivate: [AuthGuard],
    title: `Contacts - ${appName}`
  },
  { path: "contacts/add",
    loadComponent: () => import('./Views/protected/add-contact-page/add-contact-page.component').then(mod => mod.AddContactPageComponent),
    // component: AddContactPageComponent,
    canActivate: [AuthGuard],
    title: `Add contact - ${appName}`
  },
  { path: "**",
    loadComponent: () => import('./Views/public/error-page/error-page.component').then(mod => mod.ErrorPageComponent),
    // component: ErrorPageComponent,
    title: `Not found - ${appName}` }
];
