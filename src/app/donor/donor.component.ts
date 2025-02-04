import { Component } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';




@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
  donorForm: FormGroup;
  currentStep = 1;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(private fb: FormBuilder) {
    this.donorForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      address: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      healthIssues: [''],
      lastDonatedDate: ['']
    });
}
goToNextStep() {
  if (this.isStepValid(1)) {
    this.currentStep = 2;
  }
}

isStepValid(step: number): boolean {
  if (step === 1) {
    return this.donorForm.controls['username'].valid &&
           this.donorForm.controls['email'].valid &&
           this.donorForm.controls['password'].valid;
  }
  return true;
}

submitForm() {
  if (this.donorForm.valid) {
    console.log('Donor Form Submitted', this.donorForm.value);
  }
}
}