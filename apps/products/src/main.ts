require('module-alias/register');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { init } from '@jobber/nestjs';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Packages } from '@jobber/grpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      url: app.get(ConfigService).getOrThrow('PRODUCTS_GRPC_SERVICE_URL'),
      package: Packages.PRODUCTS,
      protoPath: join(
        __dirname,
        '../../../libs/grpc/src/lib/proto/products.proto'
      ),
    },
  });
  await app.startAllMicroservices();
}

bootstrap();
