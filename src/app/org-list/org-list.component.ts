import { Component } from '@angular/core';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent {

  dta:any
  constructor(private supabase:OrgService){

    this.fetchorg();
  }
  organizations :any[]= []
    fetchorg() {
    this.supabase.fetchorgform().subscribe({
      next: (response) => {
        if (response.error) {
          console.error('Error fetching organizations:', response.error);
        } else if (response.data) {
          console.log(response.data)
          this.organizations = response.data;
          console.log('Organizations fetched successfully:', this.organizations);
        } else {
          console.warn('No data received');
        }
      },
      // error: (error) => {
      //   console.error('Failed to fetch organizations:', error);
      // },
    });
  }
  
  

  viewDetails(org: any): void {
    // alert(`Viewing details for ${org.name}`);
  }
}
