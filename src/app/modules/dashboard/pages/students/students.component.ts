import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../core/services/students.service';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  isLoading = false;

  dataSource: Student[] = [];

  isAdmin$: Observable<boolean>;
  constructor(private studentService: StudentService, private matDialog: MatDialog, private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
  
  handleStudentsUpdate(data: Student[]): void {
    this.dataSource = [...data];
  }

  openFormDialog(editingStudent?: Student): void {
    if (editingStudent) {
      console.log('Se va a editar: ', editingStudent);
    }
    this.matDialog
      .open(StudentFormDialogComponent, { data: { editingStudent } })
      // Cuando el dialogo se cierra...
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            // CREAR O ACTUALIZAR CURSO
            if (!!editingStudent) {
              // ACTUALIZAR
              this.updateStudent(editingStudent.id, data);
            } else {
              // CREAR
              this.addStudent(data);
            }
          }
        },
      });
  }

  updateStudent(id: string, data: { name: string, lastName: string, age: number, course: string, courseId: string }) {
    this.isLoading = true;
    this.studentService.updateStudentById(id, data).subscribe({
      next: (data) => this.handleStudentsUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  addStudent(data: { name: string, lastName: string, age: number, course: string, courseId: string }): void {
    this.isLoading = true;
    this.studentService.addStudent(data).subscribe({
      next: (data) => this.handleStudentsUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.handleStudentsUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string): void {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;
      this.studentService.deleteStudentById(id).subscribe({
        next: (data) => {
          this.handleStudentsUpdate(data);
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}