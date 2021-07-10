"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluginutils_1 = require("@rollup/pluginutils");
function default_1(userOptions = {}) {
    const options = Object.assign({
        include: [
            '**/*.vs',
            '**/*.fs',
            '**/*.vert',
            '**/*.frag',
            '**/*.glsl',
        ],
        compress: true,
    }, userOptions);
    const filter = pluginutils_1.createFilter(options.include, options.exclude);
    const compress = options.compress === true ? compressGLSL : options.compress;
    return {
        name: 'vite-plugin-string',
        transform(source, id) {
            if (!filter(id))
                return;
            return pluginutils_1.dataToEsm(compress ? compress(source) : source);
        },
    };
}
exports.default = default_1;
function compressGLSL(code) {
    let needNewline = false;
    return code
        .replace(/\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g, '')
        .split(/\n+/)
        .reduce((result, line) => {
        line = line.trim().replace(/\s{2,}|\t/, ' ');
        if (line.charAt(0) === '#') {
            if (needNewline) {
                result.push('\n');
            }
            result.push(line, '\n');
            needNewline = false;
        }
        else {
            result.push(line.replace(/\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|-|!|;)\s*/g, '$1'));
            needNewline = true;
        }
        return result;
    }, [])
        .join('')
        .replace(/\n+/g, '\n');
}
