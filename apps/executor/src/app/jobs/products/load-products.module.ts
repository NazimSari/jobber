import { Module } from '@nestjs/common';
import { LoadProductsConsumer } from './load-products.consumer';
import { PulsarModule } from '@jobber/pulsar';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Packages } from '@jobber/grpc';

@Module({
  imports: [
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: Packages.PRODUCTS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('PRODUCTS_GRPC_SERVICE_URL'),
            package: Packages.PRODUCTS,
            protoPath: join(
              __dirname,
              '../../../libs/grpc/src/lib/proto/products.proto'
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [LoadProductsConsumer],
})
export class LoadProductsModule {}
