// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.20.3
// source: products.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'products';

export interface CreateProductRequest {
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  description: string;
}

export interface CreateProductResponse {}

export const PRODUCTS_PACKAGE_NAME = 'products';

export interface ProductsServiceClient {
  createProduct(
    request: CreateProductRequest
  ): Observable<CreateProductResponse>;
}

export interface ProductsServiceController {
  createProduct(
    request: CreateProductRequest
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;
}

export function ProductsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createProduct'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('ProductsService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('ProductsService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PRODUCTS_SERVICE_NAME = 'ProductsService';
