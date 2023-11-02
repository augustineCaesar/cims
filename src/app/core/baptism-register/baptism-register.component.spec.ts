import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaptismRegisterComponent } from './baptism-register.component';

describe('BaptismRegisterComponent', () => {
  let component: BaptismRegisterComponent;
  let fixture: ComponentFixture<BaptismRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaptismRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaptismRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
