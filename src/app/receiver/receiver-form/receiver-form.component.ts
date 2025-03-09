import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';
import { ReceiverService } from 'src/app/receiver.service';


@Component({
  selector: 'app-receiver-form',
  templateUrl: './receiver-form.component.html',
  styleUrls: ['./receiver-form.component.css']
})
export class ReceiverFormComponent {

  organizations: any[] = [];
  data1:any
  org:any

  patientForm: FormGroup;

  constructor(private fb: FormBuilder,private receiverFormService:ReceiverService,private orgform:OrgService,private router:Router) {
    this.patientForm = this.fb.group({
      date: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      blood_quatity: ['', [Validators.required, Validators.min(1)]], // New field with validation
      emergency: ['', [Validators.required]],
    });
  }

  get f() {
    return this.patientForm.controls;
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.receiverFormService.submitReceiverForm(this.patientForm.value).subscribe({
        next: (response) => {
          console.log("user insersion success")
          alert(response.message);
          this.router.navigateByUrl('/org-list');
          this.patientForm.reset();
        },
        error: (error) => {
          console.log('Form is invalid!');
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        },
      });
    }
  }


// async orgdetails() : Promise<any>{
//   try{
//   const data2= this.orgform.fetchorgform('id')
//   this.org=data2;
//   console.log("fetch org ",this.org)
//   }
//   catch(error){
//     console.log("failed to fetcch",error)
//   }
  
//     }
  
}

