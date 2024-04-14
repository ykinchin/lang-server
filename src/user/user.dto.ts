import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
