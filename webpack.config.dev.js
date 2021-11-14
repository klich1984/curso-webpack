const path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	CopyPlugin = require("copy-webpack-plugin"),
	Dontenv = require('dotenv-webpack')

module.exports = {
	entry: "./src/index.js" /* elemento de entrada */,
	output: {
		path: path.resolve(__dirname, "dist"), // ruta donde se guarda el archivo compilado y el nombre de la carpeta
		filename: "[name].[contenthash].js", // Nombre del archivo que se creara
		assetModuleFilename: "assets/images/[hash][ext][query]",
	},
	mode: 'development',
	resolve: {
		extensions: [".js"],
		alias: {
			"@utils": path.resolve(__dirname, "src/utils/"),
			"@templates": path.resolve(__dirname, "src/templates/"),
			"@styles": path.resolve(__dirname, "src/styles/"),
			"@images": path.resolve(__dirname, "src/assets/images/"),  // Importante cerrar la ruta con /
		}
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css|.styl$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
			},
			{
				test: /\.png/,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: "url-loader",
					options: {
						// limit => limite de tamaño
						limit: 10000,
						// Mimetype => tipo de dato
						mimetype: "application/font-woff",
						// name => nombre de salida
						name: "[name].[contenthash].[ext]",
						// outputPath => donde se va a guardar en la carpeta final
						outputPath: "./assets/fonts/",
						publicPath: "../assets/fonts/",
						esModule: false,
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "assets/[name].[contenthash].css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images",
				},
			],
		}),
		new Dontenv()
	],
}
