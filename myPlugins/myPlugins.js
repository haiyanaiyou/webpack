// plugins基本结构
// 本质上是一个类

class MyPlugins{
    constructor(options){
        console.log(options)
        this.options = options
    }
    apply(compiler){
        // console.log('plugins')
        // 在输出目录中放一个txt文件
        compiler.hooks.emit.tapAsync("MyPlugins", (compilation, cb)=>{

            compilation.assets['demo.txt'] = {
                source: ()=>{
                    return 'demodemodemo'
                },
                size: ()=>{
                    return 2048
                }
            }
            cb()
        })
    }
}

module.exports = MyPlugins