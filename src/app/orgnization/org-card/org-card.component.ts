import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-org-card',
  templateUrl: './org-card.component.html',
  styleUrls: ['./org-card.component.css']
})
export class OrgCardComponent {
  @Input() bloodGroup?: string; // Input property for blood group, made optional
  @Input() units?: number; // Input property for units available, made optional
}
