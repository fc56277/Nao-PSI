import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileToWatchComponent } from './user-profile-to-watch.component';

describe('UserProfileToWatchComponent', () => {
  let component: UserProfileToWatchComponent;
  let fixture: ComponentFixture<UserProfileToWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileToWatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileToWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
