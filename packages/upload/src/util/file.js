// import request from './request';
// import pool from './ajaxpool';
import md5 from './md5';
// import {
//   deepMerge
// } from '@/utils';

let uriworker = 'addEventListener("message",function(c){var a=c.data;var b=new FileReader();b.onload=function(d){postMessage(d.target.result)};b.readAsDataURL(a)},false);';

let File = {};
File.saveAs = function(file, filename) {
  let type = file.type;
  let force_saveable_type = 'application/octet-stream';
  if (type && type !== force_saveable_type) {
    let slice = file.slice || file.webkitSlice || file.mozSlice;
    file = slice.call(file, 0, file.size, force_saveable_type);
  }
  let url = URL.createObjectURL(file);
  let event = document.createEvent('MouseEvent');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  let t = document.createElement('a');
  t.href = url;
  t.download = filename;
  t.dispatchEvent(event);
};

File.getFileName = function(file) {
  return file ? file.name : '';
};
File.getFileSize = function(file, type) {
  let a = file.size; // B
  if (type === 'KB') {
    a /= 1024;
  } else if (type === 'MB') {
    a /= 1048576; // 1024*1024
  } else if (type === 'GB') {
    a /= 1073741824; // 1024*1024*1024
  }

  return a;
};
File.getFileSizeAuto = function(file, radmon) {
  let v = 0;
  let unit = 'BYTE';
  let byteSize = file.size;
  radmon = radmon || 0;
  if (byteSize >= 1073741824) {
    v = (byteSize / 1073741824).toFixed(radmon);
    unit = 'GB';
  } else if (byteSize >= 1048576) {
    v = (byteSize / 1048576).toFixed(radmon);
    unit = 'MB';
  } else if (byteSize >= 1024) {
    v = (byteSize / 1024).toFixed(radmon);
    unit = 'KB';
  } else {
    v = byteSize;
    unit = 'B';
  }
  return v + unit;
};
File.getFileType = function(file) {
  return file ? file.type : '';
};
File.getFileSuffix = function(file) {
  return file ? file.name.substr(file.name.lastIndexOf('.') + 1) : '';
};
File.getFileURIByWorker = function(file) {
  let ps;
  let worker = new Worker(window.URL.createObjectURL(new Blob([uriworker], {
    type: 'text/javascript'
  })));
  worker.addEventListener('message', function(e) {
    ps = Promise.resolve(e.data);
  });
  worker.postMessage(file);
  return ps;
};
File.getFileHash = function(file) {
  let ps = new Promise(function(resolve, reject) {
    let worker = new Worker(window.URL.createObjectURL(new Blob([md5], {
      type: 'text/javascript'
    })));
    worker.addEventListener('message', function(e) {
      resolve(e.data);
    });
    worker.addEventListener('error', function(e) {
      reject(e);
    });
    worker.postMessage(file);
  });
  return ps;
};

export default File;