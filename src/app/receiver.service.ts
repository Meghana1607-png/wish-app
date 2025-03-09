import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  
  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/receiverforminsert';

  constructor(private http:HttpClient) { 
    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc')
  
  
    }

  
  submitReceiverForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiurl, formData, { headers });
  }
}
