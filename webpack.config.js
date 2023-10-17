const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    path: path.resolve(__dirname, './src/index.jsx'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][contenthash].jsx',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },

  // proxy: {
  //   '/'
  // }

  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env, @babel/preset-react'],
          }
        }
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
          },
        }, 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pomonoto!',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template.html'),
    }),
  ]
}