import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  goToHomePage(): void {
    this.router.navigateByUrl('/');
  }

  goToContactsPage(): void {
    this.router.navigateByUrl('/contacts');
  }
}
