import { WebpackConfiguration } from "webpack-cli";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProvidePlugin } from "webpack";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
const Dotenv = require("dotenv-webpack");
const config: WebpackConfiguration = {
	mode: "development",
	stats: "minimal",
	target: "web",
	entry: path.resolve(__dirname, "../src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "../build/"),
		filename: "bundle.js",
	},
	devtool: "inline-source-map",
	devServer: {
		port: 8001,
		host: "localhost",
		allowedHosts: "all",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
		fallback: {
			http: require.resolve("stream-http"),
			https: require.resolve("https-browserify"),
			Buffer: require.resolve("buffer"),
			url: require.resolve("url/"),
		},
		alias: {
			buffer: require.resolve("buffer/"),
		},
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
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(
				__dirname,
				"../src/template/index.html"
			),
			manifest: "../public/tonconnect-manifest.json",
		}),
		new MiniCssExtractPlugin(),
		new ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new ProvidePlugin({
			process: "process/browser",
		}),
		new NodePolyfillPlugin({
			additionalAliases: ["Buffer"],
		}),
		new Dotenv(),
	],
};
module.exports = config;
