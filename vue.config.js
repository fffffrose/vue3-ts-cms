module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
