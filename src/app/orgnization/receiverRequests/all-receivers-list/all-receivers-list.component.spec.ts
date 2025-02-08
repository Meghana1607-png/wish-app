import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReceiversListComponent } from './all-receivers-list.component';

describe('AllReceiversListComponent', () => {
  let component: AllReceiversListComponent;
  let fixture: ComponentFixture<AllReceiversListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllReceiversListComponent]
    });
    fixture = TestBed.createComponent(AllReceiversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
