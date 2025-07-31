import { Configuration } from "webpack";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve("./dist/webpack"),
    publicPath: "/webpack/",
  },
  resolve:{
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <html
          title="TODO App">
          <body>
            <div id="root"></div>
          </body>
        </html>
      `,
    })
  ],
  module: {
    rules: [
        {
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules)/,
            use: {
                loader: "swc-loader",
                options: {
                    jsc: {
                        transform: {
                            react: {
                                runtime: "automatic"
                            }
                        },
                        parser: {
                            syntax: "typescript"
                        }
                    }
                }
            },
        }
    ]  
  },
  experiments: {
    css: true
  }
};

export default config;
