export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}