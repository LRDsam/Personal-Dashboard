import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habit } from '../features/habits/models/habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private apiUrl = 'http://localhost:5165/api/habits';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.apiUrl);
  }

  create(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, habit);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCompletion(habitId: number, date: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${habitId}/completions`, JSON.stringify(date), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  removeCompletion(habitId: number, date: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${habitId}/completions`, {
      body: JSON.stringify(date),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  
  
}
