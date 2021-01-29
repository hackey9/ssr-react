const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = [
  {
    mode: "development",
    context: path.resolve(__dirname, "src"),
    entry: "./client.tsx",
    target: "web",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist", "client"),
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules"),
      ],
    },
    devtool: "source-map",
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[name].chunk.css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            to: path.resolve(__dirname, "dist", "client"),
            globOptions: {
              ignore: ["index.html"],
            },
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "src"),
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {"targets": {"esmodules": true}}],
                ["@babel/preset-typescript"],
                ["@babel/preset-react"],
              ],
            },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: "css-loader"},
            {loader: "sass-loader"},
          ],
        },
        {
          test: /\.(svg|png|jpe?g)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].asset.[ext]",
              },
            },
          ],
        },
      ],
    },
  },
  {
    mode: "development",
    context: path.resolve(__dirname, "src"),
    entry: "./server.tsx",
    target: "node",
    output: {
      publicPath: ".",
      path: path.resolve(__dirname, "dist", "server"),
      filename: "server.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules"),
      ],
    },
    devtool: "source-map",
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //   },
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[name].chunk.css",
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "src"),
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", {"targets": {"esmodules": true}}],
                ["@babel/preset-typescript"],
                ["@babel/preset-react"],
              ],
            },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            {loader: "css-loader"},
            {loader: "sass-loader"},
          ],
        },
        {
          test: /\.(svg|png|jpe?g)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].asset.[ext]",
              },
            },
          ],
        },
      ],
    },
  },
]
