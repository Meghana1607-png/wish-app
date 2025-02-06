import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDonorListComponent } from './rejected-donor-list.component';

describe('RejectedDonorListComponent', () => {
  let component: RejectedDonorListComponent;
  let fixture: ComponentFixture<RejectedDonorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedDonorListComponent]
    });
    fixture = TestBed.createComponent(RejectedDonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
