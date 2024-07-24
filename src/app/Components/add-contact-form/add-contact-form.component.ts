import {Component, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContactService} from "../../Services/contact.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './add-contact-form.component.html',
  styleUrl: './add-contact-form.component.css'
})
export class AddContactFormComponent implements OnInit{
  newContactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService,
              private router: Router) {}

  ngOnInit() {
    this.newContactForm = this.formBuilder.group({
      name: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    }, {
      updateOn: 'blur'
    })
  }

  onSubmit() {
    this.contactService.addNewContact(this.newContactForm.value).pipe(
      tap(() =>
        this.router.navigateByUrl('/contacts')
      )
    ).subscribe()
  }
}
