import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approved-receivers',
  templateUrl: './approved-receivers.component.html',
  styleUrls: ['./approved-receivers.component.css']
})
export class ApprovedReceiversComponent implements OnInit {
  approvedReceiver: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.fetchApprovedReceiver(this.userId); 
  }

  fetchApprovedReceiver(userId: string): void {
    this.orgService.fetchApprovedReceivers(userId).subscribe({
      next: (data) => {
        this.approvedReceiver = data;
        console.log('approvedReceiver:', this.approvedReceiver);
      },
      error: (err) => {
        console.error('Error fetching approved receivers:', err);
      }
    });
  }
}
