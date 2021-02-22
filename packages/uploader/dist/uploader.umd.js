!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uploader",[],e):"object"==typeof exports?exports.uploader=e():t.uploader=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{default:()=>O,uploadFiles:()=>A});var r={};function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return null!==t&&"object"===n(t)}function i(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)}function a(t){return"[object Object]"===Object.prototype.toString.call(t)}function s(t){for(var e={},r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return n.forEach((function(r){r in t&&(e[r]=t[r])})),e}t.r(r),t.d(r,{isArray:()=>i,isObject:()=>o,isPlainObject:()=>a,pick:()=>s});var u={postData:function(t){if(t){if(t instanceof FormData||t instanceof Blob||t instanceof ArrayBuffer)return t;if(o(t)){var e=!1;for(var r in t)if(t[r]instanceof Blob||t[r]instanceof ArrayBuffer||t[r]instanceof File){e=!0;break}if(e){var n=new FormData;for(var r in t)t[r]instanceof Blob||t[r]instanceof File?n.append(r,t[r]):i(t[r])||o(t[r])?n.append(r,window.encodeURIComponent(json.stringify(t[r]))):t[r]instanceof FormData||n.append(r,window.encodeURIComponent(t[r].toString()));return n}return u.queryString(t)}return i(t)?window.encodeURIComponent(json.stringify({key:t})):t}return null},queryString:function(t){var e="";if(t){for(var r in t){var n=t[r];"string"==typeof n&&n.constructor===String?e+=r+"="+window.encodeURIComponent(n)+"&":o(n)||i(n)?e+=r+"="+window.encodeURIComponent(JSON.stringify(n))+"&":n instanceof FormData||n instanceof Blob||n instanceof File||n instanceof ArrayBuffer||(e+=r+"="+(null!=n?window.encodeURIComponent(n.toString()):"")+"&")}return e.length>0?e.substring(0,e.length-1):""}return""},getURLInfo:function(t){var e,r,n=t.indexOf("?"),o=t.indexOf("#"),i="",a="",s=null,u=null,f=t;-1!==n&&-1!==o?(f=t.substring(0,n),n>o?(a=t.substring(o+1,n),i=t.substring(n+1)):(i=t.substring(n+1,o),a=t.substring(o+1))):-1!==n?(i=t.substring(n+1),f=t.substring(0,n)):-1!==o&&(a=t.substring(o+1),f=t.substring(0,o));var h=t.match(/:[0-9]+/g),l=t.match(/[a-z]+:\/\//);e=h?h[h.length-1].substring(1):null,(r=l?l[0].substring(0,l[0].length-3):null)&&(f=f.substring(r.length+3)),e&&(f=f.substring(0,f.length-e.length-1));var c=f.substring(0,f.indexOf("/"));if(f=""===c?f:c,""!==i){s={};for(var p=i.split("&"),d=0;d<p.length;d++)s[(g=p[d].split("="))[0]]=g[1]}if(""!==a){u={},d=0;for(var y=(p=a.split("&")).length;d<y;d++){var g;u[(g=p[d].split("="))[0]]=g[1]}}return{query:s,hash:u,host:f,port:e,protocol:r}},queryObject:function(t){return u.getURLInfo(t).query},hashObject:function(t){return u.getURLInfo(t).hash}};const f=u;function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const c=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){l(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({ajax:function(t){var e,r=new Promise((function(r,n){try{e=function(t,e,r){var n;if(window.XMLHttpRequest?n=new XMLHttpRequest:window.ActiveXObject&&(n=new ActiveXObject("Microsoft.XMLHTTP")),n&&t.url){var o,i=Object.assign({url:"",data:{},query:{},type:"get",dataType:"json"},t);if((t.file instanceof Blob||t.file instanceof File)&&(i.file=t.file,i.data=i.data||{},i.data[t.filename]=t.file),(t.data instanceof Blob||t.data instanceof File)&&(i.data=t.data,o=t.data),i.mime&&n.overrideMimeType(i.mime),n.upload&&i.onProgress&&(n.upload.onprogress=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),i.onProgress(t)}),"get"===i.type){var a=f.queryString(Object.assign({},i.data,i.query));i.url+=-1!==i.url.indexOf("?")?""===a?"":"&"+a:""===a?"":"? "+a}else{var s=f.queryString(i.query);i.url+=-1!==i.url.indexOf("?")?""===s?"":"&"+s:""===s?"":"? "+s,o=f.postData(i.data)}n.onerror=function(t){r(t)},n.onabort=function(){console.log("onabort")},n.onload=n.onreadystatechange=function(){if(4===n.readyState)if(200===n.status){var t=function(t){var e=t.responseText||t.response;if(!e)return e;try{return JSON.parse(e)}catch(t){return e}}(n);e(t)}else if(n.status<200||n.status>=300){var o=function(t,e,r){var n;n=r.response?"".concat(r.response.error||r.response):r.responseText?"".concat(r.responseText):"fail to post ".concat(t," ").concat(r.status);var o=new Error(n);return o.status=r.status,o.method="post",o.url=t,o}(i.url,0,n);r(o)}},n.open(i.type,i.url,!0);var u=i.headers;for(var h in u)u.hasOwnProperty(h)&&null!==u[h]&&n.setRequestHeader(h,u[h]);return n.setRequestHeader("X-Requested-With","XMLHttpRequest"),"string"==typeof o&&o.constructor===String&&/(^|&).*=([^&]*)(&|$)/.test(o)&&n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.withCredentials&&"withCredentials"in n&&(n.withCredentials=!0),n.send(o),n}}(t,r,n)}catch(t){console.log(t)}e||n()}));return r.xhr=e,r},File:{getFileSize:function(t,e){var r=t.size;switch(e){case"KB":r/=1024;break;case"MB":r/=1048576;break;case"GB":r/=1073741824}return r},getFileSuffix:function(t){return t?t.name.substr(t.name.lastIndexOf(".")+1).toLowerCase():""},getFileHash:function(t){return new Promise((function(e,r){var n=new window.Worker(window.URL.createObjectURL(new Blob(['!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define("base-assets/js/spark-hash",[],t);else{var r;try{r=window}catch(e){r=self}r.SparkMD5=t()}}(function(t){function r(t,r,e,n,f,i){return r=A(A(r,t),A(n,i)),A(r<<f|r>>>32-f,e)}function e(t,e,n,f,i,o,a){return r(e&n|~e&f,t,e,i,o,a)}function n(t,e,n,f,i,o,a){return r(e&f|n&~f,t,e,i,o,a)}function f(t,e,n,f,i,o,a){return r(e^n^f,t,e,i,o,a)}function i(t,e,n,f,i,o,a){return r(n^(e|~f),t,e,i,o,a)}function o(t,r){var o=t[0],a=t[1],s=t[2],u=t[3];o=e(o,a,s,u,r[0],7,-680876936),u=e(u,o,a,s,r[1],12,-389564586),s=e(s,u,o,a,r[2],17,606105819),a=e(a,s,u,o,r[3],22,-1044525330),o=e(o,a,s,u,r[4],7,-176418897),u=e(u,o,a,s,r[5],12,1200080426),s=e(s,u,o,a,r[6],17,-1473231341),a=e(a,s,u,o,r[7],22,-45705983),o=e(o,a,s,u,r[8],7,1770035416),u=e(u,o,a,s,r[9],12,-1958414417),s=e(s,u,o,a,r[10],17,-42063),a=e(a,s,u,o,r[11],22,-1990404162),o=e(o,a,s,u,r[12],7,1804603682),u=e(u,o,a,s,r[13],12,-40341101),s=e(s,u,o,a,r[14],17,-1502002290),a=e(a,s,u,o,r[15],22,1236535329),o=n(o,a,s,u,r[1],5,-165796510),u=n(u,o,a,s,r[6],9,-1069501632),s=n(s,u,o,a,r[11],14,643717713),a=n(a,s,u,o,r[0],20,-373897302),o=n(o,a,s,u,r[5],5,-701558691),u=n(u,o,a,s,r[10],9,38016083),s=n(s,u,o,a,r[15],14,-660478335),a=n(a,s,u,o,r[4],20,-405537848),o=n(o,a,s,u,r[9],5,568446438),u=n(u,o,a,s,r[14],9,-1019803690),s=n(s,u,o,a,r[3],14,-187363961),a=n(a,s,u,o,r[8],20,1163531501),o=n(o,a,s,u,r[13],5,-1444681467),u=n(u,o,a,s,r[2],9,-51403784),s=n(s,u,o,a,r[7],14,1735328473),a=n(a,s,u,o,r[12],20,-1926607734),o=f(o,a,s,u,r[5],4,-378558),u=f(u,o,a,s,r[8],11,-2022574463),s=f(s,u,o,a,r[11],16,1839030562),a=f(a,s,u,o,r[14],23,-35309556),o=f(o,a,s,u,r[1],4,-1530992060),u=f(u,o,a,s,r[4],11,1272893353),s=f(s,u,o,a,r[7],16,-155497632),a=f(a,s,u,o,r[10],23,-1094730640),o=f(o,a,s,u,r[13],4,681279174),u=f(u,o,a,s,r[0],11,-358537222),s=f(s,u,o,a,r[3],16,-722521979),a=f(a,s,u,o,r[6],23,76029189),o=f(o,a,s,u,r[9],4,-640364487),u=f(u,o,a,s,r[12],11,-421815835),s=f(s,u,o,a,r[15],16,530742520),a=f(a,s,u,o,r[2],23,-995338651),o=i(o,a,s,u,r[0],6,-198630844),u=i(u,o,a,s,r[7],10,1126891415),s=i(s,u,o,a,r[14],15,-1416354905),a=i(a,s,u,o,r[5],21,-57434055),o=i(o,a,s,u,r[12],6,1700485571),u=i(u,o,a,s,r[3],10,-1894986606),s=i(s,u,o,a,r[10],15,-1051523),a=i(a,s,u,o,r[1],21,-2054922799),o=i(o,a,s,u,r[8],6,1873313359),u=i(u,o,a,s,r[15],10,-30611744),s=i(s,u,o,a,r[6],15,-1560198380),a=i(a,s,u,o,r[13],21,1309151649),o=i(o,a,s,u,r[4],6,-145523070),u=i(u,o,a,s,r[11],10,-1120210379),s=i(s,u,o,a,r[2],15,718787259),a=i(a,s,u,o,r[9],21,-343485551),t[0]=A(o,t[0]),t[1]=A(a,t[1]),t[2]=A(s,t[2]),t[3]=A(u,t[3])}function a(t){var r,e=[];for(r=0;64>r;r+=4)e[r>>2]=t.charCodeAt(r)+(t.charCodeAt(r+1)<<8)+(t.charCodeAt(r+2)<<16)+(t.charCodeAt(r+3)<<24);return e}function s(t){var r,e=[];for(r=0;64>r;r+=4)e[r>>2]=t[r]+(t[r+1]<<8)+(t[r+2]<<16)+(t[r+3]<<24);return e}function u(t){var r,e,n,f,i,s,u=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(r=64;u>=r;r+=64)o(h,a(t.substring(r-64,r)));for(t=t.substring(r-64),e=t.length,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;e>r;r+=1)n[r>>2]|=t.charCodeAt(r)<<(r%4<<3);if(n[r>>2]|=128<<(r%4<<3),r>55)for(o(h,n),r=0;16>r;r+=1)n[r]=0;return f=8*u,f=f.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(f[2],16),s=parseInt(f[1],16)||0,n[14]=i,n[15]=s,o(h,n),h}function h(t){var r,e,n,f,i,a,u=t.length,h=[1732584193,-271733879,-1732584194,271733878];for(r=64;u>=r;r+=64)o(h,s(t.subarray(r-64,r)));for(t=u>r-64?t.subarray(r-64):new Uint8Array(0),e=t.length,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;e>r;r+=1)n[r>>2]|=t[r]<<(r%4<<3);if(n[r>>2]|=128<<(r%4<<3),r>55)for(o(h,n),r=0;16>r;r+=1)n[r]=0;return f=8*u,f=f.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(f[2],16),a=parseInt(f[1],16)||0,n[14]=i,n[15]=a,o(h,n),h}function p(t){var r,e="";for(r=0;4>r;r+=1)e+=v[t>>8*r+4&15]+v[t>>8*r&15];return e}function c(t){var r;for(r=0;r<t.length;r+=1)t[r]=p(t[r]);return t.join("")}function y(t){return/[-￿]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function l(t,r){var e,n=t.length,f=new ArrayBuffer(n),i=new Uint8Array(f);for(e=0;n>e;e+=1)i[e]=t.charCodeAt(e);return r?i:f}function g(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function b(t,r,e){var n=new Uint8Array(t.byteLength+r.byteLength);return n.set(new Uint8Array(t)),n.set(new Uint8Array(r),t.byteLength),e?n:n.buffer}function d(t){var r,e=[],n=t.length;for(r=0;n-1>r;r+=2)e.push(parseInt(t.substr(r,2),16));return String.fromCharCode.apply(String,e)}function _(){this.reset()}var A=function(t,r){return t+r&4294967295},v=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==c(u("hello"))&&(A=function(t,r){var e=(65535&t)+(65535&r),n=(t>>16)+(r>>16)+(e>>16);return n<<16|65535&e}),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function r(t,r){return t=0|t||0,0>t?Math.max(t+r,0):Math.min(t,r)}ArrayBuffer.prototype.slice=function(e,n){var f,i,o,a,s=this.byteLength,u=r(e,s),h=s;return n!==t&&(h=r(n,s)),u>h?new ArrayBuffer(0):(f=h-u,i=new ArrayBuffer(f),o=new Uint8Array(i),a=new Uint8Array(this,u,f),o.set(a),i)}}(),_.prototype.append=function(t){return this.appendBinary(y(t)),this},_.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var r,e=this._buff.length;for(r=64;e>=r;r+=64)o(this._hash,a(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},_.prototype.end=function(t){var r,e,n=this._buff,f=n.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;f>r;r+=1)i[r>>2]|=n.charCodeAt(r)<<(r%4<<3);return this._finish(i,f),e=c(this._hash),t&&(e=d(e)),this.reset(),e},_.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},_.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},_.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},_.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},_.prototype._finish=function(t,r){var e,n,f,i=r;if(t[i>>2]|=128<<(i%4<<3),i>55)for(o(this._hash,t),i=0;16>i;i+=1)t[i]=0;e=8*this._length,e=e.toString(16).match(/(.*?)(.{0,8})$/),n=parseInt(e[2],16),f=parseInt(e[1],16)||0,t[14]=n,t[15]=f,o(this._hash,t)},_.hash=function(t,r){return _.hashBinary(y(t),r)},_.hashBinary=function(t,r){var e=u(t),n=c(e);return r?d(n):n},_.ArrayBuffer=function(){this.reset()},_.ArrayBuffer.prototype.append=function(t){var r,e=b(this._buff.buffer,t,!0),n=e.length;for(this._length+=t.byteLength,r=64;n>=r;r+=64)o(this._hash,s(e.subarray(r-64,r)));return this._buff=new Uint8Array(n>r-64?e.buffer.slice(r-64):0),this},_.ArrayBuffer.prototype.end=function(t){var r,e,n=this._buff,f=n.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(r=0;f>r;r+=1)i[r>>2]|=n[r]<<(r%4<<3);return this._finish(i,f),e=c(this._hash),t&&(e=d(e)),this.reset(),e},_.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},_.ArrayBuffer.prototype.getState=function(){var t=_.prototype.getState.call(this);return t.buff=g(t.buff),t},_.ArrayBuffer.prototype.setState=function(t){return t.buff=l(t.buff,!0),_.prototype.setState.call(this,t)},_.ArrayBuffer.prototype.destroy=_.prototype.destroy,_.ArrayBuffer.prototype._finish=_.prototype._finish,_.ArrayBuffer.hash=function(t,r){var e=h(new Uint8Array(t)),n=c(e);return r?d(n):n},_}),addEventListener("message",function(t){function r(){var t=a*f,r=t+i>=e.size?e.size:t+i;u.readAsArrayBuffer(n.call(e,t,r))}var e=t.data,n=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,f=524288,i=51200,o=Math.ceil(e.size/f),a=0,s=new SparkMD5.ArrayBuffer,u=new FileReader;u.onload=function(t){s.append(t.target.result),a++,o>a?r():postMessage(s.end())},u.onerror=function(){postMessage(null)},r()},!1);'],{type:"text/javascript"})));n.addEventListener("message",(function(t){e(t.data)})),n.addEventListener("error",(function(t){r(t)})),n.postMessage(t)}))}}},r);function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function g(t,e){if(t){if("string"==typeof t)return b(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(t,e):void 0}}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var m=c.ajax,w=c.File;function S(){}var _=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};v(this,t),Object.assign(this,{_uploadFiles:[],_events:{},_reqs:{},_tempIndex:1},{beforeRemove:null,headers:{},withCredentials:!1,httpRequest:m,multiple:!1,url:"/FSC/EM/File/UploadByForm",whenChunks:0},c.pick.apply(c,[r].concat(["multiple","url","whenChunks"]))),this.chunk={mime:"multipart/form-data",size:2097152,tryTime:3,startUrl:"/FSC/EM/File/ChunkFileUploadStart",uploadUrl:"/FSC/EM/File/ChunkFileUploadDataByStream",doneUrl:"/FSC/EM/File/ChunkFileUploadComplete"},r.chunk&&Object.assign(this.chunks,r.chunks),r.events&&Object.keys(r.events).forEach((function(t){e.on(t,c.isArray(r.events[t])?r.events[t]:[r.events[t]])}))}var e,r;return e=t,(r=[{key:"getFiles",value:function(){return this._uploadFiles}},{key:"getFile",value:function(t){var e;return this.getFiles().every((function(r){return!(e=t.uid===r.uid?r:null)})),e}},{key:"on",value:function(t,e){var r,n,o=this._events;o[t]||(o[t]=[]),c.isArray(e)?(r=o[t]).push.apply(r,function(t){if(Array.isArray(t))return b(t)}(n=e)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(n)||g(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()):o[t].push(e)}},{key:"trigger",value:function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];var o=this._events[t]||[];o.forEach((function(t){t.apply(void 0,r)}))}},{key:"upload",value:function(t){var e=this,r=Array.prototype.slice.call(t);this.multiple||(r=r.slice(0,1)),0!==r.length&&r.forEach((function(t){e.handleStart(t),e.uploadFile(t)}))}},{key:"uploadFile",value:function(t){0===this.whenChunks||w.getFileSize(t)<this.whenChunks?this.uploadEasy(t):this.uploadChunk(t)}},{key:"handleStart",value:function(t){t.uid=Date.now()+this._tempIndex++;var e={status:"ready",name:t.name,size:t.size,percentage:0,uid:t.uid,raw:t};this._uploadFiles.push(e),this.trigger("change",this._uploadFiles)}},{key:"handleProgress",value:function(t,e){var r=this.getFile(e);this.trigger("progress",t,r,this._uploadFiles),r.status="uploading",r.percentage=t.percent||0}},{key:"handleSuccess",value:function(t,e){var r=this.getFile(e);r&&(r.status="success",r.response=t,this.trigger("success",t,r,this._uploadFiles),this.trigger("change",r,this._uploadFiles))}},{key:"handleError",value:function(t,e){var r=this.getFile(e);r.status="fail",this.trigger("error",t,r,this._uploadFiles),this.trigger("change",r,this._uploadFiles)}},{key:"handleRemove",value:function(t,e){var r=this;e&&(t=this.getFile(e));var n=function(){r.abort(t);var e=r._uploadFiles;e.splice(e.indexOf(t),1),r.trigger("remove",t,e)};if(this.beforeRemove){if("function"==typeof this.beforeRemove){var o=this.beforeRemove(t,this._uploadFiles);o&&o.then?o.then((function(){n()}),S):!1!==o&&n()}}else n()}},{key:"abort",value:function(t){var e=this._reqs;if(t){var r=t;t.uid&&(r=t.uid),e[r]&&e[r].abort()}else Object.keys(e).forEach((function(t){e[t]&&e[t].abort(),delete e[t]}))}},{key:"uploadEasy",value:function(t){var e=this,r=t.uid,n={headers:this.headers,withCredentials:this.withCredentials,file:t,data:this.data,type:"post",filename:this.name,url:this.url,onProgress:function(r){e.handleProgress(r,t)},onSuccess:function(n){e.handleSuccess(n,t),delete e._reqs[r]},onError:function(n){e.handleError(n,t),delete e._reqs[r]}},o=this.httpRequest(n);this._reqs[r]=o.xhr,o.then(n.onSuccess,n.onError)}},{key:"uploadChunk",value:function(t){var e=this;d({},this.chunk).rawFile=t,this.chunk.rawFile=t;var r,n,o=this.chunk.size,i=(r=this.doSlice(o),n=3,function(t){if(Array.isArray(t))return t}(r)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}}(r,n)||g(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],s=i[1],u=i[2];this.chunkUploadBefore({chunkCount:s.length,chunkSize:o,lastChunkSize:u,array:a}).then((function(t){t&&(e.chunk.data=d({},t.data),t.chunkSize&&t.chunkSize!==o&&(s=e.doSlice(t.chunkSize)[1]),e.doWork(s,t.tasks))}))}},{key:"doSlice",value:function(t){var e=this.chunk.mime,r=0,n=!1,o=w.getFileSize(this.chunk.rawFile),i=Math.floor(o/t),a=t,s=[],u=[];o%t!=0&&(n=!0);for(var f=0;f<i;f++)s.push([r,r+t,e]),r+=t;n&&(s.push([r,o,e]),a=o-r);for(var h=0;h<s.length;h++)u.push({info:s[h],index:h,success:!1,retryTime:0});return[s,u,a]}},{key:"chunkUploadBefore",value:function(t){var e=this,r=this.chunk.rawFile;return w.getFileHash(r).then((function(n){return e.httpRequest({url:e.chunk.startUrl,type:"post",data:{ChunkCount:t.chunkCount,ChunkSize:t.chunkSize,LastChunkSize:t.lastChunkSize,HashRule:"524288_51200",Code:n,Extension:w.getFileSuffix(r),Business:"FSC"}}).then((function(e){return function(e){if(e||(e={IsExit:!1,Path:"thisispaththisispath",ChunkSize:111,IsChunkFile:!0,ChunkedList:[]}),e&&e.Path){if(!1===e.IsExit)return{data:e,tasks:null};if(e.IsChunkFile){for(var r=e.ChunkedList||[],n=[],o=[],i=0;i<r.length;i++)n.push(r[i].Index-1);for(var a=0;a<t.chunkCount;a++)-1===n.indexOf(a)&&o.push(a);return{data:{Path:e.Path},tasks:o}}return{data:{Path:e.Path},chunkSize:e.ChunkSize,tasks:"done"}}}(e)}),(function(t){e.handleError(t,e.chunk.rawFile)}))}))}},{key:"doWork",value:function(t,e){var r=this;if(e)if("done"!==e&&e.length>0){for(var n=[],o=0;o<e.length;o++)n.push(t[e[o]]);t=n}else t=[],this.handleProgress({total:t.length,done:t.length,percent:100},this.chunk.rawFile),this.chunkUploadEnd({data:this.chunk.data,result:{fail:0,success:t.length,task:0,total:t.length}});if(0!==t.length)for(var i={current:0,fail:0,taskCount:t.length},a=function(){i.current===t.length&&r.chunkUploadEnd({data:r.chunk.data,result:{total:t.length,task:t.length,success:t.length-i.fail,fail:i.fail}})},s=0;s<t.length;s++)this.doTask(i,t[s],a)}},{key:"doTask",value:function(t,e,r){var n=this,o=e.info,i=d(d({from:o[0],to:o[1],ChunkIndex:e.index+1},this.chunk.data),this.headers),a=this.chunk.rawFile,s=(a.slice||a.webkitSlice||a.mozSlice).apply(a,o),u=this.httpRequest({headers:i,withCredentials:this.withCredentials,data:s,type:"post",url:this.chunk.uploadUrl});this._reqs[a.uid]=u.xhr,u.then((function(o){if((o||{}).IsSuccess){e.success=!0,t.current++;var i=t.taskCount.length-e.length+t.current;n.handleProgress({total:t.taskCount.length,done:i,percent:Math.round(i/t.taskCount.length*100)},a),r()}else e.success=!1,e.retryTime<n.chunk.tryTime?(e.retryTime++,n.doTask(t,e,r)):(t.fail++,t.current++,r())}),(function(o){e.success=!1,e.retryTime<n.chunk.tryTime?(e.retryTime++,n.doTask(t,e,r)):(t.fail++,t.current++,r())}))}},{key:"chunkUploadEnd",value:function(t){var e=this,r=t.result;0===r.task?this.handleSuccess(t,this.chunk.rawFile):r.fail>0?this.handleError(t,this.chunk.rawFile):this.httpRequest({url:this.chunk.doneUrl,data:d({Business:"FSC"},t.data),type:"POST"}).then((function(r){var n=Object.assign(t,r);r.IsSuccess?e.handleSuccess(n,e.chunk.rawFile):e.handleError(n,e.chunk.rawFile)}),(function(r){e.handleError(t,e.chunk.rawFile)}))}}])&&k(e.prototype,r),t}();const O=_;var A=function(t,e){new _(e).upload(t)};return e})()}));