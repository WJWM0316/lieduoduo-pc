let webpack = require('webpack')
let path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

const scssPath = process.env.VUE_APP_ENV === 'development' ? '_dev' : '_prod'
let resolve = dir => { return path.join(__dirname, dir) }

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      vendors: [
        'vue',
        'vue-router',
        'axios',
        'vuex'
      ],
      app: ['babel-polyfill', resolve('src/main.js')],
      eleui: [resolve('src/eleui/index.js')]
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        'SCSS': resolve('src/assets/scss'),
        'IMAGES': resolve('src/assets/images'),
        'UTIL': resolve('src/util'),
        'API': resolve('src/api'),
        'STORE': resolve('src/store'),
        'COMPONENTS': resolve('src/components')
      }
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
    config.plugins.delete('prefetch')
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 这个是加上自己的路径，
        // 注意：试过不能使用别名路径
        path.resolve(__dirname, './src/assets/scss/vars.scss'),
        path.resolve(__dirname, './src/assets/scss/mixins.scss'),
        path.resolve(__dirname, `./src/assets/scss/${scssPath}.scss`)
      ]

    }
  }
}
