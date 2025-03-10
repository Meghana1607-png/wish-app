import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class DonorserveiceService {
  private apiUrl = 'http://localhost:3000/donorforminsert';
  private supabase: SupabaseClient
  constructor(private http: HttpClient) {
    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc'
    )
  }
  Donorinsert(donor: any): Observable<any> {
    console.log('Sending data to API:', donor);
    return this.http.post(this.apiUrl, donor);
  }
}
