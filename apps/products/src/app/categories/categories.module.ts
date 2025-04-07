import { Module } from '@nestjs/common';
import { CategoriesService } from './categroies.service';

@Module({
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
