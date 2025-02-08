import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDonorListComponent } from './approved-donor-list.component';

describe('ApprovedDonorListComponent', () => {
  let component: ApprovedDonorListComponent;
  let fixture: ComponentFixture<ApprovedDonorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedDonorListComponent]
    });
    fixture = TestBed.createComponent(ApprovedDonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
