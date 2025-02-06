import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from '../../org.service'; // Correct import path as per user feedback

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  is_slidebar: boolean;
  isclick: boolean = false;
  selectedPage = 'Blood Hub';
  roles: any[];
  det: any = [];
  c_role: any;
  userId : any;
  organizations: any[] = []; 
  approvedReceiver : any;
  rejectedReceiver : any;
  pendingReceiver : any;
  allReceiver : any;

  menu = [
    { path: 'org/dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donors list', icon: 'pi pi-users' },
    { path: 'org/receiversList', label: 'Receivers list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donor pending list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donor approved list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donor rejected list', icon: 'pi pi-users' },
    { path: 'org/receiversList/pending', label: 'Receiver pending list', icon: 'pi pi-users' },
    { path: 'org/receiversList/approved', label: 'Receiver approved list', icon: 'pi pi-users' },
    { path: 'org/receiversList/rejected', label: 'Receiver rejected list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'feedbacks', icon: 'pi pi-users' },
  ];
  
  bloodGroups: any[] = []; // Property to store blood group data
  newBloodGroup?: string; // Property for new blood group input, made optional
  newUnits: number = 0; // Property for new units input, initialized to 0
  feedbackMessage: string = ''; // Property for user feedback message

  constructor(private router: Router, private activeroute: ActivatedRoute, private orgService: OrgService) {
    this.is_slidebar = false;
    this.roles = this.activeroute.snapshot.queryParams['roles'];
    this.c_role = this.activeroute.snapshot.queryParams['currentrole'];
    this.userId = localStorage.getItem('userId');
  }
  
  // ngOnInit(): void {
  //   this.fetchBloodGroups(); // Fetch blood groups on initialization
  //   this.fetchOrganizationProfile("userId"); // Call to fetch organization profile
  //   this.fetchApprovedReceiver("userId");
  //   this.fetchRejectedReceiver("userId");
  //   this.fetchApprovedReceiver("userId");
  //   this.fetchAllReceiver("userId");
  // }

  fetchBloodGroups() {
    this.orgService.getBloodGroups().subscribe((data: any) => {
      this.bloodGroups = data; // Store the fetched data
    });
  }

  addBloodGroup() {
    if (!this.newBloodGroup || !this.newUnits || this.newUnits <= 0) {
      this.feedbackMessage = 'Please enter a valid blood group and units.'; // Set feedback message
      return;
    }

    const newBloodGroupData = { name: this.newBloodGroup, units: this.newUnits };
    
    this.orgService.addBloodGroup(newBloodGroupData).subscribe(
      (response: any) => {
        this.bloodGroups.push(newBloodGroupData); // Add to local array
        this.newBloodGroup = ''; // Clear input
        this.newUnits = 0; // Reset input
        this.feedbackMessage = 'Blood group added successfully!'; // Success message
      },
      (error: any) => {
        this.feedbackMessage = 'Failed to add blood group. Please try again.'; // Error message
      }
    );
  }

  NavToPage(path: any) {
    this.router.navigate(['/' + path]);
    this.is_slidebar = false;
  }

  onPageChange(page: string) {
    this.selectedPage = page;
  }

  show_slidebar() {
    this.is_slidebar = true;
  }

  hide_slidebar() {
    this.is_slidebar = false;
  }

  isRoleCardVisible = false;

  toggleRoleCard() {
    this.isRoleCardVisible = !this.isRoleCardVisible;
  }

  selectRole(role: string) {
    console.log(`${role} selected`);
    this.isRoleCardVisible = false; // Close the card after selecting a role
  }

  openProfile(orgId: string): void {
    this.router.navigate(['/org/Profile']); 
  }

  fetchRejectedReceiver(userId: string): void {
    this.orgService.fetchRejectedReceivers(userId).subscribe({
      next: (data) => {
        this.rejectedReceiver = data;
        console.log('rejectedReceiver:', this.rejectedReceiver);
        // this.router.navigate(['/org/Profile']); // Navigate to the profile page after fetching
      },
      error: (err) => {
        console.error('Error fetching rejected receivers:', err);
      }
    });
  }
}
