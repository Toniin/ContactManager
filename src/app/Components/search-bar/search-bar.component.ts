import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputGroupModule} from "primeng/inputgroup";
import {ContactService} from "../../Services/contact.service";
import {catchError, of, tap} from "rxjs";
import {ContactModel} from "../../Models/contact.model";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    Button,
    NgIf,
    NgClass
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private formBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);

  isSubmitting = false;
  @Output() contactFound: EventEmitter<ContactModel> = new EventEmitter();
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  getContactForm: FormGroup = this.formBuilder.group({
    phoneNumber: [null],
  });

  emitContactFound(contactFound: ContactModel) {
    this.contactFound.emit(contactFound);
  }

  onSubmit() {
    if (this.getContactForm.valid) {
      this.isSubmitting = true;

      this.contactService.getContact(this.getContactForm.value).pipe(
        tap(async (contactFound) => {
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
            this.getContactForm.reset()
            this.emitContactFound(contactFound)
          }
        ),
        catchError(async (error) => {
          // Promise of 1s to show the loading button when form is submitting
          await new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true)
            }, 1000)
          })
          this.isSubmitting = false;
          this.responseError = {
            isError: true,
            errorMessage: error.error.message
          }
          return of([]);
        })
      ).subscribe()
    }
  }
}
