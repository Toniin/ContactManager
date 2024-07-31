import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  goToBack() {
    this.router.navigateByUrl('/')
  }
}
