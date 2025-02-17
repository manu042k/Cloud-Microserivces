import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
  ],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <p-card [style]="{ width: '50rem', overflow: 'hidden' }">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email</label
            >
            <span class="p-input-icon-left w-full">
              <input
                pInputText
                type="email"
                formControlName="email"
                class="w-full"
                placeholder="Enter your email"
              />
            </span>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <p-password
              formControlName="password"
              [toggleMask]="true"
              [feedback]="false"
              styleClass="w-full"
              placeholder="Enter your password"
              [inputStyle]="{ width: '100%' }"
            ></p-password>
          </div>
          <p-button
            type="submit"
            [disabled]="!signInForm.valid"
            styleClass="w-full"
            label="Sign In"
          ></p-button>
        </form>
      </p-card>
    </div>
  `,
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (response) => {
          if (response.token) {
            console.log(response.token);
            // Handle successful login
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          // Handle error - you might want to show a message to the user
          console.error('Login failed:', error);
        },
      });
    }
  }
}
