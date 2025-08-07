import esbuild from "esbuild";
import yamlLoader from "./plugins/esbuild-plugin-yaml.js";

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "esm",
  outdir: "dist/esbuild",
  plugins: [
    yamlLoader()
  ],
};

esbuild.build(options).catch(() => process.exit(1));
