import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiverService } from './receiver.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//   title = 'blood_bridge';
  
//  receiverForm: FormGroup;

//  constructor(private fb: FormBuilder, private receiverFormService: ReceiverService) {
//    this.receiverForm = this.fb.group({
//      name: ['', Validators.required],
//      gender: ['', Validators.required],
//      ph_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//      location: [''],
//      date: ['', Validators.required],
//      purpose: [''],
//      email: ['', [Validators.required, Validators.email]],
//      blood_group: [''],
//      health_issues: [''],
//      last_donated: [''],
//    });
//  }

//  submitForm() {
//    if (this.receiverForm.valid) {
//      this.receiverFormService.submitReceiverForm(this.receiverForm.value).subscribe({
//        next: (response) => {
//          alert(response.message);
//          this.receiverForm.reset();
//        },
//        error: (error) => {
//          console.error('Error submitting the form:', error.message);
//          alert('An error occurred while submitting the form.');
//        },
//      });
//    }
//  }
// }
private supabase: SupabaseClient;

constructor(private router: Router) {
  this.supabase = createClient('https://esuzqpwibfnycwmeirtg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdXpxcHdpYmZueWN3bWVpcnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjA1MTQsImV4cCI6MjA1MDUzNjUxNH0.FUL9viBXkN2Q44hhdFKPj8uKBT0SkJqcSfbjPV2oExc');
}

async ngOnInit() {
  await this.restoreSession();
}

async restoreSession() {
  const { data: session } = await this.supabase.auth.getSession();

  if (session?.session?.user) {
    console.log("Session restored, user:", session.session.user);
    localStorage.setItem('authId', session.session.user.id);
  } else {
    console.warn("No active session found, redirecting to login.");
    localStorage.removeItem('authId');
    this.router.navigateByUrl('/signin');
  }
}}