import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
  selector: 'app-org-requests',
  templateUrl: './org-requests.component.html',
  styleUrls: ['./org-requests.component.css']
})
export class OrgRequestsComponent {
  requests: any[] = [];
  orgId: any = ""; // Initialize as empty
  
  constructor(private requestService: RequestsService, private route: ActivatedRoute) {

  this.loadRequests();
}

loadRequests() {
  this.requestService.getPendingRequests(this.orgId).subscribe({
    next: (data) => {
      this.requests = data;
    },
    error: (error) => {
      console.error("Error fetching requests:", error);
    },
    complete: () => {
      console.log("Finished loading requests");
    }
  });
}

updateStatus(id: string, status: string) {
  this.requestService.updateRequestStatus(id, status).subscribe({
    next: () => {
      this.loadRequests(); // Refresh list after updating
    },
    error: (error) => {
      console.error("Error updating status:", error);
    },
    complete: () => {
      console.log("Request status updated successfully");
    }
  });
}
}