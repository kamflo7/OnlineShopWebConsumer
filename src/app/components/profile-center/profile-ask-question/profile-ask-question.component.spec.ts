import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAskQuestionComponent } from './profile-ask-question.component';

describe('ProfileAskQuestionComponent', () => {
  let component: ProfileAskQuestionComponent;
  let fixture: ComponentFixture<ProfileAskQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAskQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAskQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
