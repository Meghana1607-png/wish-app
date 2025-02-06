import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-receivers-list',
  templateUrl: './all-receivers-list.component.html',
  styleUrls: ['./all-receivers-list.component.css']
})
export class AllReceiversListComponent {

  allReceiver : any;
 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
  }
  
    ngOnInit(): void {
      this.fetchAllReceiver(this.userId); 
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
