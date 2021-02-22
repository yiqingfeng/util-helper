var is = require("./is.js");
var request = require("./request.js");
var pool = require("./ajaxpool.js");
var md5 = '!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define("base-assets/js/spark-hash",[],t);else{var r;try{r=window}catch(e){r=self}r.SparkMD5=t()}}(function(t){function r(t,r,e,n,f,i){return r=A(A(r,t),A(n,i)),A(r<<f|r>>>32-f,e)}function e(t,e,n,f,i,o,a){return r(e&n|~e&f,t,e,i,o,a)}function n(t,e,n,f,i,o,a){return r(e&f|n&~f,t,e,i,o,a)}function f(t,e,n,f,i,o,a){return r(e^n^f,t,e,i,o,a)}function i(t,e,n,f,i,o,a){return r(n^(e|~f),t,e,i,o,a)}function o(t,r){var o=t[0],a=t[1],s=t[2],u=t[3];o=e(o,a,s,u,r[0],7,-680876936),u=e(u,o,a,s,r[1],12,-389564586),s=e(s,u,o,a,r[2],17,606105819),a=e(a,s,u,o,r[3],22,-1044525330),o=e(o,a,s,u,r[4],7,-176418897),u=e(u,o,a,s,r[5],12,1200080426),s=e(s,u,o,a,r[6],17,-1473231341),a=e(a,s,u,o,r[7],22,-45705983),o=e(o,a,s,u,r[8],7,1770035416),u=e(u,o,a,s,r[9],12,-1958414417),s=e(s,u,o,a,r[10],17,-42063),a=e(a,s,u,o,r[11],22,-1990404162),o=e(o,a,s,u,r[12],7,1804603682),u=e(u,o,a,s,r[13],12,-40341101),s=e(s,u,o,a,r[14],17,-1502002290),a=e(a,s,u,o,r[15],22,1236535329),o=n(o,a,s,u,r[1],5,-165796510),u=n(u,o,a,s,r[6],9,-1069501632),s=n(s,u,o,a,r[11],14,643717713),a=n(a,s,u,o,r[0],20,-373897302),o=n(o,a,s,u,r[5],5,-701558691),u=n(u,o,a,s,r[10],9,38016083),s=n(s,u,o,a,r[15],14,-660478335),a=n(a,s,u,o,r[4],20,-405537848),o=n(o,a,s,u,r[9],5,568446438),u=n(u,o,a,s,r[14],9,-1019803690),s=n(s,u,o,a,r[3],14,-187363961),a=n(a,s,u,o,r[8],20,1163531501),o=n(o,a,s,u,r[13],5,-1444681467),u=n(u,o,a,s,r[2],9,-51403784),s=n(s,u,o,a,r[7],14,1735328473),a=n(a,s,u,o,r[12],20,-1926607734),o=f(o,a,s,u,r[5],4,-378558),u=f(u,o,a,s,r[8],11,-2022574463),s=f(s,u,o,a,r[11],16,1839030562),a=f(a,s,u,o,r[14],23,-35309556),o=f(o,a,s,u,r[1],4,-1530992060),u=f(u,o,a,s,r[4],11,1272893353),s=f(s,u,o,a,r[7],16,-155497632),a=f(a,s,u,o,r[10],23,-1094730640),o=f(o,a,s,u,r[13],4,681279174),u=f(u,o,a,s,r[0],11,-358537222),s=f(s,u,o,a,r[3],16,-722521979),a=f(a,s,u,o,r[6],23,76029189),o=f(o,a,s,u,r[9],4,-640364487),u=f(u,o,a,s,r[12],11,-421815835),s=f(s,u,o,a,r[15],16,530742520),a=f(a,s,u,o,r[2],23,-995338651),o=i(o,a,s,u,r[0],6,-198630844),u=i(u,o,a,s,r[7],10,1126891415),s=i(s,u,o,a,r[14],15,-1416354905),a=i(a,s,u,o,r[5],21,-57434055),o=i(o,a,s,u,r[12],6,1700485571),u=i(u,o,a,s,r[3],10,-1894986606),s=i(s,u,o,a,r[10],15,-1051523),a=i(a,s,u,o,r[1],21,-2054922799),o=i(o,a,s,u,r[8],6,1873313359),u=i(u,o,a,s,r[15],10,-30611744),s=i(s,u,o,a,r[6],15,-1560198380),a=i(a,s,u,o,r[13],21,1309151649),o=i(o,a,s,u,r[4],6,-145523070),u=i(u,o,a,s,r[11],10,-1120210379),s=i(s,u,o,a,r[2],15,718787259),a=i(a,s,u,o,r[9],21,-343485551),t[0]=A(o,t[0]),t[1]=A(a,t[1]),t[2]=A(s,t[2]),t[3]=A(u,t[3])}function a(t){var r,e=[];for(r=0;64>r;r+=4)e[r>>2]=t.charCodeAt(r)+(t.charCodeAt(r+1)<<8)+(t.charCodeAt(r+2)<<16)+(t.charCodeAt(r+3)<<24);return e}function s(t){var r,e=[];for(r=0;64>r;r+=4)e[r>>2]=t[r]+(t[r+1]<<8)+(t[r+2]<<16)+(t[r+3]<<24);return e}function u(t){var r,e,n,f,i,s,u=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(r=64;u>=r;r+=64)o(h,a(t.substring(r-64,r)));for(t=t.substring(r-64),e=t.length,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;e>r;r+=1)n[r>>2]|=t.charCodeAt(r)<<(r%4<<3);if(n[r>>2]|=128<<(r%4<<3),r>55)for(o(h,n),r=0;16>r;r+=1)n[r]=0;return f=8*u,f=f.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(f[2],16),s=parseInt(f[1],16)||0,n[14]=i,n[15]=s,o(h,n),h}function h(t){var r,e,n,f,i,a,u=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(r=64;u>=r;r+=64)o(h,s(t.subarray(r-64,r)));for(t=u>r-64?t.subarray(r-64):new Uint8Array(0),e=t.length,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;e>r;r+=1)n[r>>2]|=t[r]<<(r%4<<3);if(n[r>>2]|=128<<(r%4<<3),r>55)for(o(h,n),r=0;16>r;r+=1)n[r]=0;return f=8*u,f=f.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(f[2],16),a=parseInt(f[1],16)||0,n[14]=i,n[15]=a,o(h,n),h}function p(t){var r,e="";for(r=0;4>r;r+=1)e+=v[t>>8*r+4&15]+v[t>>8*r&15];return e}function c(t){var r;for(r=0;r<t.length;r+=1)t[r]=p(t[r]);return t.join("")}function y(t){return/[\u0080-\uFFFF]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function l(t,r){var e,n=t.length,f=new ArrayBuffer(n),i=new Uint8Array(f);for(e=0;n>e;e+=1)i[e]=t.charCodeAt(e);return r?i:f}function g(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function b(t,r,e){var n=new Uint8Array(t.byteLength+r.byteLength);return n.set(new Uint8Array(t)),n.set(new Uint8Array(r),t.byteLength),e?n:n.buffer}function d(t){var r,e=[],n=t.length;for(r=0;n-1>r;r+=2)e.push(parseInt(t.substr(r,2),16));return String.fromCharCode.apply(String,e)}function _(){this.reset()}var A=function(t,r){return t+r&4294967295},v=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==c(u("hello"))&&(A=function(t,r){var e=(65535&t)+(65535&r),n=(t>>16)+(r>>16)+(e>>16);return n<<16|65535&e}),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function r(t,r){return t=0|t||0,0>t?Math.max(t+r,0):Math.min(t,r)}ArrayBuffer.prototype.slice=function(e,n){var f,i,o,a,s=this.byteLength,u=r(e,s),h=s;return n!==t&&(h=r(n,s)),u>h?new ArrayBuffer(0):(f=h-u,i=new ArrayBuffer(f),o=new Uint8Array(i),a=new Uint8Array(this,u,f),o.set(a),i)}}(),_.prototype.append=function(t){return this.appendBinary(y(t)),this},_.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var r,e=this._buff.length;for(r=64;e>=r;r+=64)o(this._hash,a(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},_.prototype.end=function(t){var r,e,n=this._buff,f=n.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;f>r;r+=1)i[r>>2]|=n.charCodeAt(r)<<(r%4<<3);return this._finish(i,f),e=c(this._hash),t&&(e=d(e)),this.reset(),e},_.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},_.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},_.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},_.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},_.prototype._finish=function(t,r){var e,n,f,i=r;if(t[i>>2]|=128<<(i%4<<3),i>55)for(o(this._hash,t),i=0;16>i;i+=1)t[i]=0;e=8*this._length,e=e.toString(16).match(/(.*?)(.{0,8})$/),n=parseInt(e[2],16),f=parseInt(e[1],16)||0,t[14]=n,t[15]=f,o(this._hash,t)},_.hash=function(t,r){return _.hashBinary(y(t),r)},_.hashBinary=function(t,r){var e=u(t),n=c(e);return r?d(n):n},_.ArrayBuffer=function(){this.reset()},_.ArrayBuffer.prototype.append=function(t){var r,e=b(this._buff.buffer,t,!0),n=e.length;for(this._length+=t.byteLength,r=64;n>=r;r+=64)o(this._hash,s(e.subarray(r-64,r)));return this._buff=new Uint8Array(n>r-64?e.buffer.slice(r-64):0),this},_.ArrayBuffer.prototype.end=function(t){var r,e,n=this._buff,f=n.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;f>r;r+=1)i[r>>2]|=n[r]<<(r%4<<3);return this._finish(i,f),e=c(this._hash),t&&(e=d(e)),this.reset(),e},_.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},_.ArrayBuffer.prototype.getState=function(){var t=_.prototype.getState.call(this);return t.buff=g(t.buff),t},_.ArrayBuffer.prototype.setState=function(t){return t.buff=l(t.buff,!0),_.prototype.setState.call(this,t)},_.ArrayBuffer.prototype.destroy=_.prototype.destroy,_.ArrayBuffer.prototype._finish=_.prototype._finish,_.ArrayBuffer.hash=function(t,r){var e=h(new Uint8Array(t)),n=c(e);return r?d(n):n},_}),addEventListener("message",function(t){function r(){var t=a*f,r=t+i>=e.size?e.size:t+i;u.readAsArrayBuffer(n.call(e,t,r))}var e=t.data,n=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,f=524288,i=51200,o=Math.ceil(e.size/f),a=0,s=new SparkMD5.ArrayBuffer,u=new FileReader;u.onload=function(t){s.append(t.target.result),a++,o>a?r():postMessage(s.end())},u.onerror=function(){postMessage(null)},r()},!1);';
var uriworker = 'addEventListener("message",function(c){var a=c.data;var b=new FileReader();b.onload=function(d){postMessage(d.target.result)};b.readAsDataURL(a)},false);';
var urlworker = 'addEventListener("message", function (h) {var b = h.data;postMessage(URL.createObjectURL(b));}, false);';

