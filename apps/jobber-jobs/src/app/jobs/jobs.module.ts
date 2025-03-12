import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonacci';

@Module({
  providers: [FibonacciJob],
})
export class JobsModule {}
