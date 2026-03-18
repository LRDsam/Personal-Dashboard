import { Component, Input} from '@angular/core';
import { Habit } from '../../models/habit';
import { HabitDaysGrid } from "../habit-days-grid/habit-days-grid";

@Component({
  selector: 'app-habit-card',
  imports: [HabitDaysGrid],
  templateUrl: './habit-card.html',
  styleUrl: './habit-card.scss',
  standalone: true
})
export class HabitCard {
  @Input() habit!: Habit;
}
