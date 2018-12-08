// const ZipPlugin = require('zip-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  devServer: {
    proxy: {
      '/appinfo': {
        target: 'http://res.txingdai.com',
        pathRewrite: {},
        changeOrigin: true
      },
      '/account': {
        target: 'http://res.txingdai.com',
        pathRewrite: {},
        changeOrigin: true
      },
      '/log': {
        target: 'http://res.txingdai.com',
        pathRewrite: {},
        changeOrigin: true
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      // new PrerenderSPAPlugin({
      //   // Required - The path to the webpack-outputted app to prerender.
      //   staticDir: path.join(__dirname, 'dist'),
      //   outputDir: path.join(__dirname, 'prerendered'),
      //   // Required - Routes to render.
      //   routes: [ '/components' ],
      // })
      // new ZipPlugin({
      //   // OPTIONAL: defaults to the Webpack output filename (above) or,
      //   // if not present, the basename of the path
      //   filename: 'test',
      //   // OPTIONAL: defaults to 'zip'
      //   // the file extension to use instead of 'zip'
      //   // 对 hybrid 项目使用 php 后缀，防止 CDN 劫持(?)
      //   // extension: maraConf.hybrid ? 'php' : 'zip',
      //   extension: 'zip',
      //   // OPTIONAL: defaults to including everything
      //   // can be a string, a RegExp, or an array of strings and RegExps
      //   //   include: [/\.js$/],
      //   // OPTIONAL: defaults to excluding nothing
      //   // can be a string, a RegExp, or an array of strings and RegExps
      //   // if a file matches both include and exclude, exclude takes precedence
      //   exclude: [
      //     /__MACOSX$/,
      //     /.DS_Store$/,
      //   ],

      //   // yazl Options
      //   // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
      //   fileOptions: {
      //     mtime: new Date(),
      //     mode: 0o100664,
      //     compress: true,
      //     forceZip64Format: false
      //   },
      //   // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
      //   zipOptions: {
      //     forceZip64Format: false
      //   }
      // })
    ]
  },
  // productionSourceMap: false,
  // filenameHashing: false
}
