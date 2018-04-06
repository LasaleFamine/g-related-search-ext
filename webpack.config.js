'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const ENV = process.env.NODE_ENV;

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

const FILES = ['./src/js/background.js'];
const EXTS = [
	'jpg', 'jpeg', 'png',
	'gif', 'eot', 'otf',
	'svg', 'ttf', 'woff', 'woff2'
];

const entry = FILES.reduce((acc, src) => {
	acc[src.replace('./src/js', '').replace('.js', '')] = src;
	return acc;
}, {});

const output = {
	path: BUILD_PATH,
	filename: '[name].bundle.js'
};

const modules = {
	rules: [{
		test: /\.css$/,
		loader: 'style-loader!css-loader!postcss-loader',
		exclude: /node_modules/
	},
	{
		test: new RegExp(`.(${EXTS.join('|')})$`),
		loader: 'file-loader?name=[name].[ext]',
		exclude: /node_modules/
	},
	{
		test: /\.html$/,
		loader: 'html-loader',
		exclude: /node_modules/
	}]
};

const plugins = [
	// expose and write the allowed env vars on the compiled bundle
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(ENV)
	}),
	new HtmlWebpackPlugin({
		template: path.join(SRC_PATH, 'background.html'),
		filename: 'background.html',
		chunks: ['background']
	}),
	new WriteFilePlugin()
];

const options = {
	entry,
	output,
	module: modules,
	plugins,
	devtool: ENV === 'development' ? 'cheap-module-eval-source-map' : ''
};

module.exports = options;
