import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approved-donor-list',
  templateUrl: './approved-donor-list.component.html',
  styleUrls: ['./approved-donor-list.component.css']
})

export class ApprovedDonorListComponent {
  approvedDonor: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.fetchApprovedDonor(this.userId); 
  }

  fetchApprovedDonor(userId: string): void {
    this.orgService.fetchApprovedDonors(userId).subscribe({
      next: (data: any) => {
        this.approvedDonor = data;
        console.log('approvedDonor:', this.approvedDonor);
      },
      error: (err: any) => {
        console.error('Error fetching approved donors:', err);
      }
    });
  }
}
