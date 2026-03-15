import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { Header } from './header/header';
import { NavigationBar } from './navigation-bar/navigation-bar';
import { Footer } from './footer/footer';

@NgModule({
  declarations: [Header,
    NavigationBar,
    Footer,
  ],

  imports: [
    CommonModule,
    AvatarModule,
    MenuModule,
  ],

  exports: [Header,
    NavigationBar,
    Footer
  ]
})

export class CoreModule { }
