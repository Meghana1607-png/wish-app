import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiverComponent } from './view-receiver.component';

describe('ViewReceiverComponent', () => {
  let component: ViewReceiverComponent;
  let fixture: ComponentFixture<ViewReceiverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceiverComponent]
    });
    fixture = TestBed.createComponent(ViewReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
