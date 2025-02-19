import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';


@Component({
  selector: 'app-teachers-table',
  standalone: false,
  
  templateUrl: './teachers-table.component.html',
  styleUrl: './teachers-table.component.scss'
})
export class TeachersTableComponent {
  @Input ()
  dataSource: Teacher[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<Teacher>();

  displayedColumns = ['id', 'name', 'lastName', 'age', 'course', 'courseId', 'actions'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$
  }
}
