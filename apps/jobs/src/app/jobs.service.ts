import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { JobMetadata } from './interfaces/job-metadata.interface';
import { AbstractJob } from './jobs/abstract.job';
import { readFileSync } from 'fs';
import { UPLOAD_FILE_PATH } from './uploads/upload';
import { PrismaService } from './prisma/prisma.service';
import { jobStatus } from './models/job-status.enum';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly prismaService: PrismaService
  ) {}

  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobMetadata() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string, data: any) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException(`Job ${name} not found!`);
    }
    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        'Job is not an instance of AbstractJob'
      );
    }
    return job.discoveredClass.instance.execute(
      data.fileName ? this.getFile(data.fileName) : data,
      job.meta.name
    );
  }

  async getJobs() {
    return this.prismaService.job.findMany();
  }

  async getJob(jobId: number) {
    return this.prismaService.job.findUnique({
      where: {
        id: jobId,
      },
    });
  }

  async acknowledge(jobId: number) {
    const job = await this.prismaService.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      throw new BadRequestException(`Job with id ${jobId} not found!`);
    }

    if (job.ended) {
      return;
    }

    const updatedJob = await this.prismaService.job.update({
      where: {
        id: jobId,
      },
      data: {
        completed: {
          increment: 1,
        },
      },
    });

    if (updatedJob.completed === job.size) {
      await this.prismaService.job.update({
        where: {
          id: jobId,
        },
        data: {
          status: jobStatus.COMPLETED,
          ended: new Date(),
        },
      });
    }
    return updatedJob;
  }

  private getFile(fileName?: string) {
    if (!fileName) {
      return;
    }
    try {
      return JSON.parse(
        readFileSync(`${UPLOAD_FILE_PATH}/${fileName}`, 'utf-8')
      );
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to read file: ${fileName}`
      );
    }
  }
}
