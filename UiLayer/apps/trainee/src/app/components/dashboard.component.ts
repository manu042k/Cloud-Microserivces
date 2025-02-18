import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Fitness Services</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          *ngFor="let service of services"
          class="transform transition-all hover:scale-105"
        >
          <p-card [style]="{ width: '100%', height: '100%' }">
            <div class="flex flex-col items-center p-4 text-center">
              <i [class]="service.icon" class="text-4xl mb-4 text-primary"></i>
              <h2 class="text-xl font-bold mb-2">{{ service.title }}</h2>
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              <p-button
                label="Explore"
                [rounded]="true"
                (onClick)="navigateToService(service.route)"
              >
              </p-button>
            </div>
          </p-card>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  services: ServiceCard[] = [
    {
      title: 'Calorie Calculator',
      description: 'Upload food images to get instant calorie estimates',
      icon: 'pi pi-camera',
      route: '/trainee/calories',
    },
    {
      title: 'Diet Plan',
      description: 'Get personalized diet recommendations',
      icon: 'pi pi-book',
      route: '/trainee/diet',
    },
    {
      title: 'Workout Plan',
      description: 'Receive customized workout recommendations',
      icon: 'pi pi-heart-fill',
      route: '/trainee/workout',
    },
    {
      title: 'Training Sessions',
      description: 'Schedule and manage your training sessions',
      icon: 'pi pi-calendar',
      route: '/trainee/sessions',
    },
  ];

  constructor(private router: Router) {}

  navigateToService(route: string) {
    this.router.navigate([route]);
  }
}
