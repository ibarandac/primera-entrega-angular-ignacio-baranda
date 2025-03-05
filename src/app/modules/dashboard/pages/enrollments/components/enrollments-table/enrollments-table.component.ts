import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Enrollment } from '../../models';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';


@Component({
  selector: 'app-enrollments-table',
  standalone: false,
  
  templateUrl: './enrollments-table.component.html',
  styleUrl: './enrollments-table.component.scss'
})
export class EnrollmentsTableComponent {
  @Input ()
  dataSource: Enrollment[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<Enrollment>();

  displayedColumns = ['id','student', 'studentId', 'course', 'courseId', 'actions'];

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$
  }
}
