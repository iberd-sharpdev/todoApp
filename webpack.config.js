var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: './app/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'app.bundle.js',
        sourceMapFilename: 'app.js.map'
    },
    module: {
        rules: [
            { test: /\.jsx?$/, enforce:'pre', loader: 'eslint-loader', include: path.resolve(__dirname, "app") },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}

        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.html']
    }
}