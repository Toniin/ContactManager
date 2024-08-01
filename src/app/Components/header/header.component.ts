import {Component, inject, Input, OnChanges, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnChanges {
  private authService = inject(AuthService);

  @Input() currentURI!: string;
  isAuthPaths: boolean = false;
  isLoggedIn: boolean = this.authService.isLoggedIn();

  ngOnChanges() {
    if (this.currentURI === '/login' || this.currentURI === '/register') {
      this.isAuthPaths = true;
    } else {
      this.isAuthPaths = false;
    }
  }

  logOut(): void {
    this.authService.logOut()
  }
}
