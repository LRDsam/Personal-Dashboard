import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitCard } from '../habit-card/habit-card';
import { Habit } from '../../models/habit';

@Component({
  selector: 'app-habit-list',
  imports: [CommonModule, HabitCard],
  templateUrl: './habit-list.html',
  styleUrl: './habit-list.scss',
  standalone: true
})

export class HabitList{
  @Input() habits: Habit[] = [];
}
