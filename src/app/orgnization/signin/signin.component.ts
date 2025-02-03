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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.orgService.OrgSignIn(this.signInForm.value)
      .subscribe({
        next: (response) => {
          console.log("response", response);
          if(response.data){
            this.signInForm.reset();
            localStorage.setItem('userId',response.data.user.id)
            this.router.navigate(['/org-dashboard']);
          }
          else{
            this.signInForm.reset();
            alert('Invalid Email or Password');
          }
        },
        error:(error)=>{
          this.signInForm.reset();
          alert('Invalid Email or Password');
        }
      });
    }
  }
}

