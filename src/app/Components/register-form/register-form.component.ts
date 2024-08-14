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
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {signUp} from "../../store/user/user.actions";
import {selectUserErrors} from "../../store/user/user.selector";
import {lastValueFrom, take} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
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
    RadioButtonModule,
    AsyncPipe,
    ToastModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store<AppState>)
  private authService = inject(AuthService)

  isSubmitting = false;
  inputUsernameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPasswordError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  errors$ = this.store.select(selectUserErrors);

  registerForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    role: ["USER"],
  });

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/contacts');
    }
  }

  async onRegister() {
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

      // Promise of 1s to show the loading button when form is submitting
      await new Promise((resolve) => {
        return setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      this.store.dispatch(signUp(this.registerForm.value))
      this.isSubmitting = false;

      const errors = await lastValueFrom(this.errors$.pipe(take(2)));

      if (!errors.isError) {
        this.router.navigateByUrl('/login')
      }
    }
  }
}
