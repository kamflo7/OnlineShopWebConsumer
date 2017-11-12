import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActiveSubmissionsComponent } from './profile-active-submissions.component';

describe('ProfileActiveSubmissionsComponent', () => {
  let component: ProfileActiveSubmissionsComponent;
  let fixture: ComponentFixture<ProfileActiveSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileActiveSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActiveSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
