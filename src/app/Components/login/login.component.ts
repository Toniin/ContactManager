import {Component, effect, signal, WritableSignal} from '@angular/core';
import {AutoFocus} from "primeng/autofocus";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, count, of, tap} from "rxjs";
import {AuthService} from "../../Services/auth.service";
import {responseLogin} from "../../Models/types";

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  inputUsernameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPasswordError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }


  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  goToRegisterForm() {
    this.router.navigateByUrl('/register');
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
        tap((user: responseLogin) => {
          localStorage.setItem("Token", user.token);

          this.isSubmitting = false;
          this.responseError = {
            isError: false,
            errorMessage: ""
          }
          this.loginForm.reset()

          this.router.navigateByUrl('/contacts')
        }),
        catchError(() => {
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
