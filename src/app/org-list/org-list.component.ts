import { Component } from '@angular/core';
import { OrgService } from '../org.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent {

  dta:any
  constructor(private supabase:OrgService){}
  organizations :any[]= []
  //   {
  //     id: 1,
  //     name: 'Tech Innovators',
  //     email: 'contact@techinnovators.com',
  //     logo: 'https://via.placeholder.com/50/0f0f0f/FFFFFF?text=TI',
  //   },
  //   {
  //     id: 2,
  //     name: 'Green Planet',
  //     email: 'hello@greenplanet.org',
  //     logo: 'https://via.placeholder.com/50/00ff00/FFFFFF?text=GP',
  //   },
  //   {
  //     id: 3,
  //     name: 'EduSpark',
  //     email: 'info@eduspark.edu',
  //     logo: 'https://via.placeholder.com/50/0000ff/FFFFFF?text=ES',
  //   },
  
  //   {
  //     id: 1,
  //     name: 'Tech Innovators',
  //     email: 'contact@techinnovators.com',
  //     logo: 'https://via.placeholder.com/50/0f0f0f/FFFFFF?text=TI',
  //   },
  //   {
  //     id: 3,
  //     name: 'EduSpark',
  //     email: 'info@eduspark.edu',
  //     logo: 'https://via.placeholder.com/50/0000ff/FFFFFF?text=ES',
  //   },
  // ];
  // getOrganizations(): void {
  //   this.supabase.fetchorgform().subscribe({
  //     next: (response:any) => {
  //       console.log('Fetched data:', response);
  //       this.organizations = response.data || []; 
  //     },
  //     error: (error:any) => {
  //       console.error('Error fetching organizations:', error);
  //     },
  //   });

  // }
  async fetchorg(): Promise<any>{
    try{
      const data= this.supabase.fetchorgform();
      this.dta=data;
      console.log("fetch organizations",this.dta);
    }
    catch(error){
      console.log("failed to fetch organizations",error)
    }
  }

  viewDetails(org: any): void {
    alert(`Viewing details for ${org.name}`);
  }
}
