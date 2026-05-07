import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): any {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.productsService.findOne(+id);
  }

  @Get(':id/update')
  update(@Param('id') id: string): any {
    return this.productsService.update(+id, { name: 'Updated Product' });
  }

  @Get(':id/remove')
  remove(@Param('id') id: string): any {
    return this.productsService.remove(+id);
  }

  @Post()
  create(): any {
    return this.productsService.create({ name: 'New Product', price: 50 });
  }
}
