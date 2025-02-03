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

  constructor(private fb: FormBuilder, private profile: ProfileService, private router: Router) {
    this.receiverForm = this.fb.group({
      gender: ['', Validators.required],
      phno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.receiverForm.valid) {
      console.log('Form is valid');
      this.profile.profileinsert(this.receiverForm.value).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          alert(response.message);
          this.receiverForm.reset();
          this.router.navigate(['/success']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('An error occurred.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}