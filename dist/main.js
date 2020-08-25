(function(graph){
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
        require('./src/index.js')

    })({"./src/index.js":{"dependeciesPath":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\ndocument.write((0, _hello.say)('hi~'));"},"./src/hello.js":{"dependeciesPath":{"./word.js":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _word = require(\"./word.js\");\n\nfunction say(con) {\n  return con + (0, _word.word)();\n}"},"./src/word.js":{"dependeciesPath":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = word;\n\nfunction word() {\n  return 'webpack';\n}"}})