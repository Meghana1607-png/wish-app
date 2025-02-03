import { Component } from '@angular/core';
import { OrgService } from '../../org.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent {
  organizationProfile: any;


  constructor(private orgService: OrgService, private route: ActivatedRoute) {
    this.organizationProfile = localStorage.getItem('organizationProfile');
  }
}
