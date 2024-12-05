const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.nearus.id',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
