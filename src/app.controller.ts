import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Login')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: `Login implementation in the next task` })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
