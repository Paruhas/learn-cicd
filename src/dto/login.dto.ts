import { IsString } from 'class-validator';

export class loginReqDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
