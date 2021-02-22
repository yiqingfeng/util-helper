/**
 * @description 文件上传
 */
import utils from '@/utils/index'

const { ajax, File } = utils

function noop() {}

class Uploader {
    constructor(options = {}) {
        Object.assign(
            this,
            {
                _uploadFiles: [],
                _events: {},
                _reqs: {}, // 内置上传请求
                _tempIndex: 1,
            },
            {
                beforeRemove: null, // 文件移除钩子函数
                headers: {},
                withCredentials: false,
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
            size: 2097152, // 切片大小,单位 B，默认 2M 长度来分片
            tryTime: 3, // 失败重试次数
            // poolsize: 3,// 请求池大小
            startUrl: '/FSC/EM/File/ChunkFileUploadStart', // 上传预处理接口
            uploadUrl: '/FSC/EM/File/ChunkFileUploadDataByStream', // 上传切片接口
            doneUrl: '/FSC/EM/File/ChunkFileUploadComplete', // 上传完成后处理接口
        }

        if (options.chunk) {
            Object.assign(this.chunks, options.chunks)
        }

        // 监听事件
        if (options.events) {
            Object.keys(options.events).forEach((name) => {
                this.on(
                    name,
                    utils.isArray(options.events[name])
                        ? options.events[name]
                        : [options.events[name]]
                )
            })
        }
    }

    getFiles() {
        return this._uploadFiles
    }

    // 获取指定文件
    getFile(rawFile) {
        const fileList = this.getFiles()
        let target
        fileList.every((item) => {
            target = rawFile.uid === item.uid ? item : null
            return !target
        })
        return target
    }

    on(name, fns) {
        const events = this._events
        if (!events[name]) {
            events[name] = []
        }
        if (utils.isArray(fns)) {
            events[name].push(...fns)
        } else {
            events[name].push(fns)
        }
    }

    // 触发指定事件
    trigger(name, ...data) {
        const events = this._events[name] || []
        events.forEach((fn) => {
            fn(...data)
        })
    }

    // 多文件上传
    upload(files) {
        let postFiles = Array.prototype.slice.call(files)
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
        if (this.whenChunks === 0 || File.getFileSize(file) < this.whenChunks) {
            this.uploadEasy(file)
        } else {
            this.uploadChunk(file)
        }
    }

    // 文件上传预处理
    handleStart(rawFile) {
        rawFile.uid = Date.now() + this._tempIndex++
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

        this._uploadFiles.push(file)
        this.trigger('change', this._uploadFiles)
    }

    handleProgress(ev, rawFile) {
        const file = this.getFile(rawFile)
        this.trigger('progress', ev, file, this._uploadFiles)
        file.status = 'uploading'
        file.percentage = ev.percent || 0
    }

    handleSuccess(res, rawFile) {
        const file = this.getFile(rawFile)

        if (file) {
            file.status = 'success'
            file.response = res

            this.trigger('success', res, file, this._uploadFiles)
            this.trigger('change', file, this._uploadFiles)
        }
    }

    handleError(err, rawFile) {
        const file = this.getFile(rawFile)
        file.status = 'fail'

        this.trigger('error', err, file, this._uploadFiles)
        this.trigger('change', file, this._uploadFiles)
    }

    handleRemove(file, raw) {
        if (raw) {
            file = this.getFile(raw)
        }
        let doRemove = () => {
            this.abort(file)
            let fileList = this._uploadFiles
            fileList.splice(fileList.indexOf(file), 1)
            this.trigger('remove', file, fileList)
        }

        if (!this.beforeRemove) {
            doRemove()
        } else if (typeof this.beforeRemove === 'function') {
            const before = this.beforeRemove(file, this._uploadFiles)
            if (before && before.then) {
                before.then(() => {
                    doRemove()
                }, noop)
            } else if (before !== false) {
                doRemove()
            }
        }
    }

    abort(file) {
        const reqs = this._reqs
        if (file) {
            let uid = file
            if (file.uid) uid = file.uid
            if (reqs[uid]) {
                reqs[uid].abort()
            }
        } else {
            Object.keys(reqs).forEach((uid) => {
                if (reqs[uid]) reqs[uid].abort()
                delete reqs[uid]
            })
        }
    }

    // 简易上传（非分片）
    uploadEasy(rawFile) {
        const { uid } = rawFile
        const options = {
            headers: this.headers,
            withCredentials: this.withCredentials,
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
                delete this._reqs[uid]
            },
            onError: (err) => {
                this.handleError(err, rawFile)
                delete this._reqs[uid]
            },
        }
        const req = this.httpRequest(options)
        this._reqs[uid] = req.xhr
        req.then(options.onSuccess, options.onError)
    }

