import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthUserEmail } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  authUserName$: Observable<string | undefined>;

  constructor(private store: Store) {
    this.authUserName$ = this.store.select(selectAuthUserEmail);
  }
}
