/**
 * @description 文件处理
 */
import md5 from './md5'

const File = {
    // 获取文件大小
    getFileSize(file, type) {
        let { size } = file // B
        switch (type) {
            case 'KB':
                size /= 1024
                break
            case 'MB':
                size /= 1048576 // 1024 * 1024
                break
            case 'GB':
                size /= 1073741824 // 1024 * 1024 * 1024
                break
            default:
                break
        }
        return size
    },

    // 获取文件后缀
    getFileSuffix(file) {
        return file
            ? file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()
            : ''
    },

    getFileHash(file) {
        return new Promise((resolve, reject) => {
            const worker = new window.Worker(
                window.URL.createObjectURL(
                    new Blob([md5], {
                        type: 'text/javascript',
                    })
                )
            )
            worker.addEventListener('message', (e) => {
                resolve(e.data)
            })
            worker.addEventListener('error', (e) => {
                reject(e)
            })
            worker.postMessage(file)
        })
    },
}

export default File
