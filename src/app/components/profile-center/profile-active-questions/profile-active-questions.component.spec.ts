import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActiveQuestionsComponent } from './profile-active-questions.component';

describe('ProfileActiveQuestionsComponent', () => {
  let component: ProfileActiveQuestionsComponent;
  let fixture: ComponentFixture<ProfileActiveQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileActiveQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActiveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
