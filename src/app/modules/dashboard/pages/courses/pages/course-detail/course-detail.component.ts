import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-course-detail',
  standalone: false,
  
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  
   
    isLoading = false;
    courseId: string = '';
    course: Course | null = null;
    students: any[] = [];
    
    errorMessage = '';

    constructor(private coursesService: CourseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
      this.isLoading = true;
      
      this.coursesService.getCourseDetail(
        this.activatedRoute.snapshot.params['id']
      ).subscribe ({
        next: (course) => {
          this.course = course;
          this.students = course.students || [];
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false
        },
        error: (error) => {
          this.isLoading = false;
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El curso no existe';
            }
          }
        },

        
      });
    }

    

    
    onRemoveStudent(studentId: string) {
      this.coursesService.removeStudentFromCourse(this.courseId, studentId).subscribe(
        () => {
          // El estudiante ha sido eliminado, actualizamos la lista
          this.students = this.students.filter(student => student.id !== studentId);
        },
        (error) => {
          console.error('Error al desinscribir al estudiante', error);
        }
      );
    }
  }

