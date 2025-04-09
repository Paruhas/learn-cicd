import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.appService.login(username, password);
  }
}
