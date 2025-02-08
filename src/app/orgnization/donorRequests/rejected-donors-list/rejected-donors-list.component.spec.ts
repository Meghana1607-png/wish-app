import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDonorsListComponent } from './rejected-donors-list.component';

describe('RejectedDonorsListComponent', () => {
  let component: RejectedDonorsListComponent;
  let fixture: ComponentFixture<RejectedDonorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedDonorsListComponent]
    });
    fixture = TestBed.createComponent(RejectedDonorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
