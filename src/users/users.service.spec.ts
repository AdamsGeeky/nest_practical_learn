import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    expect(service.create({})).toBe('This action adds a new user');
  });

  it('should find all users', () => {
    expect(service.findAll()).toBe('This action returns all users');
  });

  it('should find one user by id', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 user');
  });

  it('should update one user by id', () => {
    expect(service.update(1, {})).toBe('This action updates a #1 user');
  });

  it('should remove one user by id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 user');
  });
});
