import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPresentComponent } from './send-present.component';

describe('SendPresentComponent', () => {
  let component: SendPresentComponent;
  let fixture: ComponentFixture<SendPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPresentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
