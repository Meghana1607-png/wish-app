import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDonorListComponent } from './all-donor-list.component';

describe('AllDonorListComponent', () => {
  let component: AllDonorListComponent;
  let fixture: ComponentFixture<AllDonorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDonorListComponent]
    });
    fixture = TestBed.createComponent(AllDonorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
