// 找到入口文件，分析内容
// 有依赖的话，拿到依赖路径
// 转换代码

const fs = require('fs')
const parser = require('@babel/parser') //转换为AST
const traverse = require('@babel/traverse').default //接收抽象语法树
const path = require('path')
const { transformFromAst } = require('@babel/core') //ast转换成js代码

const entry = entryFile => {
    // 读取文件内容
    const content = fs.readFileSync(entryFile, 'utf-8');
    // 转换为抽象语法树
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    const dependeciesPath = {}; //依赖路径
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(entryFile)
            const newPath = './' + path.join(dirname, node.source.value).replace('\\', '/')
            dependeciesPath[node.source.value] = newPath
        }
    })
    // console.log(dependeciesPath)
    const { code } = transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    // console.log(code)
    return {
        entryFile,
        dependeciesPath,
        code
    }

}


// 分析出所有依赖
const dependecies = entryFile => {

    const info = entry('./src/index.js');
    const modules = [];
    modules.push(info)
    for (let i = 0; i < modules.length; i++) {
        const item = modules[i];
        const { dependeciesPath } = item;
        if (dependeciesPath) {
            for (let j in dependeciesPath) {
                modules.push(entry(dependeciesPath[j]))
            }
        }

    }
    // console.log(modules)
    const obj = {}

    modules.forEach(item => {

        obj[item.entryFile] = {

            dependeciesPath: item.dependeciesPath,
            code: item.code
        }
    })
    // console.log(obj)

    return obj

}

// 生成代码
const genCode = entryFile => {
    const obj = dependecies(entryFile)
    const graph = JSON.stringify(obj)

    const bundle = `(function(graph){
        function require(module){
            function localRequire(relativePath){
                return require(graph[module].dependeciesPath[relativePath])    
            }
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(localRequire,exports, graph[module].code);
            return exports;
        }
        require('${entryFile}')

    })(${graph})`
    fs.writeFileSync(path.resolve(__dirname, './dist/main.js'), bundle, 'utf-8')

}
genCode('./src/index.js')