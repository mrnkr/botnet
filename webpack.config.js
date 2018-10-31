const path                 = require('path');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, 'src', 'not-suspicious.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test:/\.(s*)css$/, loader:['style-loader','css-loader', 'sass-loader'] }
    ],
  },
  devServer: {
    port: 4200,
    historyApiFallback: true
  }
};