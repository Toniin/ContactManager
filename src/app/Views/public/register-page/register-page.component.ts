import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {RegisterFormComponent} from "../../../Components/register-form/register-form.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    Button,
    RegisterFormComponent,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {}
