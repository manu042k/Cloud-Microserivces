import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RecommendationsService } from '../services/recommendations.service';

@Component({
  selector: 'app-calorie-calculator',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FileUploadModule,
    ImageModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Calorie Calculator</h1>

      <p-card>
        <div class="flex flex-col gap-6">
          <!-- PrimeNG File Upload -->
          <p-fileUpload
            #fileUpload
            [showUploadButton]="false"
            [showCancelButton]="false"
            [multiple]="false"
            accept="image/*"
            [maxFileSize]="1000000"
            (onSelect)="onSelect($event)"
            [customUpload]="true"
            [auto]="true"
            chooseLabel="Choose Image"
            [styleClass]="imagePreview ? 'hidden' : ''"
          >
            <ng-template pTemplate="content">
              <div class="py-4 text-center" *ngIf="!imagePreview">
                <i class="pi pi-image text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">
                  Drag and drop or click to upload a food image
                </p>
                <p class="text-sm text-gray-400 mt-2">Max size: 1MB</p>
              </div>
            </ng-template>
          </p-fileUpload>

          <!-- Image Preview with PrimeNG Image -->
          <div *ngIf="imagePreview" class="relative">
            <p-image
              [src]="imagePreview"
              [preview]="true"
              [imageStyle]="{ 'max-height': '300px' }"
              styleClass="w-full"
              alt="Food preview"
            ></p-image>
            <button
              pButton
              icon="pi pi-times"
              class="p-button-rounded p-button-danger absolute top-2 right-2"
              (click)="removeImage()"
            ></button>
          </div>

          <!-- Analysis Button -->
          <div class="flex justify-center">
            <p-button
              label="Analyze Calories"
              icon="pi pi-calculator"
              [loading]="loading"
              [disabled]="!imagePreview"
              (onClick)="analyzeImage()"
              styleClass="p-button-primary"
            ></p-button>
          </div>

          <!-- Results -->
          <div *ngIf="calorieEstimate" class="mt-4">
            <h3 class="text-xl font-semibold mb-4">Calorie Estimate</h3>
            <div class=" p-4 rounded-lg">
              <pre class="whitespace-pre-wrap">{{ calorieEstimate }}</pre>
            </div>
          </div>
        </div>
      </p-card>
    </div>
    <p-toast></p-toast>
  `,
})
export class CalorieCalculatorComponent {
  imagePreview: string | null = null;
  loading = false;
  calorieEstimate: string | null = null;
  private base64Image: string | null = null;

  constructor(
    private recommendationsService: RecommendationsService,
    private messageService: MessageService
  ) {}

  onSelect(event: any) {
    const file = event.files[0];
    if (file) {
      if (file.size > 2000000) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size should not exceed 2MB',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        const base64String = e.target?.result as string;
        this.base64Image = base64String.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.base64Image = null;
    this.calorieEstimate = null;
  }

  analyzeImage() {
    if (!this.base64Image) return;

    this.loading = true;
    this.recommendationsService
      .getCalorieEstimate({ base64Image: this.base64Image })
      .subscribe({
        next: (response) => {
          this.calorieEstimate = response.response;
          console.log('Calorie estimate:', response.response);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error analyzing image:', error);
          this.loading = false;
        },
      });
  }
}
