export default [
    {
      input: "./src/entry.js",
      output: {
        file: "./dist/rollup/entry.js",
        format: "esm",
      },
    },
    {
      input: "./src/performance.js",
      output: {
        file: "./dist/rollup/performance.js",
        format: "esm",
      },
    }
];