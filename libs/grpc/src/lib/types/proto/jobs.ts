// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.20.3
// source: jobs.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from '@bufbuild/protobuf/wire';
import {
  type handleUnaryCall,
  type UntypedServiceImplementation,
} from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface AcknowledgeRequest {
  jobId: number;
}

export interface AcknowledgeResponse {}

function createBaseAcknowledgeRequest(): AcknowledgeRequest {
  return { jobId: 0 };
}

export const AcknowledgeRequest: MessageFns<AcknowledgeRequest> = {
  encode(
    message: AcknowledgeRequest,
    writer: BinaryWriter = new BinaryWriter()
  ): BinaryWriter {
    if (message.jobId !== 0) {
      writer.uint32(8).int32(message.jobId);
    }
    return writer;
  },

  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): AcknowledgeRequest {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcknowledgeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.jobId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function createBaseAcknowledgeResponse(): AcknowledgeResponse {
  return {};
}

export const AcknowledgeResponse: MessageFns<AcknowledgeResponse> = {
  encode(
    _: AcknowledgeResponse,
    writer: BinaryWriter = new BinaryWriter()
  ): BinaryWriter {
    return writer;
  },

  decode(
    input: BinaryReader | Uint8Array,
    length?: number
  ): AcknowledgeResponse {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcknowledgeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

export interface JobServiceClient {
  acknowledge(request: AcknowledgeRequest): Observable<AcknowledgeResponse>;
}

export interface JobServiceController {
  acknowledge(
    request: AcknowledgeRequest
  ):
    | Promise<AcknowledgeResponse>
    | Observable<AcknowledgeResponse>
    | AcknowledgeResponse;
}

export function JobServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['acknowledge'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('JobService', method)(
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
      GrpcStreamMethod('JobService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const JOB_SERVICE_NAME = 'JobService';

export type JobServiceService = typeof JobServiceService;
export const JobServiceService = {
  acknowledge: {
    path: '/jobs.JobService/Acknowledge',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AcknowledgeRequest) =>
      Buffer.from(AcknowledgeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AcknowledgeRequest.decode(value),
    responseSerialize: (value: AcknowledgeResponse) =>
      Buffer.from(AcknowledgeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AcknowledgeResponse.decode(value),
  },
} as const;

export interface JobServiceServer extends UntypedServiceImplementation {
  acknowledge: handleUnaryCall<AcknowledgeRequest, AcknowledgeResponse>;
}

interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
