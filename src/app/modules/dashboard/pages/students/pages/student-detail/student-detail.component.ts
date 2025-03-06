import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models';
import { StudentService } from '../../../../../../core/services/students.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  
  templateUrl: './student-detail.component.html',
  styles: ``,
})
export class StudentDetailComponent implements OnInit {

  isLoading = false;

  student: Student | null = null;
  studentId: string = '';

  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentService) {}
  ngOnInit(): void {
    this.isLoading = true;
    
    this.studentsService.getStudentDetail(
      this.activatedRoute.snapshot.params['id']
    ).subscribe ({
      next: (student) => {
        this.student = student;
        this.errorMessage = '';
      },
      complete: () => {
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'El estudiante no existe';
          }
        }
      },

      
    });
  }

}
