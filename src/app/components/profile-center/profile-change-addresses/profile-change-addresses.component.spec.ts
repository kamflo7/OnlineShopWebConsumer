import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeAddressesComponent } from './profile-change-addresses.component';

describe('ProfileChangeAddressesComponent', () => {
  let component: ProfileChangeAddressesComponent;
  let fixture: ComponentFixture<ProfileChangeAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangeAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangeAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
