import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrgFormComponent } from './view-org-form.component';

describe('ViewOrgFormComponent', () => {
  let component: ViewOrgFormComponent;
  let fixture: ComponentFixture<ViewOrgFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrgFormComponent]
    });
    fixture = TestBed.createComponent(ViewOrgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
