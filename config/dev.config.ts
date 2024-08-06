import { WebpackConfiguration } from "webpack-cli";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: WebpackConfiguration = {
	mode: "development",
    stats:'minimal',
	entry: path.resolve(__dirname, "../src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "../build/"),
		filename: "bundle.js",
	},
	devtool: "inline-source-map",
	devServer: {
		port: 8000,
		host: "localhost",
		hot: true,
	},
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName:
									"[path][name]__[local]--[hash:base64:5]",
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../src/template/index.html"),
		}),
        new MiniCssExtractPlugin()
	],
};
module.exports = config
