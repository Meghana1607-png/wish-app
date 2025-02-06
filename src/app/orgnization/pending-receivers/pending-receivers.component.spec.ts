import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReceiversComponent } from './pending-receivers.component';

describe('PendingReceiversComponent', () => {
  let component: PendingReceiversComponent;
  let fixture: ComponentFixture<PendingReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingReceiversComponent]
    });
    fixture = TestBed.createComponent(PendingReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
