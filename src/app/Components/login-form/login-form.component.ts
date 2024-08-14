import {Component, inject, OnInit} from '@angular/core';
import {AutoFocus} from "primeng/autofocus";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {selectUserErrors} from "../../store/user/user.selector";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {signIn} from "../../store/user/user.actions";
import {lastValueFrom, take} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    AutoFocus,
    Button,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    ReactiveFormsModule,
    ToastModule,
    AsyncPipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store<AppState>)
  private authService = inject(AuthService)

  isSubmitting = false;
  inputUsernameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPasswordError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  errors$ = this.store.select(selectUserErrors);

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  })

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/contacts');
    }
  }

  async onLogin() {
    const usernameInput = document.querySelector('#username')
    const passwordInput = document.querySelector('#password')

    if (this.loginForm.value.username === null || this.loginForm.value.username.length === 0) {
      usernameInput!.classList.add("ng-invalid", "ng-dirty")
      this.inputUsernameError = {
        isError: true,
        errorMessage: "Please enter username"
      }
    } else {
      usernameInput!.classList.remove("ng-invalid", "ng-dirty")
      this.inputUsernameError = {
        isError: false,
        errorMessage: ""
      }
    }

    if (this.loginForm.value.password === null || this.loginForm.value.password.length === 0) {
      passwordInput!.classList.add("ng-invalid", "ng-dirty")
      this.inputPasswordError = {
        isError: true,
        errorMessage: "Please enter password"
      }
    } else {
      passwordInput!.classList.remove("ng-invalid", "ng-dirty")
      this.inputPasswordError = {
        isError: false,
        errorMessage: ""
      }
    }

    if (this.loginForm.valid) {
      this.isSubmitting = true;

      // Promise of 1s to show the loading button when form is submitting
      await new Promise((resolve) => {
        return setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      this.store.dispatch(signIn(this.loginForm.value))
      this.isSubmitting = false;

      const errors = await lastValueFrom(this.errors$.pipe(take(2)));

      if (!errors.isError) {
        this.loginForm.reset()
        this.router.navigateByUrl('/contacts')
      }
    }
  }
}
