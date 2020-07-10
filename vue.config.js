const webpack = require('webpack');
const path = require('path');
const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/cube-ui-theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', function(req, res) {
        const id = req.query.id;
        res.json({
          errno: 0,
          data: Object.assign({}, seller, { id })
        });
      });
      app.get('/api/goods', function(req, res) {
        res.json({
          errno: 0,
          data: goods
        });
      });
      app.get('/api/ratings', function(req, res) {
        res.json({
          errno: 0,
          data: ratings
        });
      });
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.resolve.alias
      // .set('@', path.join(__dirname, './src'))
      .set('components', path.join(__dirname, './src/components'))
      .set('api', path.join(__dirname, './src/api'))
      .set('assets', path.join(__dirname, './src/assets'))
      .set('common', path.join(__dirname, './src/common'));
    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
  }
};
