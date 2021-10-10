import _webpack from "webpack";
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ === "development";

const filename = (ext: string): string => (isDev ? `[name].[hash].${ext}` : `[name].[hash].${ext}`);

const babelOptions = (preset?: string): { presets: string[], plugins: string[] } => {
    const opts = {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"]
    };
    if (preset) {
        opts.presets.push(preset);
    }
    return opts;
};

const cssLoaders = (addition?: string) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        "css-loader",
    ];
    if (addition) {
        loaders.push(addition);
    }

    return loaders;
};


const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({template: "./index.html"}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename("css")
        })
    ];

    return base;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.ts"]
    },
    output: {
        publicPath: './',
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".js", ".png", ".json", ".tsx"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    plugins: plugins(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        writeToDisk: true,
        port: 4200,
        hot: isDev,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                },
                include: path.join(__dirname, 'src/assets/textures')
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
            {
                test: /\.less$/,
                use: cssLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader"),
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: babelOptions("@babel/preset-typescript")
                }
            }
        ]
    }
};
