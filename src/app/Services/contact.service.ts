import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {ContactModel} from "../Models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.apiUrl}/api/contacts`)
  }
}
