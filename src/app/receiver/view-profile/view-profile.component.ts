import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  pdata: any;
  users:any[]=[]
  profile1 = {
    name: '',
    email: '',
    phno: '',
    address: '',
    gender:'',

  };

  constructor(private profile:ProfileService,private org:OrgService){

    this.fetchUsers();
    }
    async fetchUsers(): Promise<void> {
    try {
         const data = await this.profile.form();
        this.users = data;
    console.log('Fetched users:', this.users);
   } catch (error) {
       console.error('Error fetching users:', error);
      }
   }
    // fetchUsers(): void {
    //   this.loading = true; // Show loader
    //   this.profile.fetch().subscribe({
    //     next: (data) => {
    //       this.users = data;
    //       this.loading = false; // Hide loader
    //     },
    //     error: (err) => {
    //       console.error('Error fetching users:', err);
    //       this.loading = false;
    //     },
    //   });
    func(): void {
      this.org.fetchorgform("1").subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        },
      });
    }
  
  // onSubmit(form: any): void {
  //   if (form.valid) {
  //     console.log('Profile Data:', this.profile);
  //     alert('Profile submitted successfully!');
  //     // Perform additional actions (e.g., API call to save data)
  //   } else {
  //     alert('Please fill in all required fields.');
  //   }
  // }}

}
