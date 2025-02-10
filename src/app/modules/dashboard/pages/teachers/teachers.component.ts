import { Component,OnDestroy , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { TeacherDialogFormComponent } from './components/teacher-dialog-form/teacher-dialog-form.component';
import { TeachersService } from '../../../../core/services/teachers.service';
import { take, Subscription, } from 'rxjs';

@Component({
  selector: 'app-teachers',
  standalone: false,
  
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit, OnDestroy{

  
  displayedColumns: string[] = ['id', 'name', 'age', 'country', 'actions'];
  // teachers: Teacher[] = [
  //   {
  //     id: generateRandomString(6),
  //     name: "Ignacio",
  //     lastName: "Baranda",
  //     age: 33,
  //     country: "Chile",
  //   }
  // ];

  editingTeacherId?: string | null = null;
  teachers: Teacher[] = [];

  isLoading = false;
  hasError = false;

  teachersSubscription?: Subscription;
  

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private teachersService: TeachersService ) {}

  ngOnDestroy(): void {
    // Este ciclo de vida se llama cuando el componente se destruye (sale de la vista);
    this.teachersSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadTeachersFromPromise()
    this.loadTeacherFromObs();
  }

  loadTeacherFromObs(): void {
    this.isLoading = true;
    this.teachersSubscription = this.teachersService
    .getTeachersObservable()
    .pipe(take(5))
    .subscribe({
      next: (teachers) => {
        console.log('Recibimos datos: ', teachers);
        this.teachers = [...teachers];
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
  loadTeachersFromPromise(): void {  
  this.isLoading = true;
    this.teachersService
      .getTeachersPromise()
      .then((teachers) => {
      this.teachers = teachers;
      this.hasError = false;
    })
    .catch((error) =>{
      this.hasError = true;
      console.error(error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }
  
  onDelete(id: string) {
    if (confirm("Estas seguro?"))
    this.teachers = this.teachers.filter(teacher => teacher.id !== id);
  }

  

  onEdit(teacher: Teacher): void {
    this.editingTeacherId = teacher.id;

    this.matDialog
      .open(TeacherDialogFormComponent, {
        data: teacher,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.teachers = this.teachers.map((teacher) =>
            teacher.id === this.editingTeacherId
                ? { ...teacher, ...valorFormulario }
                : teacher
            );
            this.editingTeacherId = null;
          }
        },
      });
  }

  onCreateTeacher(): void {
    this.matDialog
      .open(TeacherDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            this.teachers = [
              ...this.teachers,
              {
                id: generateRandomString(6),
                ...valorFormulario,
              },
            ];
          }
        },
      });
  }
}
