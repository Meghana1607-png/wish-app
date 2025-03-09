import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToRejectComponent } from './message-to-reject.component';

describe('MessageToRejectComponent', () => {
  let component: MessageToRejectComponent;
  let fixture: ComponentFixture<MessageToRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageToRejectComponent]
    });
    fixture = TestBed.createComponent(MessageToRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
