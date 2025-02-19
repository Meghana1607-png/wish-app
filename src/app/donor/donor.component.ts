import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorserveiceService } from '../donorserveice.service';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {

  donorForm: FormGroup;
  // currentStep = 1;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(private fb: FormBuilder,private donor:DonorserveiceService) {
    this.donorForm = this.fb.group({
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      bloodGroup: ['', Validators.required],
      healthIssues: ['',Validators.required],
      lastDonatedDate: ['',Validators.required]
    });
}
get f() {
  return this.donorForm.controls;
}
submitForm() {
  console.log("button clicked!")
  if (this.donorForm.valid) {
    this.donor.Donorinsert(this.donorForm.value).subscribe({
      next: (res:any)=>
        {
        console.log("mecfgtrgvsd")
        alert(res.message);
        this.donorForm.reset();
      },
      error:(error:any)=>{
        console.error('error submiting the form:',error.message);
        alert('an error occurred while submitting the form')
      }

    })
    console.log('Donor Form Submitted', this.donorForm.value);
    
  }
}
}
