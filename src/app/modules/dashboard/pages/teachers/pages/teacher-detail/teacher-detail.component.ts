import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../models';
import { TeacherService } from '../../../../../../core/services/teachers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-detail',
  standalone: false,
  
  templateUrl: './teacher-detail.component.html',
  styles: ``,
})
export class TeacherDetailComponent implements OnInit {

  isLoading = false;

  teacher: Teacher | null = null;
  teacherId: string = '';

  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private teachersService: TeacherService) {}
  ngOnInit(): void {
    this.isLoading = true;
    
    this.teachersService.getTeacherDetail(
      this.activatedRoute.snapshot.params['id']
    ).subscribe ({
      next: (teacher) => {
        this.teacher = teacher;
        this.errorMessage = '';
      },
      complete: () => {
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'El profesor no existe';
          }
        }
      },
      
      
    });
  }

}
