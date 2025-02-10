import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import { TeacherDialogFormComponent } from './components/teacher-dialog-form/teacher-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component';





@NgModule({
  declarations: [
    TeachersComponent,
    TeacherDialogFormComponent,
    TeacherDetailComponent,
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
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
  exports: [TeachersComponent],
})
export class TeachersModule { }
