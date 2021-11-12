const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js' /* elemento de entrada */,
	output: {
		path: path.resolve(__dirname, 'dist'), // ruta donde se guarda el archivo compilado y el nombre de la carpeta
		filename: 'main.js', // Nombre del archivo que se creara
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		})
	]
}
