const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev 
    ? `[name].${ext}`
    : `[name].[contenthash].${ext}`

const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if(isProd) {
        configObj.minimizer = [
            new TerserWebpackPlugin()
        ]
    }

    return configObj;
}

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ];

    if (isProd) {
        basePlugins.push(
            new ImageMinimizerPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
                plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                    "svgo",
                    {
                    plugins: [
                        {
                        name: "preset-default",
                        params: {
                            overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                                params: {
                                attributes: [
                                    { xmlns: "http://www.w3.org/2000/svg" },
                                ],
                                },
                            },
                            },
                        },
                        },
                    ],
                    },
                ],
            ],
          },
        },
      }),
    )
    }

    return basePlugins;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    entry: './index.js',

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'app'),
        publicPath: '',
    },

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'app'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },

    optimization: optimization(),

    plugins: plugins(),

    devtool: isProd ? false : 'source-map',

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';  //для правильного пути в css
                            }
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.(?:|png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
            },
             {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
}