import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserType } from '../../core/enums/user-type.enum';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    DropdownModule,
  ],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <p-card [style]="{ width: '50rem', overflow: 'hidden' }">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Username</label
            >
            <span class="p-input-icon-left w-full">
              <i class="pi pi-user"></i>
              <input
                pInputText
                type="text"
                formControlName="Username"
                class="w-full"
                placeholder="Enter your username"
              />
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Full Name</label
            >
            <span class="p-input-icon-left w-full">
              <i class="pi pi-user"></i>
              <input
                pInputText
                type="text"
                formControlName="FullName"
                class="w-full"
                placeholder="Enter your full name"
              />
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email</label
            >
            <span class="p-input-icon-left w-full">
              <i class="pi pi-envelope"></i>
              <input
                pInputText
                type="email"
                formControlName="Email"
                class="w-full"
                placeholder="Enter your email"
              />
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <p-password
              formControlName="Password"
              [toggleMask]="true"
              [feedback]="true"
              styleClass="w-full"
              placeholder="Enter your password"
              [inputStyle]="{ width: '100%' }"
            ></p-password>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Confirm Password</label
            >
            <p-password
              formControlName="confirmPassword"
              [toggleMask]="true"
              [feedback]="false"
              styleClass="w-full"
              placeholder="Confirm your password"
              [inputStyle]="{ width: '100%' }"
            ></p-password>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >User Type</label
            >
            <p-dropdown
              [options]="userTypes"
              formControlName="UserType"
              optionLabel="label"
              optionValue="value"
              [style]="{ width: '100%' }"
              placeholder="Select User Type"
            ></p-dropdown>
          </div>
          <p-button
            type="submit"
            [disabled]="!signUpForm.valid"
            styleClass="w-full"
            label="Sign Up"
          ></p-button>
        </form>
      </p-card>
    </div>
  `,
})
export class SignUpComponent {
  signUpForm: FormGroup;
  userTypes = [
    { label: 'Trainer', value: UserType.TRAINER },
    { label: 'Trainee', value: UserType.TRAINEE },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private toast: MessageService
  ) {
    this.signUpForm = this.fb.group(
      {
        Username: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        FullName: ['', [Validators.required]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        UserType: [UserType.TRAINER, [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const userData = { ...this.signUpForm.value };
      delete userData.confirmPassword;
      this.store.dispatch(AuthActions.signup({ userData }));
    }
  }
}
