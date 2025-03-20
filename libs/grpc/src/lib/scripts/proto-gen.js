const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// Projenin ana dizinini (workspace root) sabit bir şekilde al
const workspaceRoot = path.resolve(__dirname, '../../../../..');

// İşletim sistemine göre `protoc-gen-ts_proto` yolunu belirle
const isWindows = os.platform() === 'win32';
const protocGenTsProto = isWindows
  ? path.resolve(workspaceRoot, 'node_modules/.bin/protoc-gen-ts_proto.cmd')
  : path.resolve(workspaceRoot, 'node_modules/.bin/protoc-gen_ts_proto');

// Protoc komutunu çalıştır
const command = `npx protoc --plugin=protoc-gen-ts_proto="${protocGenTsProto}" --ts_proto_out=${path.join(
  workspaceRoot,
  'libs/grpc/src/lib'
)} ${path.join(workspaceRoot, 'proto/*.proto')} --ts_proto_opt=nestJs=true`;

console.log(`Running: ${command}`);
execSync(command, { stdio: 'inherit', shell: true });
