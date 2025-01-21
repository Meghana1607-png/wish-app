import { Component } from '@angular/core';

@Component({
  selector: 'app-rec-awareness',
  templateUrl: './rec-awareness.component.html',
  styleUrls: ['./rec-awareness.component.css']
})
export class RecAwarenessComponent {

  bloodGroupCompatibilityReceiver = [
    { receiver: 'O-', donor: 'O-, A-, B-, AB-' },
    { receiver: 'O+', donor: 'O+, O-, A+, A-, B+, B-, AB+, AB-' },
    { receiver: 'A-', donor: 'A-, AB-' },
    { receiver: 'A+', donor: 'A+, AB+' },
    { receiver: 'B-', donor: 'B-, AB-' },
    { receiver: 'B+', donor: 'B+, AB+' },
    { receiver: 'AB-', donor: 'AB-' },
    { receiver: 'AB+', donor: 'AB+' },
  ];
}
