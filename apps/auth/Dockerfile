FROM node:18-slim AS builder 

WORKDIR /workspace

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY eslint.config.mjs ./
COPY webpack.*.config.js ./

COPY apps/auth ./apps/auth
COPY libs/graphql ./libs/graphql
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs
COPY libs/prisma ./libs/prisma


RUN npm install 

# RUN apt-get update && apt-get install -y protobuf-compiler //yerelde protoc kurulmadığı zaman bu kodu kullan

RUN npx nx build auth

FROM node:18-slim AS runner

RUN apt-get update && apt-get install -y openssl

WORKDIR /app 

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/apps/auth/package.json ./apps/auth/package.json
COPY --from=builder /workspace/libs/graphql/package.json ./libs/graphql/package.json
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/apps/auth/prisma ./apps/auth/prisma
COPY --from=builder /workspace/libs/prisma/package.json ./libs/prisma/package.json
COPY --from=builder /workspace/package-lock.json ./

# auth.proto dosyasını doğru yere kopyala
COPY --from=builder /workspace/libs/grpc/src/lib/proto ./libs/grpc/src/lib/proto/

ENV NODE_ENV=production

RUN npm ci 

COPY --from=builder /workspace/node_modules/@prisma-clients/auth/ ./node_modules/@prisma-clients/auth/

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/auth/main"]