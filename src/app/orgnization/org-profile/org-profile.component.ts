import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css'],
})
// export class OrgProfileComponent implements OnInit {
export class OrgProfileComponent implements OnInit {
  organizationProfile: any;
  userId: any;
  bloodGroupsArray: any[] = [];
  org: any;

  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
    this.org = localStorage.getItem('organization');
  }

  ngOnInit(): void {
    this.fetchOrganizationProfile(this.userId);
  }

  fetchOrganizationProfile(userId: string): void {
    this.orgService.fetchProfileByOrg(userId).subscribe({
      next: (data) => {
        this.organizationProfile = data[0];
        localStorage.setItem('organization', this.organizationProfile);
        console.log('OrganizationProfile:', this.organizationProfile);
        if (this.organizationProfile && this.organizationProfile.blood_groups) {
          this.bloodGroupsArray = JSON.parse(
            this.organizationProfile.blood_groups
          );
        }
      },
      error: (err) => {
        console.error('Error fetching organization profile:', err);
      },
    });
  }
}
