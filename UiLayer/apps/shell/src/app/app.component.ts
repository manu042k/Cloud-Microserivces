import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './core/store/auth/auth.selectors';
import * as AuthActions from './core/store/auth/auth.actions';

@Component({
  imports: [
    RouterModule,
    ButtonModule,
    CommonModule,
    AvatarModule,
    Menubar,
    ToastModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  items: MenuItem[] | undefined;
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private store: Store) {
    this.items = [];
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
