import { Component } from '@angular/core';

@Component({
  selector: 'app-org-requests',
  templateUrl: './org-requests.component.html',
  styleUrls: ['./org-requests.component.css']
})
export class OrgRequestsComponent {

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
  ];

  acceptUser(user: any) {
    console.log('Accepted:', user);
    // Add your logic for accepting a user
  }

  rejectUser(user: any) {
    console.log('Rejected:', user);
    // Add your logic for rejecting a user
  }
}
