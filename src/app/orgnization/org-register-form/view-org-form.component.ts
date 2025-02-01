import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';
import { ReceiverService } from 'src/app/receiver.service';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {

  orgDetails:any
  // organization:any[]=[];
  data1:any
  userid: any = '';   
  org_id:any    // Store logged-in user ID


  constructor(private supabase:OrgService,private receiver:ReceiverService, private user:ProfileService,private request:RequestsService){

  //   this.orgform.fetchorgform().subscribe({
  //     next: (data) => {
  //       this.orgDetails=data;
  //     },
  // });
  this.fetchorg();
  // this.getUserId();
 
  }
  id:any
  fetchorg() {
    this.supabase.fetchorg('6323145f-303e-4fb6-a23e-d8b299eb85ae').subscribe({
      next: (response) => {
        if (response.error) {
          console.error('Error fetching organization:', response.error);
        } else if (response.data && response.data.length > 0) {
          this.organization = response.data[0];  // Assigning the first object
          console.log('Organizations fetched successfully:', this.organization);
        } else {
          console.warn('No data received');
        }
      },
      error: (error) => {
        console.error('Failed to fetch organization:', error);
      },
    });
  }
  
      // error: (error) => {
      //   console.error('Failed to fetch organization:', error);
      // },
   
  
  organization = {
    org_id:'',
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodDetails: []
  };
  getUserId() {
    // Assume the user is already authenticated
    this.request.createRequest(this.userid,this.org_id).subscribe((user:any) => {
      this.userid = user.id;  
    });
  }

  makeRequest() {
    if (!this.userid || !this.organization?.org_id) {
      console.error('Missing user or organization details');
      return;
    }

    const requestData = {
      user_id: this.userid,
      org_id: this.organization?.org_id,
      status: 'pending'
    };

    this.receiver.submitReceiverForm(requestData).subscribe({
      next: (response: any) => {
        console.log('Request submitted successfully:', response);
        alert('Request sent successfully!');
      },
      error: (error: any) => {
        console.error('Error submitting request:', error);
        console.log('Error details:', error.message); // Log error details
        alert('Failed to send request. Check console for details.');
      }
    });
    
  }

  requestBlood() {
    alert(`Blood requested from organization ID: `);
  }
  


}
