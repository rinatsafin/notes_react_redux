const NODE_ENV = process.env.NODE_ENV || "development";
const devMode = NODE_ENV === "development";
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractCSS = new ExtractTextPlugin("css/styles.css", { allChunks: true, });

module.exports = {
  entry: "./dev/index.js",
  output: {
    path: path.resolve(__dirname, "prod"),
    filename: "bundle.js",
  },
  watch: devMode,
  devtool: devMode && "eval-source-map",
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
        },
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: devMode ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:12]",
            },
          },
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: devMode ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:12]",
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: devMode ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:12]",
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash].[ext]",
            },
          },
        ],
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
    ]
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([
      {
        from: path.resolve("./dev/static"),
        to: path.resolve("./prod"),
      },
    ]),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(devMode),
    }),
    // new HtmlWebPackPlugin({
    //   template: "./dev/static/index.html",
    //   filename: "./index.html"
    // }),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ]
};
