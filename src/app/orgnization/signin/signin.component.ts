import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../../org.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

signInForm: FormGroup;

  constructor(private fb: FormBuilder, private orgService: OrgService, private router: Router) { // Inject OrgService and Router
    this.signInForm = this.fb.group({
      orgName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.orgService.Orginsert(this.signInForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/org']); 
        },
        error: (error) => {
          console.error('Sign-in error:', error);
        }
      });
    }
  }
}

