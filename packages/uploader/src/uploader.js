/**
 * @description 文件上传
 */
import utils, { ajax } from '@/utils/index.js'

function noop() {}

class Uploader {
    constructor(options = {}) {
        Object.assign(
            this,
            {
                uploadFiles: [],
                tempIndex: 1,
            },
            {
                beforeRemove: null, // 文件移除钩子函数
                httpRequest: ajax, // 文件上传行为
                multiple: false, // 是否多文件上传
                url: '/FSC/EM/File/UploadByForm', // 上传文件地址，非切片上传
                whenChunks: 0, // 文件大小超过多少时，进行分片处理，默认为 0 不分片
            },
            utils.pick(options, ...['multiple', 'url', 'whenChunks'])
        )

        // 切片信息
        this.chunk = {
            mime: 'multipart/form-data',
            size: 2097152, // 切片大小,单位B
            tryTime: 3, // 失败重试次数
            // poolsize: 3,// 请求池大小
            startUrl: '/FSC/EM/File/ChunkFileUploadStart', // 上传预处理接口
            uploadUrl: '/FSC/EM/File/ChunkFileUploadDataByStream', // 上传切片接口
            doneUrl: '/FSC/EM/File/ChunkFileUploadComplete', // 上传完成后处理接口
        }

        if (options.chunk) {
            Object.assign(this.chunks, options.chunks)
        }
    }

    // 获取文件大小
    getFileSize(file, type) {
        var size = file.size // B
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
    }

    getFiles() {
        return this.uploadFiles
    }

    // 获取指定文件
    getFile(rawFile) {
        let fileList = this.uploadFiles
        let target
        fileList.every((item) => {
            target = rawFile.uid === item.uid ? item : null
            return !target
        })
        return target
    }

    // 触发指定事件
    trigger(event, ...data) {
        console.log(data)
    }

    // 多文件上传
    upload(files) {
        var postFiles = Array.prototype.slice.call(files)
        if (!this.multiple) {
            postFiles = postFiles.slice(0, 1)
        }
        if (postFiles.length === 0) {
            return
        }
        postFiles.forEach((rawFile) => {
            this.handleStart(rawFile)
            this.uploadFile(rawFile)
        })
    }

    // 单文件上传
    uploadFile(file) {
        if (this.whenChunks === 0 || this.getFileSize(file) < this.whenChunks) {
            this.uploadEasy(file)
        } else {
            this.uploadChunk(file)
        }
    }

    // 文件上传预处理
    handleStart(rawFile) {
        rawFile.uid = Date.now() + this.tempIndex++
        let file = {
            status: 'ready',
            name: rawFile.name,
            size: rawFile.size,
            percentage: 0,
            uid: rawFile.uid,
            raw: rawFile,
        }

        // 上传图片本地预览
        // if (this.listType === 'picture') {
        //     try {
        //         file.url = URL.createObjectURL(rawFile)
        //     } catch (err) {
        //         console.error('[Uploader Error]', err)
        //         return
        //     }
        // }

        this.uploadFiles.push(file)
        this.trigger('change', this.uploadFiles)
    }

    handleProgress(ev, rawFile) {
        const file = this.getFile(rawFile)
        this.trigger('progress', ev, file, this.uploadFiles)
        file.status = 'uploading'
        file.percentage = ev.percent || 0
    }

    handleSuccess(res, rawFile) {
        const file = this.getFile(rawFile)

        if (file) {
            file.status = 'success'
            file.response = res

            this.trigger('success', res, file, this.uploadFiles)
            this.trigger('change', file, this.uploadFiles)
        }
    }

    handleError(err, rawFile) {
        const file = this.getFile(rawFile)
        file.status = 'fail'

        this.trigger('error', err, file, this.uploadFiles)
        this.trigger('change', file, this.uploadFiles)
    }

    handleRemove(file, raw) {
        if (raw) {
            file = this.getFile(raw)
        }
        let doRemove = () => {
            this.abort(file)
            let fileList = this.uploadFiles
            fileList.splice(fileList.indexOf(file), 1)
            this.trigger('remove', file, fileList)
        }

        if (!this.beforeRemove) {
            doRemove()
        } else if (typeof this.beforeRemove === 'function') {
            const before = this.beforeRemove(file, this.uploadFiles)
            if (before && before.then) {
                before.then(() => {
                    doRemove()
                }, noop)
            } else if (before !== false) {
                doRemove()
            }
        }
    }

    // 简易上传（非分片）
    uploadEasy(rawFile) {
        const { uid } = rawFile
        const options = {
            headers: {},
            withCredentials: false,
            file: rawFile,
            data: this.data,
            type: 'post',
            filename: this.name,
            url: this.url,
            onProgress: (e) => {
                this.handleProgress(e, rawFile)
            },
            onSuccess: (res) => {
                this.handleSuccess(res, rawFile)
                delete this.reqs[uid]
            },
            onError: (err) => {
                this.handleError(err, rawFile)
                delete this.reqs[uid]
            },
        }
        const req = this.httpRequest(options)
        this.reqs[uid] = req.xhr
        req.then(options.onSuccess, options.onError)
    }

    // 分片式上传
    uploadChunk(file) {
        var opts = deepmerge({}, this.chunk)
        opts.rawFile = rawFile
        this.chunk.rawFile = rawFile
        var [chunks, task, last] = this.doSlice(this.chunk.size)
    }
}

export default Uploader
export const uploadFiles = (files, options) => {
    const uploader = new Uploader(options)
    uploader.upload(files)
}
