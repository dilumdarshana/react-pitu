const path = require("path");

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build)/,
                loader: 'babel-loader',
            },
        ]
    },
    externals: [
        {
          react: {
            root: 'React',
            amd: 'react',
            commonjs: 'react',
            commonjs2: 'react',
          },
        },
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
};
