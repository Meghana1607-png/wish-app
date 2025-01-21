import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiverService } from 'src/app/receiver.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 receiverForm: FormGroup;
 
  constructor(private fb: FormBuilder, private receiverFormService:ReceiverService ,private router:Router) {
    this.receiverForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      ph_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      location: [''],
      date: ['', Validators.required],
      purpose: [''],
      email: ['', [Validators.required, Validators.email]],
      blood_group: [''],
      health_issues: [''],
      last_donated: [''],
    });
  }
 
  submitForm() {
    if (this.receiverForm.valid) {
      this.receiverFormService.submitReceiverForm(this.receiverForm.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.receiverForm.reset();
        },
        error: (error) => {
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        },
      });
    }
  }
 }
