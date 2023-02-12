import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async signup() {
    return 'sign up';
  }

  public async login() {
    return `login`;
  }

  public async refresh() {
    return `refresh`;
  }
}
