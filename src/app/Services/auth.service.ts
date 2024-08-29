import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {responseLogin} from "../Models/types";
import {environment} from "../../Environments/environment";
import {SignInForm, SignUpForm} from "../Models/forms.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.API_URL;
  private http = inject(HttpClient);

  signUp(formData: SignUpForm): Observable<SignUpForm> {
    return this.http.post<SignUpForm>(`${this.apiUrl}/auth/register`, formData)
  }

  signIn(formData: SignInForm): Observable<responseLogin> {
    return this.http.post<responseLogin>(`${this.apiUrl}/auth/login`, formData)
  }

  isAuthenticated() {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const hasToken = localStorage.getItem("Token")

    if (isAuthenticated || hasToken) {
      return true
    } else {
      return false
    }
  }
}
