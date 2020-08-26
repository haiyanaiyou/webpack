const path = require('path')
const MyPlugins = require('./myPlugins/myPlugins')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'index.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: path.resolve(__dirname,'./myloader/myloader.js'),
                    options: {
                        name: 'my_loader'
                    }
                }
            }
        ]
    },
    plugins: [
        new MyPlugins({
            name: 'hello plugins'
        })
    ]
}