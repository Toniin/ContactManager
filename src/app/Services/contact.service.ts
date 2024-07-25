import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {ContactModel} from "../Models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = "http://localhost:8080/api/contacts"

  constructor(private http: HttpClient) {}

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.apiUrl}`)
  }

  addNewContact(formData: {
    name: string;
    phoneNumber: number;
  }): Observable<ContactModel> {
    return this.http.post<ContactModel>(`${this.apiUrl}/add`, formData)
  }

  removeContact(phoneNumber: number) {
    return this.http.delete(`${this.apiUrl}/delete/${phoneNumber}`, {responseType: 'text'})
  }
}
