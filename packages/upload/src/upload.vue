<script>
import Ajax from "@/utils/ajax";
import File from "./util/file";
// import Request from "./util/request";
// import Ajaxpool from "./util/ajaxpool";
import UploadDragger from "./upload-dragger.vue";
import {deepMerge} from '@/utils';
// import axios from 'axios';

export default {
  inject: ["uploader"],
  components: {
    UploadDragger
  },
  props: {
    // type: String,
    name: {
      type: String,
      default: "file"
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: Ajax
    },
    disabled: Boolean,
    limit: Number,
    maxSize: {
      type: Number,
      default: 10485760
    },
    onExceed: Function,
    whenChunks:{//在文件大小超过多少时采用切片上传，默认0：不分片
      type:Number,
      default:0
    },
    chunk: Object,
    basePath: String,
    url: String
  },

  data() {
    return {
      mouseover: false,
      reqs: {},
      _uploader:null
    };
  },

  methods: {
    isImage(str) {
      return str.indexOf("image") !== -1;
    },
    handleChange(ev) {
      const files = ev.target.files;

      if (!files) return;
      // this.uploadFiles(files);
      
      if (!this.beforeUpload) {
        this.uploadFiles(files)
      }else{
        const before = this.beforeUpload(files);
        if (before !== false) {
          this.uploadFiles(files);
        } else {
          // this.onRemove(null, files);
        }
      }
    },
    //文件校验
    valideFile(postFiles) {
      if (this.limit && this.fileList.length + postFiles.length > this.limit) {
        this.onExceed &&
          this.onExceed(postFiles, this.fileList, {
            type: 1,
            msg: "file's count is more than limit(" + this.limit + ")."
          });
        return false;
      }

      if (this.maxSize && this.maxSize > 0) {
        let flag = false,
          maxSize = this.maxSize * 1024;
        for (let i = 0; i < postFiles.length; i++) {
          if (postFiles[i].size > maxSize) {
            flag = true;
            break;
          }
        }

        if (flag) {
          this.onExceed &&
            this.onExceed(postFiles, this.fileList, {
              type: 2,
              msg: "file's size is more than maxSize(" + this.maxSize + "KB)."
            });
          return false;
        }
      }

      if (this.accept) {
        let flag = false,
          accepts = this.accept.split(",");
        if (accepts.indexOf(".*") === -1) {
          for (let i = 0; i < postFiles.length; i++) {
            let v = postFiles[i];
            let suffix = File.getFileSuffix(v);
            if (accepts.indexOf("." + suffix) == -1) {
              flag = true;
              break;
            }
          }
        }

        if (flag) {
          this.onExceed &&
            this.onExceed(postFiles, this.fileList, {
              type: 3,
              msg: "file's type must be \"" + this.accept + '".'
            });
          return false;
        }
      }

      return true;
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      if (postFiles.length === 0) {
        return;
      }

      if (!this.valideFile(postFiles)) return;

      postFiles.forEach(rawFile => {
        this.onStart(rawFile);

        if (this.autoUpload){
          this.upload(rawFile)

          // if (!this.beforeUpload) {
          //   this.upload(rawFile)
          // }else{
          //   ((rawFile)=>{
          //     const before = this.beforeUpload(rawFile);
          //     if (before && before.then) {
          //       before.then(
          //         processedFile => {
          //           const fileType = Object.prototype.toString.call(processedFile);

          //           if (fileType === "[object File]" || fileType === "[object Blob]") {
          //             if (fileType === "[object Blob]") {
          //               processedFile = new File([processedFile], rawFile.name, {
          //                 type: rawFile.type
          //               });
          //             }
          //             for (const p in rawFile) {
          //               if (rawFile.hasOwnProperty(p)) {
          //                 processedFile[p] = rawFile[p];
          //               }
          //             }
          //             this.upload(processedFile);
          //           } else {
          //             this.upload(rawFile);
          //           }
          //         },() => {
          //           this.onRemove(null, rawFile);
          //         }
          //       );
          //     } else if (before !== false) {
          //       this.upload(rawFile);
          //     } else {
          //       this.onRemove(null, rawFile);
          //     }
          //   })(rawFile);
          // }
        }
      });
    },
    upload(rawFile) {
      this.$refs.input.value = null;
      if (this.whenChunks === 0 || File.getFileSize(rawFile) <= this.whenChunks) {
        this.uploadeasy(rawFile);
      } else {
        this.uploadChunk(rawFile);
      }
    },
    //非分片上传
    uploadeasy(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        type:'post',
        filename: this.name,
        url: this.url,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req.xhr;
      req.then(options.onSuccess, options.onError);
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach(uid => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return;
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick();
      }
    },
    //分片上传
    uploadChunk(rawFile) {
      let opts = deepMerge({}, this.chunk);
      opts.rawFile = rawFile;
      this.chunk.rawFile = rawFile;

      // console.log('doUploadChunk:',opts);
      
      let size = this.chunk.size;
      let last = size;
      let chunks = [];
      let task = [];

      // 根据分片大小重新分片
      [chunks,task,last] = this.doSlice(size);

      this.chunkUploadBefore({
        chunkCount: task.length,
        chunkSize: size,
        lastChunkSize: last,
        array: chunks
      }).then((data)=>{
        if (!data) return;

        this.chunk.data = deepMerge({}, data.data);
        if (data.chunkSize && data.chunkSize !== size) {
          [chunks,task,last] = this.doSlice(data.chunkSize);
        }
        this.doWork(task,data.tasks);
      });
    },
    /**
     * 将文件分片
     * @param  {[type]} chunkFileSize [分片大小，K]
     */
    doSlice:function(chunkFileSize) {
      // console.log('doSlice:',chunkFileSize);
      let mime = this.chunk.mime;
      let from = 0;
      let wi = false;
      let total = File.getFileSize(this.chunk.rawFile);
      let all = Math.floor(total / chunkFileSize);
      let last = chunkFileSize;
      let chunks = [];
      let task = [];
      if (total % chunkFileSize !== 0) {
        wi = true;
      }
      for (let i = 0; i < all; i++) {
        chunks.push([from, from + chunkFileSize, mime]);
        from = from + chunkFileSize;
      }
      if (wi) {
        chunks.push([from, total, mime]);
        last = total - from;
      }
      for (let i = 0; i < chunks.length; i++) {
        task.push({
          info: chunks[i],
          index: i,
          success: false,
          retryTime: 0
        });
      }

      return [chunks,task,last];
    },
    //分片上传前，先从服务器获取该文件分片上传的信息
    chunkUploadBefore:function(opts){
      // console.log('chunkUploadBefore:',opts);
      let rawFile = this.chunk.rawFile;
      return File.getFileHash(rawFile).then((data)=>{
        return this.httpRequest({
          url:this.chunk.starturl,//上传预处理接口
          type:'post',
          data:{
            ChunkCount: opts.chunkCount,
            ChunkSize: opts.chunkSize,
            LastChunkSize: opts.lastChunkSize,
            HashRule:'524288_51200',
            Code: data,
            Extension: File.getFileSuffix(rawFile),
            Business: "FSC"
          }
        }).then((res)=>{
          return func(res)
        },(err)=>{
          // //for debug
          // return func()
          this.onError(err,this.chunk.rawFile);
        })
      })

      function func(res){
        if (!res) {
          res={
            IsExit: false,
            Path: "thisispaththisispath",
            ChunkSize:111,
            IsChunkFile:true,
            ChunkedList:[]
          }
        }
        if (!res||!res.Path) return;
        if (res.IsExit === false) {
          return {
            data: res,
            tasks: null
          } ;
        } else {
          //有未上传的分片
          if (res.IsChunkFile) {
            var list = res.ChunkedList,//已上传的分片
              k = [],
              t = [];
            for (var i = 0; i < list.length; i++) {
              k.push(list[i].Index);//分片的index值是从0开始记录的，在doSlice里
            }
            //todo, 循环之前从1开始的
            for (var i = 0; i < opts.chunkCount; i++) {
              if (k.indexOf(i) === -1) {
                t.push(i);
              }
            }
            return {
              data: {
                Path: res.Path
              },
              tasks: t//未上传的分片
            };
          }else{//所有分片上传完成，已合成文件
            return {
              data: {
                Path: res.Path
              },
              chunkSize: res.ChunkSize,
              tasks: "done"
            };
          }
        }
        
      }
    },
    /**
     * 整合文件分片信息
     * @param  {[type]} task   [文件每个分片信的息数组]
     * @param  {[type]} tasks  [文件未上传的分片索引]
     * @return {[type]}        [description]
     */
    doWork:function(task,tasks) {
      // console.log('doWork:',task,tasks);
      if (tasks) {
        if (tasks !== "done" && tasks.length > 0) {//文件还有未上传的分片
          let q = [];
          for (let i = 0; i < tasks.length; i++) {
            q.push(task[tasks[i]]);
          }
          task = q;
        } else {
          task = [];
          this.onProgress({
            total: task.length,
            done:task.length,
            percent: 100
          }, this.chunk.rawFile);

          this.chunkUploadEnd({
            data: this.chunk.data,
            result: {
              fail: 0,
              success: task.length,
              task: 0,
              total: task.length
            }
          });
        }
      }

      if (task.length===0) return;

      let doTaskDoneCallback = ()=>{
        if (opts.current === task.length) {//一组分片上传完成
          this.chunkUploadEnd({
            data: this.chunk.data,
            result: {
              total:task.length,//总的分片个数
              task:task.length,//上传的分片个数
              success:task.length - opts.fail,
              fail:opts.fail
            }
          });
        }
      }

      let opts={
        current:0,//当前上传个数，不论失败成功
        fail:0,//上传分片失败个数
        taskCount:task.length
      }
      for (let i = 0; i < task.length; i++) {
        this.doTask(opts,task[i],doTaskDoneCallback);
      }
    },
    /**
     * 上传文件的分片
     * @param  {[type]} opts [description]
     * @param  {[type]} info [待上传分片]
     */
    doTask:function(opts,info,doTaskDoneCallback) {
      // console.log('doTask:',opts,info,this.chunk.data);

      let t = info.info;
      let headers = deepMerge({
          from: t[0],
          to: t[1],
          ChunkIndex: info.index + 1
        },this.chunk.data,this.headers);

      let blob = this.chunk.rawFile;
      let slice = blob.slice || blob.webkitSlice || blob.mozSlice;
      let chunkData = slice.apply(blob, t);

      let req = this.httpRequest({
        headers: headers,
        withCredentials: this.withCredentials,
        data: chunkData,
        type:'post',
        url: this.chunk.uploadurl
      })
      this.reqs[blob.uid] = req.xhr;
      req.then((res)=>{
        let data = res.data||{};
        if (data.IsSuccess) {//一个分片上传成功
          info.success = true;
          opts.current++;
          
          let a = opts.taskCount.length - info.length + opts.current;
          this.onProgress({
            total: opts.taskCount.length,
            done: a,
            percent: Math.round((a / opts.taskCount.length) * 100)
          })

          doTaskDoneCallback();
        } else{
          info.success = false;
          if (info.retryTime < this.chunk.tryTime) {
            info.retryTime++;
            this.doTask(opts,info,doTaskDoneCallback);
          } else {
            opts.fail++;
            opts.current++;
            doTaskDoneCallback();
          }
        }
      },(err)=>{
        info.success = false;
        if (info.retryTime < this.chunk.tryTime) {
          info.retryTime++;
          this.doTask(opts,info,doTaskDoneCallback);
        } else {
          opts.fail++;
          opts.current++;
          doTaskDoneCallback();
        }
      });
    },
    //文件全部分片上传结束，可能有的失败，有的成功。
    chunkUploadEnd:function(res){
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
      
      let result = res.result;
      if (result.task === 0) {//没有上传任务
        this.onSuccess(res,this.chunk.rawFile);
      }else if (result.fail > 0) {//有上传失败的任务
        this.onError(res,this.chunk.rawFile);
      }else{
        this.httpRequest({
          url: this.chunk.doneurl,//上传完成后处理接口
          data: {
            Business: "FSC",
            ...res.data
          },
          type: "POST"
        }).then((res2)=>{
          // console.log('chunkUploadEnd,',res2);
          let t = deepMerge(res, res2);
          if (res2.IsSuccess) {
            this.onSuccess(t,this.chunk.rawFile);
          }else{
            this.onError(t,this.chunk.rawFile);
          }
        },(err2)=>{
          this.onError(res,this.chunk.rawFile);
        })
      }
    }
  },
  created(){
  },

  render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled,
      handleKeydown
    } = this;
    const data = {
      class: {
        "el-upload": true
      },
      on: {
        click: handleClick,
        keydown: handleKeydown
      }
    };
    data.class[`el-upload--${listType}`] = true;
    return (
      <div {...data} tabindex="0">
        {drag ? (
          <upload-dragger disabled={disabled} on-file={uploadFiles}>
            {this.$slots.default}
          </upload-dragger>
        ) : (
          this.$slots.default
        )}
        <input
          class="el-upload__input"
          type="file"
          ref="input"
          name={name}
          on-change={handleChange}
          multiple={multiple}
          accept={accept}
        />
      </div>
    );
  }
};
</script>
