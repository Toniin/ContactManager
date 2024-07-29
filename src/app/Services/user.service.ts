import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../Models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "http://localhost:8080/api/contacts"

  constructor(private http: HttpClient) {
  }

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
