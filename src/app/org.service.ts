import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient ,SupabaseClient} from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  private supabase: SupabaseClient;

  private apiurl= 'http://localhost:3000/orgforminsert';
  
  // private api= 'http://localhost:3000/orgformfetch';



  constructor(private http:HttpClient) { 

    this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc')
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
  // orgfetch(data1:any): Observable<any> {
  //   console.log('Sending data to API:',data1 ); 

  //   return this.http.post(this.api,data1);
  // }

}

