import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-courses-table',
  standalone: false,
  
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
  @Input ()
  dataSource: Course[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<Course>();

  displayedColumns = ['id', 'name', 'credits', 'duration', 'actions'];
}
