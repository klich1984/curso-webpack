const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: './src/index.js' /* elemento de entrada */,
	output: {
		path: path.resolve(__dirname, 'dist'), // ruta donde se guarda el archivo compilado y el nombre de la carpeta
		filename: 'main.js', // Nombre del archivo que se creara
		assetModuleFilename: "assets/images/[hash][ext][query]"
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
			{
				test: /\.png/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff',
						name: '[name].[ext]',
						outputPath: './assets/fonts/',
						publicPath: './assets/fonts/',
						esModule: false,
					},
				},
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
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				},
			],
		}),
	],
}
