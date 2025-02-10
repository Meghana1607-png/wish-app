import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable,from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/userforminsert';

  constructor(private http:HttpClient) { 

    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc')
  }

   profileinsert(data: any): Observable<any> {
    console.log('Sending data to API:', data); 

    return this.http.post(this.apiurl, data);
  }
  async form(): Promise<any> {
    const { data, error } = await this.supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users:', error.message);
      return null;
    }
    console.log('Fetched users:', data);
    return data;
  }
  // setAuthId(authId: string) {
  //   localStorage.setItem('authId', authId);
  //   console.log('setitem',authId)
  // }
}
