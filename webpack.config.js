const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/desktop.js",
    output: {
        filename: "desktop.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "asset/css/style.css", to: "style.css" }
            ]
        })
    ],
    mode: "development"
};
