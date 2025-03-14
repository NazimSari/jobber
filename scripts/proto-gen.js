const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

// İşletim sistemine göre `protoc-gen-ts_proto` yolunu belirle
const isWindows = os.platform() === 'win32';
const protocGenTsProto = isWindows
  ? path.resolve(__dirname, '../node_modules/.bin/protoc-gen-ts_proto.cmd')
  : path.resolve(__dirname, '../node_modules/.bin/protoc-gen-ts_proto');

// Protoc komutunu çalıştır
const command = `npx protoc --plugin=protoc-gen-ts_proto="${protocGenTsProto}" --ts_proto_out=./types ./proto/*.proto --ts_proto_opt=nestJs=true`;

console.log(`Running: ${command}`);
execSync(command, { stdio: 'inherit', shell: true });
