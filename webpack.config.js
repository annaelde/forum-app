const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.resolve(__dirname, './assets/dist'),
        publicPath: '/assets/dist/',
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
                        DEVELOPMENT: process.env.NODE_ENV === 'development'
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
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@abstract': path.resolve('./src/components/abstract'),
            '@containers': path.resolve('./src/components/containers'),
            '@layout': path.resolve('./src/components/layout'),
            '@parts': path.resolve('./src/components/parts'),
            '@sidebars': path.resolve('./src/components/sidebars'),
            '@views': path.resolve('./src/components/views'),
            '@libs': path.resolve('./src/libs'),
            '@store': path.resolve('./src/store'),
            '@utils': path.resolve('./src/utils'),
            '@npm': path.resolve('node_modules'),
            'styles': path.resolve('./src/styles')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports.plugins = (module.exports.plugins || []).concat([
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.esm.js', 'default']
    })
])