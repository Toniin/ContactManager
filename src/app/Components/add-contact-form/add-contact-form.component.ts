import {Component, inject} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../Services/contact.service";
import {catchError, of, tap} from "rxjs";
import {AutoFocusModule} from "primeng/autofocus";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    AutoFocusModule,
    ToastModule,
  ],
  templateUrl: './add-contact-form.component.html',
  styleUrl: './add-contact-form.component.css',
})
export class AddContactFormComponent {
  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);

  isSubmitting = false;
  inputNameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPhoneNumberError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  newContactForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    phoneNumber: [null, Validators.required],
  })

  onSubmit() {
    const nameInput = document.querySelector('#name')
    const phoneNumberInput = document.querySelector('#phoneNumber')

    if (this.newContactForm.value.name === null || this.newContactForm.value.name.length === 0) {
      nameInput!.classList.add("ng-invalid", "ng-dirty")
      this.inputNameError = {
        isError: true,
        errorMessage: "Please enter name"
      }
    } else {
      this.inputNameError = {
        isError: false,
        errorMessage: ""
      }
    }

    if (this.newContactForm.value.phoneNumber === null || this.newContactForm.value.phoneNumber.length === 0) {
      phoneNumberInput!.classList.add("ng-invalid", "ng-dirty")
      this.inputPhoneNumberError = {
        isError: true,
        errorMessage: "Please enter phone number"
      }
    } else {
      this.inputPhoneNumberError = {
        isError: false,
        errorMessage: ""
      }
    }

    if (this.newContactForm.valid) {
      this.isSubmitting = true;
      this.contactService.addNewContact(this.newContactForm.value).pipe(
        tap(async () => {
            // Promise of 1s to show the loading button when form is submitting
            await new Promise((resolve) => {
              return setTimeout(() => {
                resolve(true)
              }, 1000)
            })
            this.isSubmitting = false;
            this.responseError = {
              isError: false,
              errorMessage: ""
            }
            this.newContactForm.reset()

            this.router.navigateByUrl('/contacts')
          }
        ),
        catchError(async (error) => {
          console.log(error)
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.responseError = {
            isError: true,
            errorMessage: "You do not have permission"
          }
          return of([]);
        })
      ).subscribe()
    }
  }
}
