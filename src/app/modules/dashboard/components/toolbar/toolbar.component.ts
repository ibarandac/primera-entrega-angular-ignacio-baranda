import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUserEmail } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() drawerToggle = new EventEmitter();

  authUserName$: Observable<string | undefined>;

  constructor(private store: Store) {
    this.authUserName$ = this.store.select(selectAuthUserEmail);
  }
}