import {Component, inject, Input, OnChanges} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {selectIsAuthenticated} from "../../store/user/user.selector";
import {AsyncPipe} from "@angular/common";
import {signOut} from "../../store/user/user.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnChanges {
  private store = inject(Store<AppState>);
  private router = inject(Router)

  @Input() currentURI!: string;
  isAuthPaths: boolean = false;
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  hasToken: boolean = localStorage.getItem("Token") ? true : false;

  ngOnChanges() {
    if (this.currentURI === '/login' || this.currentURI === '/register') {
      this.isAuthPaths = true;
    } else {
      this.isAuthPaths = false;
    }
  }

  logOut(): void {
    this.store.dispatch(signOut())
    this.router.navigateByUrl('/login');
  }
}
