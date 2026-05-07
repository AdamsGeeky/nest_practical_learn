import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should return the service status', () => {
      expect(appController.getHealth()).toBe('Service is running!');
    });
  });

  describe('welcome', () => {
    it('should return the welcome message from the service', () => {
      const getWelcomeMessageSpy = jest.spyOn(appService, 'getWelcomeMessage');

      expect(appController.getWelcomeMessage()).toBe(
        'Welcome to our application!',
      );
      expect(getWelcomeMessageSpy).toHaveBeenCalled();
    });
  });
});
