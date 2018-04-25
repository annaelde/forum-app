var path = require('path')
var webpack = require('webpack')

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
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }, { loader: 'ifdef-loader', options: { DEVELOPMENT: process.env.NODE_ENV === 'development' } }]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@abstract':  path.resolve('./src/components/abstract'),
            '@containers':  path.resolve('./src/components/containers'),
            '@layout':  path.resolve('./src/components/layout'),
            '@parts':  path.resolve('./src/components/parts'),
            '@sidebars':  path.resolve('./src/components/sidebars'),
            '@views':  path.resolve('./src/components/views'),
            '@libs': path.resolve('./src/libs'),
            '@store': path.resolve('./src/store'),
            '@utils': path.resolve('./src/utils'), 
            '@npm': path.resolve('node_modules')
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
    new webpack.ProvidePlugin({
        Vue: ['vue/dist/vue.esm.js', 'default']
    })
])
