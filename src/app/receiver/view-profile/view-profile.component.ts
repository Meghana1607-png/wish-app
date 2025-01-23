import { Component } from '@angular/core';
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
    phone: '',
    address: '',
  };

  constructor(private profile:ProfileService){

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
  
  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Profile Data:', this.profile);
      alert('Profile submitted successfully!');
      // Perform additional actions (e.g., API call to save data)
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
