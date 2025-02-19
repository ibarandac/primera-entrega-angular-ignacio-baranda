import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-detail',
  standalone: false,
  
  templateUrl: './teacher-detail.component.html',
  styles: ``
})
export class TeacherDetailComponent {
  teacherId: string;
  fullName: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.teacherId = this.activatedRoute.snapshot.params['id'];
    const name = this.activatedRoute.snapshot.queryParams['name'];
    const lastName = this.activatedRoute.snapshot.queryParams['lastName'];

    this.fullName = `${name} ${lastName}`;
    
  }

}
