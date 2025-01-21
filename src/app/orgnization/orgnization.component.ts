import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-orgnization',
  templateUrl: './orgnization.component.html',
  styleUrls: ['./orgnization.component.css']
})
export class OrgnizationComponent {

  orgForm: FormGroup;

  constructor(private fb: FormBuilder,private orgform: OrgService) {
    this.orgForm = this.fb.group({
      orgName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
        next:(response) =>{
          alert(response.message);
          this.orgForm.reset();
        },
        error: (error) =>{
          console.error('Error submitting the form:', error.message);
          alert('An error occurred while submitting the form.');
        }
      });
    }
  }


}