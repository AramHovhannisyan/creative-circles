import path from 'path';
import { fileURLToPath } from 'url';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Convert import.meta.url to a file path
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => ({
  entry: './src/index.ts',
  mode: argv.mode || 'development', // default to 'development' if not specified
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'favicon.ico', to: path.resolve(dirname, 'dist') },
        {
          from: path.resolve(dirname, 'src/assets/img'),
          to: path.resolve(dirname, 'dist/assets/img'),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(dirname, 'dist'), // Use dirname
    },
    compress: true,
    port: 9000,
  },
});
