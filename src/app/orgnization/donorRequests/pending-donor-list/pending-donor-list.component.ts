import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-donor-list',
  templateUrl: './pending-donor-list.component.html',
  styleUrls: ['./pending-donor-list.component.css']
})
export class PendingDonorListComponent {

  rejectedDonor: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.fetchPendingDonor(this.userId); 
  }

  fetchPendingDonor(userId: string): void {
    this.orgService.fetchPendingDonors(userId).subscribe({
      next: (data: any) => {
        this.rejectedDonor = data;
        console.log('rejectedDonors:', this.rejectedDonor);
      },
      error: (err : any) => {
        console.error('Error fetching rejected donors:', err);
      }
    });
  }

}
