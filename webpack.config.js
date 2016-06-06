module.exports = {
  context: __dirname + '/app/assets/javascripts',
  entry: './app',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel?stage=0'
      }
    ]
  },
  watchOptions: {
    poll: 1000
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
