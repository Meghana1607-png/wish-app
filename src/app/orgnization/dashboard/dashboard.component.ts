import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from '../../org.service'; // Correct import path as per user feedback

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  is_slidebar: boolean;
  isclick: boolean = false;
  selectedPage = 'Blood Hub';
  roles: any[];
  det: any = [];
  c_role: any;
  menu = [
    { path: 'org/dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donors list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Receivers list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donors pending list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donors approved list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Donors rejected list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Receiver pending list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Receiver approved list', icon: 'pi pi-users' },
    { path: 'org/teams-table', label: 'Receiver rejected list', icon: 'pi pi-users' },
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
  }
  
  ngOnInit(): void {
    this.fetchBloodGroups(); // Fetch blood groups on initialization
  }

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
}
