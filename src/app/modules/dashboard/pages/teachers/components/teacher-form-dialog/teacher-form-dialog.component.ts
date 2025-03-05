import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from '../../models';

interface TeacherFormDialogData {
  editingTeacher?: Teacher;
}

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
    private matDialogRef: MatDialogRef<TeacherFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: TeacherFormDialogData
    ) {
      this.teacherForm = this.fb.group ({
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        course: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
      });
      if (!!data && !!data.editingTeacher) {
        this.teacherForm.patchValue(data.editingTeacher);
      }
    }
    

  onConfirm(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
    } else {
    this.matDialogRef.close(this.teacherForm.value);
    }
  }
}
