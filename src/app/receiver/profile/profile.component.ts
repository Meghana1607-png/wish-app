import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  receiverForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.receiverForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      bloodGroup: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      emergencyLevel: ['', Validators.required],
      lastDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.receiverForm.valid) {
      console.log(this.receiverForm.value);
      alert('Form submitted successfully!');
    } else {
      this.receiverForm.markAllAsTouched();
    }
  }

}
