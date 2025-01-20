import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService {
  private apiurl= 'http://localhost:3000/receiverforminsert';

  constructor(private http:HttpClient) { }

  
  submitReceiverForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiurl, formData, { headers });
  }
}
