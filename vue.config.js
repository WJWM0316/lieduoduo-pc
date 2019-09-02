let webpack = require('webpack')
let path = require('path')
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
    config.plugins.delete('prefetch')
  }
}