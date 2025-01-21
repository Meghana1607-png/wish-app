import { Component } from '@angular/core';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {


  orgDetails = {
    id: 1,
    name: 'LifeCare Blood Bank',
    email: 'contact@lifecare.com',
    phone: '+123456789',
    address: '123 Health Street, Wellness City',
    bloodDetails: [
      { group: 'A+', quantity: 1500 },
      { group: 'B+', quantity: 1200 },
      { group: 'O+', quantity: 3000 },
      { group: 'AB+', quantity: 800 }
    ]
  };

  requestBlood(orgId: number) {
    alert(`Blood requested from organization ID: ${orgId}`);
    // Add your logic for handling blood requests here
  }

}
