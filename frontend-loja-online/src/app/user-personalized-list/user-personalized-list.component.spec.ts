import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalizedListComponent } from './user-personalized-list.component';

describe('UserPersonalizedListComponent', () => {
  let component: UserPersonalizedListComponent;
  let fixture: ComponentFixture<UserPersonalizedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPersonalizedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPersonalizedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
