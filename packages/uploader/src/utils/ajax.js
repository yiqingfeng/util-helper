import serialize from './serialize';

// import ES6Promise from 'es6-promise';
// ES6Promise.polyfill();
function getError(action, option, xhr) {
    let msg;
    if (xhr.response) {
        msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        msg = `${xhr.responseText}`;
    } else {
        msg = `fail to post ${action} ${xhr.status}`;
    }

    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function ajax(opts, resolve, reject) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (!xhr || !opts.url) {
        return;
    }

    let defaultOpts = Object.assign(
        {
            url: '',
            data: {},
            query: {},
            type: 'get',
            dataType: 'json',
        },
        opts
    );

    let params;
    if (opts.file instanceof Blob || opts.file instanceof File) {
        defaultOpts.file = opts.file;

        defaultOpts.data = defaultOpts.data || {};
        defaultOpts.data[opts.filename] = opts.file;
    }
    if (opts.data instanceof Blob || opts.data instanceof File) {
        defaultOpts.data = opts.data;
        params = opts.data;
    }
    //   params = new FormData();
    //   if (defaultOpts.data) {
    //     Object.keys(defaultOpts.data).forEach(key => {
    //       params.append(key, defaultOpts.data[key]);
    //     });
    //   }

    if (defaultOpts.mime) {
        xhr.overrideMimeType(defaultOpts.mime);
    }

    if (xhr.upload && defaultOpts.onProgress) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
            }
            defaultOpts.onProgress(e);
        };
    }

    if (defaultOpts.type === 'get') {
        let querystr = serialize.queryString(
            Object.assign({}, defaultOpts.data, defaultOpts.query)
        );
        defaultOpts.url +=
            defaultOpts.url.indexOf('?') !== -1
                ? querystr === ''
                    ? ''
                    : '&' + querystr
                : querystr === ''
                ? ''
                : '? ' + querystr;
    } else {
        let querystr = serialize.queryString(defaultOpts.query);
        defaultOpts.url +=
            defaultOpts.url.indexOf('?') !== -1
                ? querystr === ''
                    ? ''
                    : '&' + querystr
                : querystr === ''
                ? ''
                : '? ' + querystr;

        params = serialize.postData(defaultOpts.data);
    }

    xhr.onerror = function (e) {
        reject(e);
    };
    xhr.onabort = function () {
        console.log('onabort');
    };

    xhr.onload = xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
            let body = getBody(xhr);
            resolve(body);
        } else if (xhr.status < 200 || xhr.status >= 300) {
            let err = getError(defaultOpts.url, defaultOpts, xhr);
            reject(err);
        }
    };

    xhr.open(defaultOpts.type, defaultOpts.url, true);

    let headers = defaultOpts.headers;
    for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    if (
        typeof params === 'string' &&
        params.constructor === String &&
        /(^|&).*=([^&]*)(&|$)/.test(params)
    ) {
        xhr.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        );
    }
    // xhr.setRequestHeader('Content-type', 'multipart/form-data');
    // xhr.setRequestHeader('Content-type', 'multipart/form-data; boundary=----WebKitFormBoundaryAw0kIaq2WRPcYK7T');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    if (defaultOpts.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    xhr.send(params);

    return xhr;
}

export default function (opts) {
    let xhr;
    let ps = new Promise(function (res, rej) {
        try {
            xhr = ajax(opts, res, rej);
        } catch (e) {
            console.log(e);
        }

        if (!xhr) {
            rej();
        }
    });
    ps.xhr = xhr;

    return ps;
}
