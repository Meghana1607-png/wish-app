import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecAwarenessComponent } from './rec-awareness.component';

describe('RecAwarenessComponent', () => {
  let component: RecAwarenessComponent;
  let fixture: ComponentFixture<RecAwarenessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecAwarenessComponent]
    });
    fixture = TestBed.createComponent(RecAwarenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
