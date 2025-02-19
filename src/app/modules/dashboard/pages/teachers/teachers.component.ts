import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../core/services/teachers.service';
import { Teacher } from './models';
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-teachers',
  standalone: false,
  
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {
  isLoading = false;

  dataSource: Teacher[] = [];

  isAdmin$: Observable<boolean>;
  constructor(private teacherService: TeacherService, private matDialog: MatDialog, private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
  
  handleTeachersUpdate(data: Teacher[]): void {
    this.dataSource = [...data];
  }

  openFormDialog(editingTeacher?: Teacher): void {
    if (editingTeacher) {
      console.log('Se va a editar: ', editingTeacher);
    }
    this.matDialog
      .open(TeacherFormDialogComponent, { data: { editingTeacher } })
      // Cuando el dialogo se cierra...
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            // CREAR O ACTUALIZAR CURSO
            if (!!editingTeacher) {
              // ACTUALIZAR
              this.updateTeacher(editingTeacher.id, data);
            } else {
              // CREAR
              this.addTeacher(data);
            }
          }
        },
      });
  }

  updateTeacher(id: string, data: { name: string, lastName: string, age: number, course: string, courseId: string }) {
    this.isLoading = true;
    this.teacherService.updateTeacherById(id, data).subscribe({
      next: (data) => this.handleTeachersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  addTeacher(data: { name: string, lastName: string, age: number, course: string, courseId: string }): void {
    this.isLoading = true;
    this.teacherService.addTeacher(data).subscribe({
      next: (data) => this.handleTeachersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.handleTeachersUpdate(data);
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
      this.teacherService.deleteTeacherById(id).subscribe({
        next: (data) => {
          this.handleTeachersUpdate(data);
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