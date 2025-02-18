import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: 'services',
    loadComponent: () =>
      import('../components/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'diet',
    loadComponent: () =>
      import('../components/diet-plan.component').then(
        (m) => m.DietPlanComponent
      ),
  },
  {
    path: 'workout',
    loadComponent: () =>
      import('../components/workout-plan.component').then(
        (m) => m.WorkoutPlanComponent
      ),
  },
];
