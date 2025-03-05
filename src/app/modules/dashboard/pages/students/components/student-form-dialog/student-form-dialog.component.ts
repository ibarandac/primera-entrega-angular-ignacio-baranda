import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models';

interface StudentFormDialogData {
  editingStudent?: Student;
}

@Component({
  selector: 'app-student-form-dialog',
  standalone: false,
  
  templateUrl: './student-form-dialog.component.html',
  styleUrl: './student-form-dialog.component.scss'
})
export class StudentFormDialogComponent {

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: StudentFormDialogData
    ) {
      this.studentForm = this.fb.group ({
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        course: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
      });
      if (!!data && !!data.editingStudent) {
        this.studentForm.patchValue(data.editingStudent);
      }
    }

  onConfirm(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
    this.matDialogRef.close(this.studentForm.value);
    }
  }
}
