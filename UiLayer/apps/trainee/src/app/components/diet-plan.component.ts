import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'apps/constants/api.constants';
import {
  RecommendationsService,
  DietPlanRequest,
} from '../services/recommendations.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-diet-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    SelectButtonModule,
  ],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Diet Plan</h1>

      <p-card>
        <form [formGroup]="dietForm" (ngSubmit)="onSubmit()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label>Age</label>
              <p-inputNumber formControlName="age"></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2">
              <label>Gender</label>
              <p-selectButton
                [options]="genderOptions"
                formControlName="gender"
                optionLabel="label"
                optionValue="value"
              ></p-selectButton>
            </div>

            <div class="flex flex-col gap-2">
              <label>Height (cm)</label>
              <p-inputNumber formControlName="height_cm"></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2">
              <label>Weight (kg)</label>
              <p-inputNumber formControlName="weight_kg"></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2">
              <label>Activity Level</label>
              <p-selectButton
                [options]="activityOptions"
                formControlName="activity_level"
                optionLabel="label"
                optionValue="value"
              ></p-selectButton>
            </div>

            <div class="flex flex-col gap-2">
              <label>Goal</label>
              <p-selectButton
                [options]="goalOptions"
                formControlName="goal"
                optionLabel="label"
                optionValue="value"
              ></p-selectButton>
            </div>

            <div class="flex flex-col gap-2">
              <label>Diet Type</label>
              <p-selectButton
                [options]="dietTypeOptions"
                formControlName="diet_type"
                optionLabel="label"
                optionValue="value"
              ></p-selectButton>
            </div>

            <div class="flex flex-col gap-2">
              <label>Allergies</label>
              <p-multiSelect
                [options]="allergyOptions"
                formControlName="allergies"
                [showClear]="true"
                placeholder="Select Allergies"
              ></p-multiSelect>
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <p-button
              type="submit"
              label="Generate Diet Plan"
              [loading]="loading"
              [disabled]="dietForm.invalid"
            ></p-button>
          </div>
        </form>
      </p-card>

      <div *ngIf="dietPlan" class="mt-8">
        <p-card>
          <pre class="whitespace-pre-wrap">{{ dietPlan | json }}</pre>
        </p-card>
      </div>
    </div>
  `,
})
export class DietPlanComponent {
  dietForm;
  constructor(
    private fb: FormBuilder,
    private recommendationsService: RecommendationsService
  ) {
    this.dietForm = this.fb.group({
      age: [30, Validators.required],
      gender: ['Female', Validators.required],
      height_cm: [165, Validators.required],
      weight_kg: [60, Validators.required],
      activity_level: ['Light (1-2 workouts per week)', Validators.required],
      goal: ['Weight loss', Validators.required],
      diet_type: ['Keto', Validators.required],
      allergies: [['Gluten', 'Dairy']],
    });
  }

  genderOptions: SelectItem[] = [
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
  ];

  activityOptions: SelectItem[] = [
    { label: 'Sedentary', value: 'Sedentary' },
    { label: 'Light', value: 'Light (1-2 workouts per week)' },
    { label: 'Moderate', value: 'Moderate (3-4 workouts per week)' },
    { label: 'Active', value: 'Active (5+ workouts per week)' },
  ];

  goalOptions: SelectItem[] = [
    { label: 'Weight Loss', value: 'Weight loss' },
    { label: 'Maintenance', value: 'Maintenance' },
    { label: 'Muscle Gain', value: 'Muscle gain' },
  ];

  dietTypeOptions: SelectItem[] = [
    { label: 'Keto', value: 'Keto' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Mediterranean', value: 'Mediterranean' },
    { label: 'Paleo', value: 'Paleo' },
  ];

  allergyOptions = [
    { label: 'Gluten', value: 'Gluten' },
    { label: 'Dairy', value: 'Dairy' },
    { label: 'Nuts', value: 'Nuts' },
    { label: 'Soy', value: 'Soy' },
    { label: 'Eggs', value: 'Eggs' },
  ];

  loading = false;
  dietPlan: any = null;

  onSubmit() {
    if (this.dietForm.valid) {
      this.loading = true;
      this.recommendationsService
        .getDietPlan(this.dietForm.value as DietPlanRequest)
        .subscribe({
          next: (response) => {
            this.dietPlan = response;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error fetching diet plan:', error);
            this.loading = false;
          },
        });
    }
  }
}
