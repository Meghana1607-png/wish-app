import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../../org.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  orgForm: FormGroup;
  currentStep: number = 1; // Initialize currentStep to 1

  constructor(private fb: FormBuilder, private orgform: OrgService) {
    this.orgForm = this.fb.group({
      orgName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required], // Added address control
      bloodGroups: this.fb.array([]),
    });
  }

  get bloodGroups(): FormArray {
    return this.orgForm.get('bloodGroups') as FormArray;
  }

  addBloodGroup() {
    const bloodGroupForm = this.fb.group({
      bloodGroup: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    this.bloodGroups.push(bloodGroupForm);
  }

  removeBloodGroup(index: number) {
    this.bloodGroups.removeAt(index);
  }

  onSubmit() {
    if (this.orgForm.valid) {
      console.log(this.orgForm.value);
      this.orgform.Orginsert(this.orgForm.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.orgForm.reset();
        },
        error: (error) => {
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        }
      });
    }
  }

  goToNextStep() {
    if (this.orgForm.get('orgName')?.valid && this.orgForm.get('email')?.valid) {
      this.currentStep = 2; // Move to the next step
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  }

  goToPreviousStep() {
    this.currentStep = 1; // Move back to the previous step
  }
}
