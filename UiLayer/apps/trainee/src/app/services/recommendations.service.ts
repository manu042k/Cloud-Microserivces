import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'apps/constants/api.constants';
import { Observable } from 'rxjs';

export interface DietPlanRequest {
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  activity_level: string;
  goal: string;
  diet_type: string;
  allergies: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  constructor(private http: HttpClient) {}

  getDietPlan(data: DietPlanRequest): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECOMMENDATIONS.DIET_PLAN}`,
      data
    );
  }

  getWorkoutPlan(data: { query: string }): Observable<any> {
    return this.http.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECOMMENDATIONS.WORKOUT}`,
      data
    );
  }
}
