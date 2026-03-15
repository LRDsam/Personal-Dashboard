import { Routes } from '@angular/router';
import { Habits } from './features/habits/pages/habits/habits';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
    {path: 'home', component:Home},
    {path: 'habits', component:Habits},  
];
