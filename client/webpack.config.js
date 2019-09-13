const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                resolve: { extensions: [".js", ".jsx"] }, 
                exclude: /node_modules/, 
            },
        ],
    },
    devServer: {
        overlay: true,
        hot: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      ],
};
