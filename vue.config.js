console.log('当前环境' + process.env.NODE_ENV);
module.exports = {
	publicPath: './',
	productionSourceMap: false,
	// outputDir: 'dist',
	configureWebpack: (config) => {
		if (process.env.NODE_ENV == 'production') {
			// 为生产环境修改配置
			config.mode = 'production';
			// 将每个依赖包打包成单独的js文件
			let optimization = {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							warnings: false,
							compress: {
								drop_console: true,
								drop_debugger: true,
								pure_funcs: ['console.log'],
							},
						},
					}),
				],
			};
			Object.assign(config, {
				optimization,
			});
		}
	},
	devServer: {
		host: 'localhost',
		port: 8080,
		//如果是后台有nginx做转发 则不使用代理
		proxy: {
			'/api': {
				target: 'http://www.baidu.com',
				changeOrigin: true,
				pathRewrite: {
					'/api': '',
				},
			},
		},
	},
};
