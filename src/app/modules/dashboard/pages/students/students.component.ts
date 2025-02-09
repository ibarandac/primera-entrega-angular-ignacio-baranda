import { Component,OnDestroy , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import { take, Subscription, } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy{

  
  displayedColumns: string[] = ['id', 'name', 'age', 'country', 'actions'];
  // students: Student[] = [
  //   {
  //     id: generateRandomString(6),
  //     name: "Ignacio",
  //     lastName: "Baranda",
  //     age: 33,
  //     country: "Chile",
  //   }
  // ];

  editingStudentId?: string | null = null;
  students: Student[] = [];

  isLoading = false;
  hasError = false;

  studentsSubscription?: Subscription;
  

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private studentsService: StudentsService ) {}

  ngOnDestroy(): void {
    // Este ciclo de vida se llama cuando el componente se destruye (sale de la vista);
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadStudentsFromPromise()
    this.loadStudentFromObs();
  }

  loadStudentFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
    .getStudentsObservable()
    .pipe(take(5))
    .subscribe({
      next: (students) => {
        console.log('Recibimos datos: ', students);
        this.students = [...students];
        this.isLoading = false;
      },
      error: (error) => {
        alert(error);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
  loadStudentsFromPromise(): void {  
  this.isLoading = true;
    this.studentsService
      .getStudentsPromise()
      .then((students) => {
      this.students = students;
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
    this.students = this.students.filter(student => student.id !== id);
  }

  

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentDialogFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...valorFormulario }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            this.students = [
              ...this.students,
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
