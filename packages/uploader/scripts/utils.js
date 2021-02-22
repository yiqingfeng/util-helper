const path = require('path');

// 获取文件路径
function getPath(nPath) {
    return path.resolve(__dirname, '../', nPath);
}

module.exports = {
    getPath,
}
