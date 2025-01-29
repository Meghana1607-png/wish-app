import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecRequestsComponent } from './rec-requests.component';

describe('RecRequestsComponent', () => {
  let component: RecRequestsComponent;
  let fixture: ComponentFixture<RecRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecRequestsComponent]
    });
    fixture = TestBed.createComponent(RecRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
