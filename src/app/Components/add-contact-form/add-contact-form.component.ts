import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../Services/contact.service";
import {catchError, of, tap} from "rxjs";
import {AutoFocusModule} from "primeng/autofocus";

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    AutoFocusModule,
  ],
  templateUrl: './add-contact-form.component.html',
  styleUrl: './add-contact-form.component.css'
})
export class AddContactFormComponent implements OnInit {
  newContactForm!: FormGroup;
  isSubmitting = false;
  inputNameError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  inputPhoneNumberError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService,
              private router: Router) {
  }

  ngOnInit() {
    this.newContactForm = this.formBuilder.group({
      name: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    })
  }

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
        tap(() => {
            this.isSubmitting = false;
            this.responseError = {
              isError: false,
              errorMessage: ""
            }
            this.newContactForm.reset()

            this.router.navigateByUrl('/contacts')
          }
        ),
        catchError(() => {
          this.isSubmitting = false;
          this.responseError = {
            isError: true,
            errorMessage: "Not allowed."
          }
          return of([]);
        })
      ).subscribe()
    }
  }

  goToBack() {
    this.router.navigateByUrl('/contacts')
  }
}
