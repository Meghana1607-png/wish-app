import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDonorListComponent } from './pending-donor-list.component';

describe('PendingDonorListComponent', () => {
  let component: PendingDonorListComponent;
  let fixture: ComponentFixture<PendingDonorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDonorListComponent]
    });
    fixture = TestBed.createComponent(PendingDonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
