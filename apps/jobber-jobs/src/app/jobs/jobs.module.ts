import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonacci';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJob, JobsService],
})
export class JobsModule {}
