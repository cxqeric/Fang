import koa from 'koa';
import serve from 'koa-static';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpack from 'webpack';
import path from 'path';

function startWebServer(port) {

  const app = koa();

  if (process.env.NODE_ENV === 'development') {

    app.use(serve(path.join(__dirname, '../frontend')));

    const webpackDevConfig = require('../configs/webpack.client.koa-watch');
    const compiler = webpack(webpackDevConfig);
    app.use(webpackMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackDevConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

  } else {
    app.use(serve(path.join(__dirname, '../static')));
  }


  app.on('error', (err) => {
    console.log('error', err);
  });

  app.listen(port);

}

startWebServer(8080);