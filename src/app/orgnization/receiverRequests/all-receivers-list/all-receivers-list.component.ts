import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-receivers-list',
  templateUrl: './all-receivers-list.component.html',
  styleUrls: ['./all-receivers-list.component.css'],
})
export class AllReceiversListComponent {
  allReceiver: any;
  userId: any;

  constructor(
    private orgService: OrgService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchAllReceiver(this.userId);
  }

  fetchAllReceiver(userId: string): void {
    this.orgService.fetchAllReceivers(userId).subscribe({
      next: (data: any) => {
        this.allReceiver = data;
        console.log('allReceiver:', this.allReceiver);
      },
      error: (err: any) => {
        console.error('Error fetching all receivers:', err);
      },
    });
  }

  viewDetails(donor: any): void {
    this.router.navigate(['org/view_donor'], {
      queryParams: {
        id: donor.id,
        status: donor.status,
        email: donor.email,
        // phone: org.phone,
        // name: org.name,
        // address: org.address,
        // gender: org.gender,
        // age: org.age,
      },
    });
  }
}
