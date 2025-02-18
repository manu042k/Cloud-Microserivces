import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from '@ui-layer/auth';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule],
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss'],
})
export class UserDisplayComponent {
  user$;
  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
}
