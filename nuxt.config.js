const pkg = require('./package')

module.exports = {
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      // Extend only webpack config for client-bundle
      if (ctx.isClient) {
        config.target = 'electron-renderer'
        config.output.globalObject = 'this'
        config.module.rules.unshift({
          test: /\.worker\.js$/,
          loader: 'worker-loader'
        })
      }
      // Set relative path
      config.output.publicPath = './_nuxt/'
    }
  },

  /*
   ** Global CSS
   */
  css: [
    'material-design-icons-iconfont/dist/material-design-icons.css',
    'typeface-roboto/index.css',
    '~/assets/css/app.css'
  ],

  /*
   ** Generate configuration
   */
  generate: {
    dir: 'app'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Headers of the page
   */
  head: { title: pkg.productName },

  /*
   ** SPA or Universal
   */
  mode: 'spa',

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/vuetify',
      {
        materialIcons: false,
        theme: {
          primary: '#ff4081',
          accent: '#ff4081'
        }
      }
    ]
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/context-menu',
    '~/plugins/filter',
    '~/plugins/ipc-listener',
    '~/plugins/vue-long-press',
    '~/plugins/vue-moment',
    '~/plugins/vuetify'
  ],

  /*
   ** Router configuration
   */
  router: {
    mode: 'hash'
  },

  /*
   ** Source directory
   */
  srcDir: 'src',

  /*
   ** Vue configuration
   */
  vue: {
    config: {
      productionTip: false
    }
  }
}