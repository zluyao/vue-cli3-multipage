let path = require('path')
let glob = require('glob')
let webpack = require('webpack')
let CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
	return path.join(__dirname, dir);
}
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //文件分析
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function (entry) {
		basename = path.basename(entry, path.extname(entry));
		// console.log(entry)
		tmp = entry.split('/').splice(-3);
		// console.log(tmp)
		pathname = basename; // 正确输出js和html的路径

		// console.log(pathname)
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			filename: tmp[2]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

console.log(pages)
//配置end

//设置不同环境的代理
const ENV = process.env.NODE_ENV;
let target = '';
if (ENV === 'production') {  // 生产环境
	target = 'aaaa.com/';
} else if (ENV === 'test') { // 测试环境
	target = 'bbbb.com/';
} else {  // 本地环境
	target = 'xxxx.com/';
}

module.exports = {
	outputDir: 'dist',
	lintOnSave: false, //禁用eslint
	baseUrl: process.env.NODE_ENV === "production" ? '/' : './',// 看生产环境是否是放在根目录
	productionSourceMap: false,
	pages,
	devServer: {
		index: 'home.html', //默认启动serve 打开page1页面
		open: true,
		host: '',
		port: 8088,
		https: false,
		hotOnly: false,
		proxy: {
			'/api/': {
				target: target,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}, // 设置代理
		before: app => { }
	},
	css: {
		modules: true, // 是否开启支持‘foo.module.css’样式
		extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
		sourceMap: false, // 是否在构建样式地图，false将提高构建速度
		loaderOptions: { // css预设器配置项
			css: {
				localIdentName: '[name]-[hash]',
				camelCase: 'only'
			},
			less: {}
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				// options.limit = 10000
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if (process.env.NODE_ENV === "production") {
			console.log('ppppppppp');
			console.log(process.env.NODE_ENV);
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);

		} else {
			console.log('ttttttttt');
			console.log(process.env.NODE_ENV);
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].css"
			}]);
		}
		// if (process.env.npm_config_report) {
		// 	config
		// 		.plugin('webpack-bundle-analyzer')
		// 		.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
		// }
	},
	configureWebpack: config => {

		Object.assign(config, { // 开发生产共同配置
			resolve: {
				extensions: ['.js', '.vue', '.less'],
				alias: {
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components'),
					'@lib': path.resolve(__dirname, './src/lib'),
				}
			},
		})
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.plugins.push(
				new CompressionWebpackPlugin({
					asset: "[path].gz[query]",
					algorithm: "gzip",
					test: /\.(js|html|css)$/,
					threshold: 10240,
					minRatio: 0.8
				})
			);
		} else {
			// 为开发环境修改配置...
			console.log(2222, config.plugins);

		}

		// if (process.env.npm_config_report) {
		// 	config.plugins.push(
		// 		new BundleAnalyzerPlugin()
		// 	);
		// }
	}
}

