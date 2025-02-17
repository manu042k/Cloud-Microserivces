import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../interfaces/auth.interface';
import { API_CONFIG } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.USERS.LOGIN;
    return this.http.post<AuthResponse>(url, credentials);
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.USERS.REGISTER;
    return this.http.post<AuthResponse>(url, userData);
  }

  // Helper method to store token after successful login/register
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Method to log out user
  logout(): void {
    localStorage.removeItem('token');
  }
}
