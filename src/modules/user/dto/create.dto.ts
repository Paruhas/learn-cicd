import { IsNotEmpty, IsString } from 'class-validator';

export class requestCreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
