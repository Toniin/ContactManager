import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {}
