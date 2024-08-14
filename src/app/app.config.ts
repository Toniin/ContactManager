import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./Interceptors/auth.interceptor";
import {provideState, provideStore} from '@ngrx/store';
import {contactsReducer} from "./store/contacts/contacts.reducer";
import {provideEffects} from '@ngrx/effects';
import {ContactsEffects} from "./store/contacts/contacts.effects";
import {UserEffects} from "./store/user/user.effects";
import {userReducer} from "./store/user/user.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore(),
    provideState({
      name: 'contacts',
      reducer: contactsReducer
    }),
    provideState({
      name: 'user',
      reducer: userReducer
    }),
    provideEffects(ContactsEffects, UserEffects)
  ],
};
