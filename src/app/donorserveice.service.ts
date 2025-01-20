import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonorserveiceService {
  private apiUrl = 'http://localhost:3000/donorforminsert';

  constructor(private http: HttpClient) { }

  Donorinsert(donor: any): Observable<any> {
    console.log('Sending data to API:', donor); // Debugging log

    return this.http.post(this.apiUrl, donor);
  }
}
