module.exports = {
  context: __dirname + '/app/assets/javascripts',
  entry: './entry',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  watchOptions: {
    poll: 1000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
