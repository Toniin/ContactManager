import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {signIn, signInFailure, signInSuccess, signUp, signUpFailure, signUpSuccess} from "./user.actions";
import {AuthService} from "../../Services/auth.service";

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService)

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap((user) => this.authService.signUp(user.user).pipe(
          map(data => signUpSuccess({payload: data})),
          catchError(error => {
            return of(signUpFailure({errors: error.error}))
          })
        ))
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap((user) => this.authService.signIn(user.user).pipe(
          map(data => signInSuccess({payload: data})),
          catchError(error => {
            return of(signInFailure({errors: error.error}))
          })
        )
      )
    )
  );
}
