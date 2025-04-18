import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobMetadata } from './models/job-metadata.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber/graphql';
import { Job } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobMetadata], { name: 'jobsMetadata' })
  @UseGuards(GqlAuthGuard)
  async getJobMetadata() {
    return this.jobsService.getJobMetadata();
  }

  @Query(() => Job, { name: 'job' })
  @UseGuards(GqlAuthGuard)
  async getJob(@Args('id') id: number) {
    return this.jobsService.getJob(id);
  }

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobsService.executeJob(
      executeJobInput.name,
      executeJobInput.data
    );
  }
}
