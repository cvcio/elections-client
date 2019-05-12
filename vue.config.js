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
	}
};
