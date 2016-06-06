module.exports = {
  context: __dirname + '/app/assets/javascripts',
  entry: './app',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint']
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
