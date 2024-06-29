import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmailNotRegistered } from '../validation-rules/email-not-registered.rule';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'user email (will also be the username after registration)',
  })
  @IsNotEmpty()
  @IsEmail()
  @EmailNotRegistered({ message: 'email already registered' })
  email: string;

  @ApiProperty({
    description: 'password for the user account',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
