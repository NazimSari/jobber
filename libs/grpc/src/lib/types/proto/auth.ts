import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface AuthenticateRequest {
  token: string;
}

export interface User {
  id: number;
  email: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  authenticate(request: AuthenticateRequest): Observable<User>;
}

export interface AuthServiceController {
  authenticate(
    request: AuthenticateRequest
  ): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function <T extends new (...args: any[]) => AuthServiceController>(
    constructor: T
  ) {
    const grpcMethods: string[] = ['authenticate'];
    for (const method of grpcMethods) {
      const descriptor: PropertyDescriptor | undefined =
        Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      if (descriptor) {
        GrpcMethod('AuthService', method)(
          constructor.prototype[method],
          method,
          descriptor
        );
      }
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: PropertyDescriptor | undefined =
        Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      if (descriptor) {
        GrpcStreamMethod('AuthService', method)(
          constructor.prototype[method],
          method,
          descriptor
        );
      }
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
