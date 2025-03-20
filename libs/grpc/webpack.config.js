const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/grpc'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      assets: ['./src/lib/proto'], // sourceRoot'tan relatif yol
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
    }),
  ],
};
