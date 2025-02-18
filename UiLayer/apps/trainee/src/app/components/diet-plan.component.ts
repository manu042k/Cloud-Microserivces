import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import {
  RecommendationsService,
  DietPlanRequest,
} from '../services/recommendations.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectItem } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

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
    CheckboxModule,
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

            <div class="flex flex-col gap-2">
              <label>Disliked Foods</label>
              <p-multiSelect
                [options]="dislikedFoodsOptions"
                formControlName="disliked_foods"
                [showClear]="true"
                placeholder="Select Disliked Foods"
              ></p-multiSelect>
            </div>

            <div class="flex flex-col gap-2">
              <label>Preferred Cuisine</label>
              <p-multiSelect
                [options]="cuisineOptions"
                formControlName="preferred_cuisine"
                [showClear]="true"
                placeholder="Select Preferred Cuisine"
              ></p-multiSelect>
            </div>

            <div class="flex flex-col gap-2">
              <label>Meals Per Day</label>
              <p-inputNumber
                formControlName="meal_count_per_day"
                [min]="1"
                [max]="6"
              ></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2">
              <label>Cooking Time Limit (minutes)</label>
              <p-inputNumber
                formControlName="cooking_time_limit"
                [min]="10"
              ></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2">
              <label>Daily Caloric Intake</label>
              <p-inputNumber
                formControlName="caloric_intake"
                [min]="1000"
                [max]="5000"
              ></p-inputNumber>
            </div>

            <div class="flex flex-col gap-2" [formGroup]="macrosForm">
              <label>Macros</label>
              <div class="grid grid-cols-3 gap-4">
                <div class="flex flex-col gap-2">
                  <label>Protein</label>
                  <input pInputText formControlName="Protein" />
                </div>
                <div class="flex flex-col gap-2">
                  <label>Carbs</label>
                  <input pInputText formControlName="Carbs" />
                </div>
                <div class="flex flex-col gap-2">
                  <label>Fats</label>
                  <input pInputText formControlName="Fats" />
                </div>
              </div>
            </div>

            <!--div class="flex flex-col gap-2">
              <label>Options</label>
              <div class="flex gap-4">
                <p-checkbox
                
                  formControlName="detailed_recipe"
                  [binary]="true"
                  label="Detailed Recipe"
                ></p-checkbox>
                <p-checkbox
                  formControlName="shopping_list"
                  [binary]="true"
                  label="Shopping List"
                ></p-checkbox>
                <p-checkbox
                  formControlName="include_snacks"
                  [binary]="true"
                  label="Include Snacks"
                ></p-checkbox>
              </div>
            </div-->
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

  // Add getter for macros form group
  get macrosForm() {
    return this.dietForm.get('macros') as FormGroup;
  }

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
      allergies: [['Gluten', 'Dairy'], Validators.required],
      disliked_foods: [['Eggplant', 'Beets'], Validators.required],
      preferred_cuisine: [['Japanese', 'Mediterranean'], Validators.required],
      meal_count_per_day: [4, Validators.required],
      cooking_time_limit: [20, Validators.required],
      caloric_intake: [1800, Validators.required],
      macros: this.fb.group({
        Protein: ['25%', Validators.required],
        Carbs: ['10%', Validators.required],
        Fats: ['65%', Validators.required],
      }),
      detailed_recipe: [true, Validators.required],
      shopping_list: [true, Validators.required],
      include_snacks: [false, Validators.required],
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

  dislikedFoodsOptions = [
    { label: 'Eggplant', value: 'Eggplant' },
    { label: 'Beets', value: 'Beets' },
  ];

  cuisineOptions = [
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Mediterranean', value: 'Mediterranean' },
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
            this.dietPlan = response.message;
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
