import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orgnization',
  templateUrl: './orgnization.component.html',
  styleUrls: ['./orgnization.component.css']
})
export class OrgnizationComponent {

  orgForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orgForm = this.fb.group({
      orgName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      bloodGroups: this.fb.array([]), // FormArray for blood groups
    });
  }

  // Getter for the BloodGroups FormArray
  get bloodGroups(): FormArray {
    return this.orgForm.get('bloodGroups') as FormArray;
  }

  // Method to Add a New Blood Group
  addBloodGroup() {
    const bloodGroupForm = this.fb.group({
      bloodGroup: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    this.bloodGroups.push(bloodGroupForm);
  }

  // Method to Remove a Blood Group
  removeBloodGroup(index: number) {
    this.bloodGroups.removeAt(index);
  }

  // Submit the Form
  onSubmit() {
    if (this.orgForm.valid) {
      console.log(this.orgForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Form is invalid. Please check the errors.');
    }
  }
}