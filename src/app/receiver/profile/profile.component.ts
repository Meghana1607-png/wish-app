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
console: any;
 
  constructor(private fb: FormBuilder, private profile:ProfileService ,private router:Router) {
    this.receiverForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],

      gender: ['', Validators.required],
      ph_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      location: [''],
      date: ['', Validators.required],
      purpose: [''],
      email: ['', [Validators.required, Validators.email]],
      // blood_group: [''],
      // health_issues: [''],
      // last_donated: [''],
    });
  }
 
  submitForm() {
    console.log('Submit button clicked');
    if (this.receiverForm.valid) {
      console.log('Form is valid');
      this.profile.profileinsert(this.receiverForm.value).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          alert(response.message);
          this.receiverForm.reset();
        },
        error: (error) => {
          console.error('Error:', error);
          alert('An error occurred.');
        },
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill out all required fields.');
    }
  }
  
  
 }
