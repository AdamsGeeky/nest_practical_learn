import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all products', () => {
    expect(service.findAll()).toEqual([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ]);
  });

  it('should find one product by id', () => {
    expect(service.findOne(1)).toEqual({
      id: 1,
      name: 'Product 1',
      price: 10,
    });
  });

  it('should return a message when a product is not found', () => {
    expect(service.findOne(999)).toBe('Product with id 999 not found');
  });

  it('should create a product', () => {
    expect(service.create({ name: 'New Product', price: 50 })).toEqual({
      id: 4,
      name: 'New Product',
      price: 50,
    });
  });

  it('should update a product', () => {
    expect(service.update(1, { name: 'Updated Product' })).toEqual({
      id: 1,
      name: 'Updated Product',
      price: 10,
    });
  });

  it('should return a message when updating a missing product', () => {
    expect(service.update(999, { name: 'Missing Product' })).toBe(
      'Product with id 999 not found',
    );
  });

  it('should remove a product', () => {
    expect(service.remove(2)).toEqual({
      id: 2,
      name: 'Product 2',
      price: 20,
    });
  });

  it('should return a message when removing a missing product', () => {
    expect(service.remove(999)).toBe('Product with id 999 not found');
  });
});
