const path = require("path");

module.exports = {
    entry: "./src/desktop.js",
    output: {
        filename: "desktop.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development"
};
