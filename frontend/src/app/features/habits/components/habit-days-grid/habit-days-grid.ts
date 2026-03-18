import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { Habit } from '../../models/habit';
import { HabitService } from '../../../../services/habit';

@Component({
  selector: 'app-habit-days-grid',
  imports: [CommonModule],
  templateUrl: './habit-days-grid.html',
  styleUrl: './habit-days-grid.scss',
  providers: [DatePipe],
  standalone: true
})
export class HabitDaysGrid implements OnInit {
  @Input() habit!: Habit;
  constructor(private datePipe: DatePipe, 
    private habitService: HabitService,
    private cdr: ChangeDetectorRef
  ) {}
  

  weeks: any[][] = [];
  dayNames = ['  ','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  dayIndices = [0, 1, 2, 3, 4, 5, 6];
  currentYear = new Date().getFullYear();
  currentWeekNumber: number = 0;

  ngOnInit() {
    this.generateWeeks();
    this.getCurrentWeekNumber();
  }

  generateWeeks() {
    this.weeks = [];
    const year = this.currentYear;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const dow = startDate.getDay();
    const monday = new Date(startDate);
    monday.setDate(startDate.getDate() - (dow === 0 ? 6 : dow - 1));

    let currentWeek: any[] = [];
    const current = new Date(monday);

    while (current.getTime() <= endDate.getTime()) {
      const currentDow = current.getDay();
      const dayOfWeekNum = currentDow === 0 ? 6 : currentDow - 1; // Ma=0, Zo=6
      const isBeforeYear = current.getTime() < startDate.getTime();

      if (isBeforeYear) {
        currentWeek.push({ date: null, dateStr: null, completed: false, dayOfWeek: dayOfWeekNum, empty: true });
      } else {
        const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
        currentWeek.push({
          date: new Date(current),
          dateStr,
          completed: this.habit?.completedDates?.includes(dateStr) ?? false,
          dayOfWeek: dayOfWeekNum,
          empty: false
        });
      }

      if (dayOfWeekNum === 6) {
        this.weeks.push([...currentWeek]);
        currentWeek = [];
      }

      current.setDate(current.getDate() + 1); // increment ná de push
    }

    if (currentWeek.length > 0) {
      this.weeks.push([...currentWeek]);
    }

    console.log('Aantal weken gegenereerd:', this.weeks.length); // moet ~52-53 zijn
  }

  getCurrentWeekNumber() {
    const weekNumber = this.datePipe.transform(new Date(), 'w');
    console.log('Current week number:', weekNumber);
    this.currentWeekNumber = weekNumber ? parseInt(weekNumber) - 1 : 0;
  }

  getDayForWeek(weekIndex: number, dayOfWeek: number): any {
    return this.weeks[weekIndex]?.find(d => d.dayOfWeek === dayOfWeek);
  }

  toggleDay(day: any) {
    if (day.empty) return;

    const index = this.habit.completedDates.indexOf(day.dateStr);
  
    if (index > -1) {
      this.habitService.removeCompletion(this.habit.id, day.dateStr).subscribe(() => {
        this.habit.completedDates.splice(index, 1);
        this.generateWeeks();
        this.cdr.detectChanges();
      });
    } else {
      this.habitService.addCompletion(this.habit.id, day.dateStr).subscribe(() => {
        this.habit.completedDates.push(day.dateStr);
        this.generateWeeks();
        this.cdr.detectChanges();
      });
    }
  }
}


