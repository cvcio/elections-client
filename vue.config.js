module.exports = {
	runtimeCompiler: true,
	// pluginOptions: {},
	// configureWebpack: {},
	pwa: {
		name: 'mediawatch.io',
		themeColor: '#0F0F18',
		msTileColor: '#0F0F18'
	},

	lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	parallel: true,
	css: {
		sourceMap: true
	},
	chainWebpack: (config) => {
    	config.module.rule('worker').test(/\.worker\.js$/i).use('worker-loader').loader('worker-loader').end();
  	}
	/*
	configureWebpack: {
	    output: {
			globalObject: 'self'
	    },
	    module: {
	      rules: [{
				test: /\worker\.js$/,
				use: [{
					loader: 'worker-loader',
					options: {
						inline: true
					}
				}]
			}]
	    }
	}
	*/
};
