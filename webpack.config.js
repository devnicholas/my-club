const path = require("path");

module.exports = {
	mode: "development",
	entry: ["./src/index.js", "./src/utils.js"],
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
};