    // 分片式上传
    uploadChunk(rawFile) {
        let opts = {
            ...this.chunk,
        }
        opts.rawFile = rawFile
        this.chunk.rawFile = rawFile
        let size = this.chunk.size
        let [chunks, task, last] = this.doSlice(size)

        this.chunkUploadBefore({
            chunkCount: task.length,
            chunkSize: size,
            lastChunkSize: last,
            array: chunks,
        }).then((data) => {
            if (!data) return

            this.chunk.data = {
                ...data.data,
            }
            let task
            if (data.chunkSize && data.chunkSize !== size) {
                // ;[chunks, task, last] = this.doSlice(data.chunkSize)
                task = this.doSlice(data.chunkSize)[1]
            }
            this.doWork(task, data.tasks)
        })
    }

    // 文件分片 chunkFileSize [分片大小，K]
    doSlice(chunkFileSize) {
        let mime = this.chunk.mime
        let from = 0
        let wi = false
        let total = File.getFileSize(this.chunk.rawFile)
        let all = Math.floor(total / chunkFileSize)
        let last = chunkFileSize
        let chunks = []
        let task = []
        if (total % chunkFileSize !== 0) {
            wi = true
        }
        for (let i = 0; i < all; i++) {
            chunks.push([from, from + chunkFileSize, mime])
            from = from + chunkFileSize
        }
        if (wi) {
            chunks.push([from, total, mime])
            last = total - from
        }
        for (let i = 0; i < chunks.length; i++) {
            task.push({
                info: chunks[i],
                index: i,
                success: false,
                retryTime: 0,
            })
        }

        return [chunks, task, last]
    }

    // 分片上传前，先从服务器获取该文件分片上传的信息
    chunkUploadBefore(opts) {
        // console.log('chunkUploadBefore:',opts);
        let rawFile = this.chunk.rawFile

        function func(res) {
            if (!res) {
                res = {
                    IsExit: false,
                    Path: 'thisispaththisispath',
                    ChunkSize: 111,
                    IsChunkFile: true,
                    ChunkedList: [],
                }
            }
            if (!res || !res.Path) return
            if (res.IsExit === false) {
                return {
                    data: res,
                    tasks: null,
                }
            } else {
                // 有未上传的分片
                if (res.IsChunkFile) {
                    // eslint-disable-line no-lonely-if
                    let list = res.ChunkedList, // 已上传的分片
                        k = [],
                        t = []
                    for (let i = 0; i < list.length; i++) {
                        k.push(list[i].Index) // 分片的index值是从0开始记录的，在doSlice里
                    }
                    // todo, 循环之前从1开始的
                    for (let i = 0; i < opts.chunkCount; i++) {
                        if (k.indexOf(i) === -1) {
                            t.push(i)
                        }
                    }
                    return {
                        data: {
                            Path: res.Path,
                        },
                        tasks: t, // 未上传的分片
                    }
                } else {
                    // 所有分片上传完成，已合成文件
                    return {
                        data: {
                            Path: res.Path,
                        },
                        chunkSize: res.ChunkSize,
                        tasks: 'done',
                    }
                }
            }
        }

        return File.getFileHash(rawFile).then((data) => {
            return this.httpRequest({
                url: this.chunk.startUrl, //上传预处理接口
                type: 'post',
                data: {
                    ChunkCount: opts.chunkCount,
                    ChunkSize: opts.chunkSize,
                    LastChunkSize: opts.lastChunkSize,
                    HashRule: '524288_51200',
                    Code: data,
                    Extension: File.getFileSuffix(rawFile),
                    Business: 'FSC',
                },
            }).then(
                (res) => {
                    return func(res)
                },
                (err) => {
                    // //for debug
                    // return func()
                    this.handleError(err, this.chunk.rawFile)
                }
            )
        })
    }

