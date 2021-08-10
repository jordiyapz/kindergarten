const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: 'dist',
		port: 9000
	},
	devtool: 'inline-source-map',
	plugins: [
		new CopyWebpackPlugin([{
			from: 'build/assets',
			to: 'assets'
		}, {
      from: 'build/style.css',
      to: '.'
    }, {
      from: 'build/favicon.ico',
      to: '.'
    }]),
		new HTMLWebpackPlugin({
			template: 'build/index.html',
			filename: 'index.html'
		})
	]
}