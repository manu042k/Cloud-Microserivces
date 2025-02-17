export interface User {
  UserId: string;
  Username: string;
  Email: string;
  FullName: string;
  UserType: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}