var promise = function () {
    return jQuery.Deferred();
};

var file = function (filex, type) {
    var _file = filex;
    this._uri = "";
    if (is.isString(filex)) {
        if (type) {
            _file = new Blob([filex], {
                type: type
            });
        } else {
            this._url = filex;
            _file = file.getBlobFromURI(filex);
        }
    } else if (is.isArray(filex)) {
        _file = new Blob(filex, {
            type: (type || "text/plain")
        });
    }
    this.file = _file;
};
file.getBlobFromURI = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {
            type: contentType
        });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var byteString = atob(parts[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: contentType
    });
};
file.saveAs = function (blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type !== force_saveable_type) {
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    var event = document.createEvent("MouseEvent");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var t = document.createElement("a");
    t.href = url;
    t.download = filename;
    t.dispatchEvent(event);
};
file.upload = function (option) {
    return request({
        url: option.url || null,
        data: option.file,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        headers: option.headers || {},
        query: option.query,
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            }
        }
    }).fire();
};
file.uploadAsForm = function (option) {
    var formdata = new FormData();
    formdata.append((option.name || "file"), option.file);
    for (var _p in option.data) {
        formdata.append(_p, option.data[_p]);
    }
    return request({
        url: option.url || null,
        data: formdata,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        query: option.query,
        headers: option.headers || {},
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            },
            abort: function () {
                if (option.abort) {
                    option.abort();
                }
            }
        }
    }).fire();
};

