import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
  styles: ``,
})
export class NavMenuComponent {

  linkItems: { label: string; routerLink: string } [] = [
    {
    label: 'Inicio',
    routerLink: 'home',
    },
    {
    label: 'Estudiantes',
    routerLink: 'students',
    },
    {
      label: 'Profesores',
      routerLink: 'teachers',
      },
    {
    label: 'Cursos',
    routerLink: 'courses',
    },
  ];

constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['auth', 'login']);
  }

}
