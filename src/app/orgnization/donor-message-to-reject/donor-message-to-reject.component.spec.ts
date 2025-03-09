import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorMessageToRejectComponent } from './donor-message-to-reject.component';

describe('DonorMessageToRejectComponent', () => {
  let component: DonorMessageToRejectComponent;
  let fixture: ComponentFixture<DonorMessageToRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorMessageToRejectComponent]
    });
    fixture = TestBed.createComponent(DonorMessageToRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
