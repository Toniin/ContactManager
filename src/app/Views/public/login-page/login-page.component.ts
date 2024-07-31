import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Router} from "@angular/router";
import {LoginFormComponent} from "../../../Components/login-form/login-form.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    Button,
    LoginFormComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private router: Router) {
  }

  goToRegisterForm() {
    this.router.navigateByUrl('/register');
  }
}
