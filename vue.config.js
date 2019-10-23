let webpack = require('webpack')
let path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

let resolve  = dir => { return path.join(__dirname, dir) },
		plugins = [
			new webpack.ProvidePlugin({
				mapActions: ['vuex', 'mapActions'],
				mapMutations: ['vuex', 'mapMutations'],
				mapGetters: ['vuex', 'mapGetters'],
				mapState: ['vuex', 'mapState']
			})
		]
if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new CompressionPlugin({
      test: /\.js$|\.css$|\.html/,
      threshold: 10240,
      deleteOriginalAssets: false
    })
	)
}
module.exports = {
	lintOnSave: true,
	configureWebpack: {
		entry: {
			vendors: [
				'vue',
				'vue-router',
				'axios',
				'vuex'
			],
			eleui: [resolve('src/eleui/index.js')]
		},
		resolve: {
      alias: {
        '@': resolve('src'),
        'SCSS': resolve('src/assets/scss'),
        'IMAGES': resolve('src/assets/images'),
        'UTIL': resolve('src/utils'),
        'API': resolve('src/api'),
        'STORE': resolve('src/store'),
        'COMPONENTS': resolve('src/components')
      }
    },
		plugins: plugins
	},
	chainWebpack: config => {
		// 不需要预加载
		config.plugins.delete('prefetch')
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [
				// 这个是加上自己的路径，
				// 注意：试过不能使用别名路径
				path.resolve(__dirname, './src/assets/scss/vars.scss'),
				path.resolve(__dirname, './src/assets/scss/mixins.scss')
			]
		}
	}
}