const path = require('path')

// 导入在内存中生成 HTML 页面的插件
// 只要是插件 都一定要放到 plugins 节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 这个配置文件 其实就是一个 js 文件 通过Node 中的模块操作，向外暴露了一个 配置对象
module.exports = {
    // 大家已经学会了举一反4 大家觉得 在配置文件中需要手动指定 入口 和 出口
    entry: path.join(__dirname, './src/main.js'), //入口 表示 要使用webpack 打包那个文件
    output: { //输出文件相关的配置
        path: path.join(__dirname, './dist'), //指定打包好的文件输出到那个目录中去
        filename: 'bundle.js' //这是指定输出的文件的名称
    },
    plugins: [ //配置插件的节点
        new htmlWebpackPlugin({ //创建一个在内存中生成 HTML 页面的插件
            template: path.join(__dirname, './src/index.html'), //指定模板页面将来会根据指定的页面路径 去生成内存中的页面
            filename: 'index.html', //指定生成的页面的名称

        }),

        new VueLoaderPlugin()
    ],
    module: { //这个节点用于配置所有第三方模块 加载器
        rules: [ //所有第三方模块的匹配规则
            //配置处理 css文件的第三方loader规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            ////配置处理 less文件的第三方loader规则
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // 处理图片路径的loader
            // limit=给定的值，是图片的大小，单位是 byte ，如果我们引用的 图片大于或等于给定的 limit 值，则不会被转为base64格式的字符串，
            // 如果图片小于给定的 limit 值，则会被转为 base64 的字符串
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=17251&name=[hash:8]-[name].[ext]',
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            // 配置babel 来转换高级的ES语法
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },
            // 处理.vue 的loader
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ],
    },
    resolve: {
        alias: { //修改 vue 被导入时候的包的路径
            // "vue$":"vue/dist/vue"
        }
    },
    mode: 'development'
}