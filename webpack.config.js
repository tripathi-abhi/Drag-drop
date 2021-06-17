const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/app.ts",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: [path.resolve(__dirname, "node_modules")],
			},
		],
	},
	// devServer: {
	// 	contentBase: path.resolve(__dirname, "./dist"),
	// },
	resolve: {
		extensions: [".js", ".ts"],
	},
};
