import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-donor-list',
  templateUrl: './all-donor-list.component.html',
  styleUrls: ['./all-donor-list.component.css'],
})
export class AllDonorListComponent {
  allDonor: any;
  userId: any;

  constructor(
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchAllDonor(this.userId);
  }

  fetchAllDonor(userId: string): void {
    this.orgService.fetchAllDonors(userId).subscribe({
      next: (data: any) => {
        this.allDonor = data;
        console.log('allDonor:', this.allDonor);
      },
      error: (err: any) => {
        console.error('Error fetching all donors:', err);
      },
    });
  }

  viewDetails(donor: any): void {
    console.log('donor', donor);
    this.router.navigate(['org/view_donor_requests'], {
      queryParams: {
        id: donor.userid,
        status: donor.status,
        email: donor.email,
        org_Id: donor.org_Id,
        // phone: org.phone,
        // name: org.name,
        // address: org.address,
        // gender: org.gender,
        // age: org.age,
      },
    });
  }
}
