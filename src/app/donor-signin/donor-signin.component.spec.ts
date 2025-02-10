import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorSigninComponent } from './donor-signin.component';

describe('DonorSigninComponent', () => {
  let component: DonorSigninComponent;
  let fixture: ComponentFixture<DonorSigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorSigninComponent]
    });
    fixture = TestBed.createComponent(DonorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
