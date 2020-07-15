const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const yargs = require('yargs');
const CopyPlugin = require('copy-webpack-plugin');
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


console.log(process.env.NODE_ENV,'IS_PROD2');
module.exports = {
  // lintOnSave:false, 
  publicPath:process.env.NODE_ENV == 'prod' ? '../app/' : '/',
  productionSourceMap: process.env.NODE_ENV === 'prod' ? false : true,
  devServer: {
    proxy:'http://vnext.test3.dev.baitu.com/',
    //proxy:'https://localhost:44377/',
    //  proxy:'https://localhost:44369/',
    // proxy:'http://wky.dev.baitu.com:8083/',
    port: 8080,
  },

  css: {
    extract: IS_PROD,
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/assets/scss/settings/_settings.variables.scss';
          @import '@/assets/scss/tools/_tools.chevron.scss';
        `,
      },
    },
  },
  transpileDependencies: ['bpmnlint'],
  configureWebpack:{
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
      symlinks: false,
      alias: {
        jointjs$: process.env.NODE_ENV === 'development'
          ? 'jointjs/dist/joint.js'
          : 'jointjs',
      },
    },
    module: {
      rules: [
        {
          test: /\.bpmnlintrc$/,
          use: 'bpmnlint-loader',
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,//console
              drop_debugger: false,
              pure_funcs: ['console.log'],//移除console
            },
          },
        }),
      ],
    },
    externals: (() => {
      const externals = [];
      if (process.env.NODE_ENV === 'production') {
        externals.push(
          'vue',
          /^bootstrap\/.+$/,
          /^@processmaker\/(?!processmaker-bpmn-moddle).+$/,
          /^@fortawesome\/.+$/,
          'jointjs',
          'i18next',
          '@panter/vue-i18next',
          'luxon',
          'lodash',
          'bpmn-moddle',
        );
      }
      return externals;
    })(),
    plugins: (() => {
      const argv = yargs
        .boolean('analyze')
        .argv;
      const plugins = [];
      if (argv.analyze) {
        plugins.push(new BundleAnalyzerPlugin());
      }

      /* copy files required for dynamic import of rich text editor */
      plugins.push(new CopyPlugin([{
        from: path.resolve(__dirname, 'node_modules/@processmaker/vue-form-elements/dist'),
        to: path.resolve(__dirname, 'public/js'),
        ignore: ['demo.html'],
      }]));

      return plugins;
    })(),
  },
};
