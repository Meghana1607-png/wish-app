import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnizationComponent } from './orgnization.component';

describe('OrgnizationComponent', () => {
  let component: OrgnizationComponent;
  let fixture: ComponentFixture<OrgnizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgnizationComponent]
    });
    fixture = TestBed.createComponent(OrgnizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
