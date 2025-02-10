import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
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
  selectedOrgId: any;
  userId: any;


  constructor(private supabase:OrgService,private receiver:ReceiverService, private user:ProfileService,private request:RequestsService, private router:Router, private active:ActivatedRoute,private authservice:AuthService){

    this.selectedOrgId = this.supabase.fetchorgform('id');
    this.userId = this.user.form(); 
  
 
  }

  async ngOnInit() {
    this.authservice.setAuthId(this.userid);  // Assuming user.id is fetched correctly

   
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
  
  users: any[] = [];
  async getUserID() {
    this.users = await this.user.form();
    console.log(this.users);
  }

  getOrgid(): void {
    this.supabase.fetchorgform('id').subscribe({
      next: (data: string) => {  
        this.selectedOrgId = data;
        console.log(this.selectedOrgId);
      },
      error: (error: any) => {
        console.error('Error fetching org details:', error);
      }
    });
  }
  
  // setAuthId(authId: string) {
  //   console.log(localStorage.setItem('authId', this.userId));
  // }

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
    console.log(this.org_id)

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
 async requestBlood() {
  // Retrieve authId from localStorage
  this.userId = localStorage.getItem('authId');
  console.log('Retrieved User ID from localStorage:', this.userId);

  // Check if selectedOrgId is an observable
  console.log('Selected Org ID (before subscription):', this.selectedOrgId);

  // Handle Observable case properly
  if (this.selectedOrgId && typeof this.selectedOrgId.subscribe === 'function') {
    this.selectedOrgId.subscribe((orgId: string) => {
      console.log('Selected Org ID (after subscription):', orgId);
      console.log('User ID:', this.userId);

      if (!orgId || !this.userId) {
        alert('Missing organization or user details!');
        return;
      }

      const requestData = {
        org_id: orgId,
        user_id: this.userId,
        status: 'Pending'
      };

      this.request.createRequest1(requestData)
        .then(({ error }) => {
          if (error) {
            console.error('Error sending request:', error);
            alert('Failed to send request. Please try again.');
          } else {
            alert('Request sent successfully!');
          }
        })
        .catch(err => {
          console.error('Request error:', err);
          alert('Something went wrong. Please try again later.');
        });
    });
  } else {
    console.error('selectedOrgId is null or not an observable:', this.selectedOrgId);
    alert('Organization selection error. Please try again.');
  }
}

}
  
