import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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
    {
      label: 'Inscripciones',
      routerLink: 'enrollments',
      },
  ];

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

}
