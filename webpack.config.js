const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: "./public/dist",
        open: true,
        compress: true,
        port: 8080,
    },
    entry: {
        main: "./src/main.js",
    },
    //Output: result of the bundle after webpack run
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: "[name].bundle.js",
        clean: true,
    },

    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
        },
    },

    //Plugins to help and include additionals functionalities to webpack
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
    ],

    //Webpack dosent know how to handler all type of files and what to do with them, so this section
    //we can capture and configure a specific type of file and determine a loader plugin to process it
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    hot: true,
                },
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"],
            },
            {
                // for development, I'm just letting the style-loader handle the application of all styling
                // no need for webpack to output or having to reference css files in development
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            name: "public/images/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};
