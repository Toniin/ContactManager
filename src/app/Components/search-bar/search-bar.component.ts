import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class SearchBarComponent implements OnInit {
  getContactForm!: FormGroup;
  isSubmitting = false;
  @Output() contactFound: EventEmitter<ContactModel> = new EventEmitter();
  responseError: { isError: boolean, errorMessage: string } = {isError: false, errorMessage: ""}

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService) {
  }

  ngOnInit() {
    this.getContactForm = this.formBuilder.group({
      phoneNumber: [null],
    })
  }

  emitContactFound(contactFound: ContactModel) {
    this.contactFound.emit(contactFound);
  }

  onSubmit() {
    if (this.getContactForm.valid) {
      this.isSubmitting = true;

      this.contactService.getContact(this.getContactForm.value).pipe(
        tap((contactFound) => {
            this.isSubmitting = false;
            this.responseError = {
              isError: false,
              errorMessage: ""
            }
            this.getContactForm.reset()
            this.emitContactFound(contactFound)
          }
        ),
        catchError(() => {
          this.isSubmitting = false;
          this.responseError = {
            isError: true,
            errorMessage: "Contact not found"
          }
          return of([]);
        })
      ).subscribe()
    }
  }
}
