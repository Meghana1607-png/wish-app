import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiverService } from 'src/app/receiver.service';


@Component({
  selector: 'app-receiver-form',
  templateUrl: './receiver-form.component.html',
  styleUrls: ['./receiver-form.component.css']
})
export class ReceiverFormComponent {

  patientForm: FormGroup;

  constructor(private fb: FormBuilder,private receiverFormService:ReceiverService) {
    this.patientForm = this.fb.group({
      lastDate: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      bloodQuantity: ['', [Validators.required, Validators.min(1)]], // New field with validation
      emergencyLevel: ['', [Validators.required]],
    });
  }

  get f() {
    return this.patientForm.controls;
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.receiverFormService.submitReceiverForm(this.patientForm.value).subscribe({
        next: (response) => {
          alert(response.message);
          this.patientForm.reset();
        },
        error: (error) => {
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        },
      });
    }
  }
}
