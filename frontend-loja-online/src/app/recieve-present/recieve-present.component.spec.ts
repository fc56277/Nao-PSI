import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievePresentComponent } from './recieve-present.component';

describe('RecievePresentComponent', () => {
  let component: RecievePresentComponent;
  let fixture: ComponentFixture<RecievePresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievePresentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecievePresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
