export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  Username: string;
  Email: string;
  FullName: string;
  Password: string;
  UserType: 'Trainer' | 'User'; // Using union type for specific values
}

export interface AuthResponse {
  token?: string;
  message?: string;
  // Add other response fields as needed
}
