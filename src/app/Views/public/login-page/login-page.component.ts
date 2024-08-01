import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {LoginFormComponent} from "../../../Components/login-form/login-form.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    Button,
    LoginFormComponent,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {}
