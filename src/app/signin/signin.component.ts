import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
FormBuilder


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private service: ProfileService) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  OnSubmit() {
    if (this.signinForm.valid) {
      console.log('Form Submitted', this.signinForm.value);

      const { email, password } = this.signinForm.value;
      this.auth.signIn(email, password).subscribe({
        next: (res: any) => {

          if (res.error) {
            alert('user login failed')
          } else {
            console.log(res)
            const authId = res.data.user.id;
            localStorage.setItem('authId', authId);
            console.log('Auth ID stored:', authId);
            // this.service.profilefetch(localStorage.getItem('authId')).subscribe({
            //   next: (res: any) => {
            //     console.log(res)
            //     if (res.error) {
            //       alert('profile fetch error')
            //     }
            //     else {
            //       if (res.data[0].gender == null) {
            //         this.router.navigateByUrl('/rprofile')
            //       }
            //       else {
            //         this.router.navigateByUrl('/rec-dashboard')
            //       }
            //     }
            //   }
            // })



  //         }

  //       }
  //     });
  //   }
  // }

  this.service.profilefetch(localStorage.getItem('authId')).subscribe({
    next: (res: any) => {
      console.log(" API Response:", res); // Log the entire response
  
      if (!res || !res.data || res.data.length === 0) {
        console.error(" Error: No user data received");
        alert("Profile fetch error: No user data found.");
        return;
      }
  
      const userProfile = res.data[0]; // First object in the array
  
      console.log(" User Profile:", userProfile); // Log the fetched user profile
  
      if (userProfile.gender == null) {
        this.router.navigateByUrl('/rprofile');
      } else {
        this.router.navigateByUrl('/rec-dashboard');
      }
    },
    error: (err) => {
      console.error("API Fetch Error:", err);
      alert("Profile fetch error");
    }
  });
  
}

}
});
}
}
  
  navigateToSignup() {
    this.router.navigate(['/Sign-up']);
  }
}
