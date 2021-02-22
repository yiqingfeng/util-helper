import * as util from './util';

var serialize = {
    postData: function (obj) {
        if (obj) {
            if (
                obj instanceof FormData ||
                obj instanceof Blob ||
                obj instanceof ArrayBuffer
            ) {
                return obj;
            } else if (util.isObject(obj)) {
                var has = false;
                for (var i in obj) {
                    if (
                        obj[i] instanceof Blob ||
                        obj[i] instanceof ArrayBuffer ||
                        obj[i] instanceof File
                    ) {
                        has = true;
                        break;
                    }
                }
                if (has) {
                    var fd = new FormData();
                    for (var i in obj) {
                        if (obj[i] instanceof Blob) {
                            fd.append(i, obj[i]);
                        } else if (obj[i] instanceof File) {
                            fd.append(i, obj[i]);
                        } else if (
                            util.isArray(obj[i]) ||
                            util.isObject(obj[i])
                        ) {
                            fd.append(
                                i,
                                window.encodeURIComponent(
                                    json.stringify(obj[i])
                                )
                            );
                        } else if (obj[i] instanceof FormData) {
                        } else {
                            fd.append(
                                i,
                                window.encodeURIComponent(obj[i].toString())
                            );
                        }
                    }
                    return fd;
                } else {
                    return serialize.queryString(obj);
                }
            } else if (util.isArray(obj)) {
                return window.encodeURIComponent(
                    json.stringify({
                        key: obj,
                    })
                );
            } else {
                return obj;
            }
        } else {
            return null;
        }
    },
    queryString: function (obj) {
        var result = '';
        if (obj) {
            for (var i in obj) {
                var val = obj[i];
                if (typeof val === 'string' && val.constructor === String) {
                    result += i + '=' + window.encodeURIComponent(val) + '&';
                } else if (util.isObject(val) || util.isArray(val)) {
                    result +=
                        i +
                        '=' +
                        window.encodeURIComponent(JSON.stringify(val)) +
                        '&';
                } else if (
                    val instanceof FormData ||
                    val instanceof Blob ||
                    val instanceof File ||
                    val instanceof ArrayBuffer
                ) {
                } else {
                    result +=
                        i +
                        '=' +
                        (val !== undefined && val !== null
                            ? window.encodeURIComponent(val.toString())
                            : '') +
                        '&';
                }
            }
            return result.length > 0
                ? result.substring(0, result.length - 1)
                : '';
        } else {
            return '';
        }
    },
    getURLInfo: function (str) {
        var a = str.indexOf('?'),
            b = str.indexOf('#'),
            querystring = '',
            hashstring = '',
            qo = null,
            ho = null,
            host = str,
            port = null,
            protocol = null;
        if (a !== -1 && b !== -1) {
            host = str.substring(0, a);
            if (a > b) {
                hashstring = str.substring(b + 1, a);
                querystring = str.substring(a + 1);
            } else {
                querystring = str.substring(a + 1, b);
                hashstring = str.substring(b + 1);
            }
        } else if (a !== -1) {
            querystring = str.substring(a + 1);
            host = str.substring(0, a);
        } else if (b !== -1) {
            hashstring = str.substring(b + 1);
            host = str.substring(0, b);
        }
        var _port = str.match(/:[0-9]+/g),
            _protocol = str.match(/[a-z]+:\/\//);
        port = _port ? _port[_port.length - 1].substring(1) : null;
        protocol = _protocol
            ? _protocol[0].substring(0, _protocol[0].length - 3)
            : null;
        if (protocol) {
            host = host.substring(protocol.length + 3);
        }
        if (port) {
            host = host.substring(0, host.length - port.length - 1);
        }
        var _host = host.substring(0, host.indexOf('/'));
        host = _host === '' ? host : _host;
        if (querystring !== '') {
            qo = {};
            var c = querystring.split('&');
            for (var i = 0; i < c.length; i++) {
                var d = c[i].split('=');
                qo[d[0]] = d[1];
            }
        }
        if (hashstring !== '') {
            ho = {};
            var c = hashstring.split('&');
            for (var i = 0, len = c.length; i < len; i++) {
                var d = c[i].split('=');
                ho[d[0]] = d[1];
            }
        }
        return {
            query: qo,
            hash: ho,
            host: host,
            port: port,
            protocol: protocol,
        };
    },
    queryObject: function (str) {
        return serialize.getURLInfo(str).query;
    },
    hashObject: function (str) {
        return serialize.getURLInfo(str).hash;
    },
};

export default serialize;
