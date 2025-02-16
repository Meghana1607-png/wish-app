import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private supabase: SupabaseClient;

  private apiurl = 'http://localhost:3000/orgforminsert';
  private api = 'http://localhost:3000/orgSignIn';
  private apiSignUp = 'http://localhost:3000/orgSignUp';
  private bloodGroupFetchApi = 'http://localhost:3000/api/organization';
  private profileFetchUrl = 'http://localhost:3000/api/organization';
  private fetchPendingReceiversApi =
    'http://localhost:3000/org/receivers/pending';
  private fetchApprovedReceiversApi =
    'http://localhost:3000/org/receivers/approved';
  private fetchRejectedReceiversApi =
    'http://localhost:3000/org/receivers/rejected';
  private fetchAllReceiversApi = 'http://localhost:3000/org/receivers';
  private fetchPendingDonorsApi = 'http://localhost:3000/org/donors/pending';
  private fetchApprovedDonorsApi = 'http://localhost:3000/org/donors/approved';
  private fetchRejectedDonorsApi = 'http://localhost:3000/org/donors/rejected';
  private fetchAllDonorsApi = 'http://localhost:3000/org/donors';
  private updateBloodGroupApi = 'http://localhost:3000/blood-groups/update';
  private addBloodGroupApi = 'http://localhost:3000/blood-groups/addBloodGroup';

  constructor(private http: HttpClient) {
    auth: {
      persistSession: false;
      //  Disables session persistence and lock
    }
    this.supabase = createClient(
      'https://esuzqpwibfnycwmeirtg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc'
    );
  }

  Orginsert(org: any): Observable<any> {
    return this.http.post(this.apiurl, org);
  }
  OrgSignIn(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  OrgSignUp(data: any): Observable<any> {
    return this.http.post(this.apiSignUp, data);
  }

  fetchorgform(id: any): Observable<any> {
    return from(
      this.supabase
        .from('organization')
        .select()
        .then((response) => {
          console.log('Supabase Response:', response);
          return response;
        })
    );
  }

  async getAuthId(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data?.user?.id ?? null;
  }

  async getOrgId(): Promise<string | null> {
    const UID = await this.getAuthId();
    if (!UID) return null;

    const { data, error } = await this.supabase
      .from('organization')
      .select()
      .eq('auth_id', UID)
      .single(); 

    if (error) {
      console.error('Error fetching org_id:', error);
      return null;
    }

    return data?.org_id ?? null;
  }

  fetchProfileByOrg(orgId: string): Observable<any> {
    return this.http.get(`${this.profileFetchUrl}/${orgId}`);
  }

  fetchPendingReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchPendingReceiversApi}/${orgId}`); 
  }

  fetchApprovedReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchApprovedReceiversApi}/${orgId}`); 
  }

  fetchRejectedReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchRejectedReceiversApi}/${orgId}`); // Call to backend API
  }

  fetchAllReceivers(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchAllReceiversApi}/${orgId}`); // Call to backend API
  }

  fetchPendingDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchPendingDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchApprovedDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchApprovedDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchRejectedDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchRejectedDonorsApi}/${orgId}`); // Call to backend API
  }

  fetchAllDonors(orgId: string): Observable<any> {
    return this.http.get(`${this.fetchAllDonorsApi}/${orgId}`); // Call to backend API
  }

  getBloodGroups(userId: any): Observable<any> {
    return this.http.get(`${this.bloodGroupFetchApi}/${userId}`); // Fetch blood group data
  }

  addBloodGroup(
    bloodGroup: any,
    quantity: number,
    userId: any
  ): Observable<any> {
    return this.http.put(`${this.addBloodGroupApi}/${userId}`, {
      bloodGroup: bloodGroup,
      quantity: quantity,
    });
  }

  updateBloodGroupQuantity(
    bloodGroup: any,
    updatedQuantity: number,
    userId: any
  ): Observable<any> {
    return this.http.put(`${this.updateBloodGroupApi}/${userId}`, {
      bloodGroup: bloodGroup,
      quantity: updatedQuantity,
    });
  }
}
