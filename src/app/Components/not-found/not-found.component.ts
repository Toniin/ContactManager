import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goToBack() {
    this.router.navigateByUrl('/')
  }
}
