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
  private api = 'http://localhost:3000/orgSignIn';
  private bloodGroupApi = 'http://localhost:3000/bloodgroups'; // Endpoint for blood groups
  
  constructor(private http: HttpClient) { 
    auth: {
      persistSession: false
      //  Disables session persistence and lock
    }
    this.supabase = createClient("https://esuzqpwibfnycwmeirtg.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc")
  }

  Orginsert(org: any): Observable<any> {
    return this.http.post(this.apiurl, org);
  }

  OrgSignIn(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  fetchorgform(): Observable<any> {
    return from(
      this.supabase
        .from('organization')
        .select()
        // .eq('id', '911cf22c-5e08-4279-aabd-5ac42d69f25a')
        .then((response) => {
          console.log('Supabase Response:', response);
          return response;
        })
    );
  }
  fetchorg(id:any): Observable<any> {
    return from(
      this.supabase
        .from('organization')
        .select('*')
        .eq('org_id','6323145f-303e-4fb6-a23e-d8b299eb85ae')
        .then((response) => {
          return response;
        })
    );
  }

  getBloodGroups(): Observable<any> {
    return this.http.get(this.bloodGroupApi); // Fetch blood group data
  }

  addBloodGroup(bloodGroupData: { name: string; units: number }): Observable<any> {
    return this.http.post(this.bloodGroupApi, bloodGroupData); // Add blood group data
  }

}


  
