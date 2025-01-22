import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {


  users = [
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
    { id: 3, name: 'User C' },
  ];

  orgSubmissions: any[] = []; 
  // Array to store requests dynamically

  handleRequest(user: any): void {
    // Check if user is already added to avoid duplicates
    const alreadyAdded = this.orgSubmissions.find((submission) => submission.id === user.id);
    if (!alreadyAdded) {
      this.orgSubmissions.push(user);
    }
  }
}
