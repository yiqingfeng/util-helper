import serialize from '@/utils/serialize';
import {
  deepMerge,isFunction
} from '@/utils';

var request = function(pool, httprequest) {
  this.pool = pool;
  this.xhr = httprequest;
};

request.prototype.set = function(option) {
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
      request.clean.call(ths);
    }
  };
  this._uploadproxy = function(e) {
    var deal = ths.events[e.type];
    ths.response = this;
    deal && deal.call(ths, e);
  };
  return this;
};
request.clean = function() {
  for (var i in this.events) {
    if (i === "progress") {
      this.xhr.upload.removeEventListener(i, this._uploadproxy, false);
    } else {
      this.xhr.removeEventListener(i, this._eventproxy, false);
    }
  }
  var a = this.xhr,
    b = this.pool;
  for (var i in this) {
    this[i] = null;
  }
  ajaxpool.destroy.call(b, a);
};
request.prototype.abort = function() {
  this.xhr.abort();
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
var ajaxpool = function(option) {
  this._current = 0;
  this.option = deepMerge({}, {
    size: option
  });
  this._list = [];
  this._queue = [];
  this._isabort = false;
};
ajaxpool.destroy = function(obj) {
  var ps = this._queue.shift();
  if (ps && !this._isabort) {
    ps.resolve(new request(this, obj));
  }
};
ajaxpool.getReady = function() {
  for (var i = 0; i < this._list.length; i++) {
    if (this._list[i].readyState === 4) {
      return this._list[i];
    }
  }
  return null;
};
ajaxpool.prototype.get = function() {
  var ps;
  var req = ajaxpool.getReady.call(this);
  if (req) {
    ps = Promise.resolve(new request(this, req));
  } else {
    if (this._list.length < this.option.size) {
      var p = new XMLHttpRequest();
      this._list.push(p);
      ps = Promise.resolve(new request(this, p));
    } else {
      ps = Promise.resolve();
      this._queue.push(ps);
    }
  }
  return ps;
};
ajaxpool.prototype.queueSize = function() {
  return this._queue.length;
};
ajaxpool.prototype.ajaxSize = function() {
  return this._list.length;
};
ajaxpool.prototype.clean = function() {
  this._current = 0;
  this._list = [];
  this._queue = [];
};
ajaxpool.prototype.reset = function() {
    this._isabort = false;
    this._current = 0;
    this._list = [];
    this._queue = [];
  },
  ajaxpool.prototype.abort = function() {
    this._isabort = true;
    for (var i = 0; i < this._list.length; i++) {
      var aj = this._list[i];
      if (aj.readyState === 1 || aj.readyState === 2 || aj.readyState === 3) {
        aj.abort();
      }
    }
    this.clean();
  };

export default function(option) {
  return new ajaxpool(option);
};




