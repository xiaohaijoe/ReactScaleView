const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const addLessLoader = (loaderOptions = {}, customCssModules = {}) => config => {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const postcssNormalize = require('postcss-normalize');

  const cssLoaderOptions = loaderOptions.cssLoaderOptions || {};

  const { localIdentName } = loaderOptions;
  let cssModules = loaderOptions.cssModules || { localIdentName };

  if (!cssModules.localIdentName) {
    cssModules = customCssModules;
  }

  cssModules.localIdentName =
    cssModules.localIdentName || '[local]--[hash:base64:5]';

  const lessRegex = /\.less$/;
  const lessModuleRegex = /\.module\.less$/;

  const webpackEnv = process.env.NODE_ENV;
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
  const publicPath = config.output.publicPath;
  const shouldUseRelativeAssetPaths = publicPath === './';

  // copy from react-scripts
  // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js#L93
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          // not the same as react-scripts
          options: Object.assign(
            {
              sourceMap: true,
            },
            loaderOptions
          ),
        }
      );
    }
    return loaders;
  };

  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
    .oneOf;

  // Insert less-loader as the penultimate item of loaders (before file-loader)
  loaders.splice(
    loaders.length - 1,
    0,
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getStyleLoaders(
        Object.assign(
          {
            importLoaders: 2,
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
          cssLoaderOptions
        ),
        'less-loader'
      ),
    },
    {
      test: lessModuleRegex,
      use: getStyleLoaders(
        Object.assign(
          {
            importLoaders: 2,
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
          cssLoaderOptions,
          {
            modules: cssModules,
          }
        ),
        'less-loader'
      ),
    }
  );

  return config;
};

module.exports = async ({ config }) => {
  addLessLoader()(config);
  config.resolve.alias['@src'] = path.resolve(__dirname, '../src');
  config.resolve.alias['@stories'] = path.resolve(__dirname, '../src/stories');
  config.resolve.alias['antd'] = path.resolve(
    __dirname,
    '../node_modules/antd'
  );
  config.module.rules.push({
    // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
    //     the docs page from the markdown
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });
  // 2b. Run `source-loader` on story files to show their source code
  //     automatically in `DocsPage` or the `Source` doc block.
  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  // DEBUG Fix stringify for regexes
  //   Object.defineProperty(RegExp.prototype, 'toJSON', {
  //     value: RegExp.prototype.toString,
  //   });
  //   console.log(
  //     'Storybook webpack config:\n',
  //     JSON.stringify(config, null, '  ')
  //   );
  // DEBUG end

  return config;
};
