import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Button} from "primeng/button";
import {AddContactFormComponent} from "../../../Components/add-contact-form/add-contact-form.component";

@Component({
  selector: 'app-add-contact-page',
  standalone: true,
  imports: [
    Button,
    AddContactFormComponent
  ],
  templateUrl: './add-contact-page.component.html',
  styleUrl: './add-contact-page.component.css'
})
export class AddContactPageComponent {
  constructor(private router: Router) {}

  goToBack() {
    this.router.navigateByUrl('/contacts')
  }
}
