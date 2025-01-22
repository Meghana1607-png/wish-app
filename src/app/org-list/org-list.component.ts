import { Component } from '@angular/core';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-org-list',
  templateUrl:'./org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent {
  constructor(private supabase:OrgService){}
  organizations = [
    {
      id: 1,
      name: 'Tech Innovators',
      email: 'contact@techinnovators.com',
      logo: 'https://via.placeholder.com/50/0f0f0f/FFFFFF?text=TI',
    },
    {
      id: 2,
      name: 'Green Planet',
      email: 'hello@greenplanet.org',
      logo: 'https://via.placeholder.com/50/00ff00/FFFFFF?text=GP',
    },
    {
      id: 3,
      name: 'EduSpark',
      email: 'info@eduspark.edu',
      logo: 'https://via.placeholder.com/50/0000ff/FFFFFF?text=ES',
    },
  
    {
      id: 1,
      name: 'Tech Innovators',
      email: 'contact@techinnovators.com',
      logo: 'https://via.placeholder.com/50/0f0f0f/FFFFFF?text=TI',
    },
    {
      id: 3,
      name: 'EduSpark',
      email: 'info@eduspark.edu',
      logo: 'https://via.placeholder.com/50/0000ff/FFFFFF?text=ES',
    },
  ];
  // getOrganizations(): void {
  //   this.supabase.fetchorgform().subscribe({
  //     next: (response) => {
  //       console.log('Fetched data:', response);
  //       this.organizations = response.data || []; // Store the data
  //     },
  //     error: (error) => {
  //       console.error('Error fetching organizations:', error);
  //     },
  //   });
  // }

  // viewDetails(org: any): void {
  //   alert(`Viewing details for ${org.name}`);


  // }
}
