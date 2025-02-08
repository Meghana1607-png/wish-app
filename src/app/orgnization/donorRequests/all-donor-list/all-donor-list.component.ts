import { Component } from '@angular/core';
import { OrgService } from '../../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-donor-list',
  templateUrl: './all-donor-list.component.html',
  styleUrls: ['./all-donor-list.component.css']
})
export class AllDonorListComponent {
  allDonor : any;
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
  }
  
    ngOnInit(): void {
      this.fetchAllDonor(this.userId); 
    }
  
    fetchAllDonor(userId: string): void {
      this.orgService.fetchAllDonors(userId).subscribe({
        next: (data : any) => {
          this.allDonor = data;
          console.log('allDonor:', this.allDonor);
        },
        error: (err : any) => {
          console.error('Error fetching all donors:', err);
        }
      });
    }
}
