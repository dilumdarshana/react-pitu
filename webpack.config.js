const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const cssPlugin = new MiniCssExtractPlugin({
    filename: 'assets/styles/styles.css',
});

const copyPlugin = new CopyPlugin([
    { from: 'src/assets/images', to: 'assets/images' },
]);

module.exports = {
    entry: ['./src/index.js'],
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build)/,
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: "file-loader",
                        }
                    }
                ]
            },
        ]
    },
    externals: [
        {
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "React",
                root: "React"
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "ReactDOM",
                root: "ReactDOM"
            }
        },
    ],
    plugins: [cssPlugin, copyPlugin],
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
        extensions: ['.js', '.css', '.scss'],
    },
};
