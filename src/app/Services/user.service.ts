import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../Models/user.model";
import {environnement} from "../../Environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environnement.apiUrl
  private http = inject(HttpClient);

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/auth/register`, user)
  }

  loginUser(formData: {
    username: string;
    password: string;
  }): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/auth/login`, formData)
  }
}
