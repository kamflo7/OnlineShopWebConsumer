import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReportProductComponent } from './profile-report-product.component';

describe('ProfileReportProductComponent', () => {
  let component: ProfileReportProductComponent;
  let fixture: ComponentFixture<ProfileReportProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReportProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReportProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
