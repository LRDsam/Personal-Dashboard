import { Component } from '@angular/core';
import { HabitCard } from '../../components/habit-card/habit-card';

@Component({
  selector: 'app-habits',
  imports: [HabitCard],
  templateUrl: './habits.html',
  styleUrl: './habits.scss',
  standalone: true
})
export class Habits {

}
