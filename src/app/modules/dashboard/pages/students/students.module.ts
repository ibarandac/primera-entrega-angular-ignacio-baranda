import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';





@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogFormComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
  ],
  exports: [StudentsComponent],
})
export class StudentsModule { }
