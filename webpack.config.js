const path = require('path')

module.exports = {
  context: path.join(__dirname, './'),
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.html'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  }
}