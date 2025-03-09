import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/org.service';

@Component({
  selector: 'app-message-to-reject',
  templateUrl: './message-to-reject.component.html',
  styleUrls: ['./message-to-reject.component.css'],
})
export class MessageToRejectComponent {
  userId: any;
  message: string = '';

  constructor(
    private orgService: OrgService,
    private router: Router,
    private active: ActivatedRoute
  ) {
    this.userId = localStorage.getItem('userId');
  }

  async ngOnInit() {
    this.active.queryParams.subscribe((params) => {
      this.receiver = {
        id: params['userid'],
      };
    });
  }

  receiver: {
    id: any;
  } = {
    id: '',
  };

  rejectReceiver(userId: any, message: string): void {
    this.orgService.rejectReceiver(userId, message).subscribe({
      next: (data: any) => {
        console.log('rejectReceiverData:', data);
        this.router.navigate(['/org-dashboard']);
      },
      error: (err: any) => {
        console.error('error in rejecting the receiver', err);
      },
    });
  }
}
