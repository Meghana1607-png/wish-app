import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../../org.service'; // Import OrgService
import { catchError, throwError } from 'rxjs'; // Import throwError

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private orgService: OrgService, private router: Router) { // Inject OrgService and Router
    this.signInForm = this.fb.group({
      orgName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.orgService.signIn(this.signInForm.value).pipe(
        catchError(error => {
          console.error('Sign-in error:', error);
          return throwError(error); // Rethrow the error for further handling if needed
        })
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/org']); // Navigate to organization page on successful sign-in
        },
        error: (error) => {
          console.error('Sign-in error:', error);
        }
      });
    }
  }
}
