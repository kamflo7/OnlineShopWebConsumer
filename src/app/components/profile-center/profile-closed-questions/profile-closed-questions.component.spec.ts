import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClosedQuestionsComponent } from './profile-closed-questions.component';

describe('ProfileClosedQuestionsComponent', () => {
  let component: ProfileClosedQuestionsComponent;
  let fixture: ComponentFixture<ProfileClosedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileClosedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileClosedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
