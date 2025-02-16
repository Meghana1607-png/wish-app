import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rejected-donors-list',
  templateUrl: './rejected-donors-list.component.html',
  styleUrls: ['./rejected-donors-list.component.css'],
})
export class RejectedDonorsListComponent {
  rejectedDonor: any;

  userId: any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchRejectedcDonor(this.userId);
  }

  fetchRejectedcDonor(userId: string): void {
    this.orgService.fetchRejectedDonors(userId).subscribe({
      next: (data: any) => {
        this.rejectedDonor = data;
        console.log('rejectedDonor:', this.rejectedDonor);
      },
      error: (err: any) => {
        console.error('Error fetching all donors:', err);
      },
    });
  }
}