    /**
     * @description 整合文件分片信息
     * @param  {[type]} task   [文件每个分片信的息数组]
     * @param  {[type]} tasks  [文件未上传的分片索引]
     */
    doWork(task, tasks) {
        // console.log('doWork:',task,tasks);
        if (tasks) {
            if (tasks !== 'done' && tasks.length > 0) {
                // 文件还有未上传的分片
                let q = []
                for (let i = 0; i < tasks.length; i++) {
                    q.push(task[tasks[i]])
                }
                task = q
            } else {
                task = []
                this.handleProgress(
                    {
                        total: task.length,
                        done: task.length,
                        percent: 100,
                    },
                    this.chunk.rawFile
                )

                this.chunkUploadEnd({
                    data: this.chunk.data,
                    result: {
                        fail: 0,
                        success: task.length,
                        task: 0,
                        total: task.length,
                    },
                })
            }
        }

        if (task.length === 0) return

        let opts = {
            current: 0, //当前上传个数，不论失败成功
            fail: 0, //上传分片失败个数
            taskCount: task.length,
        }

        let doTaskDoneCallback = () => {
            if (opts.current === task.length) {
                //一组分片上传完成
                this.chunkUploadEnd({
                    data: this.chunk.data,
                    result: {
                        total: task.length, //总的分片个数
                        task: task.length, //上传的分片个数
                        success: task.length - opts.fail,
                        fail: opts.fail,
                    },
                })
            }
        }

        for (let i = 0; i < task.length; i++) {
            this.doTask(opts, task[i], doTaskDoneCallback)
        }
    }

    /**
     * @description 上传文件的分片
     * @param  {[type]} opts [description]
     * @param  {[type]} info [待上传分片]
     */
    doTask(opts, info, doTaskDoneCallback) {
        // console.log('doTask:',opts,info,this.chunk.data);
        let t = info.info
        let headers = {
            from: t[0],
            to: t[1],
            ChunkIndex: info.index + 1,
            ...this.chunk.data,
            ...this.headers,
        }

        let blob = this.chunk.rawFile
        let slice = blob.slice || blob.webkitSlice || blob.mozSlice
        let chunkData = slice.apply(blob, t)

        let req = this.httpRequest({
            headers: headers,
            withCredentials: this.withCredentials,
            data: chunkData,
            type: 'post',
            url: this.chunk.uploadUrl,
        })
        this.reqs[blob.uid] = req.xhr
        req.then(
            (res) => {
                let data = res.data || {}
                if (data.IsSuccess) {
                    //一个分片上传成功
                    info.success = true
                    opts.current++

                    let a = opts.taskCount.length - info.length + opts.current
                    this.onProgress({
                        total: opts.taskCount.length,
                        done: a,
                        percent: Math.round((a / opts.taskCount.length) * 100),
                    })

                    doTaskDoneCallback()
                } else {
                    info.success = false
                    if (info.retryTime < this.chunk.tryTime) {
                        info.retryTime++
                        this.doTask(opts, info, doTaskDoneCallback)
                    } else {
                        opts.fail++
                        opts.current++
                        doTaskDoneCallback()
                    }
                }
            },
            (err) => {
                info.success = false
                if (info.retryTime < this.chunk.tryTime) {
                    info.retryTime++
                    this.doTask(opts, info, doTaskDoneCallback)
                } else {
                    opts.fail++
                    opts.current++
                    doTaskDoneCallback()
                }
            }
        )
    }

    // 文件全部分片上传结束，可能有的失败，有的成功
    chunkUploadEnd(res) {
        // //for debug
        // res = {
        //   data: this.chunk.data,
        //   result: {
        //     fail: 0,
        //     success: 2,
        //     task: 2,
        //     total: 3
        //   }
        // }
        // console.log('chunkUploadEnd,',res);
        let result = res.result
        if (result.task === 0) {
            //没有上传任务
            this.onSuccess(res, this.chunk.rawFile)
        } else if (result.fail > 0) {
            //有上传失败的任务
            this.onError(res, this.chunk.rawFile)
        } else {
            this.httpRequest({
                url: this.chunk.doneUrl, //上传完成后处理接口
                data: {
                    Business: 'FSC',
                    ...res.data,
                },
                type: 'POST',
            }).then(
                (res2) => {
                    // console.log('chunkUploadEnd,',res2);
                    let t = deepMerge(res, res2)
                    if (res2.IsSuccess) {
                        this.onSuccess(t, this.chunk.rawFile)
                    } else {
                        this.onError(t, this.chunk.rawFile)
                    }
                },
                (err2) => {
                    this.onError(res, this.chunk.rawFile)
                }
            )
        }
    }
}

export default Uploader
export const uploadFiles = (files, options) => {
    const uploader = new Uploader(options)
    uploader.upload(files)
}