file.prototype.isSame = function (file) {
    var t = file;
    if (file.file) {
        t = file.getFile();
    }
    return this.file.lastModified === t.lastModified && this.file.size === t.size && this.file.type === t.type && this.file.name === t.name;
};
file.prototype.getFile = function () {
    return this.file;
};
file.prototype.getFileName = function () {
    return this.file ? this.file.name : "";
};
file.prototype.getFileSize = function (type, size) {
    var a = this.file.size;
    if (type === "MB") {
        a = this.file.size / (1024 * 1024);
    } else if (type === "KB") {
        a = this.file.size / 1024;
    } else if (type === "GB") {
        a = this.file.size / (1024 * 1024 * 1024);
    }
    if (arguments.length === 2) {
        a = a.toFixed(size) / 1;
    }
    return a;
};
file.prototype.getFileSizeAuto = function (radmon) {
    var v = 0,
        unit = "BYTE",
        byteSize = this.file.size;
    radmon = radmon || 0;
    if (byteSize >= 1073741824) {
        v = (byteSize / 1073741824).toFixed(radmon);
        unit = "GB";
    } else if (byteSize >= 1048576) {
        v = (byteSize / 1048576).toFixed(radmon);
        unit = "MB";
    } else if (byteSize >= 1024) {
        v = (byteSize / 1024).toFixed(radmon);
        unit = "KB";
    } else {
        v = byteSize;
        unit = "B";
    }
    return v + unit;
};
file.prototype.getFileType = function () {
    return this.file ? this.file.type : "";
};
file.prototype.getFileURI = function () {
    var ps = promise();
    if (this._uri) {
        ps.resolve(this._uri);
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            ps.resolve(e.target.result);
        };
        reader.readAsDataURL(this.file);
    }
    return ps;
};
file.prototype.getFileURL = function () {
    return window.URL.createObjectURL(this.file);
};
file.prototype.getFileURLByWorker = function () {
    var ps = promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([urlworker], {
        type: "text/javascript"
    })));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getFileURIByWorker = function () {
    var ps = promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([uriworker], {
        type: "text/javascript"
    })));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getFileHash = function () {
    var ps = promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([md5], {
        type: "text/javascript"
    })));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.addEventListener("error", function (e) {
        ps.reject(e);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getSuffix = function () {
    if (this.getFileName()) {
        var name = this.getFileName().split(".");
        if (name.length > 1) {
            return name[name.length - 1];
        } else {
            return "";
        }
    } else {
        return "";
    }
};
file.prototype.isSuffixWith = function (suffix) {
    return suffix === this.getSuffix();
};
file.prototype.isTypeOf = function (type) {
    var typet = this.getFileType();
    return typet === type;
};
file.prototype.createImageElement = function () {
    var ps = promise();
    if (this.file.type.indexOf("image") !== -1) {
        var image = document.createElement("img");
        var a = this.getFileURL();
        $(image).load(function () {
            ps.resolve({
                uri: a,
                element: image
            });
        });
        image.src = a;
    } else {
        ps.reject();
    }
    return ps;
};
file.prototype.compressImage = function (quality) {
    var ps = promise(),
        ths = this;
    this.createImageElement().done(function (a) {
        var cvs = document.createElement('canvas');
        cvs.width = a.width;
        cvs.height = a.height;
        cvs.getContext("2d").drawImage(a, 0, 0);
        ps.resolve(new file(cvs.toDataURL(ths.file.type, quality / 100)));
    }).fail(function () {
        ps.reject();
    });
    return ps;
};
file.prototype.createImageCanvas = function (width, height) {
    var ps = promise();
    if (this.file.type.indexOf("image") !== -1) {
        var a = this.getFileURL();
        var image = document.createElement("img");
        $(image).load(function () {
            try {
                var _width = image.width,
                    _height = image.height;
                var _w = 0,
                    _h = 0;
                if (_width > width) {
                    _w = width;
                    _h = _height / _width * width;
                    if (_h > height) {
                        _h = height;
                        _w = _width / _height * height;
                    }
                } else if (_height > height) {
                    _h = height;
                    _w = _width / _height * height;
                    if (_w > width) {
                        _w = width;
                        _h = _height / _width * width;
                    }
                } else {
                    _w = image.width;
                    _h = image.height;
                }
                var _x = (width - _w) / 2,
                    _y = (height - _h) / 2;
                var source = image;
                if (image.width > 8000 || image.height > 8000) {
                    var cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    var ctx = cvs.getContext("2d");
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.mozImageSmoothingQuality = "low";
                    ctx.webkitImageSmoothingQuality = "low";
                    ctx.msImageSmoothingQuality = "low";
                    ctx.imageSmoothingQuality = "low";
                    ctx.drawImage(image, 0, 0);
                    source = cvs;
                }
                var cvs2 = document.createElement('canvas');
                cvs2.width = width;
                cvs2.height = height;
                var ctx = cvs2.getContext("2d");
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.mozImageSmoothingQuality = "low";
                ctx.webkitImageSmoothingQuality = "low";
                ctx.msImageSmoothingQuality = "low";
                ctx.imageSmoothingQuality = "low";
                ctx.drawImage(source, 0, 0, image.width, image.height, _x, _y, _w, _h);
                ps.resolve({
                    uri: a,
                    element: cvs2
                });
            } catch (e) {
                console.log(e);
                ps.reject({
                    uri: a,
                    element: null
                });
            }
        }).error(function (a) {
            ps.reject({
                uri: a,
                element: null
            });
        });
        image.src = a;
    } else {
        ps.reject({
            uri: null,
            element: null
        });
    }
    return ps;
};
file.prototype.saveAs = function (filename) {
    file.saveAs(this.file, filename);
};
file.prototype.upload = function (option) {
    option.file = this.file;
    return file.upload(option);
};
file.prototype.uploadAsForm = function (option) {
    option.file = this.file;
    return file.uploadAsForm(option);
};
file.prototype.getChunk = function (from, size, mime) {
    console.log(arguments);
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var args = [from];
    if (arguments.length === 2) {
        if (is.isString(mime)) {
            args.push(size);
        } else {
            args.push(from + size);
        }
    } else if (arguments.length === 3) {
        args.push(from + size);
        args.push(mime);
    }
    return slice.apply(blob, args);
};
file.prototype.uploadChunk = function (option) {
    var from = option.from,
        size = option.size,
        mime = option.mime;
    var args = [];
    if (from !== undefined && from !== null) {
        args.push(from);
    }
    if (size !== undefined && size !== null) {
        args.push(size);
    }
    if (mime !== undefined && mime !== null) {
        args.push(mime);
    }
    option.file = this.getChunk.apply(this, args);
    return file.upload(option);
};
file.prototype.getChunks = function (from, size, mime) {
    var ths = this;
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var sizet = ths.getFileSize();
    var q = parseInt((sizet - from) / size);
    var r = [];
    for (var i = 0; i < q; i++) {
        var args = [from + i * size, from + (i + 1) * size, mime];
        r.push(slice.apply(blob, args));
    }
    r.push(slice.apply(blob, [from + q * size, sizet, mime]));
    return r;
};
file.prototype.uploadChunks = function (ops) {
    return this.uploadChunksByPool($.extend(ops, {
        poolsize: 1
    }));
};
file.prototype.uploadChunksByPool = function (ops) {
    var opst = {
        mime: "multipart/form-data",
        size: 2097152,
        from: 0,
        tryTime: 5,
        poolsize: 5,
        data: {}
    };
    var option = $.extend({}, opst, ops);
    var mime = option.mime,
        size = option.size,
        from = option.from;
    var blob = this.file,
        total = this.getFileSize(),
        wi = false,
        all = parseInt(total / size),
        last = size;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var chunks = [],
        task = [],
        current = 0;
    var ajaxpool = pool(option.poolsize);

    //根据分片大小重新分片
    var doSlice = function (chunkFileSize) {
        from = option.from;
        wi = false;
        all = parseInt(total / chunkFileSize);
        last = chunkFileSize;
        chunks = [];

        task = [];
        if (total % chunkFileSize !== 0) {
            wi = true;
        }
        for (var i = 0; i < all; i++) {
            chunks.push([from, (from + chunkFileSize), mime]);
            from = from + chunkFileSize;
        }
        if (wi) {
            chunks.push([from, total, mime]);
            last = total - from;
        }
        for (var i = 0; i < chunks.length; i++) {
            task.push({
                info: chunks[i],
                index: i,
                success: false,
                retryTime: 0
            });
        }
    };

    doSlice(size);

    var result = {
        fail: 0,
        success: 0,
        task: 0,
        total: 0
    };
    var doTask = function (info) {
        var n = info.info,
            index = info.index;
        ajaxpool.get().done(function (ajax) {
            var mt = $.extend({
                from: n[0],
                to: n[1],
                ChunkIndex: index + 1
            }, option.data);
            var formdata = new FormData();
            formdata.append((option.name || "file"), slice.apply(blob, n));
            for (var _p in mt) {
                formdata.append(_p, mt[_p]);
            }
            ajax.set({
                url: option.url,
                data: formdata,
                dataType: option.dataType || "json",
                headers: option.headers,
                timeout: option.timeout,
                events: {
                    load: function () {
                        info.success = true;
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        var tp = "next";
                        if (option.check) {
                            tp = option.check(a);
                        }
                        if (tp === "next" || tp === undefined) {
                            current++;
                            if (option.progress) {
                                option.progress({
                                    total: chunks.length,
                                    done: chunks.length - task.length + current,
                                    percent: Math.round(((chunks.length - task.length + current) / chunks.length) * 100)
                                });
                            }
                            if (current === task.length) {
                                result.total = chunks.length;
                                result.task = task.length;
                                result.success = task.length - result.fail;
                                option.done && option.done({
                                    data: option.data,
                                    result: result
                                });
                            }
                        } else if (tp === "retry") {
                            info.success = false;
                            if (info.tryTime <= option.tryTime) {
                                doTask(info);
                            } else {
                                result.fail++;
                                current++;
                                if (current === task.length) {
                                    result.total = chunks.length;
                                    result.task = task.length;
                                    result.success = task.length - result.fail;
                                    option.done && option.done({
                                        data: option.data,
                                        result: result
                                    });
                                }
                            }
                            info.tryTime++;
                        }
                    },
                    error: function () {
                        info.success = false;
                        if (info.tryTime <= option.tryTime) {
                            doTask(info);
                        } else {
                            option.error && option.error();
                        }
                        info.tryTime++;
                    }
                }
            }).fire();
        });
    };
    var doWork = function (tasks) {
        if (tasks) {
            var q = [];
            for (var i = 0; i < tasks.length; i++) {
                q.push(task[tasks[i]]);
            }
            task = q;
        }
        for (var i = 0; i < task.length; i++) {
            doTask(task[i]);
        }
    };
    if (option.before) {
        option.before({
            chunkCount: chunks.length,
            chunkSize: size,
            lastChunkSize: last,
            array: chunks
        }).done(function (data) {
            $.extend(option.data, data.data);
            if (data.chunkSize && data.chunkSize != size) {
                doSlice(data.chunkSize);
            }
            doWork(data.tasks);
        });
    }
    return ajaxpool;
};
file.prototype.uploadChunksWithHeader = function (ops) {
    return this.uploadChunksWithHeaderByPool($.extend(ops, {
        poolsize: 1
    }));
};
file.prototype.uploadChunksWithHeaderByPool = function (ops) {
    var opst = {
        mime: "multipart/form-data",
        size: 2097152,
        from: 0,
        tryTime: 5,
        poolsize: 5,
        data: {}
    };
    var option = $.extend({}, opst, ops);
    var mime = option.mime,
        size = option.size,
        from = option.from;
    var blob = this.file,
        total = this.getFileSize(),
        wi = false,
        all = parseInt(total / size),
        last = size;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var chunks = [],
        task = [],
        current = 0;
    var ajaxpool = pool(option.poolsize);

    //根据分片大小重新分片
    var doSlice = function (chunkFileSize) {
        from = option.from;
        wi = false;
        all = parseInt(total / chunkFileSize);
        last = chunkFileSize;
        chunks = [];
        task = [];
        if (total % chunkFileSize !== 0) {
            wi = true;
        }
        for (var i = 0; i < all; i++) {
            chunks.push([from, (from + chunkFileSize), mime]);
            from = from + chunkFileSize;
        }
        if (wi) {
            chunks.push([from, total, mime]);
            last = total - from;
        }
        for (var i = 0; i < chunks.length; i++) {
            task.push({
                info: chunks[i],
                index: i,
                success: false,
                retryTime: 0
            });
        }
    };

    doSlice(size);

    var result = {
        fail: 0,
        success: 0,
        task: 0,
        total: 0
    };
    var doTask = function (info) {
        var n = info.info,
            index = info.index;
        ajaxpool.get().done(function (ajax) {
            var mt = $.extend({
                from: n[0],
                to: n[1],
                ChunkIndex: index + 1
            }, option.data, option.headers);
            console.log('doTask,',mt);
            ajax.set({
                url: option.url,
                data: slice.apply(blob, n),
                dataType: option.dataType || "json",
                headers: mt,
                timeout: option.timeout,
                query: option.query,
                events: {
                    load: function () {
                        info.success = true;
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        var tp = "next";
                        if (option.check) {
                            tp = option.check(a);
                        }
                        if (tp === "next" || tp === undefined) {
                            current++;
                            if (option.progress) {
                                option.progress({
                                    total: chunks.length,
                                    done: chunks.length - task.length + current,
                                    percent: Math.round(((chunks.length - task.length + current) / chunks.length) * 100)
                                });
                            }
                            if (current === task.length) {
                                result.total = chunks.length;
                                result.task = task.length;
                                result.success = task.length - result.fail;
                                option.done && option.done({
                                    data: option.data,
                                    result: result
                                });
                            }
                        } else if (tp === "retry") {
                            info.success = false;
                            if (info.tryTime <= option.tryTime) {
                                doTask(info);
                            } else {
                                result.fail++;
                                current++;
                                if (current === task.length) {
                                    result.total = chunks.length;
                                    result.task = task.length;
                                    result.success = task.length - result.fail;
                                    option.done && option.done({
                                        data: option.data,
                                        result: result
                                    });
                                }
                            }
                            info.tryTime++;
                        }
                    },
                    error: function () {
                        info.success = false;
                        if (info.tryTime <= option.tryTime) {
                            doTask(info);
                        } else {
                            option.error && option.error();
                        }
                        info.tryTime++;
                    }
                }
            }).fire();
        });
    };
    var doWork = function (tasks) {
        if (tasks) {
            if (tasks !== "done") {
                if (tasks.length > 0) {
                    var q = [];
                    for (var i = 0; i < tasks.length; i++) {
                        q.push(task[tasks[i]]);
                    }
                    task = q;
                } else {
                    task = [];
                    if (option.progress) {
                        option.progress({
                            total: 0,
                            done: 0,
                            percent: 100
                        });
                    }
                    result.total = chunks.length;
                    result.task = 0;
                    result.success = 0;
                    option.done && option.done({
                        data: option.data,
                        result: result
                    });
                }
            } else {
                task = [];
                if (option.progress) {
                    option.progress({
                        total: 0,
                        done: 0,
                        percent: 100
                    });
                }
                result.total = chunks.length;
                result.task = 0;
                result.success = 0;
                option.done && option.done({
                    data: option.data,
                    result: result
                });
            }
        }
        for (var i = 0; i < task.length; i++) {
            doTask(task[i]);
        }
    };
    console.log('doWork,',task,option);
    doWork();
    // if (option.before) {
    //     option.before({
    //         chunkCount: chunks.length,
    //         chunkSize: size,
    //         lastChunkSize: last,
    //         array: chunks
    //     }).done(function (data) {
    //         $.extend(option.data, data.data);
    //         if (data.chunkSize && data.chunkSize != size) {
    //             doSlice(data.chunkSize);
    //         }
    //         doWork(data.tasks);
    //     });
    // }
    return ajaxpool;
};
$.sparkFile = function (filex, type) {
    return new file(filex, type);
};
module.exports = $.sparkFile;
