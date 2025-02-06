import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //  private supabase: SupabaseAuthClient;
  supabase:any
  
  
    constructor(private http:HttpClient,private route:Router) { 
  
      this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc')
    }

  async signUp(username: string, email: string, password: string,confirmPassword: string) {
    const res = await this.supabase.auth.signUp({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
    return res;
}


signIn(email: string, password: string) {
  const res =  this.supabase.auth.signInWithPassword({
    email: email,
    password: password
  }
  )
  console.log(res);
  return from(res);
}
async getUser() {
  const { data: user, error } = await this.supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return user?.user?.id; // Returns the auth_id
}
}