import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {
  organizationProfile: any; 
  userId : any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchOrganizationProfile(this.userId); 
  }

  fetchOrganizationProfile(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organizationProfile = data[0];
        console.log('OrganizationProfile:', this.organizationProfile);
      },
      error: (err) => {
        console.error('Error fetching organization profile:', err);
      }
    });
  }
}
