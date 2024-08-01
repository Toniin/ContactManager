import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {responseLogin} from "../Models/types";
import {environnement} from "../../Environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environnement.apiUrl
  private authenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(formData: {
    username: string;
    password: string;
  }): Observable<responseLogin> {
    this.authenticated = true;
    return this.http.post<responseLogin>(`${this.apiUrl}/auth/login`, formData)
  }

  logOut(): void {
    this.authenticated = false;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    if (this.authenticated || this.hasToken()) {
      return true
    } else {
      return false
    }
  }

  hasToken():boolean {
    let token = localStorage.getItem("Token");

    if (token === null) {
      return false;
    }
    return true;
  }
}
