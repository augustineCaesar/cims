import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaptismAddComponent } from './baptism-add.component';

describe('BaptismAddComponent', () => {
  let component: BaptismAddComponent;
  let fixture: ComponentFixture<BaptismAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaptismAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaptismAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
