import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  receiverForm: FormGroup;
  userId:any;

  constructor(private fb: FormBuilder, private profile: ProfileService, private router: Router) {
    this.receiverForm = this.fb.group({
      // gender: ['', Validators.required],
      phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      age: ['', Validators.required],
      name: ['', Validators.required],

    });
   this.userId= localStorage.getItem('authId')
  }

  
  
    async submitForm() {
      if (this.receiverForm.valid) {
        console.log(' Form is valid');
  
        // Fetch authid from Supabase
        const { data: { user } } = await this.profile.getUser();
        if (!user) {
          console.error(" User not authenticated");
          alert("User not authenticated. Please log in.");
          return;
        }
  
        console.log(" Fetched User ID (authid):", user.id);
  
        const userFormData = {
          userid: user.id, 
          ...this.receiverForm.value
        };
  
        console.log(" Sending data:", userFormData);
  
        this.profile.profileinsert(userFormData).subscribe({
          next: (response) => {
            console.log(' API Response:', response);
            alert(response.message);
            this.receiverForm.reset();
          },
          error: (error) => {
            console.error(' Error:', error);
            alert('An error occurred.');
          }
        });
  
      } else {
        alert(' Please fill out all required fields.');
      }
    }
  }
  
