import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactModel} from "../Models/contact.model";
import {environment} from "../../Environments/environment";
import {phoneFormatInternational_FR_fr} from "../../utils/phone.validator";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environment.API_URL
  private http = inject(HttpClient);

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.apiUrl}`)
  }

  getContact(phoneNumber: string): Observable<ContactModel> {
    return this.http.get<ContactModel>(`${this.apiUrl}/find/${phoneNumber}`)
  }

  addNewContact(newContact: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(`${this.apiUrl}/add`, newContact)
  }

  updateContact(contactUpdated: ContactModel): Observable<ContactModel> {
    return this.http.put<ContactModel>(`${this.apiUrl}/update/${contactUpdated.phoneNumber}`, contactUpdated)
  }

  deleteContact(phoneNumber: string) {
    const phone = phoneFormatInternational_FR_fr(phoneNumber)

    return this.http.delete(`${this.apiUrl}/delete/${phone}`, {responseType: 'json'})
  }
}
