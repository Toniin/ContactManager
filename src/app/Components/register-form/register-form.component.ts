import {Component, inject, OnInit} from '@angular/core';
import {AutoFocus} from "primeng/autofocus";
import {Button} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {UserService} from "../../Services/user.service";
import {catchError, of, tap} from "rxjs";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    AutoFocus,
    Button,
    InputNumberModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    PasswordModule,
    RadioButtonModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isSubmitting = false;
  inputUsernameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPasswordError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  formError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  registerForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    role: ["USER"],
  });

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/contacts');
    }
  }

  onRegister(): void {
    const usernameInput = document.querySelector('#username')
    const passwordInput = document.querySelector('#password')

    if (this.registerForm.value.username === null || this.registerForm.value.username.length === 0) {
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

    if (this.registerForm.value.password === null || this.registerForm.value.password.length === 0) {
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

    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.userService.createUser(this.registerForm.value).pipe(
        tap(async () => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.formError = {
            isError: false,
            errorMessage: ""
          }
          this.router.navigateByUrl('/login')
        }),
        catchError(async (error) => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.formError = {
            isError: true,
            errorMessage: error.error.message
          }
          return of([]);
        })
      ).subscribe()
    }
  }
}
