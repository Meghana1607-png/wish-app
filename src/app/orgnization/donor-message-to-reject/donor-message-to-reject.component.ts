import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-donor-message-to-reject',
  templateUrl: './donor-message-to-reject.component.html',
  styleUrls: ['./donor-message-to-reject.component.css'],
})
export class DonorMessageToRejectComponent {
  userId: any;
  message: string = '';
  currentPath: any;
  presentPath: any;
  messageToRequest: any;
  requestDonorData: any;
  organisation: any;
  org: any;

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.presentPath = this.router.url;
    console.log('presentPath', this.presentPath);
    this.currentPath = this.presentPath.split('?')[0].trim();
    console.log('currentPath', this.currentPath);
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organisation');
    if (this.org) {
      this.organisation = JSON.parse(this.org);
    }
    console.log(
      'organisation details in sending message module',
      this.organisation
    );
  }

  ngOnInit() {}

  donor: {
    id: any;
    email: any;
    dataToSend: any;
  } = {
    id: '',
    email: '',
    dataToSend: {},
  };

  rejectdonor: {
    id: any;
    email: any;
  } = {
    id: '',
    email: '',
  };

  requestDonor(userId: any, message: string, donorEmail: string): void {
    this.active.queryParams.subscribe((params) => {
      this.donor = {
        id: params['userid'],
        email: params['email'],
        dataToSend: JSON.parse(params['dataToSend']),
      };
      console.log('gkjjgfjg,', this.donor);
    });
    console.log('dataToSend in donor message ', this.donor.dataToSend);
    this.orgService
      .requestDonor(userId, message, this.donor.dataToSend, this.organisation)
      .subscribe({
        next: (data: any) => {
          this.requestDonorData = data;
          this.router.navigate(['/org-dashboard']);
          console.log('requestDonorData:', this.requestDonorData);
        },
        error: (err: any) => {
          console.error('error in requesting the donor', err);
        },
      });
  }

  rejectDonor(message: string, donorEmail: string): void {
    this.active.queryParams.subscribe((params) => {
      this.rejectdonor = {
        id: params['userid'],
        email: params['email'],
      };
      console.log('gkj,', this.donor);
    });
    this.orgService
      .rejectDonor(
        this.rejectdonor.id,
        message,
        this.rejectdonor.email,
        this.organisation
      )
      .subscribe({
        next: (data: any) => {
          console.log('rejectDonorData:', data);
          this.router.navigate(['/org-dashboard']);
        },
        error: (err: any) => {
          console.error('error in rejecting the donor', err);
        },
      });
  }
}
