import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  bloodForm: FormGroup;
  submitted = false;
  healthIssueIsYes = false;

  constructor(private fb: FormBuilder) {
    this.bloodForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      healthIssues: ['', Validators.required],
    });
  }

  onHealthChange() {
    const healthIssuesValue = this.bloodForm.get('healthIssues')?.value;
    this.healthIssueIsYes = healthIssuesValue === 'Yes';
  }

  onSubmit() {
    this.submitted = true;
    if (this.bloodForm.valid && !this.healthIssueIsYes) {
      console.log('Form Submitted:', this.bloodForm.value);
    }
  }}
