import { IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  refreshToken: string;
}
