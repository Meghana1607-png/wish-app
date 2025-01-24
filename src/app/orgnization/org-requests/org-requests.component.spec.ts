import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRequestsComponent } from './org-requests.component';

describe('OrgRequestsComponent', () => {
  let component: OrgRequestsComponent;
  let fixture: ComponentFixture<OrgRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgRequestsComponent]
    });
    fixture = TestBed.createComponent(OrgRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
