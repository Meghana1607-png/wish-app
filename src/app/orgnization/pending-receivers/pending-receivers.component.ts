import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-receivers',
  templateUrl: './pending-receivers.component.html',
  styleUrls: ['./pending-receivers.component.css']
})
export class PendingReceiversComponent {

  rejectedReceiver: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem(this.userId);
  }

  ngOnInit(): void {
    this.fetchPendingReceiver("userId"); 
  }

  fetchPendingReceiver(userId: string): void {
    this.orgService.fetchRejectedReceivers(userId).subscribe({
      next: (data) => {
        this.rejectedReceiver = data;
        console.log('rejectedReceiver:', this.rejectedReceiver);
      },
      error: (err) => {
        console.error('Error fetching rejected receivers:', err);
      }
    });
  }

}


