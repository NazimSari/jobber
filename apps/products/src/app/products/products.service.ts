import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CategoriesService } from '../categories/categroies.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly categoriesService: CategoriesService
  ) {}
  async createProduct(
    product: Omit<typeof schema.products.$inferSelect, 'id'>
  ) {
    const category = await this.categoriesService.getCategoryByName(
      product.category
    );
    await this.database.insert(schema.products).values({
      ...product,
      price: category ? product.price + category.charge : product.price,
    });
  }
}
