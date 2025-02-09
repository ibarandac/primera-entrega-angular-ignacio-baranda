import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { TitleDirective } from './directives/title.directive';
import { MatListModule} from '@angular/material/list';

import {MatTableModule} from '@angular/material/table';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
  
  ],
  imports: [
    CommonModule,
    TitleDirective,
  ],
  exports: [
    FullNamePipe, 
    HighlightDirective, 
    TitleDirective, 
    MatListModule, 
    MatTableModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
