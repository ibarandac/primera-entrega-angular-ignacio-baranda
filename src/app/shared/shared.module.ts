import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { TitleDirective } from './directives/title.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
  
  ],
  imports: [
    CommonModule,
    TitleDirective,
  ],
  exports: [FullNamePipe, HighlightDirective, TitleDirective],
})
export class SharedModule { }
