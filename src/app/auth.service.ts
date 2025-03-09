import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
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

  async signUp(username: string, email: string, password: string, confirmPassword: string) {
    const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
        username:username,
        confirmPassword:confirmPassword
        // address:address,
        // phno:phno,
        // gender:gender
    });
    // console.log(data);
  // return from(data);
 if (error) { 
        console.error('Signup error:', error.message);
        return;
    }

    if (data?.user) {  
        await this.insertUserIntoDatabase(data.user.id, username, email);
    }

    return data;
}

async insertUserIntoDatabase(userid: string, username: string, email: string) {
    this.http.post('http://localhost:3000/userforminsert', {
        userid: userid, 
        username: username,
        email: email,
        // address:address,
        // phno:phno,
        // gender:gender
    }).subscribe({
        next: (response) => console.log("User inserted successfully", response),
        error: (err) => console.error("Insert error:", err)
    });
}
get auth() {
  return this.supabase.auth;
}

async getUser1() {
  return this.supabase.auth.getSession();
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
  return user?.user?.id;
}
}