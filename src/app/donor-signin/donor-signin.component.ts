import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-donor-signin',
  templateUrl: './donor-signin.component.html',
  styleUrls: ['./donor-signin.component.css']
})
export class DonorSigninComponent {


signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ,private auth:AuthService) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  OnSubmit() {
    if (this.signinForm.valid) {
      console.log('Form Submitted', this.signinForm.value);
      // Perform login logic here
      this.router.navigate(['/donor-dashboard'])
    }
  }

  navigateToSignup() {
    this.router.navigate(['/dsign-up']);
  }
}



