import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentDetailComponent } from './present-detail.component';

describe('PresentDetailComponent', () => {
  let component: PresentDetailComponent;
  let fixture: ComponentFixture<PresentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
