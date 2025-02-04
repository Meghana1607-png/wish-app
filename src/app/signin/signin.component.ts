import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
FormBuilder


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
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
    }
  }

  navigateToSignup() {
    this.router.navigate(['/Sign-up']);
  }
}
