import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent {

  step: number = 1; // Tracks the current step
  personalForm: FormGroup;
  additionalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Step 1: Personal Details Form
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Step 2: Additional Details Form
    this.additionalForm = this.fb.group({
      address: ['', Validators.required],
      phno: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    });
  }

  // Proceed to the next step
  nextStep() {
    if (this.personalForm.valid) {
      this.step = 2;
    } else {
      this.personalForm.markAllAsTouched(); // Highlights all invalid fields
    }
  }

  // Submit the form
  submitForm() {
   alert("form invalid!")

    if (this.additionalForm.valid) {
      const finalData = {
        ...this.personalForm.value,
        ...this.additionalForm.value,
      };
      console.log('Form Submitted Successfully:', finalData);
      alert('Form Submitted Successfully!');
    } else {
      this.additionalForm.markAllAsTouched(); // Highlights all invalid fields
    }
  }}
