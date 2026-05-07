import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockReturnValue({
              id: 4,
              name: 'New Product',
              price: 50,
            }),
            findAll: jest.fn().mockReturnValue([
              { id: 1, name: 'Product 1', price: 10 },
              { id: 2, name: 'Product 2', price: 20 },
              { id: 3, name: 'Product 3', price: 30 },
            ]),
            findOne: jest.fn().mockReturnValue({
              id: 1,
              name: 'Product 1',
              price: 10,
            }),
            update: jest.fn().mockReturnValue({
              id: 1,
              name: 'Updated Product',
              price: 10,
            }),
            remove: jest.fn().mockReturnValue({
              id: 1,
              name: 'Product 1',
              price: 10,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', () => {
    expect(controller.create()).toEqual({
      id: 4,
      name: 'New Product',
      price: 50,
    });
    expect(service.create).toHaveBeenCalledWith({
      name: 'New Product',
      price: 50,
    });
  });

  it('should find all products', () => {
    expect(controller.findAll()).toEqual([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ]);
  });

  it('should find one product by route id', () => {
    expect(controller.findOne('1')).toEqual({
      id: 1,
      name: 'Product 1',
      price: 10,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update one product by route id', () => {
    expect(controller.update('1')).toEqual({
      id: 1,
      name: 'Updated Product',
      price: 10,
    });
    expect(service.update).toHaveBeenCalledWith(1, {
      name: 'Updated Product',
    });
  });

  it('should remove one product by route id', () => {
    expect(controller.remove('1')).toEqual({
      id: 1,
      name: 'Product 1',
      price: 10,
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
