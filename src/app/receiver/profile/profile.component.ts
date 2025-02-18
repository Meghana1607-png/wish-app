import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProfileService } from 'src/app/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  receiverForm: FormGroup;
  userId:any;

  constructor(private fb: FormBuilder, private profile: ProfileService, private router: Router, private supabase:AuthService ) {
    this.receiverForm = this.fb.group({
      // gender: ['', Validators.required],
      phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      age: ['', Validators.required],
      name: ['', Validators.required],

    });
   this.userId= localStorage.getItem('authId')
  }

  
  
  // async submitForm() {
  //   if (this.receiverForm.valid) {
  //     console.log("Form is valid");
  
  //     // Fetch authid from Supabase
  //     const { data, error } = await this.profile.getUser();
  
  //     if (error || !data || !data.user) {
  //       console.error("User not authenticated or fetch error:", error);
  //       alert("User not authenticated. Please log in.");
  //       return;
  //     }
  
  //     console.log("Fetched User ID (authid):", data.user.id);
  
  //     const userFormData = {
  //       userid: data.user.id,
  //       ...this.receiverForm.value
  //     };
  //     console.log("Sending data:", userFormData);
  
  //     this.profile.profileinsert(userFormData).subscribe({
  //       next: (response) => {
  //         console.log("API Response:", response);
  //         alert(response.message);
  //         this.receiverForm.reset();
  //       },
  //       error: (error) => {
  //         console.error("Error:", error);
  //         alert("An error occurred.");
  //       }
  //     });
  //   } else {
  //     alert("Please fill out all required fields.");
  //   }
  // }
  async submitForm() {
    if (this.receiverForm.valid) {
      console.log("Form is valid");
  
      // Check session before fetching user
      const { data: sessionData, error: sessionError } = await this.supabase.getUser();
      console.log("Session Data:", sessionData);
  
      if (sessionError || !sessionData || !sessionData.session) {
        console.error("No active session found:", sessionError);
        // alert("No active session. Please log in again.");
        return;
      }
  
      // Fetch authid from Supabase
      const { data, error } = await this.supabase.getUser();
      console.log("Fetched User Data:", data);
  
      // if (error || !data || !data.user) {
      //   console.error("User not authenticated or fetch error:", error);
      //   alert("User not authenticated. Please log in.");
      //   return;
      // }
  
      console.log("Fetched User ID (authid):", data.user.id);
  
      const userFormData = {
        userid: data.user.id,
        ...this.receiverForm.value
      };
  
      console.log("Sending data:", userFormData);
  
      this.profile.profileinsert(userFormData).subscribe({
        next: (response) => {
          console.log("API Response:", response);
          alert(response.message);
          this.receiverForm.reset();
        },
        error: (error) => {
          console.error("Error:", error);
          alert("An error occurred.");
        }
      });
    } else {
      alert("Please fill out all required fields.");
    }
  }
  
  
  }
  
