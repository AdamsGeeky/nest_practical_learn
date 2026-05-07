import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('Service is running!');
  });

  it('/welcome (GET)', () => {
    return request(app.getHttpServer())
      .get('/welcome')
      .expect(200)
      .expect('Welcome to our application!');
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('This action returns all users');
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect('This action returns a #1 user');
  });

  it('/api/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/products')
      .expect(200)
      .expect([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
      ]);
  });

  it('/api/products/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/products/1')
      .expect(200)
      .expect({ id: 1, name: 'Product 1', price: 10 });
  });

  afterEach(async () => {
    await app.close();
  });
});
