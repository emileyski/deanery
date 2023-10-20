export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  roles: string[];
  userPhoto?: string;
}
