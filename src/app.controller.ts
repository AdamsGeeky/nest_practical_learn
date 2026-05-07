import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): string {
    return 'Service is running!';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('welcome')
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }
}
