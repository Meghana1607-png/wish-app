import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {

  orgDetails:any
  data1:any

  constructor(private orgform:OrgService){

  //   this.orgform.fetchorgform().subscribe({
  //     next: (data) => {
  //       this.orgDetails=data;
  //     },
  // });
  this.orgform.orgfetch(this.data1).subscribe({
    next:(response:any) =>{
      alert(response.message);
    },
    error: () =>{
      console.error('Error submitting the form:');
      alert('An error occurred while submitting the form.');
    }
  });

  }
  
  orginfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodDetails: []
  };

  requestBlood() {
    alert(`Blood requested from organization ID: `);
  }
  
}
