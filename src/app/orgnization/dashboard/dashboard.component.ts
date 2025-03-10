import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from '../../org.service'; // Correct import path as per user feedback

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  is_slidebar: boolean;
  isclick: boolean = false;
  selectedPage = 'Blood Hub';
  roles: any[];
  det: any = [];
  c_role: any;
  userId: any;
  organizations: any[] = [];
  bloodGroups: any[] = [];
  selectedBloodGroup: any;
  modifyBloodGroupModal: boolean = false;
  addBloodGroupModal = false;
  // newBloodGroup: any = {};
  showPopup: boolean = false; // Declare showPopup variable
  popupMessage: string = '';
  validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  menu = [
    { path: 'org/dashboard', label: 'Blood Hub', icon: 'pi pi-users' },
    { path: 'org/donorsList', label: 'Donors list', icon: 'pi pi-users' },
    //{ path: 'org/receiversList', label: 'Receivers list', icon: 'pi pi-users' },
    {
      path: 'org/donorsList/pending',
      label: 'Donor pending list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/donorsList/approved',
      label: 'Donor approved list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/donorsList/rejected',
      label: 'Donor rejected list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/pending',
      label: 'Receiver pending list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/approved',
      label: 'Receiver approved list',
      icon: 'pi pi-users',
    },
    {
      path: 'org/receiversList/rejected',
      label: 'Receiver rejected list',
      icon: 'pi pi-users',
    },
    { path: 'org/teams-table', label: 'feedbacks', icon: 'pi pi-users' },
  ];

  newUnits: number = 0; // Property for new units input, initialized to 0
  feedbackMessage: string = ''; // Property for user feedback message

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private orgService: OrgService
  ) {
    this.is_slidebar = false;
    this.roles = this.activeroute.snapshot.queryParams['roles'];
    this.c_role = this.activeroute.snapshot.queryParams['currentrole'];
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.fetchBloodGroups(this.userId);
  }

  fetchBloodGroups(userId: any) {
    this.orgService.getBloodGroups(userId).subscribe({
      next: (data: any) => {
        try {
          const bloodGroups = JSON.parse(data[0].blood_groups);
          this.bloodGroups = bloodGroups;
        } catch (error) {
          console.error('Error parsing bloodGroups:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching bloodGroups:', err);
      },
    });
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

  modifyBloodGroup(bloodGroup: any) {
    this.selectedBloodGroup = bloodGroup;
    this.modifyBloodGroupModal = true;
  }

  closeModal() {
    this.modifyBloodGroupModal = false;
  }
  newBloodGroup: { bloodGroup: string; quantity: number } = {
    bloodGroup: '',
    quantity: 0
  };

  addBloodGroup() {
    console.log('bloodGroups  ', this.bloodGroups);
    console.log('newBloodGroup:', this.newBloodGroup);
    const existingBloodGroup = this.bloodGroups.find(
      (group) =>
        group?.bloodGroup?.toUpperCase() ===
        this.newBloodGroup?.bloodGroup?.toUpperCase()  
    );
    
    if (existingBloodGroup) {
      this.addBloodGroupModal = false;
      this.showPopup = true;
      this.popupMessage = `Blood group already exists!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
    console.log('New Blood Group:', this.newBloodGroup);
if (!this.newBloodGroup || !this.newBloodGroup.bloodGroup || !this.newBloodGroup.quantity) {
  console.error('newBloodGroup is not properly initialized!');
  return;
}
    if (
      this.validBloodGroups.includes(
        this.newBloodGroup.bloodGroup.toUpperCase()
      )  ) {
      console.log(
        'newBloodGroup ',
        this.newBloodGroup.bloodGroup.toUpperCase()
      );
      this.orgService.addBloodGroup(this.newBloodGroup.bloodGroup, this.newBloodGroup.quantity, this.userId)
    .subscribe({
      next: (data) => {
        console.log("Blood group added successfully:", data);
        this.fetchBloodGroups(this.userId);
      },
      error: (err) => {
        console.error("Error adding blood group:", err);
      }
    });
        //   error: (err: any) => {
        //     console.error('Error adding blood group:', err);
        //   },
        // });
    } else {
      this.addBloodGroupModal = false;
      this.showPopup = true;
      this.popupMessage = `Invalid blood group!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
  }
  convertQuantityToNumber() {
    this.newBloodGroup.quantity = Number(this.newBloodGroup.quantity);
  }

  openAddBloodGroupModal() {
    this.addBloodGroupModal = true;
  }

  closeAddBloodGroupModal() {
    this.addBloodGroupModal = false;
  }

  updateBloodGroupQuantity() {
    if (
      this.validBloodGroups.includes(
        this.selectedBloodGroup.bloodGroup.toUpperCase()
      )
    ) {
      if (this.selectedBloodGroup.quantity >= 0) {
        this.orgService
          .updateBloodGroupQuantity(
            this.selectedBloodGroup.bloodGroup.toUpperCase(),
            this.selectedBloodGroup.quantity,
            this.userId
          )
          .subscribe({
            next: (data: any) => {
              console.log('Blood group quantity updated successfully:', data);
              this.modifyBloodGroupModal = false;
              this.fetchBloodGroups(this.userId);
            },
            error: (err: any) => {
              console.error('Error updating blood group quantity:', err);
            },
          });
      } else {
        this.showPopup = true;
        this.popupMessage = `Invalid blood quantity!`;
        setTimeout(() => {
          this.showPopup = false;
        }, 2500);
        return;
      }
    } else {
      this.showPopup = true;
      this.popupMessage = `Invalid blood group!`;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500);
      return;
    }
  }
}
