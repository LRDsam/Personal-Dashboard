import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/habit';
import { HabitDaysGrid } from "../habit-days-grid/habit-days-grid";

@Component({
  selector: 'app-habit-card',
  imports: [HabitDaysGrid],
  templateUrl: './habit-card.html',
  styleUrl: './habit-card.scss',
})
export class HabitCard implements OnInit {
  habit: Habit | undefined;
  
  ngOnInit() {
    this.loadHabit();
  }

  loadHabit() {
    // Placeholder for loading habit data, replace with actual data fetching logic
    this.habit = {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of jogging every morning to stay fit and healthy.',
      color: '#FF5733',
      completedDates: ['2026-06-01', '2024-06-02', '2024-06-03'] // Voorbeeld van voltooide datums
    };
  }
}
