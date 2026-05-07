import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto = {};
    const createSpy = jest.spyOn(service, 'create');

    expect(controller.create(createUserDto)).toBe('This action adds a new user');
    expect(createSpy).toHaveBeenCalledWith(createUserDto);
  });

  it('should find all users', () => {
    expect(controller.findAll()).toBe('This action returns all users');
  });

  it('should find one user by route id', () => {
    const findOneSpy = jest.spyOn(service, 'findOne');

    expect(controller.findOne('1')).toBe('This action returns a #1 user');
    expect(findOneSpy).toHaveBeenCalledWith(1);
  });

  it('should update one user by route id', () => {
    const updateUserDto = {};
    const updateSpy = jest.spyOn(service, 'update');

    expect(controller.update('1', updateUserDto)).toBe(
      'This action updates a #1 user',
    );
    expect(updateSpy).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('should remove one user by route id', () => {
    const removeSpy = jest.spyOn(service, 'remove');

    expect(controller.remove('1')).toBe('This action removes a #1 user');
    expect(removeSpy).toHaveBeenCalledWith(1);
  });
});
