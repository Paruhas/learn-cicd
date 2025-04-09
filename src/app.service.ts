import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  login(username: string, password: string): string {
    if (username !== 'admin' || password !== process.env.PASSWORD) {
      return 'Login failed';
    }

    return 'Login success';
  }
}
