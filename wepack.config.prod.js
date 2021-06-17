const path = require("path");
const cleanWebpack = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/app.ts",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "none",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: [path.resolve(__dirname, "node_modules")],
			},
		],
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	plugins: [new cleanWebpack.CleanWebpackPlugin()],
};
