import { Component } from '@angular/core';

@Component({
  selector: 'app-awareness',
  templateUrl: './awareness.component.html',
  styleUrls: ['./awareness.component.css']
})
export class AwarenessComponent {


  bloodGroupCompatibility = [
    { donor: 'O-', receiver: 'O-, A-, B-, AB-' },
    { donor: 'O+', receiver: 'O+, A+, B+, AB+' },
    { donor: 'A-', receiver: 'A-, AB-' },
    { donor: 'A+', receiver: 'A+, AB+' },
    { donor: 'B-', receiver: 'B-, AB-' },
    { donor: 'B+', receiver: 'B+, AB+' },
    { donor: 'AB-', receiver: 'AB-' },
    { donor: 'AB+', receiver: 'AB+' },
  ];

}
