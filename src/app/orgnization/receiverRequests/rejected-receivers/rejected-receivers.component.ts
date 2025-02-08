import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rejected-receivers',
  templateUrl: './rejected-receivers.component.html',
  styleUrls: ['./rejected-receivers.component.css']
})
export class RejectedReceiversComponent {
  rejectedReceiver:any;

  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.fetchRejectedReceiver(this.userId); 
  }

  fetchRejectedReceiver(userId: string): void {
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
