import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RecommendationsService } from '../services/recommendations.service';

@Component({
  selector: 'app-workout-plan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextarea,
    ButtonModule,
  ],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Workout Plan</h1>

      <p-card>
        <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label>Describe your fitness goals and preferences</label>
              <textarea
                pInputTextarea
                formControlName="query"
                [rows]="5"
                [autoResize]="true"
                placeholder="Example: I am a 30-year-old male looking to build muscle. I have access to a gym and can work out 5 days a week."
                class="w-full"
              ></textarea>
            </div>

            <div class="flex justify-center mt-4">
              <p-button
                type="submit"
                label="Generate Workout Plan"
                [loading]="loading"
                [disabled]="workoutForm.invalid"
              ></p-button>
            </div>
          </div>
        </form>
      </p-card>

      <div *ngIf="workoutPlan" class="mt-8">
        <p-card>
          <pre class="whitespace-pre-wrap">{{ workoutPlan | json }}</pre>
        </p-card>
      </div>
    </div>
  `,
})
export class WorkoutPlanComponent {
  workoutForm;
  loading = false;
  workoutPlan: any = null;

  constructor(
    private fb: FormBuilder,
    private recommendationsService: RecommendationsService
  ) {
    this.workoutForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.loading = true;
      this.recommendationsService
        .getWorkoutPlan(this.workoutForm.value as { query: string })
        .subscribe({
          next: (response) => {
            this.workoutPlan = response;
            this.loading = false;
            console.log('Workout plan:', response);
          },
          error: (error) => {
            console.error('Error fetching workout plan:', error);
            this.loading = false;
          },
        });
    }
  }
}
