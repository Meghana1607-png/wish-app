import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userId : any;
  orgForm: FormGroup;
  currentStep: number = 1; // Initialize currentStep to 1

  constructor(private fb: FormBuilder, private orgform: OrgService, private router: Router) {
    this.orgForm = this.fb.group({
      orgName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required], // Added address control
      bloodGroups: this.fb.array([]),
    });
    this.userId = localStorage.getItem('userId');
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
      const formData = this.orgForm.value;
      const bloodGroupsData = formData.bloodGroups.map((group: { bloodGroup: string; quantity: number }) => ({

        bloodGroup: group.bloodGroup,
        quantity: group.quantity
      }));

      // Include blood groups in the data sent to the backend
      const dataToSend = {
        orgName: formData.orgName,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bloodGroups: bloodGroupsData,
        userId: this.userId // Send all blood groups
      };

      const res = this.orgform.Orginsert(dataToSend).subscribe({
        next: (response: any) => {
          console.log("response.data", response);
          if (response.error) {
            alert("User already registered with the email.");
            this.orgForm.reset();
            this.currentStep = 1;
          } else {
            this.orgForm.reset();
            this.router.navigate(['/org-dashboard']);
          }
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
