import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSideBarComponent } from './header-side-bar.component';

describe('HeaderSideBarComponent', () => {
  let component: HeaderSideBarComponent;
  let fixture: ComponentFixture<HeaderSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSideBarComponent]
    });
    fixture = TestBed.createComponent(HeaderSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
