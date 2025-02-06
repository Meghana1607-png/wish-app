import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedReceiversComponent } from './approved-receivers.component';

describe('ApprovedReceiversComponent', () => {
  let component: ApprovedReceiversComponent;
  let fixture: ComponentFixture<ApprovedReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedReceiversComponent]
    });
    fixture = TestBed.createComponent(ApprovedReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
