import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDaysGrid } from './habit-days-grid';

describe('HabitDaysGrid', () => {
  let component: HabitDaysGrid;
  let fixture: ComponentFixture<HabitDaysGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitDaysGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitDaysGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
