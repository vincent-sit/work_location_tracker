import { resolve as _resolve, join } from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

export const output = {
  path: _resolve(__dirname, 'build'),
  filename: 'bundle.js',
};

export const resolve = {
  modules: [join(__dirname, 'src'), 'node_modules'],
  alias: {
    react: join(__dirname, 'node_modules', 'react'),
  },
};

export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
      ],
    },
  ],
};

export const plugins = [
  new HtmlWebPackPlugin({
    template: './src/index.html',
  }),
];