import { Injectable } from '@nestjs/common';

// This service contains all the business logic for performing operations

// product type
interface Product {
  id: number;
  name: string;
  price: number;
}

// inmemory data store for products
const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

@Injectable()
export class ProductsService {
  create(product: Omit<Product, 'id'>) {
    const newProduct: Product = { ...product, id: products.length + 1 };
    products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return products;
  }

  findOne(id: number): Product | string {
    return (
      products.find((product) => product.id === id) ||
      `Product with id ${id} not found`
    );
  }

  update(id: number, product: Partial<Omit<Product, 'id'>>): Product | string {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return `Product with id ${id} not found`;
    }
    products[index] = { ...products[index], ...product };
    return products[index];
  }

  remove(id: number): Product | string {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      return `Product with id ${id} not found`;
    }
    return products.splice(index, 1)[0] || `Product with id ${id} not found`;
  }
}
