import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component';


@NgModule({
  declarations: [
    TeachersComponent,
    TeachersTableComponent,
    TeacherFormDialogComponent,
    TeacherDetailComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule,
  ]
})
export class TeachersModule { }
