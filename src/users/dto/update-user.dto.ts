import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;
}
