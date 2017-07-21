const path = require('path')

module.exports = {
  context: path.join(__dirname, './'),
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.js'
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