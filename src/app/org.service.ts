import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  private apiurl= 'http://localhost:3000/orgforminsert';

  constructor(private http:HttpClient) { }

  Orginsert(org: any): Observable<any> {
    console.log('Sending data to API:', org); 

    return this.http.post(this.apiurl, org);
  }

}
