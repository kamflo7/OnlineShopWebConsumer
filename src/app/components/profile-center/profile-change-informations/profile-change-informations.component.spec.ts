import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeInformationsComponent } from './profile-change-informations.component';

describe('ProfileChangeInformationsComponent', () => {
  let component: ProfileChangeInformationsComponent;
  let fixture: ComponentFixture<ProfileChangeInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangeInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangeInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
