import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from 'src/app/org.service';
import { ReceiverService } from 'src/app/receiver.service';


@Component({
  selector: 'app-receiver-form',
  templateUrl: './receiver-form.component.html',
  styleUrls: ['./receiver-form.component.css']
})
export class ReceiverFormComponent {

  organizations: any[] = [];

  patientForm: FormGroup;

  constructor(private fb: FormBuilder,private receiverFormService:ReceiverService,private orgform:OrgService) {
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

// orgdetails(){
//   this.orgform.fetchorgform().subscribe({
//    next: (response) => {
   
//       console.error('error fetching data:',response);
//     },
//     else{
//       this.organizations= response.data;
//       console.log('orfanization fetched:', this.organizations);
//     }
//    }
  //  if(error) =>{
  //   console.error('unexpected error:',error)
  //  }
  // }
  // );
orgdetails(){
  this.orgform.fetchorgform().subscribe({
    next: (response) => {
      console.log('Donor added successfully', response);
    },
    error: (error) => {
      console.error('Error adding donor:', error);
      if (error.status === 500) {
        console.error('Internal Server Error. Check the backend for details.');
      }
    },
  });
}
}

