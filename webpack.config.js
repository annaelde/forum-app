const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const appDir = 'src/'
const assetDir = 'assets/'
const buildDir = path.join(assetDir, 'dist/')

const assetPath = path.resolve(__dirname, assetDir)
const appPath = path.resolve(__dirname, appDir)
const buildPath = path.resolve(__dirname, buildDir)

module.exports = {
    entry: ['babel-polyfill', path.join(appPath, '/main.js')],
    output: {
        path: buildPath,
        publicPath: assetDir,
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'ifdef-loader',
                    options: {
                        'ifdef-verbose': true,
                        MOCK: process.env.SERVER_ENV === 'mock',
                        PRODUCTION: process.env.SERVER_ENV === 'production',
                        DEVELOPMENT: process.env.NODE_ENV === 'development',
                        DJANGO: process.env.SERVER_ENV === 'django'
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(sass)$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-base64')({
                                    pattern: /<svg.*<\/svg>/i,
                                    prepend: 'data:image/svg+xml;base64,'
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            url: false,
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json', '.sass'],
        modules: [appPath, 'node_modules'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@mock': path.join(appPath, 'mock'),
            '@abstract': path.join(appPath, 'components/abstract'),
            '@containers': path.join(appPath, 'components/containers'),
            '@layout': path.join(appPath, 'components/layout'),
            '@parts': path.join(appPath, 'components/parts'),
            '@sidebars': path.join(appPath, 'components/sidebars'),
            '@views': path.join(appPath, 'components/views'),
            '@libs': path.join(appPath, 'libs'),
            '@store': path.join(appPath, 'store'),
            '@utils': path.join(appPath, 'utils'),
            '@npm': path.resolve(__dirname, 'node_modules'),
            'styles': path.join(appPath, 'styles')
        }
    },
    devServer: {
        contentBase: assetPath,
        historyApiFallback: {
            index: 'index.html'
        },
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.optimization = {
        minimize: true
    }
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin()
    ])
}

module.exports.plugins = (module.exports.plugins || []).concat([
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.esm.js', 'default']
    })
])