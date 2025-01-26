export interface CreateUserDTO {
  Username: string;
  Email: string;
  Password: string;
  UserType: "Trainer" | "Trainee";
}
