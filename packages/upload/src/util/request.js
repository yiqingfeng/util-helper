import serialize from '@/utils/serialize';
import {
  deepMerge,isFunction
} from '@/utils';
var request = function(option) {
  this.mimeType = null;
  this.data = option.data || "";
  this.url = option.url || "";
  this.realURL = option.url || "";
  this.type = option.type || "post";
  this.realType = option.dataType || "text";
  this.dataType = ["arraybuffer", "blob", "document", "text"].indexOf(option.dataType) !== -1 ? option.dataType : "text";
  this.async = option.async === false ? false : true;
  this.timeout = option.timeout || 3000000;
  this.headers = option.headers || {};
  this.events = deepMerge({
    readystatechange: null,
    loadstart: null,
    progress: null,
    abort: null,
    error: null,
    load: null,
    timeout: null,
    loadend: null
  }, option.events);
  this.query = option.query || {};
  for (var i in this.query) {
    var et = this.query[i];
    if (isFunction(et)) {
      this.query[i] = et();
    }
  }
  var ths = this;
  this._eventproxy = function(e) {
    var deal = ths.events[e.type];
    ths.response = this;
    deal && deal.call(ths, e);
    if (e.type === "loadend") {
      ths.clean();
    }
  };
  this._uploadproxy = function(e) {
    var deal = ths.events[e.type];
    ths.response = this;
    deal && deal.call(ths, e);
  };
  this.xhr = new XMLHttpRequest();
};

request.prototype.clean = function() {
  for (var i in this.events) {
    if (i === "progress") {
      this.xhr.upload.removeEventListener(i, this._uploadproxy, false);
    } else {
      this.xhr.removeEventListener(i, this._eventproxy, false);
    }
  }
  for (var i in this) {
    this[i] = null;
  }
};
request.prototype.abort = function() {
  this.xhr.abort();
  return this;
};
request.prototype.header = function(params, val) {
  if (arguments.length === 1) {
    for (var i in params) {
      this.headers[i] = params[i];
    }
  } else {
    this.headers[params] = val;
  }
  return this;
};
request.prototype.bind = function(type, fn) {
  if (arguments.length === 1) {
    for (var i in type) {
      this.events[i] = type[i];
    }
  } else {
    this.events[type] = fn;
  }
  return this;
};
request.prototype.unbind = function(type, fn) {
  var m = this.events[type];
  for (var i in m) {
    if (m[i] === fn) {
      m[i] = null;
    }
  }
  return this;
};
request.prototype.fire = function() {
  this.query = this.query || {};

  if (this.mimeType) {
    this.xhr.overrideMimeType(this.mimeType);
  }
  if (this.type === "get") {
    var querystr = serialize.queryString(deepMerge({}, this.data, this.query));
    this.url += (this.url.indexOf("?") !== -1 ? (querystr === "" ? "" : "&" + querystr) : (querystr === "" ? "" : "?" + querystr));
  } else {
    var querystr = serialize.queryString(this.query);
    this.url += (this.url.indexOf("?") !== -1 ? (querystr === "" ? "" : "&" + querystr) : (querystr === "" ? "" : "?" + querystr));

    this.data = serialize.postData(this.data);
  }
  this.xhr.open(this.type, this.url, this.async);
  if (this.async) {
    this.xhr.responseType = this.dataType;
    this.xhr.timeout = this.timeout;
  }
  for (var i in this.events) {
    if (i === "progress") {
      if (this.isdownload) {
        this.xhr.addEventListener(i, this._uploadproxy, false);
      } else {
        this.xhr.upload.addEventListener(i, this._uploadproxy, false);
      }
    } else {
      this.xhr.addEventListener(i, this._eventproxy, false);
    }
  }
  this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  for (var i in this.headers) {
    this.xhr.setRequestHeader(i, this.headers[i]);
  }
  if (((typeof this.data === 'string') && this.data.constructor === String) && /(^|&).*=([^&]*)(&|$)/.test(this.data)) {
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  this.xhr.send(this.data);
  return this;
};

export default function(option) {
  return new request(option);
};