import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HabitList } from '../../components/habit-list/habit-list';
import { HabitService } from '../../../../services/habit';
import { Habit }  from '../../models/habit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habits',
  imports: [CommonModule, HabitList],
  templateUrl: './habits.html',
  styleUrl: './habits.scss',
  standalone: true
})

export class Habits implements OnInit{ 
  habits: Habit[] = [];
  
  constructor(private habitService: HabitService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.habitService.getAll().subscribe((habits) => {
      this.habits = habits;
      this.cdr.detectChanges();
    });
  }

}
