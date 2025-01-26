export interface CreateUserDTO {
  Username: string;
  Email: string;
  FullName: string;
  Password: string;
  UserType: "Trainer" | "Trainee";
}
