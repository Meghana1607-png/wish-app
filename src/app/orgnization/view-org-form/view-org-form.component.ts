import { Component } from '@angular/core';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-view-org-form',
  templateUrl: './view-org-form.component.html',
  styleUrls: ['./view-org-form.component.css']
})
export class ViewOrgFormComponent {

  orgDetails:any
  data1:any

  constructor(private orgform:OrgService){

  //   this.orgform.fetchorgform().subscribe({
  //     next: (data) => {
  //       this.orgDetails=data;
  //     },
  // });
 
  }
  async func(){
    const data= this.orgform.fetchorgform();
    try{
      this.data1=data;
      console.log("fecth details success",data);

    }
    catch(error){
      console.log("fetch failed",error)
    }
  }
  
  orginfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodDetails: []
  };

  requestBlood() {
    alert(`Blood requested from organization ID: `);
  }
  


}
