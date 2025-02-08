import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-receivers',
  templateUrl: './pending-receivers.component.html',
  styleUrls: ['./pending-receivers.component.css']
})
export class PendingReceiversComponent {

  pendingReceiver: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.fetchPendingReceiver(this.userId); 
  }

  fetchPendingReceiver(userId: string): void {
    this.orgService.fetchPendingReceivers(userId).subscribe({
      next: (data : any) => {
        this.pendingReceiver = data;
        console.log('pendingReceiver:', this.pendingReceiver);
      },
      error: (err : any) => {
        console.error('Error fetching pending receivers:', err);
      }
    });
  }

}


