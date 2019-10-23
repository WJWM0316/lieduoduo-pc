let webpack = require('webpack')
let path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

let resolve  = dir => { return path.join(__dirname, dir) }

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
	    eleui: [ resolve('src/eleui/index.js') ]
  	},
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.css$|\.html/,
        threshold: 10240,
        deleteOriginalAssets: false
      }),
      new webpack.ProvidePlugin({
	      mapActions: ['vuex', 'mapActions'],
	      mapMutations: ['vuex', 'mapMutations'],
	      mapGetters: ['vuex', 'mapGetters'],
	      mapState: ['vuex', 'mapState']
	    })
    ]
  },
  chainWebpack: config => {
  	// 不需要预加载
    // config.plugins.delete('prefetch')
  }
}