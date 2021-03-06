const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

const srcPath = path.join(__dirname, '../src/');
const distPath = path.join(__dirname, '../dist/');

module.exports = {
    context: srcPath,
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            './index.jsx',
        ],
    },
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '',
    },
    resolve: {
        modules: ['node_modules', srcPath],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            excludeChunks: ['service-worker'],
        }),
        new WebpackPwaManifest({
            name: 'Bulls & Cows',
            short_name: 'b&c',
            description: 'Bulls & Cows game',
            lang: 'en-US',
            display: 'fullscreen',
            orientation: 'portrait',
            start_url: './',
            background_color: '#606060',
            theme_color: '#606060',
            'theme-color': '#606060',
            icons: [
                {
                    src: path.resolve('src/assets/icons/icon.png'),
                    sizes: [16, 32, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192, 256, 512],
                    destination: path.join('assets', 'icons'),
                },
            ],
            fingerprints: false,
        }),
        new CopyWebpackPlugin([
            { from: 'service-worker.js', to: distPath },
            { from: path.join(srcPath, 'assets/icons'), to: path.join(distPath, 'assets/icons') },
        ]),
        new SvgStore({
            prefix: '',
        }),
    ],
};
