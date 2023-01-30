const path = require('path');

const mode = "production";

module.exports = {
  mode,
  entry: {
    "dist/index.min":path.resolve(__dirname, './src/index.ts'),
    "dist/global.min":path.resolve(__dirname, './src/global.ts'),
    "example/index.min":path.resolve(__dirname, './src/index.ts'),
    "example/../../../webview-bridged/web/movies-finder.min":path.resolve(__dirname, './src/global.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
  },
  devServer: {
    static: path.resolve(__dirname, './example'),
    port:3000
  },
  optimization: {
    minimize:mode == "production"
  }
};