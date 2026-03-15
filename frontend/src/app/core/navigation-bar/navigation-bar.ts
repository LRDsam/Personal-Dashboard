import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
  standalone: false
})
export class NavigationBar implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        items: [ 
          { 
            label: 'Home', 
            icon: 'pi pi-home',
            routerLink: '/home'
          },
          { 
            label: 'Habits', 
            icon: 'pi pi-chart-bar',
            routerLink: '/habits'
          },
        ]
      }
    ];
  }
}
