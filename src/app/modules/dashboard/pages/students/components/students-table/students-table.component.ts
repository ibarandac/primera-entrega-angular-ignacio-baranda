import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';


@Component({
  selector: 'app-students-table',
  standalone: false,
  
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})
export class StudentsTableComponent {
  @Input ()
  dataSource: Student[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<Student>();

  displayedColumns = ['id', 'name', 'lastName', 'age', 'course', 'courseId', 'actions'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$
  }
}
