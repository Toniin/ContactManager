import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactModel} from "../Models/contact.model";
import {environnement} from "../../Environnements/environnement";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environnement.apiUrl

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.apiUrl}`)
  }

  getContact(formData: {
    phoneNumber: number;
  }): Observable<ContactModel> {
    return this.http.get<ContactModel>(`${this.apiUrl}/find/${formData.phoneNumber}`)
  }

  addNewContact(formData: {
    name: string;
    phoneNumber: number;
  }): Observable<ContactModel> {
    return this.http.post<ContactModel>(`${this.apiUrl}/add`, formData)
  }

  updateContact(newContact: ContactModel): Observable<ContactModel> {
    const contactToUpdate = {
      "name": newContact.name,
      "phoneNumber": newContact.phoneNumber,
    }

    return this.http.put<ContactModel>(`${this.apiUrl}/update/${newContact.phoneNumber}`, contactToUpdate)
  }

  removeContact(phoneNumber: number) {
    return this.http.delete(`${this.apiUrl}/delete/${phoneNumber}`, {responseType: 'text'})
  }
}
