import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.css'],
})
export class ViewDonorComponent {
  donorDetails: any;
  acceptDonorData: any;
  userId: any;
  bloodGroups: any[] = [];
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  rejectDonorData: any;
  currentPath: any;
  presentPath: any;
  requestDonorData: any;
  organization: any;
  dataToSend: any;

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
  }
  async ngOnInit() {
    this.active.queryParams.subscribe((params) => {
      this.donor = {
        id: params['id'],
        org_id: params['org_id'],
        email: params['email'] || '',
        status: params['status'] || '',
      };
    });

    console.log('userId in fetching details:', this.donor.id);

    this.fetchDonorDetails(this.donor.id);
    this.fetchProfileByOrg(this.userId);
  }

  rejectDonor(userId: any): void {
    this.orgService.rejectDonor(userId).subscribe({
      next: (data: any) => {
        this.rejectDonorData = data;
        console.log('rejectDonorData:', this.rejectDonorData);
        this.router.navigate(['/org-dashboard']);
      },
      error: (err: any) => {
        console.error('error in rejecting the donor', err);
      },
    });
  }

  fetchDonorDetails(userId: string): void {
    this.orgService.fetchDonorDetails(userId).subscribe({
      next: (data: any) => {
        this.donorDetails = data;
        console.log('donorDetails:', this.donorDetails);
      },
      error: (err: any) => {
        console.error('Error fetching donor details:', err);
      },
    });
  }
  donor: {
    id: any;
    org_id: any;
    status: any;
    //name: string;
    email: any;
  } = {
    id: '',
    org_id: '',
    status: '',
    // name: '',
    email: '',
  };

  fetchProfileByOrg(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organization = data[0];
        console.log('organization:', this.organization);
        this.dataToSend = {
          email: this.organization.email,
          org_id: this.organization.userId,
          status: 'pending',
          donor_id: this.donor.id,
        };
      },
      error: (err) => {
        console.error('Error fetching organization profile:', err);
      },
    });
  }

  requestDonor(userId: string): void {
    this.orgService.requestDonor(userId, this.dataToSend).subscribe({
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

  acceptDonor(userId: any): void {
    this.orgService.getBloodGroups(this.userId).subscribe({
      next: (data: any) => {
        try {
          const bloodGroups = JSON.parse(data[0].blood_groups);
          this.bloodGroups = bloodGroups;

          // Check if the blood group is valid
          const validBloodGroups = [
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
          ];
          const donorBloodGroup = this.donorDetails[0].BloodGroup.toUpperCase();

          if (!validBloodGroups.includes(donorBloodGroup)) {
            this.showPopup = true;
            this.popupMessage = `Invalid blood group: ${donorBloodGroup}`;
            setTimeout(() => {
              this.showPopup = false;
            }, 2500);
            return;
          }

          // Find the matched blood group
          const matchedBloodGroup = this.bloodGroups.find(
            (group: any) => group.bloodGroup.toUpperCase() === donorBloodGroup
          );

          console.log('matchedGroup', matchedBloodGroup);

          if (matchedBloodGroup) {
            // Update the matched blood group's quantity
            const quantity = parseInt(this.donorDetails[0].blood_quantity);
            matchedBloodGroup.quantity += quantity;

            this.orgService
              .updateBloodGroupQuantity(
                donorBloodGroup,
                matchedBloodGroup.quantity,
                this.userId
              )
              .subscribe({
                next: (data: any) => {
                  this.orgService.acceptDonor(userId).subscribe({
                    next: (data: any) => {
                      this.acceptDonorData = data;
                      console.log('acceptDonorData:', this.acceptDonorData);
                      this.router.navigate(['/org-dashboard']);
                    },
                    error: (err: any) => {
                      console.error('error in accepting the donor', err);
                    },
                  });
                },
                error: (err: any) => {
                  console.error('Error updating blood group quantity:', err);
                },
              });
          } else {
            // Add new blood group
            console.log('donorBloodGroup,', donorBloodGroup);
            console.log(
              'donorbloodQuantity,',
              parseInt(this.donorDetails[0].blood_quantity.trim())
            );

            this.orgService
              .addBloodGroup(
                donorBloodGroup,
                parseInt(this.donorDetails[0].blood_quantity.trim()),
                this.userId
              )
              .subscribe({
                next: (data: any) => {
                  this.orgService.acceptDonor(userId).subscribe({
                    next: (data: any) => {
                      this.acceptDonorData = data;
                      console.log('acceptDonorData:', this.acceptDonorData);
                      this.router.navigate(['/org-dashboard']);
                    },
                    error: (err: any) => {
                      console.error('error in accepting the donor', err);
                    },
                  });
                },
                error: (err: any) => {
                  console.error('Error adding new blood group:', err);
                },
              });
          }
        } catch (error) {
          console.error('Error parsing bloodGroups:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching bloodGroups:', err);
      },
    });
  }
}
