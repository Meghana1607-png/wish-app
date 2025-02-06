import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  orgId: string | null = null;
  orgData: any = {};


  constructor(private supabase:OrgService,private receiver:ReceiverService, private user:ProfileService,private request:RequestsService, private router:Router, private active:ActivatedRoute){

  //   this.orgform.fetchorgform().subscribe({
  //     next: (data) => {
  //       this.orgDetails=data;
  //     },
  // });
  // this.fetchorg();
  // this.getUserId();
 
  }

  async ngOnInit() {
   
    this.active.queryParams.subscribe((params) => {
      this.organization = {org_id: params['org_id'] || '',
        name: params['name'] || '',
        email: params['email'] || '',
        phone: params['phone'] || '',
        address: params['address'] || '',
        bloodDetails: params['bloodDetails'] ? JSON.parse(params['bloodDetails']) : [],
 };
    });
  }
  // id:any
  // fetchorg() {
  //   this.supabase.getOrgId().subscribe({
  //     next: (response:any) => {
  //       if (response.error) {
  //         console.error('Error fetching organization:', response.error);
  //       } else if (response.data && response.data.length > 0) {
  //         this.organization = response.data[0];  // Assigning the first object
  //         console.log('Organizations fetched successfully:', this.organization);
  //       } else {
  //         console.warn('No data received');
  //       }
  //     },
  //     error: (error:any) => {
  //       console.error('Failed to fetch organization:', error);
  //     },
  //   });
  // }
  
      // error: (error) => {
      //   console.error('Failed to fetch organization:', error);
      // },
   
  
  organization : {
    org_id: string,
    name: string;
    email: string;
    phone: string;
    address: string;
    bloodDetails: any[];
  } = {
    org_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodDetails: [],
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
