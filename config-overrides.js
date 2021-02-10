const {
  override,
  // fixBabelImports,
  addWebpackAlias,
  addDecoratorsLegacy,
  addWebpackPlugin,
  addLessLoader,
} = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const { theme } = require('./package.json');
const path = require('path');
const REACT_APP = /^COMPONENT_PUBLISH/i;
const isComponentPublish = process.argv.filter(value => REACT_APP.test(value))
  .length;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// 打包配置
const addCustomize = () => config => {
  // 发布组件配置
  if (isComponentPublish) {
    config = {};
    config.mode = 'production';
    config.entry = path.join(__dirname, './src/components/ScaleView/index.js');
    config.output = {
      path: path.join(__dirname, './publish'),
      filename: 'index.js',
      libraryTarget: 'commonjs2', //发布组件专用
    };
    config.plugins = [];
    config.module = {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.cm\.styl$/,
          loader:
            'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader',
        },
      ],
    };
    config.resolve = {
      extensions: ['.js', '.jsx'],
    };
    config.externals = [nodeExternals()];
  }
  return config;
};

const addEnvironmentVariables = () => {
  const REACT_APP = /^REACT_APP_/i;
  const { argv } = process;
  argv
    .filter(value => REACT_APP.test(value))
    .forEach(value => {
      const values = value.split('=');
      process.env[values[0]] = values[1];
    });
  return addWebpackPlugin(
    new webpack.ProvidePlugin({
      'process.env': JSON.stringify(process.env),
    })
  );
};
const addTerserPlugin = () => config => {
  config.optimization.minimizer[0] =
    // This is only used in production mode
    new TerserPlugin({
      terserOptions: {
        parse: {
          // we want terser to parse ecma 8 code. However, we don't want it
          // to apply any minfication steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the 'compress' and 'output'
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Disabled because of an issue with Terser breaking valid code:
          // https://github.com/facebook/create-react-app/issues/5250
          // Pending futher investigation:
          // https://github.com/terser-js/terser/issues/120
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: shouldUseSourceMap,
    });
  return config;
};

module.exports = {
  webpack: override(
    // fixBabelImports('antd', {
    //   libraryDirectory: 'es',
    //   style: true,
    // }),
    addWebpackAlias({
      //路径别名
      'react-native': 'react-native-web',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    }),
    addDecoratorsLegacy(),
    addLessLoader({
      // lessOptions: {
      // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
      javascriptEnabled: true,
      modifyVars: theme,
      // },
    }),
    addTerserPlugin(),
    addEnvironmentVariables(),
    addCustomize()
  ),
  paths: function(paths, env) {
    // ...add your paths config
    paths.appBuild = isComponentPublish
      ? path.resolve(__dirname, 'publish')
      : paths.appBuild;
    return paths;
  },
};
