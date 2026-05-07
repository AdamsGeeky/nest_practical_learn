import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getWelcomeMessage(): string {
    return 'Welcome to our application!';
  }
}
