import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {

  orgDetails:any
  organization:any
  data1:any

  constructor(private supabase:OrgService){

  //   this.orgform.fetchorgform().subscribe({
  //     next: (data) => {
  //       this.orgDetails=data;
  //     },
  // });
  this.fetchorg();
 
  }
  id:any
  fetchorg() {
  
    this.supabase.fetchorgform(this.id).subscribe({
      next: (response) => {
        if (response.error) {
          console.error('Error fetching organization:', response.error);
        } else if (response.data) {
          console.log(response.data)
          this.organization = response.data;
          console.log('Organizations fetched successfully:', this.organization);
        } else {
          console.warn('No data received');
        }
      },
      // error: (error) => {
      //   console.error('Failed to fetch organization:', error);
      // },
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
