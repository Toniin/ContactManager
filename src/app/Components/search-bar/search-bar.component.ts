import {Component, inject} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Button, ButtonDirective} from "primeng/button";
import {InputGroupModule} from "primeng/inputgroup";
import {InputMaskModule} from 'primeng/inputmask';
import {phoneFormatLocal_FR_fr, phoneValidator_FR_fr} from "../../../utils/phone.validator";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getContact} from "../../store/contacts/contacts.actions";
import {selectContactsErrors} from "../../store/contacts/contacts.selector";
import {AsyncPipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { interval, take, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    Button,
    InputMaskModule,
    AsyncPipe,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>)
  private messageService = inject(MessageService);

  getContactForm: FormGroup = this.formBuilder.group({
    phoneNumber: [null],
  });

  errors$ = this.store.select(selectContactsErrors);
  isSubmitting = false;

  async onSubmit() {
    if (this.getContactForm.valid) {
      const phoneNumber = this.getContactForm.value.phoneNumber
      this.isSubmitting = true;

      // Promise of 1s to show the loading button when form is submitting
      await new Promise((resolve) => {
        return setTimeout(() => {
          resolve(true)
        }, 1000)
      })

      this.store.dispatch(getContact(phoneNumber))
      this.isSubmitting = false;

      const errors = await lastValueFrom(this.errors$.pipe(take(2)));

      this.messageService.clear('errorFound-contact');
      this.messageService.add({
        key: 'errorFound-contact',
        severity: 'error',
        summary: errors.message,
        detail: `Contact with phone ${phoneFormatLocal_FR_fr(phoneNumber)} is not found`
      })
    }
  }

  protected readonly phoneValidator_FR_fr = phoneValidator_FR_fr;
}
