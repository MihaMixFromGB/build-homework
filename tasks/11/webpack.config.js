import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import rsdoctor from "@rsdoctor/webpack-plugin";

const config = {
  entry: "./src/main.tsx",
  mode: "production",
  // TODO
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript"
              }
            }
          }
        }
      },
      {
        test: /\.(woff2|ttf|svg|png)$/i,
        type: 'asset/resource',
      }
    ]
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[path][name][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      crypto: false,
      fs: false,
      path: false,
    },
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(import.meta.dirname, "node_modules/.cache/webpack"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Task 11",
      template: "./template.html",
    }),
    new rsdoctor.RsdoctorWebpackPlugin()
  ],
  devtool: false,
  experiments: {
    css: true,
  },
};

export default config;
