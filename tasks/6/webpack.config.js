import path from "node:path";

const config = {
    entry: {
        entry: "./src/entry.js",
        performance: "./src/performance.js",
    },
    mode: "development",
    devtool: false,
    output: {
        path: path.resolve("./dist/webpack"),
    }
};

export default config;