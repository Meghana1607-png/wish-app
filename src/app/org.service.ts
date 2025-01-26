import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/orgforminsert';
  private api = 'http://localhost:3000/orgformfetch';

  constructor(private http: HttpClient) {
    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co', 'YOUR_SUPABASE_ANON_KEY');
  }

  signIn(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/signin', credentials);
  }

  Orginsert(org: any): Observable<any> {
    console.log('Sending data to API:', org);
    return this.http.post(this.apiurl, org);
  }
  
  async fetchorgform(): Promise<any>{
    const {data,error}= await this.supabase.from('organization')
    .select('name,email')
    // .eq('org_id', '9e41a25c-e9e2-4d85-af34-16aa103a50b7');
    if(data){
      console.log("fetched org",data);
      return data;
    }
    console.log("error fetching org",error)
    return null;
  }

  orgfetch(data1: any): Observable<any> {
    console.log('Sending data to API:', data1);
    return this.http.post(this.api, data1);
  }

}


  
