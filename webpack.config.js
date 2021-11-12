const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
			{
				test: /\.css|.styl$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin(),
	],
}
