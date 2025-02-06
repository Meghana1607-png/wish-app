import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rejected-receivers',
  templateUrl: './rejected-receivers.component.html',
  styleUrls: ['./rejected-receivers.component.css']
})
export class RejectedReceiversComponent {
  allReceiver:any;

  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem(this.userId);
  }

  ngOnInit(): void {
    this.fetchAllReceiver("userId"); 
  }

  fetchAllReceiver(userId: string): void {
    this.orgService.fetchAllReceivers(userId).subscribe({
      next: (data) => {
        this.allReceiver = data;
        console.log('allReceiver:', this.allReceiver);
      },
      error: (err) => {
        console.error('Error fetching all receivers:', err);
      }
    });
  }
}
