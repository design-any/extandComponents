const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let currentDir = path.resolve(__dirname).replace('\\buildConfigs', '')
// ******************web打包***************************************************
let baseconfig = {
  target: 'web',
  entry: {},
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined, //
  output: {
    clean: true,
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name][chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    sourceMapFilename: process.env.NODE_ENV === 'development' ? '[file].map' : undefined,
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]'
  },
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        //
        // 命中 JavaScript 文件
        test: /\.(ts|tsx|js)$/,
        // 用 babel-loader 转换 JavaScript 文件
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        loader: 'babel-loader',
        include: currentDir,
        exclude: /node_modules/,
        options: {
          plugins: ['@babel/plugin-syntax-top-level-await'],
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-typescript', // 引用Typescript插件
              {
                allExtensions: true // ?支持所有文件扩展名
              }
            ]
          ]
        }
      },
      {
        //
        // 命中 JavaScript 文件
        test: /\.(jsx)$/,
        // 用 babel-loader 转换 JavaScript 文件
        // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
        loader: 'babel-loader',
        include: currentDir,
        exclude: /node_modules/,
        options: {
          plugins: ['@babel/plugin-syntax-top-level-await', '@vue/babel-plugin-jsx'],
          presets: ['@babel/preset-env', '@vue/cli-plugin-babel/preset', '@vue/babel-preset-jsx']
        }
      },
      {
        test: /\.(js|ts)$/,
        // 只加载你关心的目录下的 Source Map，以提升构建速度
        use: ['source-map-loader'],
        // 要把 source-map-loader 的执行顺序放到最前面，如果在 source-map-loader 之前有 Loader 转换了该 JavaScript 文件，会导致 Source Map 映射错误
        enforce: 'pre',
        include: /node_modules/
      },
      {
        //样式不需要模块化-我们项目只用less或者scss模块化
        test: /\.(stylus)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
        include: currentDir
      },
      {
        //模块化的css,自定义的全局样式请加:global
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 启用 css modules, css模块化, 所有类名都默认为当前组件, 或者使用 :global 声明全局样式, 参考 AntDesignPro 的样式引用
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定样式名
              },
              importLoaders: 0
            }
          }
        ]
      },
      {
        //非模块化的css
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        //模块化的less,自定义的全局样式请加:global
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 启用 css modules, css模块化, 所有类名都默认为当前组件, 或者使用 :global 声明全局样式, 参考 AntDesignPro 的样式引用
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定样式名
              },
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        //非模块化的less
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        //模块化的sass|scss,自定义的全局样式请加:global
        test: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 启用 css modules, css模块化, 所有类名都默认为当前组件, 或者使用 :global 声明全局样式, 参考 AntDesignPro 的样式引用
                localIdentName: '[name]__[local]--[hash:base64:5]' // 指定样式名
              }
            }
          },
          'sass-loader'
        ]
      },

      {
        //非模块化的sass|scss
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /\.module\.s[ac]ss$/
      },
      {
        // 对非文本文件采用 file-loader 加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: `[name]_[contenthash:8].css`
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    modules: [
      // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
      path.resolve(currentDir, 'node_modules'),
      path.resolve(currentDir, 'assets'),
      path.resolve(currentDir, 'basicComponents')
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'], // 模块的后缀名，import时不需要后缀名
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ['package.json'], // 模块的描述文件
    mainFields: ['index', 'main'], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false, // 是否强制导入语句必须要写明文件后缀

    alias: {
      '@basicComponents': path.resolve(currentDir, 'basicComponents'), //引入模块时，自动寻找
      '@assets': path.resolve(currentDir, 'assets'),
      path: false, // require.resolve('path-browserify'),
      stream: false, //require.resolve("stream-browserify"),
      http: false, //require.resolve("stream-http"),
      crypto: false, //require.resolve( "crypto-browserify"),
      https: false, //require.resolve( "https-browserify"),
      constants: false, //require.resolve( "constants-browserify"),
      tty: false, //require.resolve( "tty-browserify"),
      zlib: false, //require.resolve( "browserify-zlib"),
      fs: false, // require.resolve( "fs-extra"),
      tls: false,
      dns: false,
      dgram: false,
      net: false, //require.resolve("net"),
      os: false //false,//require.resolve( "os-browserify/browser")
    }
  },
  // 输出文件性能检查配置
  performance: {
    hints: 'warning', // 有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 1024 * 200, // 最大入口文件大小 (单位 bytes)
    assetFilter: function (assetFilename) {
      // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },

  devServer: {
    compress: true,
    host: '127.0.0.1',
    port: 9100,
    hot: true,
    open: true,
    profile: true // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
  }
}

function initConifg(distDir, projectDir, templateFile) {
  baseconfig.plugins.push(
    new HtmlWebpackPlugin({
      //
      chunks: 'all', //允许自动注入的chunk
      filename: 'index.html',
      template: `${templateFile}`,
      inject: false,
      minify: {
        removeComments: true, //清除注释
        collapseWhitespace: true //清理空格
      }
    })
  )

  baseconfig.entry.index = path.resolve(currentDir, `${projectDir}/index.js`)
  baseconfig.devServer.contentBase = path.resolve(currentDir, `${distDir}`)
  baseconfig.output.path = path.resolve(currentDir, `${distDir}`)
  console.log(baseconfig)
  return baseconfig
}

let config = initConifg('testDist', './test/', 'test/index.html')
module.exports = config
