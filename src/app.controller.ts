import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './logger/guards/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getHello(): string {
    return this.appService.getHello();
  }
}
