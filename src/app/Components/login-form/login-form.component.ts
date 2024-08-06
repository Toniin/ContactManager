import {Component, inject, OnInit} from '@angular/core';
import {AutoFocus} from "primeng/autofocus";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, of, tap} from "rxjs";
import {AuthService} from "../../Services/auth.service";
import {responseLogin} from "../../Models/types";

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
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isSubmitting = false;
  inputUsernameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPasswordError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  })

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }
  }

  onLogin(): void {
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

      this.authService.loginUser(this.loginForm.value).pipe(
        tap(async (user: responseLogin) => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })

          localStorage.setItem("Token", user.token);

          this.isSubmitting = false;
          this.responseError = {
            isError: false,
            errorMessage: ""
          }
          this.loginForm.reset()

          this.router.navigateByUrl('/contacts')
        }),
        catchError(async () => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.responseError = {
            isError: true,
            errorMessage: "Incorrect username or password."
          }
          return of([]);
        })
      ).subscribe()
    }
  }
}
