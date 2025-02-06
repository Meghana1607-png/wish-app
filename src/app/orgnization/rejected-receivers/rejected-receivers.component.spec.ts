import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReceiversComponent } from './rejected-receivers.component';

describe('RejectedReceiversComponent', () => {
  let component: RejectedReceiversComponent;
  let fixture: ComponentFixture<RejectedReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedReceiversComponent]
    });
    fixture = TestBed.createComponent(RejectedReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
