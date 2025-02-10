import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-form-dialog',
  standalone: false,
  
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})
export class CourseFormDialogComponent {

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseFormDialogComponent>) {
      this.courseForm = this.fb.group ({
        name: ['', [Validators.required]],
        credits: ['', [Validators.required]],
        duration: ['', [Validators.required]],
      });
    }

  onConfirm(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
    this.matDialogRef.close(this.courseForm.value);
    }
  }
}
