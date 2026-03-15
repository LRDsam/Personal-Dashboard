import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe} from '@angular/common';
import { Habit } from '../../models/habit';

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
  constructor(private datePipe: DatePipe) {}

  weeks: any[][] = [];
  dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
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

    // Maandag van de week waarin 1 januari valt
    const firstDate = new Date(startDate);
    const dayOfWeek = firstDate.getDay();
    const monday = new Date(firstDate);
    monday.setDate(firstDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    let currentWeek: any[] = [];
    for (let date = new Date(monday); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeekNum = date.getDay() === 0 ? 6 : date.getDay() - 1; // Ma=0, Zo=6
    
      if (date < startDate) {
        currentWeek.push({
          date: null,
          dateStr: null,
          completed: false,
          dayOfWeek: dayOfWeekNum,
          empty: true
        }); // Vul lege dagen voor het begin van het jaar
      } else {
        const dateStr = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0')
        ].join('-');

        const IsCompleted = Math.random() < 0.5; // Placeholder voor completed status, vervang met echte logica

        currentWeek.push({
          date: new Date(date),
          dateStr: dateStr,
          completed: IsCompleted,
          dayOfWeek: date.getDay(),
          empty: false
        });
      }
    }
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
    console.log(day.dateStr);
    if (index > -1) {
      this.habit.completedDates.splice(index, 1);
    } else {
      this.habit.completedDates.push(day.dateStr);
    }
    this.generateWeeks();
  }
}

