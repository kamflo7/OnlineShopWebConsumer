import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClosedSubmissionsComponent } from './profile-closed-submissions.component';

describe('ProfileClosedSubmissionsComponent', () => {
  let component: ProfileClosedSubmissionsComponent;
  let fixture: ComponentFixture<ProfileClosedSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileClosedSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileClosedSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
