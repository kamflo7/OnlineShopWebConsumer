import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOffersComponent } from './profile-offers.component';

describe('ProfileOffersComponent', () => {
  let component: ProfileOffersComponent;
  let fixture: ComponentFixture<ProfileOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
