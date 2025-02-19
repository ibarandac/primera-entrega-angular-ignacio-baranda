import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-form-dialog',
  standalone: false,
  
  templateUrl: './teacher-form-dialog.component.html',
  styleUrl: './teacher-form-dialog.component.scss'
})
export class TeacherFormDialogComponent {

  teacherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TeacherFormDialogComponent>) {
      this.teacherForm = this.fb.group ({
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        course: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
      });
    }

  onConfirm(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
    } else {
    this.matDialogRef.close(this.teacherForm.value);
    }
  }
}
