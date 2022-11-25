var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser2(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(
            timeoutErrorMessage,
            config,
            config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require("debug")("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded"
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener("abort", clearTimer);
        self2.removeListener("error", clearTimer);
        self2.removeListener("response", clearTimer);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._options.path;
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self2._currentRequest) {
            if (error) {
              self2.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
        return;
      }
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isString(input)) {
            var parsed;
            try {
              parsed = urlToOptions(new URL(input));
            } catch (err) {
              parsed = url.parse(input);
            }
            if (!isString(parsed.protocol)) {
              throw new InvalidUrlError({ input });
            }
            input = parsed;
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (isFunction(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      return CustomError;
    }
    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isBuffer(value) {
      return typeof value === "object" && "length" in value;
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/package.json
var require_package = __commonJS({
  "node_modules/axios/package.json"(exports, module2) {
    module2.exports = {
      name: "axios",
      version: "0.21.4",
      description: "Promise based HTTP client for the browser and node.js",
      main: "index.js",
      scripts: {
        test: "grunt test",
        start: "node ./sandbox/server.js",
        build: "NODE_ENV=production grunt build",
        preversion: "npm test",
        version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        postversion: "git push && git push --tags",
        examples: "node ./examples/server.js",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        fix: "eslint --fix lib/**/*.js"
      },
      repository: {
        type: "git",
        url: "https://github.com/axios/axios.git"
      },
      keywords: [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
      ],
      author: "Matt Zabriskie",
      license: "MIT",
      bugs: {
        url: "https://github.com/axios/axios/issues"
      },
      homepage: "https://axios-http.com",
      devDependencies: {
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.3.0",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^23.0.0",
        "grunt-karma": "^4.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^4.0.2",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^6.3.2",
        "karma-chrome-launcher": "^3.1.0",
        "karma-firefox-launcher": "^2.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^4.3.6",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.8",
        "karma-webpack": "^4.0.2",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^8.2.1",
        sinon: "^4.5.0",
        "terser-webpack-plugin": "^4.2.3",
        typescript: "^4.0.5",
        "url-search-params": "^0.10.0",
        webpack: "^4.44.2",
        "webpack-dev-server": "^3.11.0"
      },
      browser: {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
      },
      jsdelivr: "dist/axios.min.js",
      unpkg: "dist/axios.min.js",
      typings: "./index.d.ts",
      dependencies: {
        "follow-redirects": "^1.14.0"
      },
      bundlesize: [
        {
          path: "./dist/axios.min.js",
          threshold: "5kB"
        }
      ]
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var pkg = require_package();
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var resolve = function resolve2(value) {
          resolvePromise(value);
        };
        var reject = function reject2(value) {
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        if ("User-Agent" in headers || "user-agent" in headers) {
          if (!headers["User-Agent"] && !headers["user-agent"]) {
            delete headers["User-Agent"];
            delete headers["user-agent"];
          }
        } else {
          headers["User-Agent"] = "axios/" + pkg.version;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError(
              "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
              config
            ));
          }
          headers["Content-Length"] = data.length;
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth) {
          delete headers.Authorization;
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                stream.destroy();
                reject(createError(
                  "maxContentLength size of " + config.maxContentLength + " exceeded",
                  config,
                  null,
                  lastRequest
                ));
              }
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              var responseData = Buffer.concat(responseBuffer);
              if (config.responseType !== "arraybuffer") {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === "utf8") {
                  responseData = utils.stripBOM(responseData);
                }
              }
              response.data = responseData;
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError(
              "error trying to parse `config.timeout` to int",
              config,
              "ERR_PARSE_TIMEOUT",
              req
            ));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            reject(createError(
              "timeout of " + timeout + "ms exceeded",
              config,
              config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
              req
            ));
          });
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(cancel);
          });
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser2, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser2 || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    var pkg = require_package();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    var currentVerArr = pkg.version.split(".");
    function isOlderVersion(version, thanVersion) {
      var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
      var destVer = version.split(".");
      for (var i = 0; i < 3; i++) {
        if (pkgVersionArr[i] > destVer[i]) {
          return true;
        } else if (pkgVersionArr[i] < destVer[i]) {
          return false;
        }
      }
      return false;
    }
    validators.transitional = function transitional(validator, version, message) {
      var isDeprecated = version && isOlderVersion(version);
      function formatMessage(opt, desc) {
        return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed in " + version));
        }
        if (isDeprecated && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      isOlderVersion,
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          forcedJSONParsing: validators.transitional(validators.boolean, "1.0.0"),
          clarifyTimeoutError: validators.transitional(validators.boolean, "1.0.0")
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    module2.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios6 = createInstance(defaults);
    axios6.Axios = Axios;
    axios6.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios6.defaults, instanceConfig));
    };
    axios6.Cancel = require_Cancel();
    axios6.CancelToken = require_CancelToken();
    axios6.isCancel = require_isCancel();
    axios6.all = function all(promises) {
      return Promise.all(promises);
    };
    axios6.spread = require_spread();
    axios6.isAxiosError = require_isAxiosError();
    module2.exports = axios6;
    module2.exports.default = axios6;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/tinycolor2/tinycolor.js
var require_tinycolor = __commonJS({
  "node_modules/tinycolor2/tinycolor.js"(exports, module2) {
    (function(Math2) {
      var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
      function tinycolor(color, opts) {
        color = color ? color : "";
        opts = opts || {};
        if (color instanceof tinycolor) {
          return color;
        }
        if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
        }
        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;
        if (this._r < 1) {
          this._r = mathRound(this._r);
        }
        if (this._g < 1) {
          this._g = mathRound(this._g);
        }
        if (this._b < 1) {
          this._b = mathRound(this._b);
        }
        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
      }
      tinycolor.prototype = {
        isDark: function() {
          return this.getBrightness() < 128;
        },
        isLight: function() {
          return !this.isDark();
        },
        isValid: function() {
          return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
          return this._format;
        },
        getAlpha: function() {
          return this._a;
        },
        getBrightness: function() {
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
        },
        getLuminance: function() {
          var rgb = this.toRgb();
          var RsRGB, GsRGB, BsRGB, R, G, B;
          RsRGB = rgb.r / 255;
          GsRGB = rgb.g / 255;
          BsRGB = rgb.b / 255;
          if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
          } else {
            R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
          }
          if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
          } else {
            G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
          }
          if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
          } else {
            B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function(value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100 * this._a) / 100;
          return this;
        },
        toHsv: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
          return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
          return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function(allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
          return "#" + this.toHex(allow3Char);
        },
        toHex8: function(allow4Char) {
          return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function(allow4Char) {
          return "#" + this.toHex8(allow4Char);
        },
        toRgb: function() {
          return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function() {
          return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
          return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function() {
          return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
          if (this._a === 0) {
            return "transparent";
          }
          if (this._a < 1) {
            return false;
          }
          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
          var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? "GradientType = 1, " : "";
          if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
          }
          return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function(format) {
          var formatSet = !!format;
          format = format || this._format;
          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
          if (needsAlphaFormat) {
            if (format === "name" && this._a === 0) {
              return this.toName();
            }
            return this.toRgbString();
          }
          if (format === "rgb") {
            formattedString = this.toRgbString();
          }
          if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
          }
          if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
          }
          if (format === "hex3") {
            formattedString = this.toHexString(true);
          }
          if (format === "hex4") {
            formattedString = this.toHex8String(true);
          }
          if (format === "hex8") {
            formattedString = this.toHex8String();
          }
          if (format === "name") {
            formattedString = this.toName();
          }
          if (format === "hsl") {
            formattedString = this.toHslString();
          }
          if (format === "hsv") {
            formattedString = this.toHsvString();
          }
          return formattedString || this.toHexString();
        },
        clone: function() {
          return tinycolor(this.toString());
        },
        _applyModification: function(fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
        },
        lighten: function() {
          return this._applyModification(lighten, arguments);
        },
        brighten: function() {
          return this._applyModification(brighten, arguments);
        },
        darken: function() {
          return this._applyModification(darken, arguments);
        },
        desaturate: function() {
          return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
          return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
          return this._applyModification(greyscale, arguments);
        },
        spin: function() {
          return this._applyModification(spin, arguments);
        },
        _applyCombination: function(fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
          return this._applyCombination(analogous, arguments);
        },
        complement: function() {
          return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
          return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
          return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
          return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
          return this._applyCombination(tetrad, arguments);
        }
      };
      tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
          var newColor = {};
          for (var i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === "a") {
                newColor[i] = color[i];
              } else {
                newColor[i] = convertToPercentage(color[i]);
              }
            }
          }
          color = newColor;
        }
        return tinycolor(color, opts);
      };
      function inputToRGB(color) {
        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;
        if (typeof color == "string") {
          color = stringInputToObject(color);
        }
        if (typeof color == "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
          }
          if (color.hasOwnProperty("a")) {
            a = color.a;
          }
        }
        a = boundAlpha(a);
        return {
          ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a
        };
      }
      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }
      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return { h, s, l };
      }
      function hslToRgb(h, s, l) {
        var r, g, b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        function hue2rgb(p2, q2, t) {
          if (t < 0)
            t += 1;
          if (t > 1)
            t -= 1;
          if (t < 1 / 6)
            return p2 + (q2 - p2) * 6 * t;
          if (t < 1 / 2)
            return q2;
          if (t < 2 / 3)
            return p2 + (q2 - p2) * (2 / 3 - t) * 6;
          return p2;
        }
        if (s === 0) {
          r = g = b = l;
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return { r: r * 255, g: g * 255, b: b * 255 };
      }
      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max == min) {
          h = 0;
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return { h, s, v };
      }
      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math2.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
        return { r: r * 255, g: g * 255, b: b * 255 };
      }
      function rgbToHex(r, g, b, allow3Char) {
        var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join("");
      }
      function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16)),
          pad2(convertDecimalToHex(a))
        ];
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }
        return hex.join("");
      }
      function rgbaToArgbHex(r, g, b, a) {
        var hex = [
          pad2(convertDecimalToHex(a)),
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        return hex.join("");
      }
      tinycolor.equals = function(color1, color2) {
        if (!color1 || !color2) {
          return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
      };
      tinycolor.random = function() {
        return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
        });
      };
      function desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function greyscale(color) {
        return tinycolor(color).desaturate(100);
      }
      function lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      function brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
      }
      function darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
      }
      function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
      }
      function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
      }
      function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
      }
      function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
          tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
        ];
      }
      function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;
        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];
        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
        }
        return ret;
      }
      function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;
        while (results--) {
          ret.push(tinycolor({ h, s, v }));
          v = (v + modification) % 1;
        }
        return ret;
      }
      tinycolor.mix = function(color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;
        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();
        var p = amount / 100;
        var rgba = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b,
          a: (rgb2.a - rgb1.a) * p + rgb1.a
        };
        return tinycolor(rgba);
      };
      tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
      };
      tinycolor.isReadable = function(color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;
        out = false;
        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
          case "AAsmall":
          case "AAAlarge":
            out = readability >= 4.5;
            break;
          case "AAlarge":
            out = readability >= 3;
            break;
          case "AAAsmall":
            out = readability >= 7;
            break;
        }
        return out;
      };
      tinycolor.mostReadable = function(baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;
        for (var i = 0; i < colorList.length; i++) {
          readability = tinycolor.readability(baseColor, colorList[i]);
          if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
          }
        }
        if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
          return bestColor;
        } else {
          args.includeFallbackColors = false;
          return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
      };
      var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
      };
      var hexNames = tinycolor.hexNames = flip(names);
      function flip(o) {
        var flipped = {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }
        return flipped;
      }
      function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }
        return a;
      }
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = "100%";
        }
        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));
        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }
        if (Math2.abs(n - max) < 1e-6) {
          return 1;
        }
        return n % max / parseFloat(max);
      }
      function clamp01(val) {
        return mathMin(1, mathMax(0, val));
      }
      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }
      function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
      }
      function isPercentage(n) {
        return typeof n === "string" && n.indexOf("%") != -1;
      }
      function pad2(c) {
        return c.length == 1 ? "0" + c : "" + c;
      }
      function convertToPercentage(n) {
        if (n <= 1) {
          n = n * 100 + "%";
        }
        return n;
      }
      function convertDecimalToHex(d) {
        return Math2.round(parseFloat(d) * 255).toString(16);
      }
      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }
      var matchers = function() {
        var CSS_INTEGER = "[-\\+]?\\d+%?";
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        return {
          CSS_UNIT: new RegExp(CSS_UNIT),
          rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
          rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
          hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
          hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
          hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
          hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
          hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
      }();
      function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
      }
      function stringInputToObject(color) {
        color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
        var named = false;
        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color == "transparent") {
          return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }
        var match;
        if (match = matchers.rgb.exec(color)) {
          return { r: match[1], g: match[2], b: match[3] };
        }
        if (match = matchers.rgba.exec(color)) {
          return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if (match = matchers.hsl.exec(color)) {
          return { h: match[1], s: match[2], l: match[3] };
        }
        if (match = matchers.hsla.exec(color)) {
          return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if (match = matchers.hsv.exec(color)) {
          return { h: match[1], s: match[2], v: match[3] };
        }
        if (match = matchers.hsva.exec(color)) {
          return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if (match = matchers.hex8.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex6.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
          };
        }
        if (match = matchers.hex4.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            a: convertHexToDecimal(match[4] + "" + match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex3.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            format: named ? "name" : "hex"
          };
        }
        return false;
      }
      function validateWCAG2Parms(parms) {
        var level, size;
        parms = parms || { "level": "AA", "size": "small" };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
          level = "AA";
        }
        if (size !== "small" && size !== "large") {
          size = "small";
        }
        return { "level": level, "size": size };
      }
      if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = tinycolor;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return tinycolor;
        });
      } else {
        window.tinycolor = tinycolor;
      }
    })(Math);
  }
});

// node_modules/valid-url/index.js
var require_valid_url = __commonJS({
  "node_modules/valid-url/index.js"(exports, module2) {
    (function(module3) {
      "use strict";
      module3.exports.is_uri = is_iri;
      module3.exports.is_http_uri = is_http_iri;
      module3.exports.is_https_uri = is_https_iri;
      module3.exports.is_web_uri = is_web_iri;
      module3.exports.isUri = is_iri;
      module3.exports.isHttpUri = is_http_iri;
      module3.exports.isHttpsUri = is_https_iri;
      module3.exports.isWebUri = is_web_iri;
      var splitUri = function(uri) {
        var splitted = uri.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
        return splitted;
      };
      function is_iri(value) {
        if (!value) {
          return;
        }
        if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value))
          return;
        if (/%[^0-9a-f]/i.test(value))
          return;
        if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value))
          return;
        var splitted = [];
        var scheme = "";
        var authority = "";
        var path = "";
        var query = "";
        var fragment = "";
        var out = "";
        splitted = splitUri(value);
        scheme = splitted[1];
        authority = splitted[2];
        path = splitted[3];
        query = splitted[4];
        fragment = splitted[5];
        if (!(scheme && scheme.length && path.length >= 0))
          return;
        if (authority && authority.length) {
          if (!(path.length === 0 || /^\//.test(path)))
            return;
        } else {
          if (/^\/\//.test(path))
            return;
        }
        if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))
          return;
        out += scheme + ":";
        if (authority && authority.length) {
          out += "//" + authority;
        }
        out += path;
        if (query && query.length) {
          out += "?" + query;
        }
        if (fragment && fragment.length) {
          out += "#" + fragment;
        }
        return out;
      }
      function is_http_iri(value, allowHttps) {
        if (!is_iri(value)) {
          return;
        }
        var splitted = [];
        var scheme = "";
        var authority = "";
        var path = "";
        var port = "";
        var query = "";
        var fragment = "";
        var out = "";
        splitted = splitUri(value);
        scheme = splitted[1];
        authority = splitted[2];
        path = splitted[3];
        query = splitted[4];
        fragment = splitted[5];
        if (!scheme)
          return;
        if (allowHttps) {
          if (scheme.toLowerCase() != "https")
            return;
        } else {
          if (scheme.toLowerCase() != "http")
            return;
        }
        if (!authority) {
          return;
        }
        if (/:(\d+)$/.test(authority)) {
          port = authority.match(/:(\d+)$/)[0];
          authority = authority.replace(/:\d+$/, "");
        }
        out += scheme + ":";
        out += "//" + authority;
        if (port) {
          out += port;
        }
        out += path;
        if (query && query.length) {
          out += "?" + query;
        }
        if (fragment && fragment.length) {
          out += "#" + fragment;
        }
        return out;
      }
      function is_https_iri(value) {
        return is_http_iri(value, true);
      }
      function is_web_iri(value) {
        return is_http_iri(value) || is_https_iri(value);
      }
    })(module2);
  }
});

// node_modules/chrono-node/dist/utils/pattern.js
var require_pattern = __commonJS({
  "node_modules/chrono-node/dist/utils/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchAnyPattern = exports.extractTerms = exports.repeatedTimeunitPattern = void 0;
    function repeatedTimeunitPattern(prefix, singleTimeunitPattern) {
      const singleTimeunitPatternNoCapture = singleTimeunitPattern.replace(/\((?!\?)/g, "(?:");
      return `${prefix}${singleTimeunitPatternNoCapture}\\s{0,5}(?:,?\\s{0,5}${singleTimeunitPatternNoCapture}){0,10}`;
    }
    exports.repeatedTimeunitPattern = repeatedTimeunitPattern;
    function extractTerms(dictionary) {
      let keys;
      if (dictionary instanceof Array) {
        keys = [...dictionary];
      } else if (dictionary instanceof Map) {
        keys = Array.from(dictionary.keys());
      } else {
        keys = Object.keys(dictionary);
      }
      return keys;
    }
    exports.extractTerms = extractTerms;
    function matchAnyPattern(dictionary) {
      const joinedTerms = extractTerms(dictionary).sort((a, b) => b.length - a.length).join("|").replace(/\./g, "\\.");
      return `(?:${joinedTerms})`;
    }
    exports.matchAnyPattern = matchAnyPattern;
  }
});

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/dayjs/dayjs.min.js"(exports, module2) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = function(t2) {
        return t2 instanceof _;
      }, S = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, O = v;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return new Date(NaN);
            if (O.u(e2))
              return new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c:
              return r2 ? l2(1, 0) : l2(31, 11);
            case f:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === f || o2 === c) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, h2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = O.p(h2), y2 = function(t2) {
            var e2 = w(l2);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === f)
            return this.set(f, this.$M + r2);
          if ($2 === c)
            return this.set(c, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, c2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, d2 = n2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r2.replace(y, function(t3, e3) {
            return e3 || $2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
          return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
        }, m2.daysInMonth = function() {
          return this.endOf(f).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), T = _.prototype;
      return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
        T[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[g], w.Ls = D, w.p = {}, w;
    });
  }
});

// node_modules/chrono-node/dist/calculation/years.js
var require_years = __commonJS({
  "node_modules/chrono-node/dist/calculation/years.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findYearClosestToRef = exports.findMostLikelyADYear = void 0;
    var dayjs_1 = __importDefault(require_dayjs_min());
    function findMostLikelyADYear(yearNumber) {
      if (yearNumber < 100) {
        if (yearNumber > 50) {
          yearNumber = yearNumber + 1900;
        } else {
          yearNumber = yearNumber + 2e3;
        }
      }
      return yearNumber;
    }
    exports.findMostLikelyADYear = findMostLikelyADYear;
    function findYearClosestToRef(refDate, day, month) {
      const refMoment = dayjs_1.default(refDate);
      let dateMoment = refMoment;
      dateMoment = dateMoment.month(month - 1);
      dateMoment = dateMoment.date(day);
      dateMoment = dateMoment.year(refMoment.year());
      const nextYear = dateMoment.add(1, "y");
      const lastYear = dateMoment.add(-1, "y");
      if (Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
        dateMoment = nextYear;
      } else if (Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
        dateMoment = lastYear;
      }
      return dateMoment.year();
    }
    exports.findYearClosestToRef = findYearClosestToRef;
  }
});

// node_modules/chrono-node/dist/locales/en/constants.js
var require_constants = __commonJS({
  "node_modules/chrono-node/dist/locales/en/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTimeUnits = exports.TIME_UNITS_PATTERN = exports.parseYear = exports.YEAR_PATTERN = exports.parseOrdinalNumberPattern = exports.ORDINAL_NUMBER_PATTERN = exports.parseNumberPattern = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
    var pattern_1 = require_pattern();
    var years_1 = require_years();
    exports.WEEKDAY_DICTIONARY = {
      sunday: 0,
      sun: 0,
      "sun.": 0,
      monday: 1,
      mon: 1,
      "mon.": 1,
      tuesday: 2,
      tue: 2,
      "tue.": 2,
      wednesday: 3,
      wed: 3,
      "wed.": 3,
      thursday: 4,
      thurs: 4,
      "thurs.": 4,
      thur: 4,
      "thur.": 4,
      thu: 4,
      "thu.": 4,
      friday: 5,
      fri: 5,
      "fri.": 5,
      saturday: 6,
      sat: 6,
      "sat.": 6
    };
    exports.FULL_MONTH_NAME_DICTIONARY = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12
    };
    exports.MONTH_DICTIONARY = Object.assign(Object.assign({}, exports.FULL_MONTH_NAME_DICTIONARY), { jan: 1, "jan.": 1, feb: 2, "feb.": 2, mar: 3, "mar.": 3, apr: 4, "apr.": 4, jun: 6, "jun.": 6, jul: 7, "jul.": 7, aug: 8, "aug.": 8, sep: 9, "sep.": 9, sept: 9, "sept.": 9, oct: 10, "oct.": 10, nov: 11, "nov.": 11, dec: 12, "dec.": 12 });
    exports.INTEGER_WORD_DICTIONARY = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12
    };
    exports.ORDINAL_WORD_DICTIONARY = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eighth: 8,
      ninth: 9,
      tenth: 10,
      eleventh: 11,
      twelfth: 12,
      thirteenth: 13,
      fourteenth: 14,
      fifteenth: 15,
      sixteenth: 16,
      seventeenth: 17,
      eighteenth: 18,
      nineteenth: 19,
      twentieth: 20,
      "twenty first": 21,
      "twenty-first": 21,
      "twenty second": 22,
      "twenty-second": 22,
      "twenty third": 23,
      "twenty-third": 23,
      "twenty fourth": 24,
      "twenty-fourth": 24,
      "twenty fifth": 25,
      "twenty-fifth": 25,
      "twenty sixth": 26,
      "twenty-sixth": 26,
      "twenty seventh": 27,
      "twenty-seventh": 27,
      "twenty eighth": 28,
      "twenty-eighth": 28,
      "twenty ninth": 29,
      "twenty-ninth": 29,
      "thirtieth": 30,
      "thirty first": 31,
      "thirty-first": 31
    };
    exports.TIME_UNIT_DICTIONARY = {
      sec: "second",
      second: "second",
      seconds: "second",
      min: "minute",
      mins: "minute",
      minute: "minute",
      minutes: "minute",
      h: "hour",
      hr: "hour",
      hrs: "hour",
      hour: "hour",
      hours: "hour",
      day: "d",
      days: "d",
      week: "week",
      weeks: "week",
      month: "month",
      months: "month",
      qtr: "quarter",
      quarter: "quarter",
      quarters: "quarter",
      y: "year",
      yr: "year",
      year: "year",
      years: "year"
    };
    exports.NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
    function parseNumberPattern(match) {
      const num = match.toLowerCase();
      if (exports.INTEGER_WORD_DICTIONARY[num] !== void 0) {
        return exports.INTEGER_WORD_DICTIONARY[num];
      } else if (num === "a" || num === "an") {
        return 1;
      } else if (num.match(/few/)) {
        return 3;
      } else if (num.match(/half/)) {
        return 0.5;
      } else if (num.match(/couple/)) {
        return 2;
      } else if (num.match(/several/)) {
        return 7;
      }
      return parseFloat(num);
    }
    exports.parseNumberPattern = parseNumberPattern;
    exports.ORDINAL_NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
    function parseOrdinalNumberPattern(match) {
      let num = match.toLowerCase();
      if (exports.ORDINAL_WORD_DICTIONARY[num] !== void 0) {
        return exports.ORDINAL_WORD_DICTIONARY[num];
      }
      num = num.replace(/(?:st|nd|rd|th)$/i, "");
      return parseInt(num);
    }
    exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
    exports.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9])`;
    function parseYear(match) {
      if (/BE/i.test(match)) {
        match = match.replace(/BE/i, "");
        return parseInt(match) - 543;
      }
      if (/BCE?/i.test(match)) {
        match = match.replace(/BCE?/i, "");
        return -parseInt(match);
      }
      if (/(AD|CE)/i.test(match)) {
        match = match.replace(/(AD|CE)/i, "");
        return parseInt(match);
      }
      const rawYearNumber = parseInt(match);
      return years_1.findMostLikelyADYear(rawYearNumber);
    }
    exports.parseYear = parseYear;
    var SINGLE_TIME_UNIT_PATTERN = `(${exports.NUMBER_PATTERN})\\s{0,3}(${pattern_1.matchAnyPattern(exports.TIME_UNIT_DICTIONARY)})`;
    var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
    exports.TIME_UNITS_PATTERN = pattern_1.repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN);
    function parseTimeUnits(timeunitText) {
      const fragments = {};
      let remainingText = timeunitText;
      let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length).trim();
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      }
      return fragments;
    }
    exports.parseTimeUnits = parseTimeUnits;
    function collectDateTimeFragment(fragments, match) {
      const num = parseNumberPattern(match[1]);
      const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
      fragments[unit] = num;
    }
  }
});

// node_modules/dayjs/plugin/quarterOfYear.js
var require_quarterOfYear = __commonJS({
  "node_modules/dayjs/plugin/quarterOfYear.js"(exports, module2) {
    !function(t, n) {
      "object" == typeof exports && "undefined" != typeof module2 ? module2.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_quarterOfYear = n();
    }(exports, function() {
      "use strict";
      var t = "month", n = "quarter";
      return function(e, i) {
        var r = i.prototype;
        r.quarter = function(t2) {
          return this.$utils().u(t2) ? Math.ceil((this.month() + 1) / 3) : this.month(this.month() % 3 + 3 * (t2 - 1));
        };
        var s = r.add;
        r.add = function(e2, i2) {
          return e2 = Number(e2), this.$utils().p(i2) === n ? this.add(3 * e2, t) : s.bind(this)(e2, i2);
        };
        var u = r.startOf;
        r.startOf = function(e2, i2) {
          var r2 = this.$utils(), s2 = !!r2.u(i2) || i2;
          if (r2.p(e2) === n) {
            var o = this.quarter() - 1;
            return s2 ? this.month(3 * o).startOf(t).startOf("day") : this.month(3 * o + 2).endOf(t).endOf("day");
          }
          return u.bind(this)(e2, i2);
        };
      };
    });
  }
});

// node_modules/chrono-node/dist/utils/dayjs.js
var require_dayjs = __commonJS({
  "node_modules/chrono-node/dist/utils/dayjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.implySimilarTime = exports.implySimilarDate = exports.assignSimilarTime = exports.assignSimilarDate = exports.implyTheNextDay = exports.assignTheNextDay = void 0;
    var index_1 = require_dist();
    function assignTheNextDay(component, targetDayJs) {
      targetDayJs = targetDayJs.add(1, "day");
      assignSimilarDate(component, targetDayJs);
      implySimilarTime(component, targetDayJs);
    }
    exports.assignTheNextDay = assignTheNextDay;
    function implyTheNextDay(component, targetDayJs) {
      targetDayJs = targetDayJs.add(1, "day");
      implySimilarDate(component, targetDayJs);
      implySimilarTime(component, targetDayJs);
    }
    exports.implyTheNextDay = implyTheNextDay;
    function assignSimilarDate(component, targetDayJs) {
      component.assign("day", targetDayJs.date());
      component.assign("month", targetDayJs.month() + 1);
      component.assign("year", targetDayJs.year());
    }
    exports.assignSimilarDate = assignSimilarDate;
    function assignSimilarTime(component, targetDayJs) {
      component.assign("hour", targetDayJs.hour());
      component.assign("minute", targetDayJs.minute());
      component.assign("second", targetDayJs.second());
      component.assign("millisecond", targetDayJs.millisecond());
      if (component.get("hour") < 12) {
        component.assign("meridiem", index_1.Meridiem.AM);
      } else {
        component.assign("meridiem", index_1.Meridiem.PM);
      }
    }
    exports.assignSimilarTime = assignSimilarTime;
    function implySimilarDate(component, targetDayJs) {
      component.imply("day", targetDayJs.date());
      component.imply("month", targetDayJs.month() + 1);
      component.imply("year", targetDayJs.year());
    }
    exports.implySimilarDate = implySimilarDate;
    function implySimilarTime(component, targetDayJs) {
      component.imply("hour", targetDayJs.hour());
      component.imply("minute", targetDayJs.minute());
      component.imply("second", targetDayJs.second());
      component.imply("millisecond", targetDayJs.millisecond());
    }
    exports.implySimilarTime = implySimilarTime;
  }
});

// node_modules/chrono-node/dist/timezone.js
var require_timezone = __commonJS({
  "node_modules/chrono-node/dist/timezone.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toTimezoneOffset = exports.TIMEZONE_ABBR_MAP = void 0;
    exports.TIMEZONE_ABBR_MAP = {
      ACDT: 630,
      ACST: 570,
      ADT: -180,
      AEDT: 660,
      AEST: 600,
      AFT: 270,
      AKDT: -480,
      AKST: -540,
      ALMT: 360,
      AMST: -180,
      AMT: -240,
      ANAST: 720,
      ANAT: 720,
      AQTT: 300,
      ART: -180,
      AST: -240,
      AWDT: 540,
      AWST: 480,
      AZOST: 0,
      AZOT: -60,
      AZST: 300,
      AZT: 240,
      BNT: 480,
      BOT: -240,
      BRST: -120,
      BRT: -180,
      BST: 60,
      BTT: 360,
      CAST: 480,
      CAT: 120,
      CCT: 390,
      CDT: -300,
      CEST: 120,
      CET: 60,
      CHADT: 825,
      CHAST: 765,
      CKT: -600,
      CLST: -180,
      CLT: -240,
      COT: -300,
      CST: -360,
      CVT: -60,
      CXT: 420,
      ChST: 600,
      DAVT: 420,
      EASST: -300,
      EAST: -360,
      EAT: 180,
      ECT: -300,
      EDT: -240,
      EEST: 180,
      EET: 120,
      EGST: 0,
      EGT: -60,
      EST: -300,
      ET: -300,
      FJST: 780,
      FJT: 720,
      FKST: -180,
      FKT: -240,
      FNT: -120,
      GALT: -360,
      GAMT: -540,
      GET: 240,
      GFT: -180,
      GILT: 720,
      GMT: 0,
      GST: 240,
      GYT: -240,
      HAA: -180,
      HAC: -300,
      HADT: -540,
      HAE: -240,
      HAP: -420,
      HAR: -360,
      HAST: -600,
      HAT: -90,
      HAY: -480,
      HKT: 480,
      HLV: -210,
      HNA: -240,
      HNC: -360,
      HNE: -300,
      HNP: -480,
      HNR: -420,
      HNT: -150,
      HNY: -540,
      HOVT: 420,
      ICT: 420,
      IDT: 180,
      IOT: 360,
      IRDT: 270,
      IRKST: 540,
      IRKT: 540,
      IRST: 210,
      IST: 330,
      JST: 540,
      KGT: 360,
      KRAST: 480,
      KRAT: 480,
      KST: 540,
      KUYT: 240,
      LHDT: 660,
      LHST: 630,
      LINT: 840,
      MAGST: 720,
      MAGT: 720,
      MART: -510,
      MAWT: 300,
      MDT: -360,
      MESZ: 120,
      MEZ: 60,
      MHT: 720,
      MMT: 390,
      MSD: 240,
      MSK: 180,
      MST: -420,
      MUT: 240,
      MVT: 300,
      MYT: 480,
      NCT: 660,
      NDT: -90,
      NFT: 690,
      NOVST: 420,
      NOVT: 360,
      NPT: 345,
      NST: -150,
      NUT: -660,
      NZDT: 780,
      NZST: 720,
      OMSST: 420,
      OMST: 420,
      PDT: -420,
      PET: -300,
      PETST: 720,
      PETT: 720,
      PGT: 600,
      PHOT: 780,
      PHT: 480,
      PKT: 300,
      PMDT: -120,
      PMST: -180,
      PONT: 660,
      PST: -480,
      PT: -480,
      PWT: 540,
      PYST: -180,
      PYT: -240,
      RET: 240,
      SAMT: 240,
      SAST: 120,
      SBT: 660,
      SCT: 240,
      SGT: 480,
      SRT: -180,
      SST: -660,
      TAHT: -600,
      TFT: 300,
      TJT: 300,
      TKT: 780,
      TLT: 540,
      TMT: 300,
      TVT: 720,
      ULAT: 480,
      UTC: 0,
      UYST: -120,
      UYT: -180,
      UZT: 300,
      VET: -210,
      VLAST: 660,
      VLAT: 660,
      VUT: 660,
      WAST: 120,
      WAT: 60,
      WEST: 60,
      WESZ: 60,
      WET: 0,
      WEZ: 0,
      WFT: 720,
      WGST: -120,
      WGT: -180,
      WIB: 420,
      WIT: 540,
      WITA: 480,
      WST: 780,
      WT: 0,
      YAKST: 600,
      YAKT: 600,
      YAPT: 600,
      YEKST: 360,
      YEKT: 360
    };
    function toTimezoneOffset(timezoneInput) {
      var _a;
      if (timezoneInput === null || timezoneInput === void 0) {
        return null;
      }
      if (typeof timezoneInput === "number") {
        return timezoneInput;
      }
      return (_a = exports.TIMEZONE_ABBR_MAP[timezoneInput]) !== null && _a !== void 0 ? _a : null;
    }
    exports.toTimezoneOffset = toTimezoneOffset;
  }
});

// node_modules/chrono-node/dist/results.js
var require_results = __commonJS({
  "node_modules/chrono-node/dist/results.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParsingResult = exports.ParsingComponents = exports.ReferenceWithTimezone = void 0;
    var quarterOfYear_1 = __importDefault(require_quarterOfYear());
    var dayjs_1 = __importDefault(require_dayjs_min());
    var dayjs_2 = require_dayjs();
    var timezone_1 = require_timezone();
    dayjs_1.default.extend(quarterOfYear_1.default);
    var ReferenceWithTimezone = class {
      constructor(input) {
        var _a;
        input = input !== null && input !== void 0 ? input : new Date();
        if (input instanceof Date) {
          this.instant = input;
        } else {
          this.instant = (_a = input.instant) !== null && _a !== void 0 ? _a : new Date();
          this.timezoneOffset = timezone_1.toTimezoneOffset(input.timezone);
        }
      }
      getDateWithAdjustedTimezone() {
        return new Date(this.instant.getTime() + this.getSystemTimezoneAdjustmentMinute(this.instant) * 6e4);
      }
      getSystemTimezoneAdjustmentMinute(date, overrideTimezoneOffset) {
        var _a;
        if (!date || date.getTime() < 0) {
          date = new Date();
        }
        const currentTimezoneOffset = -date.getTimezoneOffset();
        const targetTimezoneOffset = (_a = overrideTimezoneOffset !== null && overrideTimezoneOffset !== void 0 ? overrideTimezoneOffset : this.timezoneOffset) !== null && _a !== void 0 ? _a : currentTimezoneOffset;
        return currentTimezoneOffset - targetTimezoneOffset;
      }
    };
    exports.ReferenceWithTimezone = ReferenceWithTimezone;
    var ParsingComponents = class {
      constructor(reference, knownComponents) {
        this.reference = reference;
        this.knownValues = {};
        this.impliedValues = {};
        if (knownComponents) {
          for (const key in knownComponents) {
            this.knownValues[key] = knownComponents[key];
          }
        }
        const refDayJs = dayjs_1.default(reference.instant);
        this.imply("day", refDayJs.date());
        this.imply("month", refDayJs.month() + 1);
        this.imply("year", refDayJs.year());
        this.imply("hour", 12);
        this.imply("minute", 0);
        this.imply("second", 0);
        this.imply("millisecond", 0);
      }
      get(component) {
        if (component in this.knownValues) {
          return this.knownValues[component];
        }
        if (component in this.impliedValues) {
          return this.impliedValues[component];
        }
        return null;
      }
      isCertain(component) {
        return component in this.knownValues;
      }
      getCertainComponents() {
        return Object.keys(this.knownValues);
      }
      imply(component, value) {
        if (component in this.knownValues) {
          return this;
        }
        this.impliedValues[component] = value;
        return this;
      }
      assign(component, value) {
        this.knownValues[component] = value;
        delete this.impliedValues[component];
        return this;
      }
      delete(component) {
        delete this.knownValues[component];
        delete this.impliedValues[component];
      }
      clone() {
        const component = new ParsingComponents(this.reference);
        component.knownValues = {};
        component.impliedValues = {};
        for (const key in this.knownValues) {
          component.knownValues[key] = this.knownValues[key];
        }
        for (const key in this.impliedValues) {
          component.impliedValues[key] = this.impliedValues[key];
        }
        return component;
      }
      isOnlyDate() {
        return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
      }
      isOnlyTime() {
        return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
      }
      isOnlyWeekdayComponent() {
        return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
      }
      isOnlyDayMonthComponent() {
        return this.isCertain("day") && this.isCertain("month") && !this.isCertain("year");
      }
      isValidDate() {
        const date = this.dateWithoutTimezoneAdjustment();
        if (date.getFullYear() !== this.get("year"))
          return false;
        if (date.getMonth() !== this.get("month") - 1)
          return false;
        if (date.getDate() !== this.get("day"))
          return false;
        if (this.get("hour") != null && date.getHours() != this.get("hour"))
          return false;
        if (this.get("minute") != null && date.getMinutes() != this.get("minute"))
          return false;
        return true;
      }
      toString() {
        return `[ParsingComponents {knownValues: ${JSON.stringify(this.knownValues)}, impliedValues: ${JSON.stringify(this.impliedValues)}}, reference: ${JSON.stringify(this.reference)}]`;
      }
      dayjs() {
        return dayjs_1.default(this.date());
      }
      date() {
        const date = this.dateWithoutTimezoneAdjustment();
        const timezoneAdjustment = this.reference.getSystemTimezoneAdjustmentMinute(date, this.get("timezoneOffset"));
        return new Date(date.getTime() + timezoneAdjustment * 6e4);
      }
      dateWithoutTimezoneAdjustment() {
        const date = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
        date.setFullYear(this.get("year"));
        return date;
      }
      static createRelativeFromReference(reference, fragments) {
        let date = dayjs_1.default(reference.instant);
        for (const key in fragments) {
          date = date.add(fragments[key], key);
        }
        const components = new ParsingComponents(reference);
        if (fragments["hour"] || fragments["minute"] || fragments["second"]) {
          dayjs_2.assignSimilarTime(components, date);
          dayjs_2.assignSimilarDate(components, date);
          if (reference.timezoneOffset !== null) {
            components.assign("timezoneOffset", -reference.instant.getTimezoneOffset());
          }
        } else {
          dayjs_2.implySimilarTime(components, date);
          if (reference.timezoneOffset !== null) {
            components.imply("timezoneOffset", -reference.instant.getTimezoneOffset());
          }
          if (fragments["d"]) {
            components.assign("day", date.date());
            components.assign("month", date.month() + 1);
            components.assign("year", date.year());
          } else {
            if (fragments["week"]) {
              components.imply("weekday", date.day());
            }
            components.imply("day", date.date());
            if (fragments["month"]) {
              components.assign("month", date.month() + 1);
              components.assign("year", date.year());
            } else {
              components.imply("month", date.month() + 1);
              if (fragments["year"]) {
                components.assign("year", date.year());
              } else {
                components.imply("year", date.year());
              }
            }
          }
        }
        return components;
      }
    };
    exports.ParsingComponents = ParsingComponents;
    var ParsingResult = class {
      constructor(reference, index, text, start, end) {
        this.reference = reference;
        this.refDate = reference.instant;
        this.index = index;
        this.text = text;
        this.start = start || new ParsingComponents(reference);
        this.end = end;
      }
      clone() {
        const result = new ParsingResult(this.reference, this.index, this.text);
        result.start = this.start ? this.start.clone() : null;
        result.end = this.end ? this.end.clone() : null;
        return result;
      }
      date() {
        return this.start.date();
      }
      toString() {
        return `[ParsingResult {index: ${this.index}, text: '${this.text}', ...}]`;
      }
    };
    exports.ParsingResult = ParsingResult;
  }
});

// node_modules/chrono-node/dist/common/parsers/AbstractParserWithWordBoundary.js
var require_AbstractParserWithWordBoundary = __commonJS({
  "node_modules/chrono-node/dist/common/parsers/AbstractParserWithWordBoundary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractParserWithWordBoundaryChecking = void 0;
    var AbstractParserWithWordBoundaryChecking = class {
      constructor() {
        this.cachedInnerPattern = null;
        this.cachedPattern = null;
      }
      patternLeftBoundary() {
        return `(\\W|^)`;
      }
      pattern(context) {
        const innerPattern = this.innerPattern(context);
        if (innerPattern == this.cachedInnerPattern) {
          return this.cachedPattern;
        }
        this.cachedPattern = new RegExp(`${this.patternLeftBoundary()}${innerPattern.source}`, innerPattern.flags);
        this.cachedInnerPattern = innerPattern;
        return this.cachedPattern;
      }
      extract(context, match) {
        var _a;
        const header = (_a = match[1]) !== null && _a !== void 0 ? _a : "";
        match.index = match.index + header.length;
        match[0] = match[0].substring(header.length);
        for (let i = 2; i < match.length; i++) {
          match[i - 1] = match[i];
        }
        return this.innerExtract(context, match);
      }
    };
    exports.AbstractParserWithWordBoundaryChecking = AbstractParserWithWordBoundaryChecking;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitWithinFormatParser.js
var require_ENTimeUnitWithinFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitWithinFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN_WITH_PREFIX = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    var PATTERN_WITHOUT_PREFIX = new RegExp(`(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    var ENTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return context.option.forwardDate ? PATTERN_WITHOUT_PREFIX : PATTERN_WITH_PREFIX;
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = ENTimeUnitWithinFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameLittleEndianParser.js
var require_ENMonthNameLittleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameLittleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants();
    var constants_2 = require_constants();
    var constants_3 = require_constants();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(?:on\\s{0,3})?(${constants_3.ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:to|\\-|\\\u2013|until|through|till)?\\s{0,3}(${constants_3.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s{0,3})(${constants_2.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i");
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var MONTH_NAME_GROUP = 3;
    var YEAR_GROUP = 4;
    var ENMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = constants_3.parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
          const yearNumber = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", yearNumber);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
          const endDate = constants_3.parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
          result.end = result.start.clone();
          result.end.assign("day", endDate);
        }
        return result;
      }
    };
    exports.default = ENMonthNameLittleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameMiddleEndianParser.js
var require_ENMonthNameMiddleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameMiddleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants();
    var constants_2 = require_constants();
    var constants_3 = require_constants();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:-|/|\\s*,?\\s*)(${constants_2.ORDINAL_NUMBER_PATTERN})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${constants_2.ORDINAL_NUMBER_PATTERN})\\s*)?(?:(?:-|/|\\s*,?\\s*)(${constants_3.YEAR_PATTERN}))?(?=\\W|$)(?!\\:\\d)`, "i");
    var MONTH_NAME_GROUP = 1;
    var DATE_GROUP = 2;
    var DATE_TO_GROUP = 3;
    var YEAR_GROUP = 4;
    var ENMonthNameMiddleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = constants_2.parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
          return null;
        }
        const components = context.createParsingComponents({
          day,
          month
        });
        if (match[YEAR_GROUP]) {
          const year = constants_3.parseYear(match[YEAR_GROUP]);
          components.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          components.imply("year", year);
        }
        if (!match[DATE_TO_GROUP]) {
          return components;
        }
        const endDate = constants_2.parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);
        return result;
      }
    };
    exports.default = ENMonthNameMiddleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameParser.js
var require_ENMonthNameParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENMonthNameParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var years_1 = require_years();
    var pattern_1 = require_pattern();
    var constants_2 = require_constants();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`((?:in)\\s*)?(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${constants_2.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i");
    var PREFIX_GROUP = 1;
    var MONTH_NAME_GROUP = 2;
    var YEAR_GROUP = 3;
    var ENMonthNameParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        if (match[0].length <= 3 && !constants_1.FULL_MONTH_NAME_DICTIONARY[monthName]) {
          return null;
        }
        const result = context.createParsingResult(match.index + (match[PREFIX_GROUP] || "").length, match.index + match[0].length);
        result.start.imply("day", 1);
        const month = constants_1.MONTH_DICTIONARY[monthName];
        result.start.assign("month", month);
        if (match[YEAR_GROUP]) {
          const year = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, 1, month);
          result.start.imply("year", year);
        }
        return result;
      }
    };
    exports.default = ENMonthNameParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENCasualYearMonthDayParser.js
var require_ENCasualYearMonthDayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENCasualYearMonthDayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`([0-9]{4})[\\.\\/\\s](?:(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})|([0-9]{1,2}))[\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i");
    var YEAR_NUMBER_GROUP = 1;
    var MONTH_NAME_GROUP = 2;
    var MONTH_NUMBER_GROUP = 3;
    var DATE_NUMBER_GROUP = 4;
    var ENCasualYearMonthDayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        if (month < 1 || month > 12) {
          return null;
        }
        const year = parseInt(match[YEAR_NUMBER_GROUP]);
        const day = parseInt(match[DATE_NUMBER_GROUP]);
        return {
          day,
          month,
          year
        };
      }
    };
    exports.default = ENCasualYearMonthDayParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENSlashMonthFormatParser.js
var require_ENSlashMonthFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENSlashMonthFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i");
    var MONTH_GROUP = 1;
    var YEAR_GROUP = 2;
    var ENSlashMonthFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const year = parseInt(match[YEAR_GROUP]);
        const month = parseInt(match[MONTH_GROUP]);
        return context.createParsingComponents().imply("day", 1).assign("month", month).assign("year", year);
      }
    };
    exports.default = ENSlashMonthFormatParser;
  }
});

// node_modules/chrono-node/dist/common/parsers/AbstractTimeExpressionParser.js
var require_AbstractTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/common/parsers/AbstractTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractTimeExpressionParser = void 0;
    var index_1 = require_dist();
    function primaryTimePattern(leftBoundary, primaryPrefix, primarySuffix, flags) {
      return new RegExp(`${leftBoundary}${primaryPrefix}(\\d{1,4})(?:(?:\\.|:|\uFF1A)(\\d{1,2})(?:(?::|\uFF1A)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${primarySuffix}`, flags);
    }
    function followingTimePatten(followingPhase, followingSuffix) {
      return new RegExp(`^(${followingPhase})(\\d{1,4})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:(?:\\.|\\:|\\\uFF1A)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${followingSuffix}`, "i");
    }
    var HOUR_GROUP = 2;
    var MINUTE_GROUP = 3;
    var SECOND_GROUP = 4;
    var MILLI_SECOND_GROUP = 5;
    var AM_PM_HOUR_GROUP = 6;
    var AbstractTimeExpressionParser = class {
      constructor(strictMode = false) {
        this.cachedPrimaryPrefix = null;
        this.cachedPrimarySuffix = null;
        this.cachedPrimaryTimePattern = null;
        this.cachedFollowingPhase = null;
        this.cachedFollowingSuffix = null;
        this.cachedFollowingTimePatten = null;
        this.strictMode = strictMode;
      }
      patternFlags() {
        return "i";
      }
      primaryPatternLeftBoundary() {
        return `(^|\\s|T|\\b)`;
      }
      primarySuffix() {
        return `(?=\\W|$)`;
      }
      followingSuffix() {
        return `(?=\\W|$)`;
      }
      pattern(context) {
        return this.getPrimaryTimePatternThroughCache();
      }
      extract(context, match) {
        const startComponents = this.extractPrimaryTimeComponents(context, match);
        if (!startComponents) {
          match.index += match[0].length;
          return null;
        }
        const index = match.index + match[1].length;
        const text = match[0].substring(match[1].length);
        const result = context.createParsingResult(index, text, startComponents);
        match.index += match[0].length;
        const remainingText = context.text.substring(match.index);
        const followingPattern = this.getFollowingTimePatternThroughCache();
        const followingMatch = followingPattern.exec(remainingText);
        if (text.match(/^\d{3,4}/) && followingMatch && followingMatch[0].match(/^\s*([+-])\s*\d{2,4}$/)) {
          return null;
        }
        if (!followingMatch || followingMatch[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
          return this.checkAndReturnWithoutFollowingPattern(result);
        }
        result.end = this.extractFollowingTimeComponents(context, followingMatch, result);
        if (result.end) {
          result.text += followingMatch[0];
        }
        return this.checkAndReturnWithFollowingPattern(result);
      }
      extractPrimaryTimeComponents(context, match, strict = false) {
        const components = context.createParsingComponents();
        let minute = 0;
        let meridiem = null;
        let hour = parseInt(match[HOUR_GROUP]);
        if (hour > 100) {
          if (this.strictMode || match[MINUTE_GROUP] != null) {
            return null;
          }
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (hour > 24) {
          return null;
        }
        if (match[MINUTE_GROUP] != null) {
          if (match[MINUTE_GROUP].length == 1 && !match[AM_PM_HOUR_GROUP]) {
            return null;
          }
          minute = parseInt(match[MINUTE_GROUP]);
        }
        if (minute >= 60) {
          return null;
        }
        if (hour > 12) {
          meridiem = index_1.Meridiem.PM;
        }
        if (match[AM_PM_HOUR_GROUP] != null) {
          if (hour > 12)
            return null;
          const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = index_1.Meridiem.AM;
            if (hour == 12) {
              hour = 0;
            }
          }
          if (ampm == "p") {
            meridiem = index_1.Meridiem.PM;
            if (hour != 12) {
              hour += 12;
            }
          }
        }
        components.assign("hour", hour);
        components.assign("minute", minute);
        if (meridiem !== null) {
          components.assign("meridiem", meridiem);
        } else {
          if (hour < 12) {
            components.imply("meridiem", index_1.Meridiem.AM);
          } else {
            components.imply("meridiem", index_1.Meridiem.PM);
          }
        }
        if (match[MILLI_SECOND_GROUP] != null) {
          const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
          if (millisecond >= 1e3)
            return null;
          components.assign("millisecond", millisecond);
        }
        if (match[SECOND_GROUP] != null) {
          const second = parseInt(match[SECOND_GROUP]);
          if (second >= 60)
            return null;
          components.assign("second", second);
        }
        return components;
      }
      extractFollowingTimeComponents(context, match, result) {
        const components = context.createParsingComponents();
        if (match[MILLI_SECOND_GROUP] != null) {
          const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
          if (millisecond >= 1e3)
            return null;
          components.assign("millisecond", millisecond);
        }
        if (match[SECOND_GROUP] != null) {
          const second = parseInt(match[SECOND_GROUP]);
          if (second >= 60)
            return null;
          components.assign("second", second);
        }
        let hour = parseInt(match[HOUR_GROUP]);
        let minute = 0;
        let meridiem = -1;
        if (match[MINUTE_GROUP] != null) {
          minute = parseInt(match[MINUTE_GROUP]);
        } else if (hour > 100) {
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (minute >= 60 || hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = index_1.Meridiem.PM;
        }
        if (match[AM_PM_HOUR_GROUP] != null) {
          if (hour > 12) {
            return null;
          }
          const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = index_1.Meridiem.AM;
            if (hour == 12) {
              hour = 0;
              if (!components.isCertain("day")) {
                components.imply("day", components.get("day") + 1);
              }
            }
          }
          if (ampm == "p") {
            meridiem = index_1.Meridiem.PM;
            if (hour != 12)
              hour += 12;
          }
          if (!result.start.isCertain("meridiem")) {
            if (meridiem == index_1.Meridiem.AM) {
              result.start.imply("meridiem", index_1.Meridiem.AM);
              if (result.start.get("hour") == 12) {
                result.start.assign("hour", 0);
              }
            } else {
              result.start.imply("meridiem", index_1.Meridiem.PM);
              if (result.start.get("hour") != 12) {
                result.start.assign("hour", result.start.get("hour") + 12);
              }
            }
          }
        }
        components.assign("hour", hour);
        components.assign("minute", minute);
        if (meridiem >= 0) {
          components.assign("meridiem", meridiem);
        } else {
          const startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
          if (startAtPM) {
            if (result.start.get("hour") - 12 > hour) {
              components.imply("meridiem", index_1.Meridiem.AM);
            } else if (hour <= 12) {
              components.assign("hour", hour + 12);
              components.assign("meridiem", index_1.Meridiem.PM);
            }
          } else if (hour > 12) {
            components.imply("meridiem", index_1.Meridiem.PM);
          } else if (hour <= 12) {
            components.imply("meridiem", index_1.Meridiem.AM);
          }
        }
        if (components.date().getTime() < result.start.date().getTime()) {
          components.imply("day", components.get("day") + 1);
        }
        return components;
      }
      checkAndReturnWithoutFollowingPattern(result) {
        if (result.text.match(/^\d$/)) {
          return null;
        }
        if (result.text.match(/^\d\d\d+$/)) {
          return null;
        }
        if (result.text.match(/\d[apAP]$/)) {
          return null;
        }
        const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)$/);
        if (endingWithNumbers) {
          const endingNumbers = endingWithNumbers[1];
          if (this.strictMode) {
            return null;
          }
          if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
            return null;
          }
          const endingNumberVal = parseInt(endingNumbers);
          if (endingNumberVal > 24) {
            return null;
          }
        }
        return result;
      }
      checkAndReturnWithFollowingPattern(result) {
        if (result.text.match(/^\d+-\d+$/)) {
          return null;
        }
        const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
        if (endingWithNumbers) {
          if (this.strictMode) {
            return null;
          }
          const startingNumbers = endingWithNumbers[1];
          const endingNumbers = endingWithNumbers[2];
          if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
            return null;
          }
          const endingNumberVal = parseInt(endingNumbers);
          const startingNumberVal = parseInt(startingNumbers);
          if (endingNumberVal > 24 || startingNumberVal > 24) {
            return null;
          }
        }
        return result;
      }
      getPrimaryTimePatternThroughCache() {
        const primaryPrefix = this.primaryPrefix();
        const primarySuffix = this.primarySuffix();
        if (this.cachedPrimaryPrefix === primaryPrefix && this.cachedPrimarySuffix === primarySuffix) {
          return this.cachedPrimaryTimePattern;
        }
        this.cachedPrimaryTimePattern = primaryTimePattern(this.primaryPatternLeftBoundary(), primaryPrefix, primarySuffix, this.patternFlags());
        this.cachedPrimaryPrefix = primaryPrefix;
        this.cachedPrimarySuffix = primarySuffix;
        return this.cachedPrimaryTimePattern;
      }
      getFollowingTimePatternThroughCache() {
        const followingPhase = this.followingPhase();
        const followingSuffix = this.followingSuffix();
        if (this.cachedFollowingPhase === followingPhase && this.cachedFollowingSuffix === followingSuffix) {
          return this.cachedFollowingTimePatten;
        }
        this.cachedFollowingTimePatten = followingTimePatten(followingPhase, followingSuffix);
        this.cachedFollowingPhase = followingPhase;
        this.cachedFollowingSuffix = followingSuffix;
        return this.cachedFollowingTimePatten;
      }
    };
    exports.AbstractTimeExpressionParser = AbstractTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENTimeExpressionParser.js
var require_ENTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var ENTimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      constructor(strictMode) {
        super(strictMode);
      }
      followingPhase() {
        return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|to|\\?)\\s*";
      }
      primaryPrefix() {
        return "(?:(?:at|from)\\s*)??";
      }
      primarySuffix() {
        return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
      }
      extractPrimaryTimeComponents(context, match) {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
          if (match[0].endsWith("night")) {
            const hour = components.get("hour");
            if (hour >= 6 && hour < 12) {
              components.assign("hour", components.get("hour") + 12);
              components.assign("meridiem", index_1.Meridiem.PM);
            } else if (hour < 6) {
              components.assign("meridiem", index_1.Meridiem.AM);
            }
          }
          if (match[0].endsWith("afternoon")) {
            components.assign("meridiem", index_1.Meridiem.PM);
            const hour = components.get("hour");
            if (hour >= 0 && hour <= 6) {
              components.assign("hour", components.get("hour") + 12);
            }
          }
          if (match[0].endsWith("morning")) {
            components.assign("meridiem", index_1.Meridiem.AM);
            const hour = components.get("hour");
            if (hour < 12) {
              components.assign("hour", components.get("hour"));
            }
          }
        }
        return components;
      }
    };
    exports.default = ENTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/utils/timeunits.js
var require_timeunits = __commonJS({
  "node_modules/chrono-node/dist/utils/timeunits.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addImpliedTimeUnits = exports.reverseTimeUnits = void 0;
    function reverseTimeUnits(timeUnits) {
      const reversed = {};
      for (const key in timeUnits) {
        reversed[key] = -timeUnits[key];
      }
      return reversed;
    }
    exports.reverseTimeUnits = reverseTimeUnits;
    function addImpliedTimeUnits(components, timeUnits) {
      const output = components.clone();
      let date = components.dayjs();
      for (const key in timeUnits) {
        date = date.add(timeUnits[key], key);
      }
      if ("day" in timeUnits || "d" in timeUnits || "week" in timeUnits || "month" in timeUnits || "year" in timeUnits) {
        output.imply("day", date.date());
        output.imply("month", date.month() + 1);
        output.imply("year", date.year());
      }
      if ("second" in timeUnits || "minute" in timeUnits || "hour" in timeUnits) {
        output.imply("second", date.second());
        output.imply("minute", date.minute());
        output.imply("hour", date.hour());
      }
      return output;
    }
    exports.addImpliedTimeUnits = addImpliedTimeUnits;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitAgoFormatParser.js
var require_ENTimeUnitAgoFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitAgoFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp(`(${constants_1.TIME_UNITS_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=(?:\\W|$))`, "i");
    var STRICT_PATTERN = new RegExp(`(${constants_1.TIME_UNITS_PATTERN})\\s{0,5}ago(?=(?:\\W|$))`, "i");
    var ENTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor(strictMode) {
        super();
        this.strictMode = strictMode;
      }
      innerPattern() {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        const outputTimeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
      }
    };
    exports.default = ENTimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitLaterFormatParser.js
var require_ENTimeUnitLaterFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitLaterFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(${constants_1.TIME_UNITS_PATTERN})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i");
    var STRICT_PATTERN = new RegExp("(" + constants_1.TIME_UNITS_PATTERN + ")(later|from now)(?=(?:\\W|$))", "i");
    var GROUP_NUM_TIMEUNITS = 1;
    var ENTimeUnitLaterFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor(strictMode) {
        super();
        this.strictMode = strictMode;
      }
      innerPattern() {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
      }
      innerExtract(context, match) {
        const fragments = constants_1.parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, fragments);
      }
    };
    exports.default = ENTimeUnitLaterFormatParser;
  }
});

// node_modules/chrono-node/dist/common/abstractRefiners.js
var require_abstractRefiners = __commonJS({
  "node_modules/chrono-node/dist/common/abstractRefiners.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MergingRefiner = exports.Filter = void 0;
    var Filter = class {
      refine(context, results) {
        return results.filter((r) => this.isValid(context, r));
      }
    };
    exports.Filter = Filter;
    var MergingRefiner = class {
      refine(context, results) {
        if (results.length < 2) {
          return results;
        }
        const mergedResults = [];
        let curResult = results[0];
        let nextResult = null;
        for (let i = 1; i < results.length; i++) {
          nextResult = results[i];
          const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
          if (!this.shouldMergeResults(textBetween, curResult, nextResult, context)) {
            mergedResults.push(curResult);
            curResult = nextResult;
          } else {
            const left = curResult;
            const right = nextResult;
            const mergedResult = this.mergeResults(textBetween, left, right, context);
            context.debug(() => {
              console.log(`${this.constructor.name} merged ${left} and ${right} into ${mergedResult}`);
            });
            curResult = mergedResult;
          }
        }
        if (curResult != null) {
          mergedResults.push(curResult);
        }
        return mergedResults;
      }
    };
    exports.MergingRefiner = MergingRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/AbstractMergeDateRangeRefiner.js
var require_AbstractMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/AbstractMergeDateRangeRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstractRefiners_1 = require_abstractRefiners();
    var AbstractMergeDateRangeRefiner = class extends abstractRefiners_1.MergingRefiner {
      shouldMergeResults(textBetween, currentResult, nextResult) {
        return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
      }
      mergeResults(textBetween, fromResult, toResult) {
        if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
          toResult.start.getCertainComponents().forEach((key) => {
            if (!fromResult.start.isCertain(key)) {
              fromResult.start.assign(key, toResult.start.get(key));
            }
          });
          fromResult.start.getCertainComponents().forEach((key) => {
            if (!toResult.start.isCertain(key)) {
              toResult.start.assign(key, fromResult.start.get(key));
            }
          });
        }
        if (fromResult.start.date().getTime() > toResult.start.date().getTime()) {
          let fromMoment = fromResult.start.dayjs();
          let toMoment = toResult.start.dayjs();
          if (fromResult.start.isOnlyWeekdayComponent() && fromMoment.add(-7, "days").isBefore(toMoment)) {
            fromMoment = fromMoment.add(-7, "days");
            fromResult.start.imply("day", fromMoment.date());
            fromResult.start.imply("month", fromMoment.month() + 1);
            fromResult.start.imply("year", fromMoment.year());
          } else if (toResult.start.isOnlyWeekdayComponent() && toMoment.add(7, "days").isAfter(fromMoment)) {
            toMoment = toMoment.add(7, "days");
            toResult.start.imply("day", toMoment.date());
            toResult.start.imply("month", toMoment.month() + 1);
            toResult.start.imply("year", toMoment.year());
          } else {
            [toResult, fromResult] = [fromResult, toResult];
          }
        }
        const result = fromResult.clone();
        result.start = fromResult.start;
        result.end = toResult.start;
        result.index = Math.min(fromResult.index, toResult.index);
        if (fromResult.index < toResult.index) {
          result.text = fromResult.text + textBetween + toResult.text;
        } else {
          result.text = toResult.text + textBetween + fromResult.text;
        }
        return result;
      }
    };
    exports.default = AbstractMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/en/refiners/ENMergeDateRangeRefiner.js
var require_ENMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/en/refiners/ENMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var ENMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(to|-)\s*$/i;
      }
    };
    exports.default = ENMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/calculation/mergingCalculation.js
var require_mergingCalculation = __commonJS({
  "node_modules/chrono-node/dist/calculation/mergingCalculation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeDateTimeComponent = exports.mergeDateTimeResult = void 0;
    var index_1 = require_dist();
    function mergeDateTimeResult(dateResult, timeResult) {
      const result = dateResult.clone();
      const beginDate = dateResult.start;
      const beginTime = timeResult.start;
      result.start = mergeDateTimeComponent(beginDate, beginTime);
      if (dateResult.end != null || timeResult.end != null) {
        const endDate = dateResult.end == null ? dateResult.start : dateResult.end;
        const endTime = timeResult.end == null ? timeResult.start : timeResult.end;
        const endDateTime = mergeDateTimeComponent(endDate, endTime);
        if (dateResult.end == null && endDateTime.date().getTime() < result.start.date().getTime()) {
          if (endDateTime.isCertain("day")) {
            endDateTime.assign("day", endDateTime.get("day") + 1);
          } else {
            endDateTime.imply("day", endDateTime.get("day") + 1);
          }
        }
        result.end = endDateTime;
      }
      return result;
    }
    exports.mergeDateTimeResult = mergeDateTimeResult;
    function mergeDateTimeComponent(dateComponent, timeComponent) {
      const dateTimeComponent = dateComponent.clone();
      if (timeComponent.isCertain("hour")) {
        dateTimeComponent.assign("hour", timeComponent.get("hour"));
        dateTimeComponent.assign("minute", timeComponent.get("minute"));
        if (timeComponent.isCertain("second")) {
          dateTimeComponent.assign("second", timeComponent.get("second"));
          if (timeComponent.isCertain("millisecond")) {
            dateTimeComponent.assign("millisecond", timeComponent.get("millisecond"));
          } else {
            dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
          }
        } else {
          dateTimeComponent.imply("second", timeComponent.get("second"));
          dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
        }
      } else {
        dateTimeComponent.imply("hour", timeComponent.get("hour"));
        dateTimeComponent.imply("minute", timeComponent.get("minute"));
        dateTimeComponent.imply("second", timeComponent.get("second"));
        dateTimeComponent.imply("millisecond", timeComponent.get("millisecond"));
      }
      if (timeComponent.isCertain("timezoneOffset")) {
        dateTimeComponent.assign("timezoneOffset", timeComponent.get("timezoneOffset"));
      }
      if (timeComponent.isCertain("meridiem")) {
        dateTimeComponent.assign("meridiem", timeComponent.get("meridiem"));
      } else if (timeComponent.get("meridiem") != null && dateTimeComponent.get("meridiem") == null) {
        dateTimeComponent.imply("meridiem", timeComponent.get("meridiem"));
      }
      if (dateTimeComponent.get("meridiem") == index_1.Meridiem.PM && dateTimeComponent.get("hour") < 12) {
        if (timeComponent.isCertain("hour")) {
          dateTimeComponent.assign("hour", dateTimeComponent.get("hour") + 12);
        } else {
          dateTimeComponent.imply("hour", dateTimeComponent.get("hour") + 12);
        }
      }
      return dateTimeComponent;
    }
    exports.mergeDateTimeComponent = mergeDateTimeComponent;
  }
});

// node_modules/chrono-node/dist/common/refiners/AbstractMergeDateTimeRefiner.js
var require_AbstractMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/AbstractMergeDateTimeRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstractRefiners_1 = require_abstractRefiners();
    var mergingCalculation_1 = require_mergingCalculation();
    var AbstractMergeDateTimeRefiner = class extends abstractRefiners_1.MergingRefiner {
      shouldMergeResults(textBetween, currentResult, nextResult) {
        return (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime() || nextResult.start.isOnlyDate() && currentResult.start.isOnlyTime()) && textBetween.match(this.patternBetween()) != null;
      }
      mergeResults(textBetween, currentResult, nextResult) {
        const result = currentResult.start.isOnlyDate() ? mergingCalculation_1.mergeDateTimeResult(currentResult, nextResult) : mergingCalculation_1.mergeDateTimeResult(nextResult, currentResult);
        result.index = currentResult.index;
        result.text = currentResult.text + textBetween + nextResult.text;
        return result;
      }
    };
    exports.default = AbstractMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/en/refiners/ENMergeDateTimeRefiner.js
var require_ENMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/en/refiners/ENMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var ENMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp("^\\s*(T|at|after|before|on|of|,|-)?\\s*$");
      }
    };
    exports.default = ENMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/ExtractTimezoneAbbrRefiner.js
var require_ExtractTimezoneAbbrRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/ExtractTimezoneAbbrRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TIMEZONE_NAME_PATTERN = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
    var DEFAULT_TIMEZONE_ABBR_MAP = {
      ACDT: 630,
      ACST: 570,
      ADT: -180,
      AEDT: 660,
      AEST: 600,
      AFT: 270,
      AKDT: -480,
      AKST: -540,
      ALMT: 360,
      AMST: -180,
      AMT: -240,
      ANAST: 720,
      ANAT: 720,
      AQTT: 300,
      ART: -180,
      AST: -240,
      AWDT: 540,
      AWST: 480,
      AZOST: 0,
      AZOT: -60,
      AZST: 300,
      AZT: 240,
      BNT: 480,
      BOT: -240,
      BRST: -120,
      BRT: -180,
      BST: 60,
      BTT: 360,
      CAST: 480,
      CAT: 120,
      CCT: 390,
      CDT: -300,
      CEST: 120,
      CET: 60,
      CHADT: 825,
      CHAST: 765,
      CKT: -600,
      CLST: -180,
      CLT: -240,
      COT: -300,
      CST: -360,
      CVT: -60,
      CXT: 420,
      ChST: 600,
      DAVT: 420,
      EASST: -300,
      EAST: -360,
      EAT: 180,
      ECT: -300,
      EDT: -240,
      EEST: 180,
      EET: 120,
      EGST: 0,
      EGT: -60,
      EST: -300,
      ET: -300,
      FJST: 780,
      FJT: 720,
      FKST: -180,
      FKT: -240,
      FNT: -120,
      GALT: -360,
      GAMT: -540,
      GET: 240,
      GFT: -180,
      GILT: 720,
      GMT: 0,
      GST: 240,
      GYT: -240,
      HAA: -180,
      HAC: -300,
      HADT: -540,
      HAE: -240,
      HAP: -420,
      HAR: -360,
      HAST: -600,
      HAT: -90,
      HAY: -480,
      HKT: 480,
      HLV: -210,
      HNA: -240,
      HNC: -360,
      HNE: -300,
      HNP: -480,
      HNR: -420,
      HNT: -150,
      HNY: -540,
      HOVT: 420,
      ICT: 420,
      IDT: 180,
      IOT: 360,
      IRDT: 270,
      IRKST: 540,
      IRKT: 540,
      IRST: 210,
      IST: 330,
      JST: 540,
      KGT: 360,
      KRAST: 480,
      KRAT: 480,
      KST: 540,
      KUYT: 240,
      LHDT: 660,
      LHST: 630,
      LINT: 840,
      MAGST: 720,
      MAGT: 720,
      MART: -510,
      MAWT: 300,
      MDT: -360,
      MESZ: 120,
      MEZ: 60,
      MHT: 720,
      MMT: 390,
      MSD: 240,
      MSK: 240,
      MST: -420,
      MUT: 240,
      MVT: 300,
      MYT: 480,
      NCT: 660,
      NDT: -90,
      NFT: 690,
      NOVST: 420,
      NOVT: 360,
      NPT: 345,
      NST: -150,
      NUT: -660,
      NZDT: 780,
      NZST: 720,
      OMSST: 420,
      OMST: 420,
      PDT: -420,
      PET: -300,
      PETST: 720,
      PETT: 720,
      PGT: 600,
      PHOT: 780,
      PHT: 480,
      PKT: 300,
      PMDT: -120,
      PMST: -180,
      PONT: 660,
      PST: -480,
      PT: -480,
      PWT: 540,
      PYST: -180,
      PYT: -240,
      RET: 240,
      SAMT: 240,
      SAST: 120,
      SBT: 660,
      SCT: 240,
      SGT: 480,
      SRT: -180,
      SST: -660,
      TAHT: -600,
      TFT: 300,
      TJT: 300,
      TKT: 780,
      TLT: 540,
      TMT: 300,
      TVT: 720,
      ULAT: 480,
      UTC: 0,
      UYST: -120,
      UYT: -180,
      UZT: 300,
      VET: -210,
      VLAST: 660,
      VLAT: 660,
      VUT: 660,
      WAST: 120,
      WAT: 60,
      WEST: 60,
      WESZ: 60,
      WET: 0,
      WEZ: 0,
      WFT: 720,
      WGST: -120,
      WGT: -180,
      WIB: 420,
      WIT: 540,
      WITA: 480,
      WST: 780,
      WT: 0,
      YAKST: 600,
      YAKT: 600,
      YAPT: 600,
      YEKST: 360,
      YEKT: 360
    };
    var ExtractTimezoneAbbrRefiner = class {
      constructor(timezoneOverrides) {
        this.timezone = Object.assign(Object.assign({}, DEFAULT_TIMEZONE_ABBR_MAP), timezoneOverrides);
      }
      refine(context, results) {
        var _a;
        const timezoneOverrides = (_a = context.option.timezones) !== null && _a !== void 0 ? _a : {};
        results.forEach((result) => {
          var _a2, _b;
          const suffix = context.text.substring(result.index + result.text.length);
          const match = TIMEZONE_NAME_PATTERN.exec(suffix);
          if (!match) {
            return;
          }
          const timezoneAbbr = match[1].toUpperCase();
          const extractedTimezoneOffset = (_b = (_a2 = timezoneOverrides[timezoneAbbr]) !== null && _a2 !== void 0 ? _a2 : this.timezone[timezoneAbbr]) !== null && _b !== void 0 ? _b : null;
          if (extractedTimezoneOffset === null) {
            return;
          }
          context.debug(() => {
            console.log(`Extracting timezone: '${timezoneAbbr}' into: ${extractedTimezoneOffset} for: ${result.start}`);
          });
          const currentTimezoneOffset = result.start.get("timezoneOffset");
          if (currentTimezoneOffset !== null && extractedTimezoneOffset != currentTimezoneOffset) {
            if (result.start.isCertain("timezoneOffset")) {
              return;
            }
            if (timezoneAbbr != match[1]) {
              return;
            }
          }
          if (result.start.isOnlyDate()) {
            if (timezoneAbbr != match[1]) {
              return;
            }
          }
          result.text += match[0];
          if (!result.start.isCertain("timezoneOffset")) {
            result.start.assign("timezoneOffset", extractedTimezoneOffset);
          }
          if (result.end != null && !result.end.isCertain("timezoneOffset")) {
            result.end.assign("timezoneOffset", extractedTimezoneOffset);
          }
        });
        return results;
      }
    };
    exports.default = ExtractTimezoneAbbrRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/ExtractTimezoneOffsetRefiner.js
var require_ExtractTimezoneOffsetRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/ExtractTimezoneOffsetRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i");
    var TIMEZONE_OFFSET_SIGN_GROUP = 1;
    var TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 2;
    var TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 3;
    var ExtractTimezoneOffsetRefiner = class {
      refine(context, results) {
        results.forEach(function(result) {
          if (result.start.isCertain("timezoneOffset")) {
            return;
          }
          const suffix = context.text.substring(result.index + result.text.length);
          const match = TIMEZONE_OFFSET_PATTERN.exec(suffix);
          if (!match) {
            return;
          }
          context.debug(() => {
            console.log(`Extracting timezone: '${match[0]}' into : ${result}`);
          });
          const hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
          const minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP] || "0");
          let timezoneOffset = hourOffset * 60 + minuteOffset;
          if (timezoneOffset > 14 * 60) {
            return;
          }
          if (match[TIMEZONE_OFFSET_SIGN_GROUP] === "-") {
            timezoneOffset = -timezoneOffset;
          }
          if (result.end != null) {
            result.end.assign("timezoneOffset", timezoneOffset);
          }
          result.start.assign("timezoneOffset", timezoneOffset);
          result.text += match[0];
        });
        return results;
      }
    };
    exports.default = ExtractTimezoneOffsetRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/OverlapRemovalRefiner.js
var require_OverlapRemovalRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/OverlapRemovalRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OverlapRemovalRefiner = class {
      refine(context, results) {
        if (results.length < 2) {
          return results;
        }
        const filteredResults = [];
        let prevResult = results[0];
        for (let i = 1; i < results.length; i++) {
          const result = results[i];
          if (result.index < prevResult.index + prevResult.text.length) {
            if (result.text.length > prevResult.text.length) {
              prevResult = result;
            }
          } else {
            filteredResults.push(prevResult);
            prevResult = result;
          }
        }
        if (prevResult != null) {
          filteredResults.push(prevResult);
        }
        return filteredResults;
      }
    };
    exports.default = OverlapRemovalRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/ForwardDateRefiner.js
var require_ForwardDateRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/ForwardDateRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var dayjs_2 = require_dayjs();
    var ForwardDateRefiner = class {
      refine(context, results) {
        if (!context.option.forwardDate) {
          return results;
        }
        results.forEach(function(result) {
          let refMoment = dayjs_1.default(context.refDate);
          if (result.start.isOnlyTime() && refMoment.isAfter(result.start.dayjs())) {
            refMoment = refMoment.add(1, "day");
            dayjs_2.implySimilarDate(result.start, refMoment);
            if (result.end && result.end.isOnlyTime()) {
              dayjs_2.implySimilarDate(result.end, refMoment);
              if (result.start.dayjs().isAfter(result.end.dayjs())) {
                refMoment = refMoment.add(1, "day");
                dayjs_2.implySimilarDate(result.end, refMoment);
              }
            }
          }
          if (result.start.isOnlyDayMonthComponent() && refMoment.isAfter(result.start.dayjs())) {
            for (let i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
              result.start.imply("year", result.start.get("year") + 1);
              context.debug(() => {
                console.log(`Forward yearly adjusted for ${result} (${result.start})`);
              });
              if (result.end && !result.end.isCertain("year")) {
                result.end.imply("year", result.end.get("year") + 1);
                context.debug(() => {
                  console.log(`Forward yearly adjusted for ${result} (${result.end})`);
                });
              }
            }
          }
          if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
            if (refMoment.day() >= result.start.get("weekday")) {
              refMoment = refMoment.day(result.start.get("weekday") + 7);
            } else {
              refMoment = refMoment.day(result.start.get("weekday"));
            }
            result.start.imply("day", refMoment.date());
            result.start.imply("month", refMoment.month() + 1);
            result.start.imply("year", refMoment.year());
            context.debug(() => {
              console.log(`Forward weekly adjusted for ${result} (${result.start})`);
            });
            if (result.end && result.end.isOnlyWeekdayComponent()) {
              if (refMoment.day() > result.end.get("weekday")) {
                refMoment = refMoment.day(result.end.get("weekday") + 7);
              } else {
                refMoment = refMoment.day(result.end.get("weekday"));
              }
              result.end.imply("day", refMoment.date());
              result.end.imply("month", refMoment.month() + 1);
              result.end.imply("year", refMoment.year());
              context.debug(() => {
                console.log(`Forward weekly adjusted for ${result} (${result.end})`);
              });
            }
          }
        });
        return results;
      }
    };
    exports.default = ForwardDateRefiner;
  }
});

// node_modules/chrono-node/dist/common/refiners/UnlikelyFormatFilter.js
var require_UnlikelyFormatFilter = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/UnlikelyFormatFilter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstractRefiners_1 = require_abstractRefiners();
    var UnlikelyFormatFilter = class extends abstractRefiners_1.Filter {
      constructor(strictMode) {
        super();
        this.strictMode = strictMode;
      }
      isValid(context, result) {
        if (result.text.replace(" ", "").match(/^\d*(\.\d*)?$/)) {
          context.debug(() => {
            console.log(`Removing unlikely result '${result.text}'`);
          });
          return false;
        }
        if (!result.start.isValidDate()) {
          context.debug(() => {
            console.log(`Removing invalid result: ${result} (${result.start})`);
          });
          return false;
        }
        if (result.end && !result.end.isValidDate()) {
          context.debug(() => {
            console.log(`Removing invalid result: ${result} (${result.end})`);
          });
          return false;
        }
        if (this.strictMode) {
          return this.isStrictModeValid(context, result);
        }
        return true;
      }
      isStrictModeValid(context, result) {
        if (result.start.isOnlyWeekdayComponent()) {
          context.debug(() => {
            console.log(`(Strict) Removing weekday only component: ${result} (${result.end})`);
          });
          return false;
        }
        if (result.start.isOnlyTime() && (!result.start.isCertain("hour") || !result.start.isCertain("minute"))) {
          context.debug(() => {
            console.log(`(Strict) Removing uncertain time component: ${result} (${result.end})`);
          });
          return false;
        }
        return true;
      }
    };
    exports.default = UnlikelyFormatFilter;
  }
});

// node_modules/chrono-node/dist/common/parsers/ISOFormatParser.js
var require_ISOFormatParser = __commonJS({
  "node_modules/chrono-node/dist/common/parsers/ISOFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(?:Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i");
    var YEAR_NUMBER_GROUP = 1;
    var MONTH_NUMBER_GROUP = 2;
    var DATE_NUMBER_GROUP = 3;
    var HOUR_NUMBER_GROUP = 4;
    var MINUTE_NUMBER_GROUP = 5;
    var SECOND_NUMBER_GROUP = 6;
    var MILLISECOND_NUMBER_GROUP = 7;
    var TZD_HOUR_OFFSET_GROUP = 8;
    var TZD_MINUTE_OFFSET_GROUP = 9;
    var ISOFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const components = {};
        components["year"] = parseInt(match[YEAR_NUMBER_GROUP]);
        components["month"] = parseInt(match[MONTH_NUMBER_GROUP]);
        components["day"] = parseInt(match[DATE_NUMBER_GROUP]);
        if (match[HOUR_NUMBER_GROUP] != null) {
          components["hour"] = parseInt(match[HOUR_NUMBER_GROUP]);
          components["minute"] = parseInt(match[MINUTE_NUMBER_GROUP]);
          if (match[SECOND_NUMBER_GROUP] != null) {
            components["second"] = parseInt(match[SECOND_NUMBER_GROUP]);
          }
          if (match[MILLISECOND_NUMBER_GROUP] != null) {
            components["millisecond"] = parseInt(match[MILLISECOND_NUMBER_GROUP]);
          }
          if (match[TZD_HOUR_OFFSET_GROUP] == null) {
            components["timezoneOffset"] = 0;
          } else {
            const hourOffset = parseInt(match[TZD_HOUR_OFFSET_GROUP]);
            let minuteOffset = 0;
            if (match[TZD_MINUTE_OFFSET_GROUP] != null) {
              minuteOffset = parseInt(match[TZD_MINUTE_OFFSET_GROUP]);
            }
            let offset = hourOffset * 60;
            if (offset < 0) {
              offset -= minuteOffset;
            } else {
              offset += minuteOffset;
            }
            components["timezoneOffset"] = offset;
          }
        }
        return components;
      }
    };
    exports.default = ISOFormatParser;
  }
});

// node_modules/chrono-node/dist/common/refiners/MergeWeekdayComponentRefiner.js
var require_MergeWeekdayComponentRefiner = __commonJS({
  "node_modules/chrono-node/dist/common/refiners/MergeWeekdayComponentRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstractRefiners_1 = require_abstractRefiners();
    var MergeWeekdayComponentRefiner = class extends abstractRefiners_1.MergingRefiner {
      mergeResults(textBetween, currentResult, nextResult) {
        const newResult = nextResult.clone();
        newResult.index = currentResult.index;
        newResult.text = currentResult.text + textBetween + newResult.text;
        newResult.start.assign("weekday", currentResult.start.get("weekday"));
        if (newResult.end) {
          newResult.end.assign("weekday", currentResult.start.get("weekday"));
        }
        return newResult;
      }
      shouldMergeResults(textBetween, currentResult, nextResult) {
        const weekdayThenNormalDate = currentResult.start.isOnlyWeekdayComponent() && !currentResult.start.isCertain("hour") && nextResult.start.isCertain("day");
        return weekdayThenNormalDate && textBetween.match(/^,?\s*$/) != null;
      }
    };
    exports.default = MergeWeekdayComponentRefiner;
  }
});

// node_modules/chrono-node/dist/configurations.js
var require_configurations = __commonJS({
  "node_modules/chrono-node/dist/configurations.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.includeCommonConfiguration = void 0;
    var ExtractTimezoneAbbrRefiner_1 = __importDefault(require_ExtractTimezoneAbbrRefiner());
    var ExtractTimezoneOffsetRefiner_1 = __importDefault(require_ExtractTimezoneOffsetRefiner());
    var OverlapRemovalRefiner_1 = __importDefault(require_OverlapRemovalRefiner());
    var ForwardDateRefiner_1 = __importDefault(require_ForwardDateRefiner());
    var UnlikelyFormatFilter_1 = __importDefault(require_UnlikelyFormatFilter());
    var ISOFormatParser_1 = __importDefault(require_ISOFormatParser());
    var MergeWeekdayComponentRefiner_1 = __importDefault(require_MergeWeekdayComponentRefiner());
    function includeCommonConfiguration(configuration, strictMode = false) {
      configuration.parsers.unshift(new ISOFormatParser_1.default());
      configuration.refiners.unshift(new MergeWeekdayComponentRefiner_1.default());
      configuration.refiners.unshift(new ExtractTimezoneAbbrRefiner_1.default());
      configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner_1.default());
      configuration.refiners.unshift(new OverlapRemovalRefiner_1.default());
      configuration.refiners.push(new OverlapRemovalRefiner_1.default());
      configuration.refiners.push(new ForwardDateRefiner_1.default());
      configuration.refiners.push(new UnlikelyFormatFilter_1.default(strictMode));
      return configuration;
    }
    exports.includeCommonConfiguration = includeCommonConfiguration;
  }
});

// node_modules/chrono-node/dist/common/casualReferences.js
var require_casualReferences = __commonJS({
  "node_modules/chrono-node/dist/common/casualReferences.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noon = exports.morning = exports.midnight = exports.yesterdayEvening = exports.evening = exports.lastNight = exports.tonight = exports.theDayAfter = exports.tomorrow = exports.theDayBefore = exports.yesterday = exports.today = exports.now = void 0;
    var results_1 = require_results();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var dayjs_2 = require_dayjs();
    var index_1 = require_dist();
    function now(reference) {
      const targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      dayjs_2.assignSimilarDate(component, targetDate);
      dayjs_2.assignSimilarTime(component, targetDate);
      if (reference.timezoneOffset !== null) {
        component.assign("timezoneOffset", targetDate.utcOffset());
      }
      return component;
    }
    exports.now = now;
    function today(reference) {
      const targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      dayjs_2.assignSimilarDate(component, targetDate);
      dayjs_2.implySimilarTime(component, targetDate);
      return component;
    }
    exports.today = today;
    function yesterday(reference) {
      return theDayBefore(reference, 1);
    }
    exports.yesterday = yesterday;
    function theDayBefore(reference, numDay) {
      return theDayAfter(reference, -numDay);
    }
    exports.theDayBefore = theDayBefore;
    function tomorrow(reference) {
      return theDayAfter(reference, 1);
    }
    exports.tomorrow = tomorrow;
    function theDayAfter(reference, nDays) {
      let targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      targetDate = targetDate.add(nDays, "day");
      dayjs_2.assignSimilarDate(component, targetDate);
      dayjs_2.implySimilarTime(component, targetDate);
      return component;
    }
    exports.theDayAfter = theDayAfter;
    function tonight(reference, implyHour = 22) {
      const targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      component.imply("hour", implyHour);
      component.imply("meridiem", index_1.Meridiem.PM);
      dayjs_2.assignSimilarDate(component, targetDate);
      return component;
    }
    exports.tonight = tonight;
    function lastNight(reference, implyHour = 0) {
      let targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      if (targetDate.hour() < 6) {
        targetDate = targetDate.add(-1, "day");
      }
      dayjs_2.assignSimilarDate(component, targetDate);
      component.imply("hour", implyHour);
      return component;
    }
    exports.lastNight = lastNight;
    function evening(reference, implyHour = 20) {
      const component = new results_1.ParsingComponents(reference, {});
      component.imply("meridiem", index_1.Meridiem.PM);
      component.imply("hour", implyHour);
      return component;
    }
    exports.evening = evening;
    function yesterdayEvening(reference, implyHour = 20) {
      let targetDate = dayjs_1.default(reference.instant);
      const component = new results_1.ParsingComponents(reference, {});
      targetDate = targetDate.add(-1, "day");
      dayjs_2.assignSimilarDate(component, targetDate);
      component.imply("hour", implyHour);
      component.imply("meridiem", index_1.Meridiem.PM);
      return component;
    }
    exports.yesterdayEvening = yesterdayEvening;
    function midnight(reference) {
      const component = new results_1.ParsingComponents(reference, {});
      component.imply("hour", 0);
      component.imply("minute", 0);
      component.imply("second", 0);
      return component;
    }
    exports.midnight = midnight;
    function morning(reference, implyHour = 6) {
      const component = new results_1.ParsingComponents(reference, {});
      component.imply("meridiem", index_1.Meridiem.AM);
      component.imply("hour", implyHour);
      return component;
    }
    exports.morning = morning;
    function noon(reference) {
      const component = new results_1.ParsingComponents(reference, {});
      component.imply("meridiem", index_1.Meridiem.AM);
      component.imply("hour", 12);
      return component;
    }
    exports.noon = noon;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENCasualDateParser.js
var require_ENCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_2 = require_dayjs();
    var references = __importStar(require_casualReferences());
    var PATTERN = /(now|today|tonight|tomorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
    var ENCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return PATTERN;
      }
      innerExtract(context, match) {
        let targetDate = dayjs_1.default(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        switch (lowerText) {
          case "now":
            return references.now(context.reference);
          case "today":
            return references.today(context.reference);
          case "yesterday":
            return references.yesterday(context.reference);
          case "tomorrow":
          case "tmr":
          case "tmrw":
            return references.tomorrow(context.reference);
          case "tonight":
            return references.tonight(context.reference);
          default:
            if (lowerText.match(/last\s*night/)) {
              if (targetDate.hour() > 6) {
                targetDate = targetDate.add(-1, "day");
              }
              dayjs_2.assignSimilarDate(component, targetDate);
              component.imply("hour", 0);
            }
            break;
        }
        return component;
      }
    };
    exports.default = ENCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENCasualTimeParser.js
var require_ENCasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENCasualTimeParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var dayjs_2 = require_dayjs();
    var PATTERN = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|noon)(?=\W|$)/i;
    var ENCasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const targetDate = dayjs_1.default(context.refDate);
        const component = context.createParsingComponents();
        switch (match[1].toLowerCase()) {
          case "afternoon":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 15);
            break;
          case "evening":
          case "night":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 20);
            break;
          case "midnight":
            dayjs_2.implyTheNextDay(component, targetDate);
            component.assign("hour", 0);
            component.assign("minute", 0);
            component.assign("second", 0);
            break;
          case "morning":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 6);
            break;
          case "noon":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 12);
            break;
        }
        return component;
      }
    };
    exports.default = ENCasualTimeParser;
  }
});

// node_modules/chrono-node/dist/common/calculation/weekdays.js
var require_weekdays = __commonJS({
  "node_modules/chrono-node/dist/common/calculation/weekdays.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBackwardDaysToWeekday = exports.getDaysForwardToWeekday = exports.getDaysToWeekdayClosest = exports.getDaysToWeekday = exports.createParsingComponentsAtWeekday = void 0;
    var index_1 = require_dist();
    var results_1 = require_results();
    var timeunits_1 = require_timeunits();
    function createParsingComponentsAtWeekday(reference, weekday, modifier) {
      const refDate = reference.getDateWithAdjustedTimezone();
      const daysToWeekday = getDaysToWeekday(refDate, weekday, modifier);
      let components = new results_1.ParsingComponents(reference);
      components = timeunits_1.addImpliedTimeUnits(components, { "day": daysToWeekday });
      components.assign("weekday", weekday);
      return components;
    }
    exports.createParsingComponentsAtWeekday = createParsingComponentsAtWeekday;
    function getDaysToWeekday(refDate, weekday, modifier) {
      const refWeekday = refDate.getDay();
      switch (modifier) {
        case "this":
          return getDaysForwardToWeekday(refDate, weekday);
        case "last":
          return getBackwardDaysToWeekday(refDate, weekday);
        case "next":
          if (refWeekday == index_1.Weekday.SUNDAY) {
            return weekday == index_1.Weekday.SUNDAY ? 7 : weekday;
          }
          if (refWeekday == index_1.Weekday.SATURDAY) {
            if (weekday == index_1.Weekday.SATURDAY)
              return 7;
            if (weekday == index_1.Weekday.SUNDAY)
              return 8;
            return 1 + weekday;
          }
          if (weekday < refWeekday && weekday != index_1.Weekday.SUNDAY) {
            return getDaysForwardToWeekday(refDate, weekday);
          } else {
            return getDaysForwardToWeekday(refDate, weekday) + 7;
          }
      }
      return getDaysToWeekdayClosest(refDate, weekday);
    }
    exports.getDaysToWeekday = getDaysToWeekday;
    function getDaysToWeekdayClosest(refDate, weekday) {
      const backward = getBackwardDaysToWeekday(refDate, weekday);
      const forward = getDaysForwardToWeekday(refDate, weekday);
      return forward < -backward ? forward : backward;
    }
    exports.getDaysToWeekdayClosest = getDaysToWeekdayClosest;
    function getDaysForwardToWeekday(refDate, weekday) {
      const refWeekday = refDate.getDay();
      let forwardCount = weekday - refWeekday;
      if (forwardCount < 0) {
        forwardCount += 7;
      }
      return forwardCount;
    }
    exports.getDaysForwardToWeekday = getDaysForwardToWeekday;
    function getBackwardDaysToWeekday(refDate, weekday) {
      const refWeekday = refDate.getDay();
      let backwardCount = weekday - refWeekday;
      if (backwardCount >= 0) {
        backwardCount -= 7;
      }
      return backwardCount;
    }
    exports.getBackwardDaysToWeekday = getBackwardDaysToWeekday;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENWeekdayParser.js
var require_ENWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(this|last|past|next)\\s*week)?(?=\\W|$)`, "i");
    var PREFIX_GROUP = 1;
    var WEEKDAY_GROUP = 2;
    var POSTFIX_GROUP = 3;
    var ENWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();
        let modifier = null;
        if (modifierWord == "last" || modifierWord == "past") {
          modifier = "last";
        } else if (modifierWord == "next") {
          modifier = "next";
        } else if (modifierWord == "this") {
          modifier = "this";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, weekday, modifier);
      }
    };
    exports.default = ENWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENRelativeDateFormatParser.js
var require_ENRelativeDateFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENRelativeDateFormatParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var results_1 = require_results();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var pattern_1 = require_pattern();
    var PATTERN = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${pattern_1.matchAnyPattern(constants_1.TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i");
    var MODIFIER_WORD_GROUP = 1;
    var RELATIVE_WORD_GROUP = 2;
    var ENRelativeDateFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
        const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
        const timeunit = constants_1.TIME_UNIT_DICTIONARY[unitWord];
        if (modifier == "next" || modifier.startsWith("after")) {
          const timeUnits = {};
          timeUnits[timeunit] = 1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        if (modifier == "last" || modifier == "past") {
          const timeUnits = {};
          timeUnits[timeunit] = -1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        const components = context.createParsingComponents();
        let date = dayjs_1.default(context.reference.instant);
        if (unitWord.match(/week/i)) {
          date = date.add(-date.get("d"), "d");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.imply("year", date.year());
        } else if (unitWord.match(/month/i)) {
          date = date.add(-date.date() + 1, "d");
          components.imply("day", date.date());
          components.assign("year", date.year());
          components.assign("month", date.month() + 1);
        } else if (unitWord.match(/year/i)) {
          date = date.add(-date.date() + 1, "d");
          date = date.add(-date.month(), "month");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.assign("year", date.year());
        }
        return components;
      }
    };
    exports.default = ENRelativeDateFormatParser;
  }
});

// node_modules/chrono-node/dist/chrono.js
var require_chrono = __commonJS({
  "node_modules/chrono-node/dist/chrono.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParsingContext = exports.Chrono = void 0;
    var results_1 = require_results();
    var en_1 = require_en();
    var Chrono = class {
      constructor(configuration) {
        configuration = configuration || en_1.createCasualConfiguration();
        this.parsers = [...configuration.parsers];
        this.refiners = [...configuration.refiners];
      }
      clone() {
        return new Chrono({
          parsers: [...this.parsers],
          refiners: [...this.refiners]
        });
      }
      parseDate(text, referenceDate, option) {
        const results = this.parse(text, referenceDate, option);
        return results.length > 0 ? results[0].start.date() : null;
      }
      parse(text, referenceDate, option) {
        const context = new ParsingContext(text, referenceDate, option);
        let results = [];
        this.parsers.forEach((parser2) => {
          const parsedResults = Chrono.executeParser(context, parser2);
          results = results.concat(parsedResults);
        });
        results.sort((a, b) => {
          return a.index - b.index;
        });
        this.refiners.forEach(function(refiner) {
          results = refiner.refine(context, results);
        });
        return results;
      }
      static executeParser(context, parser2) {
        const results = [];
        const pattern = parser2.pattern(context);
        const originalText = context.text;
        let remainingText = context.text;
        let match = pattern.exec(remainingText);
        while (match) {
          const index = match.index + originalText.length - remainingText.length;
          match.index = index;
          const result = parser2.extract(context, match);
          if (!result) {
            remainingText = originalText.substring(match.index + 1);
            match = pattern.exec(remainingText);
            continue;
          }
          let parsedResult = null;
          if (result instanceof results_1.ParsingResult) {
            parsedResult = result;
          } else if (result instanceof results_1.ParsingComponents) {
            parsedResult = context.createParsingResult(match.index, match[0]);
            parsedResult.start = result;
          } else {
            parsedResult = context.createParsingResult(match.index, match[0], result);
          }
          context.debug(() => console.log(`${parser2.constructor.name} extracted result ${parsedResult}`));
          results.push(parsedResult);
          remainingText = originalText.substring(index + parsedResult.text.length);
          match = pattern.exec(remainingText);
        }
        return results;
      }
    };
    exports.Chrono = Chrono;
    var ParsingContext = class {
      constructor(text, refDate, option) {
        this.text = text;
        this.reference = new results_1.ReferenceWithTimezone(refDate);
        this.option = option !== null && option !== void 0 ? option : {};
        this.refDate = this.reference.instant;
      }
      createParsingComponents(components) {
        if (components instanceof results_1.ParsingComponents) {
          return components;
        }
        return new results_1.ParsingComponents(this.reference, components);
      }
      createParsingResult(index, textOrEndIndex, startComponents, endComponents) {
        const text = typeof textOrEndIndex === "string" ? textOrEndIndex : this.text.substring(index, textOrEndIndex);
        const start = startComponents ? this.createParsingComponents(startComponents) : null;
        const end = endComponents ? this.createParsingComponents(endComponents) : null;
        return new results_1.ParsingResult(this.reference, index, text, start, end);
      }
      debug(block) {
        if (this.option.debug) {
          if (this.option.debug instanceof Function) {
            this.option.debug(block);
          } else {
            const handler = this.option.debug;
            handler.debug(block);
          }
        }
      }
    };
    exports.ParsingContext = ParsingContext;
  }
});

// node_modules/chrono-node/dist/common/parsers/SlashDateFormatParser.js
var require_SlashDateFormatParser = __commonJS({
  "node_modules/chrono-node/dist/common/parsers/SlashDateFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var PATTERN = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i");
    var OPENING_GROUP = 1;
    var ENDING_GROUP = 5;
    var FIRST_NUMBERS_GROUP = 2;
    var SECOND_NUMBERS_GROUP = 3;
    var YEAR_GROUP = 4;
    var SlashDateFormatParser = class {
      constructor(littleEndian) {
        this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
        this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
      }
      pattern() {
        return PATTERN;
      }
      extract(context, match) {
        if (match[OPENING_GROUP].length == 0 && match.index > 0 && match.index < context.text.length) {
          const previousChar = context.text[match.index - 1];
          if (previousChar >= "0" && previousChar <= "9") {
            return;
          }
        }
        const index = match.index + match[OPENING_GROUP].length;
        const text = match[0].substr(match[OPENING_GROUP].length, match[0].length - match[OPENING_GROUP].length - match[ENDING_GROUP].length);
        if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
          return;
        }
        if (!match[YEAR_GROUP] && match[0].indexOf("/") < 0) {
          return;
        }
        const result = context.createParsingResult(index, text);
        let month = parseInt(match[this.groupNumberMonth]);
        let day = parseInt(match[this.groupNumberDay]);
        if (month < 1 || month > 12) {
          if (month > 12) {
            if (day >= 1 && day <= 12 && month <= 31) {
              [day, month] = [month, day];
            } else {
              return null;
            }
          }
        }
        if (day < 1 || day > 31) {
          return null;
        }
        result.start.assign("day", day);
        result.start.assign("month", month);
        if (match[YEAR_GROUP]) {
          const rawYearNumber = parseInt(match[YEAR_GROUP]);
          const year = years_1.findMostLikelyADYear(rawYearNumber);
          result.start.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        return result;
      }
    };
    exports.default = SlashDateFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitCasualRelativeFormatParser.js
var require_ENTimeUnitCasualRelativeFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/en/parsers/ENTimeUnitCasualRelativeFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    var ENTimeUnitCasualRelativeFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const prefix = match[1].toLowerCase();
        let timeUnits = constants_1.parseTimeUnits(match[2]);
        switch (prefix) {
          case "last":
          case "past":
          case "-":
            timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
            break;
        }
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = ENTimeUnitCasualRelativeFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/en/refiners/ENMergeRelativeDateRefiner.js
var require_ENMergeRelativeDateRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/en/refiners/ENMergeRelativeDateRefiner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstractRefiners_1 = require_abstractRefiners();
    var results_1 = require_results();
    var constants_1 = require_constants();
    var timeunits_1 = require_timeunits();
    function hasImpliedEarlierReferenceDate(result) {
      return result.text.match(/\s+(before|from)$/i) != null;
    }
    function hasImpliedLaterReferenceDate(result) {
      return result.text.match(/\s+(after|since)$/i) != null;
    }
    var ENMergeRelativeDateRefiner = class extends abstractRefiners_1.MergingRefiner {
      patternBetween() {
        return /^\s*$/i;
      }
      shouldMergeResults(textBetween, currentResult, nextResult) {
        if (!textBetween.match(this.patternBetween())) {
          return false;
        }
        if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
          return false;
        }
        return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
      }
      mergeResults(textBetween, currentResult, nextResult) {
        let timeUnits = constants_1.parseTimeUnits(currentResult.text);
        if (hasImpliedEarlierReferenceDate(currentResult)) {
          timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        }
        const components = results_1.ParsingComponents.createRelativeFromReference(new results_1.ReferenceWithTimezone(nextResult.start.date()), timeUnits);
        return new results_1.ParsingResult(nextResult.reference, currentResult.index, `${currentResult.text}${textBetween}${nextResult.text}`, components);
      }
    };
    exports.default = ENMergeRelativeDateRefiner;
  }
});

// node_modules/chrono-node/dist/locales/en/index.js
var require_en = __commonJS({
  "node_modules/chrono-node/dist/locales/en/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.GB = exports.strict = exports.casual = void 0;
    var ENTimeUnitWithinFormatParser_1 = __importDefault(require_ENTimeUnitWithinFormatParser());
    var ENMonthNameLittleEndianParser_1 = __importDefault(require_ENMonthNameLittleEndianParser());
    var ENMonthNameMiddleEndianParser_1 = __importDefault(require_ENMonthNameMiddleEndianParser());
    var ENMonthNameParser_1 = __importDefault(require_ENMonthNameParser());
    var ENCasualYearMonthDayParser_1 = __importDefault(require_ENCasualYearMonthDayParser());
    var ENSlashMonthFormatParser_1 = __importDefault(require_ENSlashMonthFormatParser());
    var ENTimeExpressionParser_1 = __importDefault(require_ENTimeExpressionParser());
    var ENTimeUnitAgoFormatParser_1 = __importDefault(require_ENTimeUnitAgoFormatParser());
    var ENTimeUnitLaterFormatParser_1 = __importDefault(require_ENTimeUnitLaterFormatParser());
    var ENMergeDateRangeRefiner_1 = __importDefault(require_ENMergeDateRangeRefiner());
    var ENMergeDateTimeRefiner_1 = __importDefault(require_ENMergeDateTimeRefiner());
    var configurations_1 = require_configurations();
    var ENCasualDateParser_1 = __importDefault(require_ENCasualDateParser());
    var ENCasualTimeParser_1 = __importDefault(require_ENCasualTimeParser());
    var ENWeekdayParser_1 = __importDefault(require_ENWeekdayParser());
    var ENRelativeDateFormatParser_1 = __importDefault(require_ENRelativeDateFormatParser());
    var chrono_1 = require_chrono();
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var ENTimeUnitCasualRelativeFormatParser_1 = __importDefault(require_ENTimeUnitCasualRelativeFormatParser());
    var ENMergeRelativeDateRefiner_1 = __importDefault(require_ENMergeRelativeDateRefiner());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration(false));
    exports.strict = new chrono_1.Chrono(createConfiguration(true, false));
    exports.GB = new chrono_1.Chrono(createConfiguration(false, true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration(littleEndian = false) {
      const option = createConfiguration(false, littleEndian);
      option.parsers.unshift(new ENCasualDateParser_1.default());
      option.parsers.unshift(new ENCasualTimeParser_1.default());
      option.parsers.unshift(new ENMonthNameParser_1.default());
      option.parsers.unshift(new ENRelativeDateFormatParser_1.default());
      option.parsers.unshift(new ENTimeUnitCasualRelativeFormatParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true, littleEndian = false) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser_1.default(littleEndian),
          new ENTimeUnitWithinFormatParser_1.default(),
          new ENMonthNameLittleEndianParser_1.default(),
          new ENMonthNameMiddleEndianParser_1.default(),
          new ENWeekdayParser_1.default(),
          new ENCasualYearMonthDayParser_1.default(),
          new ENSlashMonthFormatParser_1.default(),
          new ENTimeExpressionParser_1.default(strictMode),
          new ENTimeUnitAgoFormatParser_1.default(strictMode),
          new ENTimeUnitLaterFormatParser_1.default(strictMode)
        ],
        refiners: [new ENMergeRelativeDateRefiner_1.default(), new ENMergeDateTimeRefiner_1.default(), new ENMergeDateRangeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DETimeExpressionParser.js
var require_DETimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DETimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var DETimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      primaryPrefix() {
        return "(?:(?:um|von)\\s*)?";
      }
      followingPhase() {
        return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|bis)\\s*";
      }
      extractPrimaryTimeComponents(context, match) {
        if (match[0].match(/^\s*\d{4}\s*$/)) {
          return null;
        }
        return super.extractPrimaryTimeComponents(context, match);
      }
    };
    exports.default = DETimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/de/constants.js
var require_constants2 = __commonJS({
  "node_modules/chrono-node/dist/locales/de/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTimeUnits = exports.TIME_UNITS_PATTERN = exports.parseYear = exports.YEAR_PATTERN = exports.parseNumberPattern = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
    var pattern_1 = require_pattern();
    var years_1 = require_years();
    exports.WEEKDAY_DICTIONARY = {
      "sonntag": 0,
      "so": 0,
      "montag": 1,
      "mo": 1,
      "dienstag": 2,
      "di": 2,
      "mittwoch": 3,
      "mi": 3,
      "donnerstag": 4,
      "do": 4,
      "freitag": 5,
      "fr": 5,
      "samstag": 6,
      "sa": 6
    };
    exports.MONTH_DICTIONARY = {
      "januar": 1,
      "j\xE4nner": 1,
      "janner": 1,
      "jan": 1,
      "jan.": 1,
      "februar": 2,
      "feber": 2,
      "feb": 2,
      "feb.": 2,
      "m\xE4rz": 3,
      "maerz": 3,
      "m\xE4r": 3,
      "m\xE4r.": 3,
      "mrz": 3,
      "mrz.": 3,
      "april": 4,
      "apr": 4,
      "apr.": 4,
      "mai": 5,
      "juni": 6,
      "jun": 6,
      "jun.": 6,
      "juli": 7,
      "jul": 7,
      "jul.": 7,
      "august": 8,
      "aug": 8,
      "aug.": 8,
      "september": 9,
      "sep": 9,
      "sep.": 9,
      "sept": 9,
      "sept.": 9,
      "oktober": 10,
      "okt": 10,
      "okt.": 10,
      "november": 11,
      "nov": 11,
      "nov.": 11,
      "dezember": 12,
      "dez": 12,
      "dez.": 12
    };
    exports.INTEGER_WORD_DICTIONARY = {
      "eins": 1,
      "eine": 1,
      "einem": 1,
      "einen": 1,
      "einer": 1,
      "zwei": 2,
      "drei": 3,
      "vier": 4,
      "f\xFCnf": 5,
      "fuenf": 5,
      "sechs": 6,
      "sieben": 7,
      "acht": 8,
      "neun": 9,
      "zehn": 10,
      "elf": 11,
      "zw\xF6lf": 12,
      "zwoelf": 12
    };
    exports.TIME_UNIT_DICTIONARY = {
      sek: "second",
      sekunde: "second",
      sekunden: "second",
      min: "minute",
      minute: "minute",
      minuten: "minute",
      h: "hour",
      std: "hour",
      stunde: "hour",
      stunden: "hour",
      tag: "d",
      tage: "d",
      tagen: "d",
      woche: "week",
      wochen: "week",
      monat: "month",
      monate: "month",
      monaten: "month",
      monats: "month",
      quartal: "quarter",
      quartals: "quarter",
      quartale: "quarter",
      quartalen: "quarter",
      a: "year",
      j: "year",
      jr: "year",
      jahr: "year",
      jahre: "year",
      jahren: "year",
      jahres: "year"
    };
    exports.NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s*an?)?|an?\\b(?:\\s*few)?|few|several|a?\\s*couple\\s*(?:of)?)`;
    function parseNumberPattern(match) {
      const num = match.toLowerCase();
      if (exports.INTEGER_WORD_DICTIONARY[num] !== void 0) {
        return exports.INTEGER_WORD_DICTIONARY[num];
      } else if (num === "a" || num === "an") {
        return 1;
      } else if (num.match(/few/)) {
        return 3;
      } else if (num.match(/half/)) {
        return 0.5;
      } else if (num.match(/couple/)) {
        return 2;
      } else if (num.match(/several/)) {
        return 7;
      }
      return parseFloat(num);
    }
    exports.parseNumberPattern = parseNumberPattern;
    exports.YEAR_PATTERN = `(?:[0-9]{1,4}(?:\\s*[vn]\\.?\\s*(?:C(?:hr)?|(?:u\\.?|d\\.?(?:\\s*g\\.?)?)?\\s*Z)\\.?|\\s*(?:u\\.?|d\\.?(?:\\s*g\\.)?)\\s*Z\\.?)?)`;
    function parseYear(match) {
      if (/v/i.test(match)) {
        return -parseInt(match.replace(/[^0-9]+/gi, ""));
      }
      if (/n/i.test(match)) {
        return parseInt(match.replace(/[^0-9]+/gi, ""));
      }
      if (/z/i.test(match)) {
        return parseInt(match.replace(/[^0-9]+/gi, ""));
      }
      const rawYearNumber = parseInt(match);
      return years_1.findMostLikelyADYear(rawYearNumber);
    }
    exports.parseYear = parseYear;
    var SINGLE_TIME_UNIT_PATTERN = `(${exports.NUMBER_PATTERN})\\s{0,5}(${pattern_1.matchAnyPattern(exports.TIME_UNIT_DICTIONARY)})\\s{0,5}`;
    var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
    exports.TIME_UNITS_PATTERN = pattern_1.repeatedTimeunitPattern("", SINGLE_TIME_UNIT_PATTERN);
    function parseTimeUnits(timeunitText) {
      const fragments = {};
      let remainingText = timeunitText;
      let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      }
      return fragments;
    }
    exports.parseTimeUnits = parseTimeUnits;
    function collectDateTimeFragment(fragments, match) {
      const num = parseNumberPattern(match[1]);
      const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
      fragments[unit] = num;
    }
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DEWeekdayParser.js
var require_DEWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DEWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants2();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:a[mn]\\s*?)?(?:(diese[mn]|letzte[mn]|n(?:\xE4|ae)chste[mn])\\s*)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(diese|letzte|n(?:\xE4|ae)chste)\\s*woche)?(?=\\W|$)`, "i");
    var PREFIX_GROUP = 1;
    var SUFFIX_GROUP = 3;
    var WEEKDAY_GROUP = 2;
    var DEWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[SUFFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();
        let modifier = null;
        if (modifierWord.match(/letzte/)) {
          modifier = "last";
        } else if (modifierWord.match(/chste/)) {
          modifier = "next";
        } else if (modifierWord.match(/diese/)) {
          modifier = "this";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, offset, modifier);
      }
    };
    exports.default = DEWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DESpecificTimeExpressionParser.js
var require_DESpecificTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DESpecificTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)(?:(?:um|von)\\s*)?(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s)?)?(?:\\s*Uhr)?(?:\\s*(morgens|vormittags|nachmittags|abends|nachts|am\\s+(?:Morgen|Vormittag|Nachmittag|Abend)|in\\s+der\\s+Nacht))?(?=\\W|$)", "i");
    var SECOND_REG_PATTERN = new RegExp("^\\s*(\\-|\\\u2013|\\~|\\\u301C|bis(?:\\s+um)?|\\?)\\s*(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s)?)?(?:\\s*Uhr)?(?:\\s*(morgens|vormittags|nachmittags|abends|nachts|am\\s+(?:Morgen|Vormittag|Nachmittag|Abend)|in\\s+der\\s+Nacht))?(?=\\W|$)", "i");
    var HOUR_GROUP = 2;
    var MINUTE_GROUP = 3;
    var SECOND_GROUP = 4;
    var AM_PM_HOUR_GROUP = 5;
    var DESpecificTimeExpressionParser = class {
      pattern(context) {
        return FIRST_REG_PATTERN;
      }
      extract(context, match) {
        const result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));
        if (result.text.match(/^\d{4}$/)) {
          match.index += match[0].length;
          return null;
        }
        result.start = DESpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), match);
        if (!result.start) {
          match.index += match[0].length;
          return null;
        }
        const remainingText = context.text.substring(match.index + match[0].length);
        const secondMatch = SECOND_REG_PATTERN.exec(remainingText);
        if (secondMatch) {
          result.end = DESpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), secondMatch);
          if (result.end) {
            result.text += secondMatch[0];
          }
        }
        return result;
      }
      static extractTimeComponent(extractingComponents, match) {
        let hour = 0;
        let minute = 0;
        let meridiem = null;
        hour = parseInt(match[HOUR_GROUP]);
        if (match[MINUTE_GROUP] != null) {
          minute = parseInt(match[MINUTE_GROUP]);
        }
        if (minute >= 60 || hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = index_1.Meridiem.PM;
        }
        if (match[AM_PM_HOUR_GROUP] != null) {
          if (hour > 12)
            return null;
          const ampm = match[AM_PM_HOUR_GROUP].toLowerCase();
          if (ampm.match(/morgen|vormittag/)) {
            meridiem = index_1.Meridiem.AM;
            if (hour == 12) {
              hour = 0;
            }
          }
          if (ampm.match(/nachmittag|abend/)) {
            meridiem = index_1.Meridiem.PM;
            if (hour != 12) {
              hour += 12;
            }
          }
          if (ampm.match(/nacht/)) {
            if (hour == 12) {
              meridiem = index_1.Meridiem.AM;
              hour = 0;
            } else if (hour < 6) {
              meridiem = index_1.Meridiem.AM;
            } else {
              meridiem = index_1.Meridiem.PM;
              hour += 12;
            }
          }
        }
        extractingComponents.assign("hour", hour);
        extractingComponents.assign("minute", minute);
        if (meridiem !== null) {
          extractingComponents.assign("meridiem", meridiem);
        } else {
          if (hour < 12) {
            extractingComponents.imply("meridiem", index_1.Meridiem.AM);
          } else {
            extractingComponents.imply("meridiem", index_1.Meridiem.PM);
          }
        }
        if (match[SECOND_GROUP] != null) {
          const second = parseInt(match[SECOND_GROUP]);
          if (second >= 60)
            return null;
          extractingComponents.assign("second", second);
        }
        return extractingComponents;
      }
    };
    exports.default = DESpecificTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/de/refiners/DEMergeDateRangeRefiner.js
var require_DEMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/de/refiners/DEMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var DEMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(bis(?:\s*(?:am|zum))?|-)\s*$/i;
      }
    };
    exports.default = DEMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/de/refiners/DEMergeDateTimeRefiner.js
var require_DEMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/de/refiners/DEMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var DEMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp("^\\s*(T|um|am|,|-)?\\s*$");
      }
    };
    exports.default = DEMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DECasualTimeParser.js
var require_DECasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DECasualTimeParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_2 = require_dayjs();
    var timeunits_1 = require_timeunits();
    var DECasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(diesen)?\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const targetDate = dayjs_1.default(context.refDate);
        const timeKeywordPattern = match[2].toLowerCase();
        const component = context.createParsingComponents();
        dayjs_2.implySimilarTime(component, targetDate);
        return DECasualTimeParser.extractTimeComponents(component, timeKeywordPattern);
      }
      static extractTimeComponents(component, timeKeywordPattern) {
        switch (timeKeywordPattern) {
          case "morgen":
            component.imply("hour", 6);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
          case "vormittag":
            component.imply("hour", 9);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
          case "mittag":
          case "mittags":
            component.imply("hour", 12);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
          case "nachmittag":
            component.imply("hour", 15);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.PM);
            break;
          case "abend":
            component.imply("hour", 18);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.PM);
            break;
          case "nacht":
            component.imply("hour", 22);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.PM);
            break;
          case "mitternacht":
            if (component.get("hour") > 1) {
              component = timeunits_1.addImpliedTimeUnits(component, { "day": 1 });
            }
            component.imply("hour", 0);
            component.imply("minute", 0);
            component.imply("second", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
        }
        return component;
      }
    };
    exports.default = DECasualTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DECasualDateParser.js
var require_DECasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DECasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_2 = require_dayjs();
    var DECasualTimeParser_1 = __importDefault(require_DECasualTimeParser());
    var references = __importStar(require_casualReferences());
    var PATTERN = new RegExp(`(jetzt|heute|morgen|\xFCbermorgen|uebermorgen|gestern|vorgestern|letzte\\s*nacht)(?:\\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht))?(?=\\W|$)`, "i");
    var DATE_GROUP = 1;
    var TIME_GROUP = 2;
    var DECasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return PATTERN;
      }
      innerExtract(context, match) {
        let targetDate = dayjs_1.default(context.refDate);
        const dateKeyword = (match[DATE_GROUP] || "").toLowerCase();
        const timeKeyword = (match[TIME_GROUP] || "").toLowerCase();
        let component = context.createParsingComponents();
        switch (dateKeyword) {
          case "jetzt":
            component = references.now(context.reference);
            break;
          case "heute":
            component = references.today(context.reference);
            break;
          case "morgen":
            dayjs_2.assignTheNextDay(component, targetDate);
            break;
          case "\xFCbermorgen":
          case "uebermorgen":
            targetDate = targetDate.add(1, "day");
            dayjs_2.assignTheNextDay(component, targetDate);
            break;
          case "gestern":
            targetDate = targetDate.add(-1, "day");
            dayjs_2.assignSimilarDate(component, targetDate);
            dayjs_2.implySimilarTime(component, targetDate);
            break;
          case "vorgestern":
            targetDate = targetDate.add(-2, "day");
            dayjs_2.assignSimilarDate(component, targetDate);
            dayjs_2.implySimilarTime(component, targetDate);
            break;
          default:
            if (dateKeyword.match(/letzte\s*nacht/)) {
              if (targetDate.hour() > 6) {
                targetDate = targetDate.add(-1, "day");
              }
              dayjs_2.assignSimilarDate(component, targetDate);
              component.imply("hour", 0);
            }
            break;
        }
        if (timeKeyword) {
          component = DECasualTimeParser_1.default.extractTimeComponents(component, timeKeyword);
        }
        return component;
      }
    };
    exports.default = DECasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DEMonthNameLittleEndianParser.js
var require_DEMonthNameLittleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DEMonthNameLittleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants2();
    var constants_2 = require_constants2();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(?:am\\s*?)?(?:den\\s*?)?([0-9]{1,2})\\.(?:\\s*(?:bis(?:\\s*(?:am|zum))?|\\-|\\\u2013|\\s)\\s*([0-9]{1,2})\\.?)?\\s*(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s*)(${constants_2.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i");
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var MONTH_NAME_GROUP = 3;
    var YEAR_GROUP = 4;
    var DEMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
          const yearNumber = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", yearNumber);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
          const endDate = parseInt(match[DATE_TO_GROUP]);
          result.end = result.start.clone();
          result.end.assign("day", endDate);
        }
        return result;
      }
    };
    exports.default = DEMonthNameLittleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/de/parsers/DETimeUnitRelativeFormatParser.js
var require_DETimeUnitRelativeFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/de/parsers/DETimeUnitRelativeFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants2();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var pattern_1 = require_pattern();
    var DETimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor() {
        super();
      }
      innerPattern() {
        return new RegExp(`(?:\\s*((?:n\xE4chste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?|vor|in)\\s*)?(${constants_1.NUMBER_PATTERN})?(?:\\s*(n\xE4chste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?)?\\s*(${pattern_1.matchAnyPattern(constants_1.TIME_UNIT_DICTIONARY)})`, "i");
      }
      innerExtract(context, match) {
        const num = match[2] ? constants_1.parseNumberPattern(match[2]) : 1;
        const unit = constants_1.TIME_UNIT_DICTIONARY[match[4].toLowerCase()];
        let timeUnits = {};
        timeUnits[unit] = num;
        let modifier = match[1] || match[3] || "";
        modifier = modifier.toLowerCase();
        if (!modifier) {
          return;
        }
        if (/vor/.test(modifier) || /letzte/.test(modifier) || /vergangen/.test(modifier)) {
          timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        }
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = DETimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/de/index.js
var require_de = __commonJS({
  "node_modules/chrono-node/dist/locales/de/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var configurations_1 = require_configurations();
    var chrono_1 = require_chrono();
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var ISOFormatParser_1 = __importDefault(require_ISOFormatParser());
    var DETimeExpressionParser_1 = __importDefault(require_DETimeExpressionParser());
    var DEWeekdayParser_1 = __importDefault(require_DEWeekdayParser());
    var DESpecificTimeExpressionParser_1 = __importDefault(require_DESpecificTimeExpressionParser());
    var DEMergeDateRangeRefiner_1 = __importDefault(require_DEMergeDateRangeRefiner());
    var DEMergeDateTimeRefiner_1 = __importDefault(require_DEMergeDateTimeRefiner());
    var DECasualDateParser_1 = __importDefault(require_DECasualDateParser());
    var DECasualTimeParser_1 = __importDefault(require_DECasualTimeParser());
    var DEMonthNameLittleEndianParser_1 = __importDefault(require_DEMonthNameLittleEndianParser());
    var DETimeUnitRelativeFormatParser_1 = __importDefault(require_DETimeUnitRelativeFormatParser());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration(true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration(littleEndian = true) {
      const option = createConfiguration(false, littleEndian);
      option.parsers.unshift(new DECasualTimeParser_1.default());
      option.parsers.unshift(new DECasualDateParser_1.default());
      option.parsers.unshift(new DETimeUnitRelativeFormatParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true, littleEndian = true) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new ISOFormatParser_1.default(),
          new SlashDateFormatParser_1.default(littleEndian),
          new DETimeExpressionParser_1.default(),
          new DESpecificTimeExpressionParser_1.default(),
          new DEMonthNameLittleEndianParser_1.default(),
          new DEWeekdayParser_1.default()
        ],
        refiners: [new DEMergeDateRangeRefiner_1.default(), new DEMergeDateTimeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRCasualDateParser.js
var require_FRCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_2 = require_dayjs();
    var references = __importStar(require_casualReferences());
    var FRCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(maintenant|aujourd'hui|demain|hier|cette\s*nuit|la\s*veille)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        let targetDate = dayjs_1.default(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        switch (lowerText) {
          case "maintenant":
            return references.now(context.reference);
          case "aujourd'hui":
            return references.today(context.reference);
          case "hier":
            return references.yesterday(context.reference);
          case "demain":
            return references.tomorrow(context.reference);
          default:
            if (lowerText.match(/cette\s*nuit/)) {
              dayjs_2.assignSimilarDate(component, targetDate);
              component.imply("hour", 22);
              component.imply("meridiem", index_1.Meridiem.PM);
            } else if (lowerText.match(/la\s*veille/)) {
              targetDate = targetDate.add(-1, "day");
              dayjs_2.assignSimilarDate(component, targetDate);
              component.imply("hour", 0);
            }
        }
        return component;
      }
    };
    exports.default = FRCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRCasualTimeParser.js
var require_FRCasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRCasualTimeParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var FRCasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(cet?)?\s*(matin|soir|après-midi|aprem|a midi|à minuit)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const suffixLower = match[2].toLowerCase();
        const component = context.createParsingComponents();
        switch (suffixLower) {
          case "apr\xE8s-midi":
          case "aprem":
            component.imply("hour", 14);
            component.imply("minute", 0);
            component.imply("meridiem", index_1.Meridiem.PM);
            break;
          case "soir":
            component.imply("hour", 18);
            component.imply("minute", 0);
            component.imply("meridiem", index_1.Meridiem.PM);
            break;
          case "matin":
            component.imply("hour", 8);
            component.imply("minute", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
          case "a midi":
            component.imply("hour", 12);
            component.imply("minute", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
          case "\xE0 minuit":
            component.imply("hour", 0);
            component.imply("meridiem", index_1.Meridiem.AM);
            break;
        }
        return component;
      }
    };
    exports.default = FRCasualTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRTimeExpressionParser.js
var require_FRTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var FRTimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      primaryPrefix() {
        return "(?:(?:[\xE0a])\\s*)?";
      }
      followingPhase() {
        return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|[\xE0a]|\\?)\\s*";
      }
      extractPrimaryTimeComponents(context, match) {
        if (match[0].match(/^\s*\d{4}\s*$/)) {
          return null;
        }
        return super.extractPrimaryTimeComponents(context, match);
      }
    };
    exports.default = FRTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/refiners/FRMergeDateTimeRefiner.js
var require_FRMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/refiners/FRMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var FRMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp("^\\s*(T|\xE0|a|vers|de|,|-)?\\s*$");
      }
    };
    exports.default = FRMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/fr/refiners/FRMergeDateRangeRefiner.js
var require_FRMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/refiners/FRMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var FRMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(à|a|-)\s*$/i;
      }
    };
    exports.default = FRMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/fr/constants.js
var require_constants3 = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTimeUnits = exports.TIME_UNITS_PATTERN = exports.parseYear = exports.YEAR_PATTERN = exports.parseOrdinalNumberPattern = exports.ORDINAL_NUMBER_PATTERN = exports.parseNumberPattern = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
    var pattern_1 = require_pattern();
    exports.WEEKDAY_DICTIONARY = {
      "dimanche": 0,
      "dim": 0,
      "lundi": 1,
      "lun": 1,
      "mardi": 2,
      "mar": 2,
      "mercredi": 3,
      "mer": 3,
      "jeudi": 4,
      "jeu": 4,
      "vendredi": 5,
      "ven": 5,
      "samedi": 6,
      "sam": 6
    };
    exports.MONTH_DICTIONARY = {
      "janvier": 1,
      "jan": 1,
      "jan.": 1,
      "f\xE9vrier": 2,
      "f\xE9v": 2,
      "f\xE9v.": 2,
      "fevrier": 2,
      "fev": 2,
      "fev.": 2,
      "mars": 3,
      "mar": 3,
      "mar.": 3,
      "avril": 4,
      "avr": 4,
      "avr.": 4,
      "mai": 5,
      "juin": 6,
      "jun": 6,
      "juillet": 7,
      "juil": 7,
      "jul": 7,
      "jul.": 7,
      "ao\xFBt": 8,
      "aout": 8,
      "septembre": 9,
      "sep": 9,
      "sep.": 9,
      "sept": 9,
      "sept.": 9,
      "octobre": 10,
      "oct": 10,
      "oct.": 10,
      "novembre": 11,
      "nov": 11,
      "nov.": 11,
      "d\xE9cembre": 12,
      "decembre": 12,
      "dec": 12,
      "dec.": 12
    };
    exports.INTEGER_WORD_DICTIONARY = {
      "un": 1,
      "deux": 2,
      "trois": 3,
      "quatre": 4,
      "cinq": 5,
      "six": 6,
      "sept": 7,
      "huit": 8,
      "neuf": 9,
      "dix": 10,
      "onze": 11,
      "douze": 12,
      "treize": 13
    };
    exports.TIME_UNIT_DICTIONARY = {
      "sec": "second",
      "seconde": "second",
      "secondes": "second",
      "min": "minute",
      "mins": "minute",
      "minute": "minute",
      "minutes": "minute",
      "h": "hour",
      "hr": "hour",
      "hrs": "hour",
      "heure": "hour",
      "heures": "hour",
      "jour": "d",
      "jours": "d",
      "semaine": "week",
      "semaines": "week",
      "mois": "month",
      "trimestre": "quarter",
      "trimestres": "quarter",
      "ans": "year",
      "ann\xE9e": "year",
      "ann\xE9es": "year"
    };
    exports.NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|une?\\b|quelques?|demi-?)`;
    function parseNumberPattern(match) {
      const num = match.toLowerCase();
      if (exports.INTEGER_WORD_DICTIONARY[num] !== void 0) {
        return exports.INTEGER_WORD_DICTIONARY[num];
      } else if (num === "une" || num === "un") {
        return 1;
      } else if (num.match(/quelques?/)) {
        return 3;
      } else if (num.match(/demi-?/)) {
        return 0.5;
      }
      return parseFloat(num);
    }
    exports.parseNumberPattern = parseNumberPattern;
    exports.ORDINAL_NUMBER_PATTERN = `(?:[0-9]{1,2}(?:er)?)`;
    function parseOrdinalNumberPattern(match) {
      let num = match.toLowerCase();
      num = num.replace(/(?:er)$/i, "");
      return parseInt(num);
    }
    exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
    exports.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:AC|AD|p\\.\\s*C(?:hr?)?\\.\\s*n\\.)|[1-2][0-9]{3}|[5-9][0-9])`;
    function parseYear(match) {
      if (/AC/i.test(match)) {
        match = match.replace(/BC/i, "");
        return -parseInt(match);
      }
      if (/AD/i.test(match) || /C/i.test(match)) {
        match = match.replace(/[^\d]+/i, "");
        return parseInt(match);
      }
      let yearNumber = parseInt(match);
      if (yearNumber < 100) {
        if (yearNumber > 50) {
          yearNumber = yearNumber + 1900;
        } else {
          yearNumber = yearNumber + 2e3;
        }
      }
      return yearNumber;
    }
    exports.parseYear = parseYear;
    var SINGLE_TIME_UNIT_PATTERN = `(${exports.NUMBER_PATTERN})\\s{0,5}(${pattern_1.matchAnyPattern(exports.TIME_UNIT_DICTIONARY)})\\s{0,5}`;
    var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
    exports.TIME_UNITS_PATTERN = pattern_1.repeatedTimeunitPattern("", SINGLE_TIME_UNIT_PATTERN);
    function parseTimeUnits(timeunitText) {
      const fragments = {};
      let remainingText = timeunitText;
      let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      }
      return fragments;
    }
    exports.parseTimeUnits = parseTimeUnits;
    function collectDateTimeFragment(fragments, match) {
      const num = parseNumberPattern(match[1]);
      const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
      fragments[unit] = num;
    }
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRWeekdayParser.js
var require_FRWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants3();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:(?:ce)\\s*)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(dernier|prochain)\\s*)?(?=\\W|\\d|$)`, "i");
    var WEEKDAY_GROUP = 1;
    var POSTFIX_GROUP = 2;
    var FRWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        if (weekday === void 0) {
          return null;
        }
        let suffix = match[POSTFIX_GROUP];
        suffix = suffix || "";
        suffix = suffix.toLowerCase();
        let modifier = null;
        if (suffix == "dernier") {
          modifier = "last";
        } else if (suffix == "prochain") {
          modifier = "next";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, weekday, modifier);
      }
    };
    exports.default = FRWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRSpecificTimeExpressionParser.js
var require_FRSpecificTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRSpecificTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)(?:(?:[\xE0a])\\s*)?(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s|:)?)?(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?(?=\\W|$)", "i");
    var SECOND_REG_PATTERN = new RegExp("^\\s*(\\-|\\\u2013|\\~|\\\u301C|[\xE0a]|\\?)\\s*(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s|:)?)?(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?(?=\\W|$)", "i");
    var HOUR_GROUP = 2;
    var MINUTE_GROUP = 3;
    var SECOND_GROUP = 4;
    var AM_PM_HOUR_GROUP = 5;
    var FRSpecificTimeExpressionParser = class {
      pattern(context) {
        return FIRST_REG_PATTERN;
      }
      extract(context, match) {
        const result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));
        if (result.text.match(/^\d{4}$/)) {
          match.index += match[0].length;
          return null;
        }
        result.start = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), match);
        if (!result.start) {
          match.index += match[0].length;
          return null;
        }
        const remainingText = context.text.substring(match.index + match[0].length);
        const secondMatch = SECOND_REG_PATTERN.exec(remainingText);
        if (secondMatch) {
          result.end = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), secondMatch);
          if (result.end) {
            result.text += secondMatch[0];
          }
        }
        return result;
      }
      static extractTimeComponent(extractingComponents, match) {
        let hour = 0;
        let minute = 0;
        let meridiem = null;
        hour = parseInt(match[HOUR_GROUP]);
        if (match[MINUTE_GROUP] != null) {
          minute = parseInt(match[MINUTE_GROUP]);
        }
        if (minute >= 60 || hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = index_1.Meridiem.PM;
        }
        if (match[AM_PM_HOUR_GROUP] != null) {
          if (hour > 12)
            return null;
          const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = index_1.Meridiem.AM;
            if (hour == 12) {
              hour = 0;
            }
          }
          if (ampm == "p") {
            meridiem = index_1.Meridiem.PM;
            if (hour != 12) {
              hour += 12;
            }
          }
        }
        extractingComponents.assign("hour", hour);
        extractingComponents.assign("minute", minute);
        if (meridiem !== null) {
          extractingComponents.assign("meridiem", meridiem);
        } else {
          if (hour < 12) {
            extractingComponents.imply("meridiem", index_1.Meridiem.AM);
          } else {
            extractingComponents.imply("meridiem", index_1.Meridiem.PM);
          }
        }
        if (match[SECOND_GROUP] != null) {
          const second = parseInt(match[SECOND_GROUP]);
          if (second >= 60)
            return null;
          extractingComponents.assign("second", second);
        }
        return extractingComponents;
      }
    };
    exports.default = FRSpecificTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRMonthNameLittleEndianParser.js
var require_FRMonthNameLittleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRMonthNameLittleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants3();
    var constants_2 = require_constants3();
    var constants_3 = require_constants3();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(?:on\\s*?)?(${constants_3.ORDINAL_NUMBER_PATTERN})(?:\\s*(?:au|\\-|\\\u2013|jusqu'au?|\\s)\\s*(${constants_3.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s*(?:de)?\\s*)(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s*)(${constants_2.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i");
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var MONTH_NAME_GROUP = 3;
    var YEAR_GROUP = 4;
    var FRMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = constants_3.parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
          const yearNumber = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", yearNumber);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
          const endDate = constants_3.parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
          result.end = result.start.clone();
          result.end.assign("day", endDate);
        }
        return result;
      }
    };
    exports.default = FRMonthNameLittleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitAgoFormatParser.js
var require_FRTimeUnitAgoFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitAgoFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants3();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var FRTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor() {
        super();
      }
      innerPattern() {
        return new RegExp(`il y a\\s*(${constants_1.TIME_UNITS_PATTERN})(?=(?:\\W|$))`, "i");
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        const outputTimeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
      }
    };
    exports.default = FRTimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitWithinFormatParser.js
var require_FRTimeUnitWithinFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitWithinFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants3();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var FRTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return new RegExp(`(?:dans|en|pour|pendant|de)\\s*(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = FRTimeUnitWithinFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitRelativeFormatParser.js
var require_FRTimeUnitRelativeFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/parsers/FRTimeUnitRelativeFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants3();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var pattern_1 = require_pattern();
    var FRTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor() {
        super();
      }
      innerPattern() {
        return new RegExp(`(?:les?|la|l'|du|des?)\\s*(${constants_1.NUMBER_PATTERN})?(?:\\s*(prochaine?s?|derni[e\xE8]re?s?|pass[\xE9e]e?s?|pr[\xE9e]c[\xE9e]dents?|suivante?s?))?\\s*(${pattern_1.matchAnyPattern(constants_1.TIME_UNIT_DICTIONARY)})(?:\\s*(prochaine?s?|derni[e\xE8]re?s?|pass[\xE9e]e?s?|pr[\xE9e]c[\xE9e]dents?|suivante?s?))?`, "i");
      }
      innerExtract(context, match) {
        const num = match[1] ? constants_1.parseNumberPattern(match[1]) : 1;
        const unit = constants_1.TIME_UNIT_DICTIONARY[match[3].toLowerCase()];
        let timeUnits = {};
        timeUnits[unit] = num;
        let modifier = match[2] || match[4] || "";
        modifier = modifier.toLowerCase();
        if (!modifier) {
          return;
        }
        if (/derni[eè]re?s?/.test(modifier) || /pass[ée]e?s?/.test(modifier) || /pr[ée]c[ée]dents?/.test(modifier)) {
          timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        }
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = FRTimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/fr/index.js
var require_fr = __commonJS({
  "node_modules/chrono-node/dist/locales/fr/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var configurations_1 = require_configurations();
    var chrono_1 = require_chrono();
    var FRCasualDateParser_1 = __importDefault(require_FRCasualDateParser());
    var FRCasualTimeParser_1 = __importDefault(require_FRCasualTimeParser());
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var FRTimeExpressionParser_1 = __importDefault(require_FRTimeExpressionParser());
    var FRMergeDateTimeRefiner_1 = __importDefault(require_FRMergeDateTimeRefiner());
    var FRMergeDateRangeRefiner_1 = __importDefault(require_FRMergeDateRangeRefiner());
    var FRWeekdayParser_1 = __importDefault(require_FRWeekdayParser());
    var FRSpecificTimeExpressionParser_1 = __importDefault(require_FRSpecificTimeExpressionParser());
    var FRMonthNameLittleEndianParser_1 = __importDefault(require_FRMonthNameLittleEndianParser());
    var FRTimeUnitAgoFormatParser_1 = __importDefault(require_FRTimeUnitAgoFormatParser());
    var FRTimeUnitWithinFormatParser_1 = __importDefault(require_FRTimeUnitWithinFormatParser());
    var FRTimeUnitRelativeFormatParser_1 = __importDefault(require_FRTimeUnitRelativeFormatParser());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration(true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration(littleEndian = true) {
      const option = createConfiguration(false, littleEndian);
      option.parsers.unshift(new FRCasualDateParser_1.default());
      option.parsers.unshift(new FRCasualTimeParser_1.default());
      option.parsers.unshift(new FRTimeUnitRelativeFormatParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true, littleEndian = true) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser_1.default(littleEndian),
          new FRMonthNameLittleEndianParser_1.default(),
          new FRTimeExpressionParser_1.default(),
          new FRSpecificTimeExpressionParser_1.default(),
          new FRTimeUnitAgoFormatParser_1.default(),
          new FRTimeUnitWithinFormatParser_1.default(),
          new FRWeekdayParser_1.default()
        ],
        refiners: [new FRMergeDateTimeRefiner_1.default(), new FRMergeDateRangeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/ja/constants.js
var require_constants4 = __commonJS({
  "node_modules/chrono-node/dist/locales/ja/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toHankaku = void 0;
    function toHankaku(text) {
      return String(text).replace(/\u2019/g, "'").replace(/\u201D/g, '"').replace(/\u3000/g, " ").replace(/\uFFE5/g, "\xA5").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, alphaNum);
    }
    exports.toHankaku = toHankaku;
    function alphaNum(token) {
      return String.fromCharCode(token.charCodeAt(0) - 65248);
    }
  }
});

// node_modules/chrono-node/dist/locales/ja/parsers/JPStandardParser.js
var require_JPStandardParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ja/parsers/JPStandardParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants4();
    var years_1 = require_years();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var PATTERN = /(?:(?:([同今本])|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
    var SPECIAL_YEAR_GROUP = 1;
    var TYPICAL_YEAR_GROUP = 2;
    var ERA_GROUP = 3;
    var YEAR_NUMBER_GROUP = 4;
    var MONTH_GROUP = 5;
    var DAY_GROUP = 6;
    var JPStandardParser = class {
      pattern() {
        return PATTERN;
      }
      extract(context, match) {
        const month = parseInt(constants_1.toHankaku(match[MONTH_GROUP]));
        const day = parseInt(constants_1.toHankaku(match[DAY_GROUP]));
        const components = context.createParsingComponents({
          day,
          month
        });
        if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match("\u540C|\u4ECA|\u672C")) {
          const moment = dayjs_1.default(context.refDate);
          components.assign("year", moment.year());
        }
        if (match[TYPICAL_YEAR_GROUP]) {
          const yearNumText = match[YEAR_NUMBER_GROUP];
          let year = yearNumText == "\u5143" ? 1 : parseInt(constants_1.toHankaku(yearNumText));
          if (match[ERA_GROUP] == "\u4EE4\u548C") {
            year += 2018;
          } else if (match[ERA_GROUP] == "\u5E73\u6210") {
            year += 1988;
          } else if (match[ERA_GROUP] == "\u662D\u548C") {
            year += 1925;
          }
          components.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          components.imply("year", year);
        }
        return components;
      }
    };
    exports.default = JPStandardParser;
  }
});

// node_modules/chrono-node/dist/locales/ja/refiners/JPMergeDateRangeRefiner.js
var require_JPMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/ja/refiners/JPMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var JPMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(から|ー|-)\s*$/i;
      }
    };
    exports.default = JPMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/ja/parsers/JPCasualDateParser.js
var require_JPCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ja/parsers/JPCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var index_1 = require_dist();
    var references = __importStar(require_casualReferences());
    var PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;
    var JPCasualDateParser = class {
      pattern() {
        return PATTERN;
      }
      extract(context, match) {
        const text = match[0];
        const date = dayjs_1.default(context.refDate);
        const components = context.createParsingComponents();
        switch (text) {
          case "\u6628\u65E5":
            return references.yesterday(context.reference);
          case "\u660E\u65E5":
            return references.tomorrow(context.reference);
          case "\u4ECA\u65E5":
          case "\u5F53\u65E5":
            return references.today(context.reference);
        }
        if (text == "\u4ECA\u591C" || text == "\u4ECA\u5915" || text == "\u4ECA\u6669") {
          components.imply("hour", 22);
          components.assign("meridiem", index_1.Meridiem.PM);
        } else if (text.match("\u4ECA\u671D")) {
          components.imply("hour", 6);
          components.assign("meridiem", index_1.Meridiem.AM);
        }
        components.assign("day", date.date());
        components.assign("month", date.month() + 1);
        components.assign("year", date.year());
        return components;
      }
    };
    exports.default = JPCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/ja/index.js
var require_ja = __commonJS({
  "node_modules/chrono-node/dist/locales/ja/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var JPStandardParser_1 = __importDefault(require_JPStandardParser());
    var JPMergeDateRangeRefiner_1 = __importDefault(require_JPMergeDateRangeRefiner());
    var JPCasualDateParser_1 = __importDefault(require_JPCasualDateParser());
    var chrono_1 = require_chrono();
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration());
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration() {
      const option = createConfiguration();
      option.parsers.unshift(new JPCasualDateParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration() {
      return {
        parsers: [new JPStandardParser_1.default()],
        refiners: [new JPMergeDateRangeRefiner_1.default()]
      };
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/pt/constants.js
var require_constants5 = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseYear = exports.YEAR_PATTERN = exports.MONTH_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
    exports.WEEKDAY_DICTIONARY = {
      "domingo": 0,
      "dom": 0,
      "segunda": 1,
      "segunda-feira": 1,
      "seg": 1,
      "ter\xE7a": 2,
      "ter\xE7a-feira": 2,
      "ter": 2,
      "quarta": 3,
      "quarta-feira": 3,
      "qua": 3,
      "quinta": 4,
      "quinta-feira": 4,
      "qui": 4,
      "sexta": 5,
      "sexta-feira": 5,
      "sex": 5,
      "s\xE1bado": 6,
      "sabado": 6,
      "sab": 6
    };
    exports.MONTH_DICTIONARY = {
      "janeiro": 1,
      "jan": 1,
      "jan.": 1,
      "fevereiro": 2,
      "fev": 2,
      "fev.": 2,
      "mar\xE7o": 3,
      "mar": 3,
      "mar.": 3,
      "abril": 4,
      "abr": 4,
      "abr.": 4,
      "maio": 5,
      "mai": 5,
      "mai.": 5,
      "junho": 6,
      "jun": 6,
      "jun.": 6,
      "julho": 7,
      "jul": 7,
      "jul.": 7,
      "agosto": 8,
      "ago": 8,
      "ago.": 8,
      "setembro": 9,
      "set": 9,
      "set.": 9,
      "outubro": 10,
      "out": 10,
      "out.": 10,
      "novembro": 11,
      "nov": 11,
      "nov.": 11,
      "dezembro": 12,
      "dez": 12,
      "dez.": 12
    };
    exports.YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)(?:\\s*[a|d]\\.?\\s*c\\.?|\\s*a\\.?\\s*d\\.?)?";
    function parseYear(match) {
      if (match.match(/^[0-9]{1,4}$/)) {
        let yearNumber = parseInt(match);
        if (yearNumber < 100) {
          if (yearNumber > 50) {
            yearNumber = yearNumber + 1900;
          } else {
            yearNumber = yearNumber + 2e3;
          }
        }
        return yearNumber;
      }
      if (match.match(/a\.?\s*c\.?/i)) {
        match = match.replace(/a\.?\s*c\.?/i, "");
        return -parseInt(match);
      }
      return parseInt(match);
    }
    exports.parseYear = parseYear;
  }
});

// node_modules/chrono-node/dist/locales/pt/parsers/PTWeekdayParser.js
var require_PTWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/parsers/PTWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants5();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:(este|esta|passado|pr[o\xF3]ximo)\\s*)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\\uFF09))?(?:\\s*(este|esta|passado|pr[\xF3o]ximo)\\s*semana)?(?=\\W|\\d|$)`, "i");
    var PREFIX_GROUP = 1;
    var WEEKDAY_GROUP = 2;
    var POSTFIX_GROUP = 3;
    var PTWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        if (weekday === void 0) {
          return null;
        }
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let norm = prefix || postfix || "";
        norm = norm.toLowerCase();
        let modifier = null;
        if (norm == "passado") {
          modifier = "this";
        } else if (norm == "pr\xF3ximo" || norm == "proximo") {
          modifier = "next";
        } else if (norm == "este") {
          modifier = "this";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, weekday, modifier);
      }
    };
    exports.default = PTWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/pt/parsers/PTTimeExpressionParser.js
var require_PTTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/parsers/PTTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var PTTimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      primaryPrefix() {
        return "(?:(?:ao?|\xE0s?|das|da|de|do)\\s*)?";
      }
      followingPhase() {
        return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|a(?:o)?|\\?)\\s*";
      }
    };
    exports.default = PTTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/pt/refiners/PTMergeDateTimeRefiner.js
var require_PTMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/refiners/PTMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var PTMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp("^\\s*(?:,|\xE0)?\\s*$");
      }
    };
    exports.default = PTMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/pt/refiners/PTMergeDateRangeRefiner.js
var require_PTMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/refiners/PTMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var PTMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(?:-)\s*$/i;
      }
    };
    exports.default = PTMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/pt/parsers/PTMonthNameLittleEndianParser.js
var require_PTMonthNameLittleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/parsers/PTMonthNameLittleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants5();
    var constants_2 = require_constants5();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`([0-9]{1,2})(?:\xBA|\xAA|\xB0)?(?:\\s*(?:desde|de|\\-|\\\u2013|ao?|\\s)\\s*([0-9]{1,2})(?:\xBA|\xAA|\xB0)?)?\\s*(?:de)?\\s*(?:-|/|\\s*(?:de|,)?\\s*)(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:\\s*(?:de|,)?\\s*(${constants_2.YEAR_PATTERN}))?(?=\\W|$)`, "i");
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var MONTH_NAME_GROUP = 3;
    var YEAR_GROUP = 4;
    var PTMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
          const yearNumber = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", yearNumber);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
          const endDate = parseInt(match[DATE_TO_GROUP]);
          result.end = result.start.clone();
          result.end.assign("day", endDate);
        }
        return result;
      }
    };
    exports.default = PTMonthNameLittleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/pt/parsers/PTCasualDateParser.js
var require_PTCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/parsers/PTCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var references = __importStar(require_casualReferences());
    var PTCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(agora|hoje|amanha|amanhã|ontem)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        switch (lowerText) {
          case "agora":
            return references.now(context.reference);
          case "hoje":
            return references.today(context.reference);
          case "amanha":
          case "amanh\xE3":
            return references.tomorrow(context.reference);
          case "ontem":
            return references.yesterday(context.reference);
        }
        return component;
      }
    };
    exports.default = PTCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/pt/parsers/PTCasualTimeParser.js
var require_PTCasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/parsers/PTCasualTimeParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_1 = require_dayjs();
    var dayjs_2 = __importDefault(require_dayjs_min());
    var PTCasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return /(?:esta\s*)?(manha|manhã|tarde|meia-noite|meio-dia|noite)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const targetDate = dayjs_2.default(context.refDate);
        const component = context.createParsingComponents();
        switch (match[1].toLowerCase()) {
          case "tarde":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 15);
            break;
          case "noite":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 22);
            break;
          case "manha":
          case "manh\xE3":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 6);
            break;
          case "meia-noite":
            dayjs_1.assignTheNextDay(component, targetDate);
            component.imply("hour", 0);
            component.imply("minute", 0);
            component.imply("second", 0);
            break;
          case "meio-dia":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 12);
            break;
        }
        return component;
      }
    };
    exports.default = PTCasualTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/pt/index.js
var require_pt = __commonJS({
  "node_modules/chrono-node/dist/locales/pt/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var configurations_1 = require_configurations();
    var chrono_1 = require_chrono();
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var PTWeekdayParser_1 = __importDefault(require_PTWeekdayParser());
    var PTTimeExpressionParser_1 = __importDefault(require_PTTimeExpressionParser());
    var PTMergeDateTimeRefiner_1 = __importDefault(require_PTMergeDateTimeRefiner());
    var PTMergeDateRangeRefiner_1 = __importDefault(require_PTMergeDateRangeRefiner());
    var PTMonthNameLittleEndianParser_1 = __importDefault(require_PTMonthNameLittleEndianParser());
    var PTCasualDateParser_1 = __importDefault(require_PTCasualDateParser());
    var PTCasualTimeParser_1 = __importDefault(require_PTCasualTimeParser());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration(true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration(littleEndian = true) {
      const option = createConfiguration(false, littleEndian);
      option.parsers.push(new PTCasualDateParser_1.default());
      option.parsers.push(new PTCasualTimeParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true, littleEndian = true) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser_1.default(littleEndian),
          new PTWeekdayParser_1.default(),
          new PTTimeExpressionParser_1.default(),
          new PTMonthNameLittleEndianParser_1.default()
        ],
        refiners: [new PTMergeDateTimeRefiner_1.default(), new PTMergeDateRangeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/nl/refiners/NLMergeDateRangeRefiner.js
var require_NLMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/refiners/NLMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var NLMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(tot|-)\s*$/i;
      }
    };
    exports.default = NLMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/nl/refiners/NLMergeDateTimeRefiner.js
var require_NLMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/refiners/NLMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var NLMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp("^\\s*(om|na|voor|in de|,|-)?\\s*$");
      }
    };
    exports.default = NLMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLCasualDateParser.js
var require_NLCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var references = __importStar(require_casualReferences());
    var NLCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(nu|vandaag|morgen|morgend|gisteren)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        switch (lowerText) {
          case "nu":
            return references.now(context.reference);
          case "vandaag":
            return references.today(context.reference);
          case "morgen":
          case "morgend":
            return references.tomorrow(context.reference);
          case "gisteren":
            return references.yesterday(context.reference);
        }
        return component;
      }
    };
    exports.default = NLCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLCasualTimeParser.js
var require_NLCasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLCasualTimeParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var dayjs_2 = require_dayjs();
    var DAY_GROUP = 1;
    var MOMENT_GROUP = 2;
    var NLCasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return /(deze)?\s*(namiddag|avond|middernacht|ochtend|middag|'s middags|'s avonds|'s ochtends)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const targetDate = dayjs_1.default(context.refDate);
        const component = context.createParsingComponents();
        if (match[DAY_GROUP] === "deze") {
          component.assign("day", context.refDate.getDate());
          component.assign("month", context.refDate.getMonth() + 1);
          component.assign("year", context.refDate.getFullYear());
        }
        switch (match[MOMENT_GROUP].toLowerCase()) {
          case "namiddag":
          case "'s namiddags":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 15);
            break;
          case "avond":
          case "'s avonds'":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 20);
            break;
          case "middernacht":
            dayjs_2.assignTheNextDay(component, targetDate);
            component.imply("hour", 0);
            component.imply("minute", 0);
            component.imply("second", 0);
            break;
          case "ochtend":
          case "'s ochtends":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 6);
            break;
          case "middag":
          case "'s middags":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 12);
            break;
        }
        return component;
      }
    };
    exports.default = NLCasualTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/constants.js
var require_constants6 = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTimeUnits = exports.TIME_UNITS_PATTERN = exports.parseYear = exports.YEAR_PATTERN = exports.parseOrdinalNumberPattern = exports.ORDINAL_NUMBER_PATTERN = exports.parseNumberPattern = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
    var pattern_1 = require_pattern();
    var years_1 = require_years();
    exports.WEEKDAY_DICTIONARY = {
      zondag: 0,
      zon: 0,
      "zon.": 0,
      zo: 0,
      "zo.": 0,
      maandag: 1,
      ma: 1,
      "ma.": 1,
      dinsdag: 2,
      din: 2,
      "din.": 2,
      di: 2,
      "di.": 2,
      woensdag: 3,
      woe: 3,
      "woe.": 3,
      wo: 3,
      "wo.": 3,
      donderdag: 4,
      dond: 4,
      "dond.": 4,
      do: 4,
      "do.": 4,
      vrijdag: 5,
      vrij: 5,
      "vrij.": 5,
      vr: 5,
      "vr.": 5,
      zaterdag: 6,
      zat: 6,
      "zat.": 6,
      "za": 6,
      "za.": 6
    };
    exports.MONTH_DICTIONARY = {
      januari: 1,
      jan: 1,
      "jan.": 1,
      februari: 2,
      feb: 2,
      "feb.": 2,
      maart: 3,
      mar: 3,
      "mar.": 3,
      april: 4,
      apr: 4,
      "apr.": 4,
      mei: 5,
      juni: 6,
      jun: 6,
      "jun.": 6,
      juli: 7,
      jul: 7,
      "jul.": 7,
      augustus: 8,
      aug: 8,
      "aug.": 8,
      september: 9,
      sep: 9,
      "sep.": 9,
      sept: 9,
      "sept.": 9,
      oktober: 10,
      okt: 10,
      "okt.": 10,
      november: 11,
      nov: 11,
      "nov.": 11,
      december: 12,
      dec: 12,
      "dec.": 12
    };
    exports.INTEGER_WORD_DICTIONARY = {
      een: 1,
      twee: 2,
      drie: 3,
      vier: 4,
      vijf: 5,
      zes: 6,
      zeven: 7,
      acht: 8,
      negen: 9,
      tien: 10,
      elf: 11,
      twaalf: 12
    };
    exports.ORDINAL_WORD_DICTIONARY = {
      eerste: 1,
      tweede: 2,
      derde: 3,
      vierde: 4,
      vijfde: 5,
      zesde: 6,
      zevende: 7,
      achtste: 8,
      negende: 9,
      tiende: 10,
      elfde: 11,
      twaalfde: 12,
      dertiende: 13,
      veertiende: 14,
      vijftiende: 15,
      zestiende: 16,
      zeventiende: 17,
      achttiende: 18,
      negentiende: 19,
      twintigste: 20,
      "eenentwintigste": 21,
      "twee\xEBntwintigste": 22,
      "drieentwintigste": 23,
      "vierentwintigste": 24,
      "vijfentwintigste": 25,
      "zesentwintigste": 26,
      "zevenentwintigste": 27,
      "achtentwintig": 28,
      "negenentwintig": 29,
      "dertigste": 30,
      "eenendertigste": 31
    };
    exports.TIME_UNIT_DICTIONARY = {
      sec: "second",
      second: "second",
      seconden: "second",
      min: "minute",
      mins: "minute",
      minute: "minute",
      minuut: "minute",
      minuten: "minute",
      minuutje: "minute",
      h: "hour",
      hr: "hour",
      hrs: "hour",
      uur: "hour",
      u: "hour",
      uren: "hour",
      dag: "d",
      dagen: "d",
      week: "week",
      weken: "week",
      maand: "month",
      maanden: "month",
      jaar: "year",
      jr: "year",
      jaren: "year"
    };
    exports.NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+[\\.,][0-9]+|halve?|half|paar)`;
    function parseNumberPattern(match) {
      const num = match.toLowerCase();
      if (exports.INTEGER_WORD_DICTIONARY[num] !== void 0) {
        return exports.INTEGER_WORD_DICTIONARY[num];
      } else if (num === "paar") {
        return 2;
      } else if (num === "half" || num.match(/halve?/)) {
        return 0.5;
      }
      return parseFloat(num.replace(",", "."));
    }
    exports.parseNumberPattern = parseNumberPattern;
    exports.ORDINAL_NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:ste|de)?)`;
    function parseOrdinalNumberPattern(match) {
      let num = match.toLowerCase();
      if (exports.ORDINAL_WORD_DICTIONARY[num] !== void 0) {
        return exports.ORDINAL_WORD_DICTIONARY[num];
      }
      num = num.replace(/(?:ste|de)$/i, "");
      return parseInt(num);
    }
    exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
    exports.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:voor Christus|na Christus)|[1-2][0-9]{3}|[5-9][0-9])`;
    function parseYear(match) {
      if (/voor Christus/i.test(match)) {
        match = match.replace(/voor Christus/i, "");
        return -parseInt(match);
      }
      if (/na Christus/i.test(match)) {
        match = match.replace(/na Christus/i, "");
        return parseInt(match);
      }
      const rawYearNumber = parseInt(match);
      return years_1.findMostLikelyADYear(rawYearNumber);
    }
    exports.parseYear = parseYear;
    var SINGLE_TIME_UNIT_PATTERN = `(${exports.NUMBER_PATTERN})\\s{0,5}(${pattern_1.matchAnyPattern(exports.TIME_UNIT_DICTIONARY)})\\s{0,5}`;
    var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
    exports.TIME_UNITS_PATTERN = pattern_1.repeatedTimeunitPattern(`(?:(?:binnen|in)\\s*)?`, SINGLE_TIME_UNIT_PATTERN);
    function parseTimeUnits(timeunitText) {
      const fragments = {};
      let remainingText = timeunitText;
      let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      }
      return fragments;
    }
    exports.parseTimeUnits = parseTimeUnits;
    function collectDateTimeFragment(fragments, match) {
      const num = parseNumberPattern(match[1]);
      const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
      fragments[unit] = num;
    }
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitWithinFormatParser.js
var require_NLTimeUnitWithinFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitWithinFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var NLTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return new RegExp(`(?:binnen|in|binnen de|voor)\\s*(` + constants_1.TIME_UNITS_PATTERN + `)(?=\\W|$)`, "i");
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = NLTimeUnitWithinFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLWeekdayParser.js
var require_NLWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:\\,|\\(|\\\uFF08)\\s*)?(?:op\\s*?)?(?:(deze|vorige|volgende)\\s*(?:week\\s*)?)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?=\\W|$)`, "i");
    var PREFIX_GROUP = 1;
    var WEEKDAY_GROUP = 2;
    var POSTFIX_GROUP = 3;
    var NLWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();
        let modifier = null;
        if (modifierWord == "vorige") {
          modifier = "last";
        } else if (modifierWord == "volgende") {
          modifier = "next";
        } else if (modifierWord == "deze") {
          modifier = "this";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, weekday, modifier);
      }
    };
    exports.default = NLWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLMonthNameMiddleEndianParser.js
var require_NLMonthNameMiddleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLMonthNameMiddleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants6();
    var constants_2 = require_constants6();
    var constants_3 = require_constants6();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(?:on\\s*?)?(${constants_2.ORDINAL_NUMBER_PATTERN})(?:\\s*(?:tot|\\-|\\\u2013|until|through|till|\\s)\\s*(${constants_2.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s*(?:of)?\\s*)(` + pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY) + `)(?:(?:-|/|,?\\s*)(${constants_3.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i");
    var MONTH_NAME_GROUP = 3;
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var YEAR_GROUP = 4;
    var NLMonthNameMiddleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = constants_2.parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        const components = context.createParsingComponents({
          day,
          month
        });
        if (match[YEAR_GROUP]) {
          const year = constants_3.parseYear(match[YEAR_GROUP]);
          components.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          components.imply("year", year);
        }
        if (!match[DATE_TO_GROUP]) {
          return components;
        }
        const endDate = constants_2.parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);
        return result;
      }
    };
    exports.default = NLMonthNameMiddleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLMonthNameParser.js
var require_NLMonthNameParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLMonthNameParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var years_1 = require_years();
    var pattern_1 = require_pattern();
    var constants_2 = require_constants6();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${constants_2.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i");
    var MONTH_NAME_GROUP = 1;
    var YEAR_GROUP = 2;
    var NLMonthNameParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const components = context.createParsingComponents();
        components.imply("day", 1);
        const monthName = match[MONTH_NAME_GROUP];
        const month = constants_1.MONTH_DICTIONARY[monthName.toLowerCase()];
        components.assign("month", month);
        if (match[YEAR_GROUP]) {
          const year = constants_2.parseYear(match[YEAR_GROUP]);
          components.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, 1, month);
          components.imply("year", year);
        }
        return components;
      }
    };
    exports.default = NLMonthNameParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLSlashMonthFormatParser.js
var require_NLSlashMonthFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLSlashMonthFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i");
    var MONTH_GROUP = 1;
    var YEAR_GROUP = 2;
    var NLSlashMonthFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const year = parseInt(match[YEAR_GROUP]);
        const month = parseInt(match[MONTH_GROUP]);
        return context.createParsingComponents().imply("day", 1).assign("month", month).assign("year", year);
      }
    };
    exports.default = NLSlashMonthFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLTimeExpressionParser.js
var require_NLTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var NLTimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      primaryPrefix() {
        return "(?:(?:om)\\s*)?";
      }
      followingPhase() {
        return "\\s*(?:\\-|\\\u2013|\\~|\\\u301C|om|\\?)\\s*";
      }
      primarySuffix() {
        return "(?:\\s*(?:uur))?(?!/)(?=\\W|$)";
      }
      extractPrimaryTimeComponents(context, match) {
        if (match[0].match(/^\s*\d{4}\s*$/)) {
          return null;
        }
        return super.extractPrimaryTimeComponents(context, match);
      }
    };
    exports.default = NLTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLCasualYearMonthDayParser.js
var require_NLCasualYearMonthDayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLCasualYearMonthDayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`([0-9]{4})[\\.\\/\\s](?:(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})|([0-9]{1,2}))[\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i");
    var YEAR_NUMBER_GROUP = 1;
    var MONTH_NAME_GROUP = 2;
    var MONTH_NUMBER_GROUP = 3;
    var DATE_NUMBER_GROUP = 4;
    var NLCasualYearMonthDayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const month = match[MONTH_NUMBER_GROUP] ? parseInt(match[MONTH_NUMBER_GROUP]) : constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        if (month < 1 || month > 12) {
          return null;
        }
        const year = parseInt(match[YEAR_NUMBER_GROUP]);
        const day = parseInt(match[DATE_NUMBER_GROUP]);
        return {
          day,
          month,
          year
        };
      }
    };
    exports.default = NLCasualYearMonthDayParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLCasualDateTimeParser.js
var require_NLCasualDateTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLCasualDateTimeParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var index_1 = require_dist();
    var dayjs_1 = require_dayjs();
    var dayjs_2 = __importDefault(require_dayjs_min());
    var DATE_GROUP = 1;
    var TIME_OF_DAY_GROUP = 2;
    var NLCasualDateTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return /(gisteren|morgen|van)(ochtend|middag|namiddag|avond|nacht)(?=\W|$)/i;
      }
      innerExtract(context, match) {
        const dateText = match[DATE_GROUP].toLowerCase();
        const timeText = match[TIME_OF_DAY_GROUP].toLowerCase();
        const component = context.createParsingComponents();
        const targetDate = dayjs_2.default(context.refDate);
        switch (dateText) {
          case "gisteren":
            dayjs_1.assignSimilarDate(component, targetDate.add(-1, "day"));
            break;
          case "van":
            dayjs_1.assignSimilarDate(component, targetDate);
            break;
          case "morgen":
            dayjs_1.assignTheNextDay(component, targetDate);
            break;
        }
        switch (timeText) {
          case "ochtend":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 6);
            break;
          case "middag":
            component.imply("meridiem", index_1.Meridiem.AM);
            component.imply("hour", 12);
            break;
          case "namiddag":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 15);
            break;
          case "avond":
            component.imply("meridiem", index_1.Meridiem.PM);
            component.imply("hour", 20);
            break;
        }
        return component;
      }
    };
    exports.default = NLCasualDateTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitCasualRelativeFormatParser.js
var require_NLTimeUnitCasualRelativeFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitCasualRelativeFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp(`(deze|vorige|afgelopen|komende|over|\\+|-)\\s*(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    var NLTimeUnitCasualRelativeFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const prefix = match[1].toLowerCase();
        let timeUnits = constants_1.parseTimeUnits(match[2]);
        switch (prefix) {
          case "vorige":
          case "afgelopen":
          case "-":
            timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
            break;
        }
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = NLTimeUnitCasualRelativeFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLRelativeDateFormatParser.js
var require_NLRelativeDateFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLRelativeDateFormatParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var results_1 = require_results();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var pattern_1 = require_pattern();
    var PATTERN = new RegExp(`(dit|deze|komende|volgend|volgende|afgelopen|vorige)\\s*(${pattern_1.matchAnyPattern(constants_1.TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i");
    var MODIFIER_WORD_GROUP = 1;
    var RELATIVE_WORD_GROUP = 2;
    var NLRelativeDateFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
        const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
        const timeunit = constants_1.TIME_UNIT_DICTIONARY[unitWord];
        if (modifier == "volgend" || modifier == "volgende" || modifier == "komende") {
          const timeUnits = {};
          timeUnits[timeunit] = 1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        if (modifier == "afgelopen" || modifier == "vorige") {
          const timeUnits = {};
          timeUnits[timeunit] = -1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        const components = context.createParsingComponents();
        let date = dayjs_1.default(context.reference.instant);
        if (unitWord.match(/week/i)) {
          date = date.add(-date.get("d"), "d");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.imply("year", date.year());
        } else if (unitWord.match(/maand/i)) {
          date = date.add(-date.date() + 1, "d");
          components.imply("day", date.date());
          components.assign("year", date.year());
          components.assign("month", date.month() + 1);
        } else if (unitWord.match(/jaar/i)) {
          date = date.add(-date.date() + 1, "d");
          date = date.add(-date.month(), "month");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.assign("year", date.year());
        }
        return components;
      }
    };
    exports.default = NLRelativeDateFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitAgoFormatParser.js
var require_NLTimeUnitAgoFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitAgoFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp("(" + constants_1.TIME_UNITS_PATTERN + ")(?:geleden|voor|eerder)(?=(?:\\W|$))", "i");
    var STRICT_PATTERN = new RegExp("(" + constants_1.TIME_UNITS_PATTERN + ")geleden(?=(?:\\W|$))", "i");
    var NLTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor(strictMode) {
        super();
        this.strictMode = strictMode;
      }
      innerPattern() {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        const outputTimeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
      }
    };
    exports.default = NLTimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitLaterFormatParser.js
var require_NLTimeUnitLaterFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/parsers/NLTimeUnitLaterFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants6();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp("(" + constants_1.TIME_UNITS_PATTERN + ")(later|na|vanaf nu|voortaan|vooruit|uit)(?=(?:\\W|$))", "i");
    var STRICT_PATTERN = new RegExp("(" + constants_1.TIME_UNITS_PATTERN + ")(later|vanaf nu)(?=(?:\\W|$))", "i");
    var GROUP_NUM_TIMEUNITS = 1;
    var NLTimeUnitLaterFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      constructor(strictMode) {
        super();
        this.strictMode = strictMode;
      }
      innerPattern() {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
      }
      innerExtract(context, match) {
        const fragments = constants_1.parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, fragments);
      }
    };
    exports.default = NLTimeUnitLaterFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/nl/index.js
var require_nl = __commonJS({
  "node_modules/chrono-node/dist/locales/nl/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var configurations_1 = require_configurations();
    var chrono_1 = require_chrono();
    var NLMergeDateRangeRefiner_1 = __importDefault(require_NLMergeDateRangeRefiner());
    var NLMergeDateTimeRefiner_1 = __importDefault(require_NLMergeDateTimeRefiner());
    var NLCasualDateParser_1 = __importDefault(require_NLCasualDateParser());
    var NLCasualTimeParser_1 = __importDefault(require_NLCasualTimeParser());
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var NLTimeUnitWithinFormatParser_1 = __importDefault(require_NLTimeUnitWithinFormatParser());
    var NLWeekdayParser_1 = __importDefault(require_NLWeekdayParser());
    var NLMonthNameMiddleEndianParser_1 = __importDefault(require_NLMonthNameMiddleEndianParser());
    var NLMonthNameParser_1 = __importDefault(require_NLMonthNameParser());
    var NLSlashMonthFormatParser_1 = __importDefault(require_NLSlashMonthFormatParser());
    var NLTimeExpressionParser_1 = __importDefault(require_NLTimeExpressionParser());
    var NLCasualYearMonthDayParser_1 = __importDefault(require_NLCasualYearMonthDayParser());
    var NLCasualDateTimeParser_1 = __importDefault(require_NLCasualDateTimeParser());
    var NLTimeUnitCasualRelativeFormatParser_1 = __importDefault(require_NLTimeUnitCasualRelativeFormatParser());
    var NLRelativeDateFormatParser_1 = __importDefault(require_NLRelativeDateFormatParser());
    var NLTimeUnitAgoFormatParser_1 = __importDefault(require_NLTimeUnitAgoFormatParser());
    var NLTimeUnitLaterFormatParser_1 = __importDefault(require_NLTimeUnitLaterFormatParser());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration(true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration(littleEndian = true) {
      const option = createConfiguration(false, littleEndian);
      option.parsers.unshift(new NLCasualDateParser_1.default());
      option.parsers.unshift(new NLCasualTimeParser_1.default());
      option.parsers.unshift(new NLCasualDateTimeParser_1.default());
      option.parsers.unshift(new NLMonthNameParser_1.default());
      option.parsers.unshift(new NLRelativeDateFormatParser_1.default());
      option.parsers.unshift(new NLTimeUnitCasualRelativeFormatParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true, littleEndian = true) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser_1.default(littleEndian),
          new NLTimeUnitWithinFormatParser_1.default(),
          new NLMonthNameMiddleEndianParser_1.default(),
          new NLMonthNameParser_1.default(),
          new NLWeekdayParser_1.default(),
          new NLCasualYearMonthDayParser_1.default(),
          new NLSlashMonthFormatParser_1.default(),
          new NLTimeExpressionParser_1.default(strictMode),
          new NLTimeUnitAgoFormatParser_1.default(strictMode),
          new NLTimeUnitLaterFormatParser_1.default(strictMode)
        ],
        refiners: [new NLMergeDateTimeRefiner_1.default(), new NLMergeDateRangeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantCasualDateParser.js
var require_ZHHantCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantCasualDateParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var NOW_GROUP = 1;
    var DAY_GROUP_1 = 2;
    var TIME_GROUP_1 = 3;
    var TIME_GROUP_2 = 4;
    var DAY_GROUP_3 = 5;
    var TIME_GROUP_3 = 6;
    var ZHHantCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return new RegExp("(\u800C\u5BB6|\u7ACB(?:\u523B|\u5373)|\u5373\u523B)|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(\u65E9|\u671D|\u665A)|(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(?:\u65E5|\u5929)(?:[\\s|,|\uFF0C]*)(?:(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?", "i");
      }
      innerExtract(context, match) {
        const index = match.index;
        const result = context.createParsingResult(index, match[0]);
        const refMoment = dayjs_1.default(context.refDate);
        let startMoment = refMoment;
        if (match[NOW_GROUP]) {
          result.start.imply("hour", refMoment.hour());
          result.start.imply("minute", refMoment.minute());
          result.start.imply("second", refMoment.second());
          result.start.imply("millisecond", refMoment.millisecond());
        } else if (match[DAY_GROUP_1]) {
          const day1 = match[DAY_GROUP_1];
          const time1 = match[TIME_GROUP_1];
          if (day1 == "\u660E" || day1 == "\u807D") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day1 == "\u6628" || day1 == "\u5C0B" || day1 == "\u7434") {
            startMoment = startMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day1 == "\u5F8C") {
            startMoment = startMoment.add(2, "day");
          } else if (day1 == "\u5927\u5F8C") {
            startMoment = startMoment.add(3, "day");
          }
          if (time1 == "\u65E9" || time1 == "\u671D") {
            result.start.imply("hour", 6);
          } else if (time1 == "\u665A") {
            result.start.imply("hour", 22);
            result.start.imply("meridiem", 1);
          }
        } else if (match[TIME_GROUP_2]) {
          const timeString2 = match[TIME_GROUP_2];
          const time2 = timeString2[0];
          if (time2 == "\u65E9" || time2 == "\u671D" || time2 == "\u4E0A") {
            result.start.imply("hour", 6);
          } else if (time2 == "\u4E0B" || time2 == "\u664F") {
            result.start.imply("hour", 15);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u4E2D") {
            result.start.imply("hour", 12);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u591C" || time2 == "\u665A") {
            result.start.imply("hour", 22);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u51CC") {
            result.start.imply("hour", 0);
          }
        } else if (match[DAY_GROUP_3]) {
          const day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E" || day3 == "\u807D") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day3 == "\u6628" || day3 == "\u5C0B" || day3 == "\u7434") {
            startMoment = startMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day3 == "\u5F8C") {
            startMoment = startMoment.add(2, "day");
          } else if (day3 == "\u5927\u5F8C") {
            startMoment = startMoment.add(3, "day");
          }
          const timeString3 = match[TIME_GROUP_3];
          if (timeString3) {
            const time3 = timeString3[0];
            if (time3 == "\u65E9" || time3 == "\u671D" || time3 == "\u4E0A") {
              result.start.imply("hour", 6);
            } else if (time3 == "\u4E0B" || time3 == "\u664F") {
              result.start.imply("hour", 15);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u4E2D") {
              result.start.imply("hour", 12);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u591C" || time3 == "\u665A") {
              result.start.imply("hour", 22);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u51CC") {
              result.start.imply("hour", 0);
            }
          }
        }
        result.start.assign("day", startMoment.date());
        result.start.assign("month", startMoment.month() + 1);
        result.start.assign("year", startMoment.year());
        return result;
      }
    };
    exports.default = ZHHantCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/constants.js
var require_constants7 = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.zhStringToYear = exports.zhStringToNumber = exports.WEEKDAY_OFFSET = exports.NUMBER = void 0;
    exports.NUMBER = {
      "\u96F6": 0,
      "\u4E00": 1,
      "\u4E8C": 2,
      "\u5169": 2,
      "\u4E09": 3,
      "\u56DB": 4,
      "\u4E94": 5,
      "\u516D": 6,
      "\u4E03": 7,
      "\u516B": 8,
      "\u4E5D": 9,
      "\u5341": 10,
      "\u5EFF": 20,
      "\u5345": 30
    };
    exports.WEEKDAY_OFFSET = {
      "\u5929": 0,
      "\u65E5": 0,
      "\u4E00": 1,
      "\u4E8C": 2,
      "\u4E09": 3,
      "\u56DB": 4,
      "\u4E94": 5,
      "\u516D": 6
    };
    function zhStringToNumber(text) {
      let number = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === "\u5341") {
          number = number === 0 ? exports.NUMBER[char] : number * exports.NUMBER[char];
        } else {
          number += exports.NUMBER[char];
        }
      }
      return number;
    }
    exports.zhStringToNumber = zhStringToNumber;
    function zhStringToYear(text) {
      let string = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        string = string + exports.NUMBER[char];
      }
      return parseInt(string);
    }
    exports.zhStringToYear = zhStringToYear;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantDateParser.js
var require_ZHHantDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantDateParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants7();
    var YEAR_GROUP = 1;
    var MONTH_GROUP = 2;
    var DAY_GROUP = 3;
    var ZHHantDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return new RegExp("(\\d{2,4}|[" + Object.keys(constants_1.NUMBER).join("") + "]{4}|[" + Object.keys(constants_1.NUMBER).join("") + "]{2})?(?:\\s*)(?:\u5E74)?(?:[\\s|,|\uFF0C]*)(\\d{1,2}|[" + Object.keys(constants_1.NUMBER).join("") + "]{1,2})(?:\\s*)(?:\u6708)(?:\\s*)(\\d{1,2}|[" + Object.keys(constants_1.NUMBER).join("") + "]{1,2})?(?:\\s*)(?:\u65E5|\u865F)?");
      }
      innerExtract(context, match) {
        const startMoment = dayjs_1.default(context.refDate);
        const result = context.createParsingResult(match.index, match[0]);
        let month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month))
          month = constants_1.zhStringToNumber(match[MONTH_GROUP]);
        result.start.assign("month", month);
        if (match[DAY_GROUP]) {
          let day = parseInt(match[DAY_GROUP]);
          if (isNaN(day))
            day = constants_1.zhStringToNumber(match[DAY_GROUP]);
          result.start.assign("day", day);
        } else {
          result.start.imply("day", startMoment.date());
        }
        if (match[YEAR_GROUP]) {
          let year = parseInt(match[YEAR_GROUP]);
          if (isNaN(year))
            year = constants_1.zhStringToYear(match[YEAR_GROUP]);
          result.start.assign("year", year);
        } else {
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHantDateParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantDeadlineFormatParser.js
var require_ZHHantDeadlineFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantDeadlineFormatParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants7();
    var PATTERN = new RegExp("(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+|\u534A|\u5E7E)(?:\\s*)(?:\u500B)?(\u79D2(?:\u9418)?|\u5206\u9418|\u5C0F\u6642|\u9418|\u65E5|\u5929|\u661F\u671F|\u79AE\u62DC|\u6708|\u5E74)(?:(?:\u4E4B|\u904E)?\u5F8C|(?:\u4E4B)?\u5167)", "i");
    var NUMBER_GROUP = 1;
    var UNIT_GROUP = 2;
    var ZHHantDeadlineFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        let number = parseInt(match[NUMBER_GROUP]);
        if (isNaN(number)) {
          number = constants_1.zhStringToNumber(match[NUMBER_GROUP]);
        }
        if (isNaN(number)) {
          const string = match[NUMBER_GROUP];
          if (string === "\u5E7E") {
            number = 3;
          } else if (string === "\u534A") {
            number = 0.5;
          } else {
            return null;
          }
        }
        let date = dayjs_1.default(context.refDate);
        const unit = match[UNIT_GROUP];
        const unitAbbr = unit[0];
        if (unitAbbr.match(/[日天星禮月年]/)) {
          if (unitAbbr == "\u65E5" || unitAbbr == "\u5929") {
            date = date.add(number, "d");
          } else if (unitAbbr == "\u661F" || unitAbbr == "\u79AE") {
            date = date.add(number * 7, "d");
          } else if (unitAbbr == "\u6708") {
            date = date.add(number, "month");
          } else if (unitAbbr == "\u5E74") {
            date = date.add(number, "year");
          }
          result.start.assign("year", date.year());
          result.start.assign("month", date.month() + 1);
          result.start.assign("day", date.date());
          return result;
        }
        if (unitAbbr == "\u79D2") {
          date = date.add(number, "second");
        } else if (unitAbbr == "\u5206") {
          date = date.add(number, "minute");
        } else if (unitAbbr == "\u5C0F" || unitAbbr == "\u9418") {
          date = date.add(number, "hour");
        }
        result.start.imply("year", date.year());
        result.start.imply("month", date.month() + 1);
        result.start.imply("day", date.date());
        result.start.assign("hour", date.hour());
        result.start.assign("minute", date.minute());
        result.start.assign("second", date.second());
        return result;
      }
    };
    exports.default = ZHHantDeadlineFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantRelationWeekdayParser.js
var require_ZHHantRelationWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantRelationWeekdayParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants7();
    var PATTERN = new RegExp("(?<prefix>\u4E0A|\u4ECA|\u4E0B|\u9019|\u5462)(?:\u500B)?(?:\u661F\u671F|\u79AE\u62DC|\u9031)(?<weekday>" + Object.keys(constants_1.WEEKDAY_OFFSET).join("|") + ")");
    var ZHHantRelationWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const dayOfWeek = match.groups.weekday;
        const offset = constants_1.WEEKDAY_OFFSET[dayOfWeek];
        if (offset === void 0)
          return null;
        let modifier = null;
        const prefix = match.groups.prefix;
        if (prefix == "\u4E0A") {
          modifier = "last";
        } else if (prefix == "\u4E0B") {
          modifier = "next";
        } else if (prefix == "\u4ECA" || prefix == "\u9019" || prefix == "\u5462") {
          modifier = "this";
        }
        let startMoment = dayjs_1.default(context.refDate);
        let startMomentFixed = false;
        const refOffset = startMoment.day();
        if (modifier == "last" || modifier == "past") {
          startMoment = startMoment.day(offset - 7);
          startMomentFixed = true;
        } else if (modifier == "next") {
          startMoment = startMoment.day(offset + 7);
          startMomentFixed = true;
        } else if (modifier == "this") {
          startMoment = startMoment.day(offset);
        } else {
          if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset - 7);
          } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset + 7);
          } else {
            startMoment = startMoment.day(offset);
          }
        }
        result.start.assign("weekday", offset);
        if (startMomentFixed) {
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHantRelationWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantTimeExpressionParser.js
var require_ZHHantTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantTimeExpressionParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants7();
    var FIRST_REG_PATTERN = new RegExp("(?:\u7531|\u5F9E|\u81EA)?(?:(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(\u65E9|\u671D|\u665A)|(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(?:\u65E5|\u5929)(?:[\\s,\uFF0C]*)(?:(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?)?(?:[\\s,\uFF0C]*)(?:(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)(?:\\s*)(?:\u9EDE|\u6642|:|\uFF1A)(?:\\s*)(\\d+|\u534A|\u6B63|\u6574|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u5206|:|\uFF1A)?(?:\\s*)(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u79D2)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
    var SECOND_REG_PATTERN = new RegExp("(?:^\\s*(?:\u5230|\u81F3|\\-|\\\u2013|\\~|\\\u301C)\\s*)(?:(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(\u65E9|\u671D|\u665A)|(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u5F8C|\u5927\u5F8C|\u807D|\u6628|\u5C0B|\u7434)(?:\u65E5|\u5929)(?:[\\s,\uFF0C]*)(?:(\u4E0A(?:\u5348|\u665D)|\u671D(?:\u65E9)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348|\u665D)|\u664F(?:\u665D)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?)?(?:[\\s,\uFF0C]*)(?:(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)(?:\\s*)(?:\u9EDE|\u6642|:|\uFF1A)(?:\\s*)(\\d+|\u534A|\u6B63|\u6574|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u5206|:|\uFF1A)?(?:\\s*)(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u79D2)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
    var DAY_GROUP_1 = 1;
    var ZH_AM_PM_HOUR_GROUP_1 = 2;
    var ZH_AM_PM_HOUR_GROUP_2 = 3;
    var DAY_GROUP_3 = 4;
    var ZH_AM_PM_HOUR_GROUP_3 = 5;
    var HOUR_GROUP = 6;
    var MINUTE_GROUP = 7;
    var SECOND_GROUP = 8;
    var AM_PM_HOUR_GROUP = 9;
    var ZHHantTimeExpressionParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return FIRST_REG_PATTERN;
      }
      innerExtract(context, match) {
        if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
          return null;
        }
        const refMoment = dayjs_1.default(context.refDate);
        const result = context.createParsingResult(match.index, match[0]);
        let startMoment = refMoment.clone();
        if (match[DAY_GROUP_1]) {
          var day1 = match[DAY_GROUP_1];
          if (day1 == "\u660E" || day1 == "\u807D") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day1 == "\u6628" || day1 == "\u5C0B" || day1 == "\u7434") {
            startMoment = startMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day1 == "\u5F8C") {
            startMoment = startMoment.add(2, "day");
          } else if (day1 == "\u5927\u5F8C") {
            startMoment = startMoment.add(3, "day");
          }
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else if (match[DAY_GROUP_3]) {
          var day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E" || day3 == "\u807D") {
            startMoment = startMoment.add(1, "day");
          } else if (day3 == "\u6628" || day3 == "\u5C0B" || day3 == "\u7434") {
            startMoment = startMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day3 == "\u5F8C") {
            startMoment = startMoment.add(2, "day");
          } else if (day3 == "\u5927\u5F8C") {
            startMoment = startMoment.add(3, "day");
          }
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        let hour = 0;
        let minute = 0;
        let meridiem = -1;
        if (match[SECOND_GROUP]) {
          var second = parseInt(match[SECOND_GROUP]);
          if (isNaN(second)) {
            second = constants_1.zhStringToNumber(match[SECOND_GROUP]);
          }
          if (second >= 60)
            return null;
          result.start.assign("second", second);
        }
        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
          hour = constants_1.zhStringToNumber(match[HOUR_GROUP]);
        }
        if (match[MINUTE_GROUP]) {
          if (match[MINUTE_GROUP] == "\u534A") {
            minute = 30;
          } else if (match[MINUTE_GROUP] == "\u6B63" || match[MINUTE_GROUP] == "\u6574") {
            minute = 0;
          } else {
            minute = parseInt(match[MINUTE_GROUP]);
            if (isNaN(minute)) {
              minute = constants_1.zhStringToNumber(match[MINUTE_GROUP]);
            }
          }
        } else if (hour > 100) {
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (minute >= 60) {
          return null;
        }
        if (hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = 1;
        }
        if (match[AM_PM_HOUR_GROUP]) {
          if (hour > 12)
            return null;
          var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          }
          if (ampm == "p") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
          var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
          var zhAMPM1 = zhAMPMString1[0];
          if (zhAMPM1 == "\u671D" || zhAMPM1 == "\u65E9") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM1 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
          var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
          var zhAMPM2 = zhAMPMString2[0];
          if (zhAMPM2 == "\u4E0A" || zhAMPM2 == "\u671D" || zhAMPM2 == "\u65E9" || zhAMPM2 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM2 == "\u4E0B" || zhAMPM2 == "\u664F" || zhAMPM2 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
          var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
          var zhAMPM3 = zhAMPMString3[0];
          if (zhAMPM3 == "\u4E0A" || zhAMPM3 == "\u671D" || zhAMPM3 == "\u65E9" || zhAMPM3 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM3 == "\u4E0B" || zhAMPM3 == "\u664F" || zhAMPM3 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        }
        result.start.assign("hour", hour);
        result.start.assign("minute", minute);
        if (meridiem >= 0) {
          result.start.assign("meridiem", meridiem);
        } else {
          if (hour < 12) {
            result.start.imply("meridiem", 0);
          } else {
            result.start.imply("meridiem", 1);
          }
        }
        match = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
        if (!match) {
          if (result.text.match(/^\d+$/)) {
            return null;
          }
          return result;
        }
        let endMoment = startMoment.clone();
        result.end = context.createParsingComponents();
        if (match[DAY_GROUP_1]) {
          var day1 = match[DAY_GROUP_1];
          if (day1 == "\u660E" || day1 == "\u807D") {
            if (refMoment.hour() > 1) {
              endMoment = endMoment.add(1, "day");
            }
          } else if (day1 == "\u6628" || day1 == "\u5C0B" || day1 == "\u7434") {
            endMoment = endMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            endMoment = endMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            endMoment = endMoment.add(-3, "day");
          } else if (day1 == "\u5F8C") {
            endMoment = endMoment.add(2, "day");
          } else if (day1 == "\u5927\u5F8C") {
            endMoment = endMoment.add(3, "day");
          }
          result.end.assign("day", endMoment.date());
          result.end.assign("month", endMoment.month() + 1);
          result.end.assign("year", endMoment.year());
        } else if (match[DAY_GROUP_3]) {
          var day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E" || day3 == "\u807D") {
            endMoment = endMoment.add(1, "day");
          } else if (day3 == "\u6628" || day3 == "\u5C0B" || day3 == "\u7434") {
            endMoment = endMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            endMoment = endMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            endMoment = endMoment.add(-3, "day");
          } else if (day3 == "\u5F8C") {
            endMoment = endMoment.add(2, "day");
          } else if (day3 == "\u5927\u5F8C") {
            endMoment = endMoment.add(3, "day");
          }
          result.end.assign("day", endMoment.date());
          result.end.assign("month", endMoment.month() + 1);
          result.end.assign("year", endMoment.year());
        } else {
          result.end.imply("day", endMoment.date());
          result.end.imply("month", endMoment.month() + 1);
          result.end.imply("year", endMoment.year());
        }
        hour = 0;
        minute = 0;
        meridiem = -1;
        if (match[SECOND_GROUP]) {
          var second = parseInt(match[SECOND_GROUP]);
          if (isNaN(second)) {
            second = constants_1.zhStringToNumber(match[SECOND_GROUP]);
          }
          if (second >= 60)
            return null;
          result.end.assign("second", second);
        }
        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
          hour = constants_1.zhStringToNumber(match[HOUR_GROUP]);
        }
        if (match[MINUTE_GROUP]) {
          if (match[MINUTE_GROUP] == "\u534A") {
            minute = 30;
          } else if (match[MINUTE_GROUP] == "\u6B63" || match[MINUTE_GROUP] == "\u6574") {
            minute = 0;
          } else {
            minute = parseInt(match[MINUTE_GROUP]);
            if (isNaN(minute)) {
              minute = constants_1.zhStringToNumber(match[MINUTE_GROUP]);
            }
          }
        } else if (hour > 100) {
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (minute >= 60) {
          return null;
        }
        if (hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = 1;
        }
        if (match[AM_PM_HOUR_GROUP]) {
          if (hour > 12)
            return null;
          var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          }
          if (ampm == "p") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
          if (!result.start.isCertain("meridiem")) {
            if (meridiem == 0) {
              result.start.imply("meridiem", 0);
              if (result.start.get("hour") == 12) {
                result.start.assign("hour", 0);
              }
            } else {
              result.start.imply("meridiem", 1);
              if (result.start.get("hour") != 12) {
                result.start.assign("hour", result.start.get("hour") + 12);
              }
            }
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
          var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
          var zhAMPM1 = zhAMPMString1[0];
          if (zhAMPM1 == "\u671D" || zhAMPM1 == "\u65E9") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM1 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
          var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
          var zhAMPM2 = zhAMPMString2[0];
          if (zhAMPM2 == "\u4E0A" || zhAMPM2 == "\u671D" || zhAMPM2 == "\u65E9" || zhAMPM2 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM2 == "\u4E0B" || zhAMPM2 == "\u664F" || zhAMPM2 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
          var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
          var zhAMPM3 = zhAMPMString3[0];
          if (zhAMPM3 == "\u4E0A" || zhAMPM3 == "\u671D" || zhAMPM3 == "\u65E9" || zhAMPM3 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM3 == "\u4E0B" || zhAMPM3 == "\u664F" || zhAMPM3 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        }
        result.text = result.text + match[0];
        result.end.assign("hour", hour);
        result.end.assign("minute", minute);
        if (meridiem >= 0) {
          result.end.assign("meridiem", meridiem);
        } else {
          const startAtPM = result.start.isCertain("meridiem") && result.start.get("meridiem") == 1;
          if (startAtPM && result.start.get("hour") > hour) {
            result.end.imply("meridiem", 0);
          } else if (hour > 12) {
            result.end.imply("meridiem", 1);
          }
        }
        if (result.end.date().getTime() < result.start.date().getTime()) {
          result.end.imply("day", result.end.get("day") + 1);
        }
        return result;
      }
    };
    exports.default = ZHHantTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantWeekdayParser.js
var require_ZHHantWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/parsers/ZHHantWeekdayParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants7();
    var PATTERN = new RegExp("(?:\u661F\u671F|\u79AE\u62DC|\u9031)(?<weekday>" + Object.keys(constants_1.WEEKDAY_OFFSET).join("|") + ")");
    var ZHHantWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const dayOfWeek = match.groups.weekday;
        const offset = constants_1.WEEKDAY_OFFSET[dayOfWeek];
        if (offset === void 0)
          return null;
        let startMoment = dayjs_1.default(context.refDate);
        const startMomentFixed = false;
        const refOffset = startMoment.day();
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
          startMoment = startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
          startMoment = startMoment.day(offset + 7);
        } else {
          startMoment = startMoment.day(offset);
        }
        result.start.assign("weekday", offset);
        if (startMomentFixed) {
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHantWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/refiners/ZHHantMergeDateRangeRefiner.js
var require_ZHHantMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/refiners/ZHHantMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var ZHHantMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(至|到|\-|\~|～|－|ー)\s*$/i;
      }
    };
    exports.default = ZHHantMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/refiners/ZHHantMergeDateTimeRefiner.js
var require_ZHHantMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/refiners/ZHHantMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var ZHHantMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return /^\s*$/i;
      }
    };
    exports.default = ZHHantMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/zh/hant/index.js
var require_hant = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hant/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = exports.hant = void 0;
    var chrono_1 = require_chrono();
    var ExtractTimezoneOffsetRefiner_1 = __importDefault(require_ExtractTimezoneOffsetRefiner());
    var configurations_1 = require_configurations();
    var ZHHantCasualDateParser_1 = __importDefault(require_ZHHantCasualDateParser());
    var ZHHantDateParser_1 = __importDefault(require_ZHHantDateParser());
    var ZHHantDeadlineFormatParser_1 = __importDefault(require_ZHHantDeadlineFormatParser());
    var ZHHantRelationWeekdayParser_1 = __importDefault(require_ZHHantRelationWeekdayParser());
    var ZHHantTimeExpressionParser_1 = __importDefault(require_ZHHantTimeExpressionParser());
    var ZHHantWeekdayParser_1 = __importDefault(require_ZHHantWeekdayParser());
    var ZHHantMergeDateRangeRefiner_1 = __importDefault(require_ZHHantMergeDateRangeRefiner());
    var ZHHantMergeDateTimeRefiner_1 = __importDefault(require_ZHHantMergeDateTimeRefiner());
    exports.hant = new chrono_1.Chrono(createCasualConfiguration());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration());
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration() {
      const option = createConfiguration();
      option.parsers.unshift(new ZHHantCasualDateParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration() {
      const configuration = configurations_1.includeCommonConfiguration({
        parsers: [
          new ZHHantDateParser_1.default(),
          new ZHHantRelationWeekdayParser_1.default(),
          new ZHHantWeekdayParser_1.default(),
          new ZHHantTimeExpressionParser_1.default(),
          new ZHHantDeadlineFormatParser_1.default()
        ],
        refiners: [new ZHHantMergeDateRangeRefiner_1.default(), new ZHHantMergeDateTimeRefiner_1.default()]
      });
      configuration.refiners = configuration.refiners.filter((refiner) => !(refiner instanceof ExtractTimezoneOffsetRefiner_1.default));
      return configuration;
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansCasualDateParser.js
var require_ZHHansCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansCasualDateParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var NOW_GROUP = 1;
    var DAY_GROUP_1 = 2;
    var TIME_GROUP_1 = 3;
    var TIME_GROUP_2 = 4;
    var DAY_GROUP_3 = 5;
    var TIME_GROUP_3 = 6;
    var ZHHansCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern(context) {
        return new RegExp("(\u73B0\u5728|\u7ACB(?:\u523B|\u5373)|\u5373\u523B)|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(\u65E9|\u665A)|(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(?:\u65E5|\u5929)(?:[\\s|,|\uFF0C]*)(?:(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?", "i");
      }
      innerExtract(context, match) {
        const index = match.index;
        const result = context.createParsingResult(index, match[0]);
        const refMoment = dayjs_1.default(context.refDate);
        let startMoment = refMoment;
        if (match[NOW_GROUP]) {
          result.start.imply("hour", refMoment.hour());
          result.start.imply("minute", refMoment.minute());
          result.start.imply("second", refMoment.second());
          result.start.imply("millisecond", refMoment.millisecond());
        } else if (match[DAY_GROUP_1]) {
          const day1 = match[DAY_GROUP_1];
          const time1 = match[TIME_GROUP_1];
          if (day1 == "\u660E") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day1 == "\u6628") {
            startMoment = startMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day1 == "\u540E") {
            startMoment = startMoment.add(2, "day");
          } else if (day1 == "\u5927\u540E") {
            startMoment = startMoment.add(3, "day");
          }
          if (time1 == "\u65E9") {
            result.start.imply("hour", 6);
          } else if (time1 == "\u665A") {
            result.start.imply("hour", 22);
            result.start.imply("meridiem", 1);
          }
        } else if (match[TIME_GROUP_2]) {
          const timeString2 = match[TIME_GROUP_2];
          const time2 = timeString2[0];
          if (time2 == "\u65E9" || time2 == "\u4E0A") {
            result.start.imply("hour", 6);
          } else if (time2 == "\u4E0B") {
            result.start.imply("hour", 15);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u4E2D") {
            result.start.imply("hour", 12);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u591C" || time2 == "\u665A") {
            result.start.imply("hour", 22);
            result.start.imply("meridiem", 1);
          } else if (time2 == "\u51CC") {
            result.start.imply("hour", 0);
          }
        } else if (match[DAY_GROUP_3]) {
          const day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day3 == "\u6628") {
            startMoment = startMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day3 == "\u540E") {
            startMoment = startMoment.add(2, "day");
          } else if (day3 == "\u5927\u540E") {
            startMoment = startMoment.add(3, "day");
          }
          const timeString3 = match[TIME_GROUP_3];
          if (timeString3) {
            const time3 = timeString3[0];
            if (time3 == "\u65E9" || time3 == "\u4E0A") {
              result.start.imply("hour", 6);
            } else if (time3 == "\u4E0B") {
              result.start.imply("hour", 15);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u4E2D") {
              result.start.imply("hour", 12);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u591C" || time3 == "\u665A") {
              result.start.imply("hour", 22);
              result.start.imply("meridiem", 1);
            } else if (time3 == "\u51CC") {
              result.start.imply("hour", 0);
            }
          }
        }
        result.start.assign("day", startMoment.date());
        result.start.assign("month", startMoment.month() + 1);
        result.start.assign("year", startMoment.year());
        return result;
      }
    };
    exports.default = ZHHansCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/constants.js
var require_constants8 = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.zhStringToYear = exports.zhStringToNumber = exports.WEEKDAY_OFFSET = exports.NUMBER = void 0;
    exports.NUMBER = {
      "\u96F6": 0,
      "\u3007": 0,
      "\u4E00": 1,
      "\u4E8C": 2,
      "\u4E24": 2,
      "\u4E09": 3,
      "\u56DB": 4,
      "\u4E94": 5,
      "\u516D": 6,
      "\u4E03": 7,
      "\u516B": 8,
      "\u4E5D": 9,
      "\u5341": 10
    };
    exports.WEEKDAY_OFFSET = {
      "\u5929": 0,
      "\u65E5": 0,
      "\u4E00": 1,
      "\u4E8C": 2,
      "\u4E09": 3,
      "\u56DB": 4,
      "\u4E94": 5,
      "\u516D": 6
    };
    function zhStringToNumber(text) {
      let number = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === "\u5341") {
          number = number === 0 ? exports.NUMBER[char] : number * exports.NUMBER[char];
        } else {
          number += exports.NUMBER[char];
        }
      }
      return number;
    }
    exports.zhStringToNumber = zhStringToNumber;
    function zhStringToYear(text) {
      let string = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        string = string + exports.NUMBER[char];
      }
      return parseInt(string);
    }
    exports.zhStringToYear = zhStringToYear;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansDateParser.js
var require_ZHHansDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansDateParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants8();
    var YEAR_GROUP = 1;
    var MONTH_GROUP = 2;
    var DAY_GROUP = 3;
    var ZHHansDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return new RegExp("(\\d{2,4}|[" + Object.keys(constants_1.NUMBER).join("") + "]{4}|[" + Object.keys(constants_1.NUMBER).join("") + "]{2})?(?:\\s*)(?:\u5E74)?(?:[\\s|,|\uFF0C]*)(\\d{1,2}|[" + Object.keys(constants_1.NUMBER).join("") + "]{1,3})(?:\\s*)(?:\u6708)(?:\\s*)(\\d{1,2}|[" + Object.keys(constants_1.NUMBER).join("") + "]{1,3})?(?:\\s*)(?:\u65E5|\u53F7)?");
      }
      innerExtract(context, match) {
        const startMoment = dayjs_1.default(context.refDate);
        const result = context.createParsingResult(match.index, match[0]);
        let month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month))
          month = constants_1.zhStringToNumber(match[MONTH_GROUP]);
        result.start.assign("month", month);
        if (match[DAY_GROUP]) {
          let day = parseInt(match[DAY_GROUP]);
          if (isNaN(day))
            day = constants_1.zhStringToNumber(match[DAY_GROUP]);
          result.start.assign("day", day);
        } else {
          result.start.imply("day", startMoment.date());
        }
        if (match[YEAR_GROUP]) {
          let year = parseInt(match[YEAR_GROUP]);
          if (isNaN(year))
            year = constants_1.zhStringToYear(match[YEAR_GROUP]);
          result.start.assign("year", year);
        } else {
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHansDateParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansDeadlineFormatParser.js
var require_ZHHansDeadlineFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansDeadlineFormatParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants8();
    var PATTERN = new RegExp("(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+|\u534A|\u51E0)(?:\\s*)(?:\u4E2A)?(\u79D2(?:\u949F)?|\u5206\u949F|\u5C0F\u65F6|\u949F|\u65E5|\u5929|\u661F\u671F|\u793C\u62DC|\u6708|\u5E74)(?:(?:\u4E4B|\u8FC7)?\u540E|(?:\u4E4B)?\u5185)", "i");
    var NUMBER_GROUP = 1;
    var UNIT_GROUP = 2;
    var ZHHansDeadlineFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        let number = parseInt(match[NUMBER_GROUP]);
        if (isNaN(number)) {
          number = constants_1.zhStringToNumber(match[NUMBER_GROUP]);
        }
        if (isNaN(number)) {
          const string = match[NUMBER_GROUP];
          if (string === "\u51E0") {
            number = 3;
          } else if (string === "\u534A") {
            number = 0.5;
          } else {
            return null;
          }
        }
        let date = dayjs_1.default(context.refDate);
        const unit = match[UNIT_GROUP];
        const unitAbbr = unit[0];
        if (unitAbbr.match(/[日天星礼月年]/)) {
          if (unitAbbr == "\u65E5" || unitAbbr == "\u5929") {
            date = date.add(number, "d");
          } else if (unitAbbr == "\u661F" || unitAbbr == "\u793C") {
            date = date.add(number * 7, "d");
          } else if (unitAbbr == "\u6708") {
            date = date.add(number, "month");
          } else if (unitAbbr == "\u5E74") {
            date = date.add(number, "year");
          }
          result.start.assign("year", date.year());
          result.start.assign("month", date.month() + 1);
          result.start.assign("day", date.date());
          return result;
        }
        if (unitAbbr == "\u79D2") {
          date = date.add(number, "second");
        } else if (unitAbbr == "\u5206") {
          date = date.add(number, "minute");
        } else if (unitAbbr == "\u5C0F" || unitAbbr == "\u949F") {
          date = date.add(number, "hour");
        }
        result.start.imply("year", date.year());
        result.start.imply("month", date.month() + 1);
        result.start.imply("day", date.date());
        result.start.assign("hour", date.hour());
        result.start.assign("minute", date.minute());
        result.start.assign("second", date.second());
        return result;
      }
    };
    exports.default = ZHHansDeadlineFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansRelationWeekdayParser.js
var require_ZHHansRelationWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansRelationWeekdayParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants8();
    var PATTERN = new RegExp("(?<prefix>\u4E0A|\u4E0B|\u8FD9)(?:\u4E2A)?(?:\u661F\u671F|\u793C\u62DC|\u5468)(?<weekday>" + Object.keys(constants_1.WEEKDAY_OFFSET).join("|") + ")");
    var ZHHansRelationWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const dayOfWeek = match.groups.weekday;
        const offset = constants_1.WEEKDAY_OFFSET[dayOfWeek];
        if (offset === void 0)
          return null;
        let modifier = null;
        const prefix = match.groups.prefix;
        if (prefix == "\u4E0A") {
          modifier = "last";
        } else if (prefix == "\u4E0B") {
          modifier = "next";
        } else if (prefix == "\u8FD9") {
          modifier = "this";
        }
        let startMoment = dayjs_1.default(context.refDate);
        let startMomentFixed = false;
        const refOffset = startMoment.day();
        if (modifier == "last" || modifier == "past") {
          startMoment = startMoment.day(offset - 7);
          startMomentFixed = true;
        } else if (modifier == "next") {
          startMoment = startMoment.day(offset + 7);
          startMomentFixed = true;
        } else if (modifier == "this") {
          startMoment = startMoment.day(offset);
        } else {
          if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset - 7);
          } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset + 7);
          } else {
            startMoment = startMoment.day(offset);
          }
        }
        result.start.assign("weekday", offset);
        if (startMomentFixed) {
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHansRelationWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansTimeExpressionParser.js
var require_ZHHansTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansTimeExpressionParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants8();
    var FIRST_REG_PATTERN = new RegExp("(?:\u4ECE|\u81EA)?(?:(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(\u65E9|\u671D|\u665A)|(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(?:\u65E5|\u5929)(?:[\\s,\uFF0C]*)(?:(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?)?(?:[\\s,\uFF0C]*)(?:(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)(?:\\s*)(?:\u70B9|\u65F6|:|\uFF1A)(?:\\s*)(\\d+|\u534A|\u6B63|\u6574|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u5206|:|\uFF1A)?(?:\\s*)(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u79D2)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
    var SECOND_REG_PATTERN = new RegExp("(?:^\\s*(?:\u5230|\u81F3|\\-|\\\u2013|\\~|\\\u301C)\\s*)(?:(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(\u65E9|\u671D|\u665A)|(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668))|(\u4ECA|\u660E|\u524D|\u5927\u524D|\u540E|\u5927\u540E|\u6628)(?:\u65E5|\u5929)(?:[\\s,\uFF0C]*)(?:(\u4E0A(?:\u5348)|\u65E9(?:\u4E0A)|\u4E0B(?:\u5348)|\u665A(?:\u4E0A)|\u591C(?:\u665A)?|\u4E2D(?:\u5348)|\u51CC(?:\u6668)))?)?(?:[\\s,\uFF0C]*)(?:(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)(?:\\s*)(?:\u70B9|\u65F6|:|\uFF1A)(?:\\s*)(\\d+|\u534A|\u6B63|\u6574|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u5206|:|\uFF1A)?(?:\\s*)(\\d+|[" + Object.keys(constants_1.NUMBER).join("") + "]+)?(?:\\s*)(?:\u79D2)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i");
    var DAY_GROUP_1 = 1;
    var ZH_AM_PM_HOUR_GROUP_1 = 2;
    var ZH_AM_PM_HOUR_GROUP_2 = 3;
    var DAY_GROUP_3 = 4;
    var ZH_AM_PM_HOUR_GROUP_3 = 5;
    var HOUR_GROUP = 6;
    var MINUTE_GROUP = 7;
    var SECOND_GROUP = 8;
    var AM_PM_HOUR_GROUP = 9;
    var ZHHansTimeExpressionParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return FIRST_REG_PATTERN;
      }
      innerExtract(context, match) {
        if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
          return null;
        }
        const refMoment = dayjs_1.default(context.refDate);
        const result = context.createParsingResult(match.index, match[0]);
        let startMoment = refMoment.clone();
        if (match[DAY_GROUP_1]) {
          const day1 = match[DAY_GROUP_1];
          if (day1 == "\u660E") {
            if (refMoment.hour() > 1) {
              startMoment = startMoment.add(1, "day");
            }
          } else if (day1 == "\u6628") {
            startMoment = startMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day1 == "\u540E") {
            startMoment = startMoment.add(2, "day");
          } else if (day1 == "\u5927\u540E") {
            startMoment = startMoment.add(3, "day");
          }
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else if (match[DAY_GROUP_3]) {
          const day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E") {
            startMoment = startMoment.add(1, "day");
          } else if (day3 == "\u6628") {
            startMoment = startMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            startMoment = startMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            startMoment = startMoment.add(-3, "day");
          } else if (day3 == "\u540E") {
            startMoment = startMoment.add(2, "day");
          } else if (day3 == "\u5927\u540E") {
            startMoment = startMoment.add(3, "day");
          }
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        let hour = 0;
        let minute = 0;
        let meridiem = -1;
        if (match[SECOND_GROUP]) {
          let second = parseInt(match[SECOND_GROUP]);
          if (isNaN(second)) {
            second = constants_1.zhStringToNumber(match[SECOND_GROUP]);
          }
          if (second >= 60)
            return null;
          result.start.assign("second", second);
        }
        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
          hour = constants_1.zhStringToNumber(match[HOUR_GROUP]);
        }
        if (match[MINUTE_GROUP]) {
          if (match[MINUTE_GROUP] == "\u534A") {
            minute = 30;
          } else if (match[MINUTE_GROUP] == "\u6B63" || match[MINUTE_GROUP] == "\u6574") {
            minute = 0;
          } else {
            minute = parseInt(match[MINUTE_GROUP]);
            if (isNaN(minute)) {
              minute = constants_1.zhStringToNumber(match[MINUTE_GROUP]);
            }
          }
        } else if (hour > 100) {
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (minute >= 60) {
          return null;
        }
        if (hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = 1;
        }
        if (match[AM_PM_HOUR_GROUP]) {
          if (hour > 12)
            return null;
          const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          }
          if (ampm == "p") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
          const zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
          const zhAMPM1 = zhAMPMString1[0];
          if (zhAMPM1 == "\u65E9") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM1 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
          const zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
          const zhAMPM2 = zhAMPMString2[0];
          if (zhAMPM2 == "\u4E0A" || zhAMPM2 == "\u65E9" || zhAMPM2 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM2 == "\u4E0B" || zhAMPM2 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
          const zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
          const zhAMPM3 = zhAMPMString3[0];
          if (zhAMPM3 == "\u4E0A" || zhAMPM3 == "\u65E9" || zhAMPM3 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM3 == "\u4E0B" || zhAMPM3 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        }
        result.start.assign("hour", hour);
        result.start.assign("minute", minute);
        if (meridiem >= 0) {
          result.start.assign("meridiem", meridiem);
        } else {
          if (hour < 12) {
            result.start.imply("meridiem", 0);
          } else {
            result.start.imply("meridiem", 1);
          }
        }
        match = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
        if (!match) {
          if (result.text.match(/^\d+$/)) {
            return null;
          }
          return result;
        }
        let endMoment = startMoment.clone();
        result.end = context.createParsingComponents();
        if (match[DAY_GROUP_1]) {
          const day1 = match[DAY_GROUP_1];
          if (day1 == "\u660E") {
            if (refMoment.hour() > 1) {
              endMoment = endMoment.add(1, "day");
            }
          } else if (day1 == "\u6628") {
            endMoment = endMoment.add(-1, "day");
          } else if (day1 == "\u524D") {
            endMoment = endMoment.add(-2, "day");
          } else if (day1 == "\u5927\u524D") {
            endMoment = endMoment.add(-3, "day");
          } else if (day1 == "\u540E") {
            endMoment = endMoment.add(2, "day");
          } else if (day1 == "\u5927\u540E") {
            endMoment = endMoment.add(3, "day");
          }
          result.end.assign("day", endMoment.date());
          result.end.assign("month", endMoment.month() + 1);
          result.end.assign("year", endMoment.year());
        } else if (match[DAY_GROUP_3]) {
          const day3 = match[DAY_GROUP_3];
          if (day3 == "\u660E") {
            endMoment = endMoment.add(1, "day");
          } else if (day3 == "\u6628") {
            endMoment = endMoment.add(-1, "day");
          } else if (day3 == "\u524D") {
            endMoment = endMoment.add(-2, "day");
          } else if (day3 == "\u5927\u524D") {
            endMoment = endMoment.add(-3, "day");
          } else if (day3 == "\u540E") {
            endMoment = endMoment.add(2, "day");
          } else if (day3 == "\u5927\u540E") {
            endMoment = endMoment.add(3, "day");
          }
          result.end.assign("day", endMoment.date());
          result.end.assign("month", endMoment.month() + 1);
          result.end.assign("year", endMoment.year());
        } else {
          result.end.imply("day", endMoment.date());
          result.end.imply("month", endMoment.month() + 1);
          result.end.imply("year", endMoment.year());
        }
        hour = 0;
        minute = 0;
        meridiem = -1;
        if (match[SECOND_GROUP]) {
          let second = parseInt(match[SECOND_GROUP]);
          if (isNaN(second)) {
            second = constants_1.zhStringToNumber(match[SECOND_GROUP]);
          }
          if (second >= 60)
            return null;
          result.end.assign("second", second);
        }
        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
          hour = constants_1.zhStringToNumber(match[HOUR_GROUP]);
        }
        if (match[MINUTE_GROUP]) {
          if (match[MINUTE_GROUP] == "\u534A") {
            minute = 30;
          } else if (match[MINUTE_GROUP] == "\u6B63" || match[MINUTE_GROUP] == "\u6574") {
            minute = 0;
          } else {
            minute = parseInt(match[MINUTE_GROUP]);
            if (isNaN(minute)) {
              minute = constants_1.zhStringToNumber(match[MINUTE_GROUP]);
            }
          }
        } else if (hour > 100) {
          minute = hour % 100;
          hour = Math.floor(hour / 100);
        }
        if (minute >= 60) {
          return null;
        }
        if (hour > 24) {
          return null;
        }
        if (hour >= 12) {
          meridiem = 1;
        }
        if (match[AM_PM_HOUR_GROUP]) {
          if (hour > 12)
            return null;
          const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
          if (ampm == "a") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          }
          if (ampm == "p") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
          if (!result.start.isCertain("meridiem")) {
            if (meridiem == 0) {
              result.start.imply("meridiem", 0);
              if (result.start.get("hour") == 12) {
                result.start.assign("hour", 0);
              }
            } else {
              result.start.imply("meridiem", 1);
              if (result.start.get("hour") != 12) {
                result.start.assign("hour", result.start.get("hour") + 12);
              }
            }
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
          const zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
          const zhAMPM1 = zhAMPMString1[0];
          if (zhAMPM1 == "\u65E9") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM1 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
          const zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
          const zhAMPM2 = zhAMPMString2[0];
          if (zhAMPM2 == "\u4E0A" || zhAMPM2 == "\u65E9" || zhAMPM2 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM2 == "\u4E0B" || zhAMPM2 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
          const zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
          const zhAMPM3 = zhAMPMString3[0];
          if (zhAMPM3 == "\u4E0A" || zhAMPM3 == "\u65E9" || zhAMPM3 == "\u51CC") {
            meridiem = 0;
            if (hour == 12)
              hour = 0;
          } else if (zhAMPM3 == "\u4E0B" || zhAMPM3 == "\u665A") {
            meridiem = 1;
            if (hour != 12)
              hour += 12;
          }
        }
        result.text = result.text + match[0];
        result.end.assign("hour", hour);
        result.end.assign("minute", minute);
        if (meridiem >= 0) {
          result.end.assign("meridiem", meridiem);
        } else {
          const startAtPM = result.start.isCertain("meridiem") && result.start.get("meridiem") == 1;
          if (startAtPM && result.start.get("hour") > hour) {
            result.end.imply("meridiem", 0);
          } else if (hour > 12) {
            result.end.imply("meridiem", 1);
          }
        }
        if (result.end.date().getTime() < result.start.date().getTime()) {
          result.end.imply("day", result.end.get("day") + 1);
        }
        return result;
      }
    };
    exports.default = ZHHansTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansWeekdayParser.js
var require_ZHHansWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/parsers/ZHHansWeekdayParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var constants_1 = require_constants8();
    var PATTERN = new RegExp("(?:\u661F\u671F|\u793C\u62DC|\u5468)(?<weekday>" + Object.keys(constants_1.WEEKDAY_OFFSET).join("|") + ")");
    var ZHHansWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const dayOfWeek = match.groups.weekday;
        const offset = constants_1.WEEKDAY_OFFSET[dayOfWeek];
        if (offset === void 0)
          return null;
        let startMoment = dayjs_1.default(context.refDate);
        const startMomentFixed = false;
        const refOffset = startMoment.day();
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
          startMoment = startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
          startMoment = startMoment.day(offset + 7);
        } else {
          startMoment = startMoment.day(offset);
        }
        result.start.assign("weekday", offset);
        if (startMomentFixed) {
          result.start.assign("day", startMoment.date());
          result.start.assign("month", startMoment.month() + 1);
          result.start.assign("year", startMoment.year());
        } else {
          result.start.imply("day", startMoment.date());
          result.start.imply("month", startMoment.month() + 1);
          result.start.imply("year", startMoment.year());
        }
        return result;
      }
    };
    exports.default = ZHHansWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/refiners/ZHHansMergeDateRangeRefiner.js
var require_ZHHansMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/refiners/ZHHansMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var ZHHansMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(至|到|-|~|～|－|ー)\s*$/i;
      }
    };
    exports.default = ZHHansMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/refiners/ZHHansMergeDateTimeRefiner.js
var require_ZHHansMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/refiners/ZHHansMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var ZHHansMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return /^\s*$/i;
      }
    };
    exports.default = ZHHansMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/zh/hans/index.js
var require_hans = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/hans/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = exports.hans = void 0;
    var chrono_1 = require_chrono();
    var ExtractTimezoneOffsetRefiner_1 = __importDefault(require_ExtractTimezoneOffsetRefiner());
    var configurations_1 = require_configurations();
    var ZHHansCasualDateParser_1 = __importDefault(require_ZHHansCasualDateParser());
    var ZHHansDateParser_1 = __importDefault(require_ZHHansDateParser());
    var ZHHansDeadlineFormatParser_1 = __importDefault(require_ZHHansDeadlineFormatParser());
    var ZHHansRelationWeekdayParser_1 = __importDefault(require_ZHHansRelationWeekdayParser());
    var ZHHansTimeExpressionParser_1 = __importDefault(require_ZHHansTimeExpressionParser());
    var ZHHansWeekdayParser_1 = __importDefault(require_ZHHansWeekdayParser());
    var ZHHansMergeDateRangeRefiner_1 = __importDefault(require_ZHHansMergeDateRangeRefiner());
    var ZHHansMergeDateTimeRefiner_1 = __importDefault(require_ZHHansMergeDateTimeRefiner());
    exports.hans = new chrono_1.Chrono(createCasualConfiguration());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration());
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration() {
      const option = createConfiguration();
      option.parsers.unshift(new ZHHansCasualDateParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration() {
      const configuration = configurations_1.includeCommonConfiguration({
        parsers: [
          new ZHHansDateParser_1.default(),
          new ZHHansRelationWeekdayParser_1.default(),
          new ZHHansWeekdayParser_1.default(),
          new ZHHansTimeExpressionParser_1.default(),
          new ZHHansDeadlineFormatParser_1.default()
        ],
        refiners: [new ZHHansMergeDateRangeRefiner_1.default(), new ZHHansMergeDateTimeRefiner_1.default()]
      });
      configuration.refiners = configuration.refiners.filter((refiner) => !(refiner instanceof ExtractTimezoneOffsetRefiner_1.default));
      return configuration;
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/locales/zh/index.js
var require_zh = __commonJS({
  "node_modules/chrono-node/dist/locales/zh/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hans = void 0;
    __exportStar(require_hant(), exports);
    exports.hans = __importStar(require_hans());
  }
});

// node_modules/chrono-node/dist/locales/ru/constants.js
var require_constants9 = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseTimeUnits = exports.TIME_UNITS_PATTERN = exports.parseYear = exports.YEAR_PATTERN = exports.parseOrdinalNumberPattern = exports.ORDINAL_NUMBER_PATTERN = exports.parseNumberPattern = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.ORDINAL_WORD_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.FULL_MONTH_NAME_DICTIONARY = exports.WEEKDAY_DICTIONARY = exports.REGEX_PARTS = void 0;
    var pattern_1 = require_pattern();
    var years_1 = require_years();
    exports.REGEX_PARTS = {
      leftBoundary: "([^\\p{L}\\p{N}_]|^)",
      rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
      flags: "iu"
    };
    exports.WEEKDAY_DICTIONARY = {
      \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435: 0,
      \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u044F: 0,
      \u0432\u0441\u043A: 0,
      "\u0432\u0441\u043A.": 0,
      \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A: 1,
      \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430: 1,
      \u043F\u043D: 1,
      "\u043F\u043D.": 1,
      \u0432\u0442\u043E\u0440\u043D\u0438\u043A: 2,
      \u0432\u0442\u043E\u0440\u043D\u0438\u043A\u0430: 2,
      \u0432\u0442: 2,
      "\u0432\u0442.": 2,
      \u0441\u0440\u0435\u0434\u0430: 3,
      \u0441\u0440\u0435\u0434\u044B: 3,
      \u0441\u0440\u0435\u0434\u0443: 3,
      \u0441\u0440: 3,
      "\u0441\u0440.": 3,
      \u0447\u0435\u0442\u0432\u0435\u0440\u0433: 4,
      \u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430: 4,
      \u0447\u0442: 4,
      "\u0447\u0442.": 4,
      \u043F\u044F\u0442\u043D\u0438\u0446\u0430: 5,
      \u043F\u044F\u0442\u043D\u0438\u0446\u0443: 5,
      \u043F\u044F\u0442\u043D\u0438\u0446\u044B: 5,
      \u043F\u0442: 5,
      "\u043F\u0442.": 5,
      \u0441\u0443\u0431\u0431\u043E\u0442\u0430: 6,
      \u0441\u0443\u0431\u0431\u043E\u0442\u0443: 6,
      \u0441\u0443\u0431\u0431\u043E\u0442\u044B: 6,
      \u0441\u0431: 6,
      "\u0441\u0431.": 6
    };
    exports.FULL_MONTH_NAME_DICTIONARY = {
      \u044F\u043D\u0432\u0430\u0440\u044C: 1,
      \u044F\u043D\u0432\u0430\u0440\u044F: 1,
      \u044F\u043D\u0432\u0430\u0440\u0435: 1,
      \u0444\u0435\u0432\u0440\u0430\u043B\u044C: 2,
      \u0444\u0435\u0432\u0440\u0430\u043B\u044F: 2,
      \u0444\u0435\u0432\u0440\u0430\u043B\u0435: 2,
      \u043C\u0430\u0440\u0442: 3,
      \u043C\u0430\u0440\u0442\u0430: 3,
      \u043C\u0430\u0440\u0442\u0435: 3,
      \u0430\u043F\u0440\u0435\u043B\u044C: 4,
      \u0430\u043F\u0440\u0435\u043B\u044F: 4,
      \u0430\u043F\u0440\u0435\u043B\u0435: 4,
      \u043C\u0430\u0439: 5,
      \u043C\u0430\u044F: 5,
      \u043C\u0430\u0435: 5,
      \u0438\u044E\u043D\u044C: 6,
      \u0438\u044E\u043D\u044F: 6,
      \u0438\u044E\u043D\u0435: 6,
      \u0438\u044E\u043B\u044C: 7,
      \u0438\u044E\u043B\u044F: 7,
      \u0438\u044E\u043B\u0435: 7,
      \u0430\u0432\u0433\u0443\u0441\u0442: 8,
      \u0430\u0432\u0433\u0443\u0441\u0442\u0430: 8,
      \u0430\u0432\u0433\u0443\u0441\u0442\u0435: 8,
      \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C: 9,
      \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F: 9,
      \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u0435: 9,
      \u043E\u043A\u0442\u044F\u0431\u0440\u044C: 10,
      \u043E\u043A\u0442\u044F\u0431\u0440\u044F: 10,
      \u043E\u043A\u0442\u044F\u0431\u0440\u0435: 10,
      \u043D\u043E\u044F\u0431\u0440\u044C: 11,
      \u043D\u043E\u044F\u0431\u0440\u044F: 11,
      \u043D\u043E\u044F\u0431\u0440\u0435: 11,
      \u0434\u0435\u043A\u0430\u0431\u0440\u044C: 12,
      \u0434\u0435\u043A\u0430\u0431\u0440\u044F: 12,
      \u0434\u0435\u043A\u0430\u0431\u0440\u0435: 12
    };
    exports.MONTH_DICTIONARY = Object.assign(Object.assign({}, exports.FULL_MONTH_NAME_DICTIONARY), { \u044F\u043D\u0432: 1, "\u044F\u043D\u0432.": 1, \u0444\u0435\u0432: 2, "\u0444\u0435\u0432.": 2, \u043C\u0430\u0440: 3, "\u043C\u0430\u0440.": 3, \u0430\u043F\u0440: 4, "\u0430\u043F\u0440.": 4, \u0430\u0432\u0433: 8, "\u0430\u0432\u0433.": 8, \u0441\u0435\u043D: 9, "\u0441\u0435\u043D.": 9, \u043E\u043A\u0442: 10, "\u043E\u043A\u0442.": 10, \u043D\u043E\u044F: 11, "\u043D\u043E\u044F.": 11, \u0434\u0435\u043A: 12, "\u0434\u0435\u043A.": 12 });
    exports.INTEGER_WORD_DICTIONARY = {
      \u043E\u0434\u0438\u043D: 1,
      \u043E\u0434\u043D\u0430: 1,
      \u043E\u0434\u043D\u043E\u0439: 1,
      \u043E\u0434\u043D\u0443: 1,
      \u0434\u0432\u0435: 2,
      \u0434\u0432\u0430: 2,
      \u0434\u0432\u0443\u0445: 2,
      \u0442\u0440\u0438: 3,
      \u0442\u0440\u0435\u0445: 3,
      \u0442\u0440\u0451\u0445: 3,
      \u0447\u0435\u0442\u044B\u0440\u0435: 4,
      \u0447\u0435\u0442\u044B\u0440\u0435\u0445: 4,
      \u0447\u0435\u0442\u044B\u0440\u0451\u0445: 4,
      \u043F\u044F\u0442\u044C: 5,
      \u043F\u044F\u0442\u0438: 5,
      \u0448\u0435\u0441\u0442\u044C: 6,
      \u0448\u0435\u0441\u0442\u0438: 6,
      \u0441\u0435\u043C\u044C: 7,
      \u0441\u0435\u043C\u0438: 7,
      \u0432\u043E\u0441\u0435\u043C\u044C: 8,
      \u0432\u043E\u0441\u044C\u043C\u0438: 8,
      \u0434\u0435\u0432\u044F\u0442\u044C: 9,
      \u0434\u0435\u0432\u044F\u0442\u0438: 9,
      \u0434\u0435\u0441\u044F\u0442\u044C: 10,
      \u0434\u0435\u0441\u044F\u0442\u0438: 10,
      \u043E\u0434\u0438\u043D\u043D\u0430\u0434\u0446\u0430\u0442\u044C: 11,
      \u043E\u0434\u0438\u043D\u043D\u0430\u0434\u0446\u0430\u0442\u0438: 11,
      \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u044C: 12,
      \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u0438: 12
    };
    exports.ORDINAL_WORD_DICTIONARY = {
      \u043F\u0435\u0440\u0432\u043E\u0435: 1,
      \u043F\u0435\u0440\u0432\u043E\u0433\u043E: 1,
      \u0432\u0442\u043E\u0440\u043E\u0435: 2,
      \u0432\u0442\u043E\u0440\u043E\u0433\u043E: 2,
      \u0442\u0440\u0435\u0442\u044C\u0435: 3,
      \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E: 3,
      \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u043E\u0435: 4,
      \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u043E\u0433\u043E: 4,
      \u043F\u044F\u0442\u043E\u0435: 5,
      \u043F\u044F\u0442\u043E\u0433\u043E: 5,
      \u0448\u0435\u0441\u0442\u043E\u0435: 6,
      \u0448\u0435\u0441\u0442\u043E\u0433\u043E: 6,
      \u0441\u0435\u0434\u044C\u043C\u043E\u0435: 7,
      \u0441\u0435\u0434\u044C\u043C\u043E\u0433\u043E: 7,
      \u0432\u043E\u0441\u044C\u043C\u043E\u0435: 8,
      \u0432\u043E\u0441\u044C\u043C\u043E\u0433\u043E: 8,
      \u0434\u0435\u0432\u044F\u0442\u043E\u0435: 9,
      \u0434\u0435\u0432\u044F\u0442\u043E\u0433\u043E: 9,
      \u0434\u0435\u0441\u044F\u0442\u043E\u0435: 10,
      \u0434\u0435\u0441\u044F\u0442\u043E\u0433\u043E: 10,
      \u043E\u0434\u0438\u043D\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 11,
      \u043E\u0434\u0438\u043D\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 11,
      \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 12,
      \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 12,
      \u0442\u0440\u0438\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 13,
      \u0442\u0440\u0438\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 13,
      \u0447\u0435\u0442\u044B\u0440\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 14,
      \u0447\u0435\u0442\u044B\u0440\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 14,
      \u043F\u044F\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 15,
      \u043F\u044F\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 15,
      \u0448\u0435\u0441\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 16,
      \u0448\u0435\u0441\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 16,
      \u0441\u0435\u043C\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 17,
      \u0441\u0435\u043C\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 17,
      \u0432\u043E\u0441\u0435\u043C\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 18,
      \u0432\u043E\u0441\u0435\u043C\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 18,
      \u0434\u0435\u0432\u044F\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 19,
      \u0434\u0435\u0432\u044F\u0442\u043D\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 19,
      \u0434\u0432\u0430\u0434\u0446\u0430\u0442\u043E\u0435: 20,
      \u0434\u0432\u0430\u0434\u0446\u0430\u0442\u043E\u0433\u043E: 20,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u0435": 21,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u0433\u043E": 21,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0432\u0442\u043E\u0440\u043E\u0435": 22,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0432\u0442\u043E\u0440\u043E\u0433\u043E": 22,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0442\u0440\u0435\u0442\u044C\u0435": 23,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E": 23,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u043E\u0435": 24,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u043E\u0433\u043E": 24,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u043F\u044F\u0442\u043E\u0435": 25,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u043F\u044F\u0442\u043E\u0433\u043E": 25,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0448\u0435\u0441\u0442\u043E\u0435": 26,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0448\u0435\u0441\u0442\u043E\u0433\u043E": 26,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0441\u0435\u0434\u044C\u043C\u043E\u0435": 27,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0441\u0435\u0434\u044C\u043C\u043E\u0433\u043E": 27,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0432\u043E\u0441\u044C\u043C\u043E\u0435": 28,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0432\u043E\u0441\u044C\u043C\u043E\u0433\u043E": 28,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0434\u0435\u0432\u044F\u0442\u043E\u0435": 29,
      "\u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u0434\u0435\u0432\u044F\u0442\u043E\u0433\u043E": 29,
      "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u043E\u0435": 30,
      "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u043E\u0433\u043E": 30,
      "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u0435": 31,
      "\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u0433\u043E": 31
    };
    exports.TIME_UNIT_DICTIONARY = {
      \u0441\u0435\u043A: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u0430: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u044B: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u0443: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0430: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0438: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u0435\u043A: "second",
      \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0443: "second",
      \u043C\u0438\u043D: "minute",
      \u043C\u0438\u043D\u0443\u0442\u0430: "minute",
      \u043C\u0438\u043D\u0443\u0442: "minute",
      \u043C\u0438\u043D\u0443\u0442\u044B: "minute",
      \u043C\u0438\u043D\u0443\u0442\u0443: "minute",
      \u043C\u0438\u043D\u0443\u0442\u043E\u043A: "minute",
      \u043C\u0438\u043D\u0443\u0442\u043A\u0438: "minute",
      \u043C\u0438\u043D\u0443\u0442\u043A\u0443: "minute",
      \u0447\u0430\u0441: "hour",
      \u0447\u0430\u0441\u043E\u0432: "hour",
      \u0447\u0430\u0441\u0430: "hour",
      \u0447\u0430\u0441\u0443: "hour",
      \u0447\u0430\u0441\u0438\u043A\u043E\u0432: "hour",
      \u0447\u0430\u0441\u0438\u043A\u0430: "hour",
      \u0447\u0430\u0441\u0438\u043A\u0435: "hour",
      \u0447\u0430\u0441\u0438\u043A: "hour",
      \u0434\u0435\u043D\u044C: "d",
      \u0434\u043D\u044F: "d",
      \u0434\u043D\u0435\u0439: "d",
      \u0441\u0443\u0442\u043E\u043A: "d",
      \u0441\u0443\u0442\u043A\u0438: "d",
      \u043D\u0435\u0434\u0435\u043B\u044F: "week",
      \u043D\u0435\u0434\u0435\u043B\u0435: "week",
      \u043D\u0435\u0434\u0435\u043B\u0438: "week",
      \u043D\u0435\u0434\u0435\u043B\u044E: "week",
      \u043D\u0435\u0434\u0435\u043B\u044C: "week",
      \u043D\u0435\u0434\u0435\u043B\u044C\u043A\u0435: "week",
      \u043D\u0435\u0434\u0435\u043B\u044C\u043A\u0438: "week",
      \u043D\u0435\u0434\u0435\u043B\u0435\u043A: "week",
      \u043C\u0435\u0441\u044F\u0446: "month",
      \u043C\u0435\u0441\u044F\u0446\u0435: "month",
      \u043C\u0435\u0441\u044F\u0446\u0435\u0432: "month",
      \u043C\u0435\u0441\u044F\u0446\u0430: "month",
      \u043A\u0432\u0430\u0440\u0442\u0430\u043B: "quarter",
      \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u0435: "quarter",
      \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u043E\u0432: "quarter",
      \u0433\u043E\u0434: "year",
      \u0433\u043E\u0434\u0430: "year",
      \u0433\u043E\u0434\u0443: "year",
      \u0433\u043E\u0434\u043E\u0432: "year",
      \u043B\u0435\u0442: "year",
      \u0433\u043E\u0434\u0438\u043A: "year",
      \u0433\u043E\u0434\u0438\u043A\u0430: "year",
      \u0433\u043E\u0434\u0438\u043A\u043E\u0432: "year"
    };
    exports.NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|\u043F\u043E\u043B|\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E|\u043F\u0430\u0440(?:\u044B|\u0443)|\\s{0,3})`;
    function parseNumberPattern(match) {
      const num = match.toLowerCase();
      if (exports.INTEGER_WORD_DICTIONARY[num] !== void 0) {
        return exports.INTEGER_WORD_DICTIONARY[num];
      }
      if (num.match(/несколько/)) {
        return 3;
      } else if (num.match(/пол/)) {
        return 0.5;
      } else if (num.match(/пар/)) {
        return 2;
      } else if (num === "") {
        return 1;
      }
      return parseFloat(num);
    }
    exports.parseNumberPattern = parseNumberPattern;
    exports.ORDINAL_NUMBER_PATTERN = `(?:${pattern_1.matchAnyPattern(exports.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:\u0433\u043E|\u043E\u0433\u043E|\u0435|\u043E\u0435)?)`;
    function parseOrdinalNumberPattern(match) {
      let num = match.toLowerCase();
      if (exports.ORDINAL_WORD_DICTIONARY[num] !== void 0) {
        return exports.ORDINAL_WORD_DICTIONARY[num];
      }
      return parseInt(num);
    }
    exports.parseOrdinalNumberPattern = parseOrdinalNumberPattern;
    var year = "(?:\\s+(?:\u0433\u043E\u0434\u0443|\u0433\u043E\u0434\u0430|\u0433\u043E\u0434|\u0433|\u0433.))?";
    exports.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}${year}\\s*(?:\u043D.\u044D.|\u0434\u043E \u043D.\u044D.|\u043D. \u044D.|\u0434\u043E \u043D. \u044D.)|[1-2][0-9]{3}${year}|[5-9][0-9]${year})`;
    function parseYear(match) {
      if (/(год|года|г|г.)/i.test(match)) {
        match = match.replace(/(год|года|г|г.)/i, "");
      }
      if (/(до н.э.|до н. э.)/i.test(match)) {
        match = match.replace(/(до н.э.|до н. э.)/i, "");
        return -parseInt(match);
      }
      if (/(н. э.|н.э.)/i.test(match)) {
        match = match.replace(/(н. э.|н.э.)/i, "");
        return parseInt(match);
      }
      const rawYearNumber = parseInt(match);
      return years_1.findMostLikelyADYear(rawYearNumber);
    }
    exports.parseYear = parseYear;
    var SINGLE_TIME_UNIT_PATTERN = `(${exports.NUMBER_PATTERN})\\s{0,3}(${pattern_1.matchAnyPattern(exports.TIME_UNIT_DICTIONARY)})`;
    var SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
    exports.TIME_UNITS_PATTERN = pattern_1.repeatedTimeunitPattern(`(?:(?:\u043E\u043A\u043E\u043B\u043E|\u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN);
    function parseTimeUnits(timeunitText) {
      const fragments = {};
      let remainingText = timeunitText;
      let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length).trim();
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
      }
      return fragments;
    }
    exports.parseTimeUnits = parseTimeUnits;
    function collectDateTimeFragment(fragments, match) {
      const num = parseNumberPattern(match[1]);
      const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
      fragments[unit] = num;
    }
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitWithinFormatParser.js
var require_RUTimeUnitWithinFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitWithinFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = `(?:(?:\u043E\u043A\u043E\u043B\u043E|\u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E)\\s*(?:~\\s*)?)?(${constants_1.TIME_UNITS_PATTERN})${constants_1.REGEX_PARTS.rightBoundary}`;
    var PATTERN_WITH_PREFIX = new RegExp(`(?:\u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435|\u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0438)\\s*${PATTERN}`, constants_1.REGEX_PARTS.flags);
    var PATTERN_WITHOUT_PREFIX = new RegExp(PATTERN, "i");
    var RUTimeUnitWithinFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern(context) {
        return context.option.forwardDate ? PATTERN_WITHOUT_PREFIX : PATTERN_WITH_PREFIX;
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = RUTimeUnitWithinFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUMonthNameLittleEndianParser.js
var require_RUMonthNameLittleEndianParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUMonthNameLittleEndianParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var years_1 = require_years();
    var constants_1 = require_constants9();
    var constants_2 = require_constants9();
    var constants_3 = require_constants9();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`(?:\u0441)?\\s*(${constants_3.ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:\u043F\u043E|-|\u2013|\u0434\u043E)?\\s{0,3}(${constants_3.ORDINAL_NUMBER_PATTERN}))?(?:-|\\/|\\s{0,3}(?:of)?\\s{0,3})(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})(?:(?:-|\\/|,?\\s{0,3})(${constants_2.YEAR_PATTERN}(?![^\\s]\\d)))?${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var DATE_GROUP = 1;
    var DATE_TO_GROUP = 2;
    var MONTH_NAME_GROUP = 3;
    var YEAR_GROUP = 4;
    var RUMonthNameLittleEndianParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = constants_3.parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
          match.index = match.index + match[DATE_GROUP].length;
          return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
          const yearNumber = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", yearNumber);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, day, month);
          result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
          const endDate = constants_3.parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
          result.end = result.start.clone();
          result.end.assign("day", endDate);
        }
        return result;
      }
    };
    exports.default = RUMonthNameLittleEndianParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUMonthNameParser.js
var require_RUMonthNameParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUMonthNameParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var years_1 = require_years();
    var pattern_1 = require_pattern();
    var constants_2 = require_constants9();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var PATTERN = new RegExp(`((?:\u0432)\\s*)?(${pattern_1.matchAnyPattern(constants_1.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${constants_2.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, constants_1.REGEX_PARTS.flags);
    var MONTH_NAME_GROUP = 2;
    var YEAR_GROUP = 3;
    var RUMonthNameParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        if (match[0].length <= 3 && !constants_1.FULL_MONTH_NAME_DICTIONARY[monthName]) {
          return null;
        }
        const result = context.createParsingResult(match.index, match.index + match[0].length);
        result.start.imply("day", 1);
        const month = constants_1.MONTH_DICTIONARY[monthName];
        result.start.assign("month", month);
        if (match[YEAR_GROUP]) {
          const year = constants_2.parseYear(match[YEAR_GROUP]);
          result.start.assign("year", year);
        } else {
          const year = years_1.findYearClosestToRef(context.refDate, 1, month);
          result.start.imply("year", year);
        }
        return result;
      }
    };
    exports.default = RUMonthNameParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUTimeExpressionParser.js
var require_RUTimeExpressionParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUTimeExpressionParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require_dist();
    var AbstractTimeExpressionParser_1 = require_AbstractTimeExpressionParser();
    var constants_1 = require_constants9();
    var RUTimeExpressionParser = class extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
      constructor(strictMode) {
        super(strictMode);
      }
      patternFlags() {
        return constants_1.REGEX_PARTS.flags;
      }
      primaryPatternLeftBoundary() {
        return `(^|\\s|T|(?:[^\\p{L}\\p{N}_]))`;
      }
      followingPhase() {
        return `\\s*(?:\\-|\\\u2013|\\~|\\\u301C|\u0434\u043E|\u0438|\u043F\u043E|\\?)\\s*`;
      }
      primaryPrefix() {
        return `(?:(?:\u0432|\u0441)\\s*)??`;
      }
      primarySuffix() {
        return `(?:\\s*(?:\u0443\u0442\u0440\u0430|\u0432\u0435\u0447\u0435\u0440\u0430|\u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043B\u0443\u0434\u043D\u044F))?(?!\\/)${constants_1.REGEX_PARTS.rightBoundary}`;
      }
      extractPrimaryTimeComponents(context, match) {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
          if (match[0].endsWith("\u0432\u0435\u0447\u0435\u0440\u0430")) {
            const hour = components.get("hour");
            if (hour >= 6 && hour < 12) {
              components.assign("hour", components.get("hour") + 12);
              components.assign("meridiem", index_1.Meridiem.PM);
            } else if (hour < 6) {
              components.assign("meridiem", index_1.Meridiem.AM);
            }
          }
          if (match[0].endsWith("\u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043B\u0443\u0434\u043D\u044F")) {
            components.assign("meridiem", index_1.Meridiem.PM);
            const hour = components.get("hour");
            if (hour >= 0 && hour <= 6) {
              components.assign("hour", components.get("hour") + 12);
            }
          }
          if (match[0].endsWith("\u0443\u0442\u0440\u0430")) {
            components.assign("meridiem", index_1.Meridiem.AM);
            const hour = components.get("hour");
            if (hour < 12) {
              components.assign("hour", components.get("hour"));
            }
          }
        }
        return components;
      }
    };
    exports.default = RUTimeExpressionParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitAgoFormatParser.js
var require_RUTimeUnitAgoFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitAgoFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp(`(${constants_1.TIME_UNITS_PATTERN})\\s{0,5}\u043D\u0430\u0437\u0430\u0434(?=(?:\\W|$))`, constants_1.REGEX_PARTS.flags);
    var RUTimeUnitAgoFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const timeUnits = constants_1.parseTimeUnits(match[1]);
        const outputTimeUnits = timeunits_1.reverseTimeUnits(timeUnits);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
      }
    };
    exports.default = RUTimeUnitAgoFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/refiners/RUMergeDateRangeRefiner.js
var require_RUMergeDateRangeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/refiners/RUMergeDateRangeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateRangeRefiner_1 = __importDefault(require_AbstractMergeDateRangeRefiner());
    var RUMergeDateRangeRefiner = class extends AbstractMergeDateRangeRefiner_1.default {
      patternBetween() {
        return /^\s*(и до|и по|до|по|-)\s*$/i;
      }
    };
    exports.default = RUMergeDateRangeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/ru/refiners/RUMergeDateTimeRefiner.js
var require_RUMergeDateTimeRefiner = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/refiners/RUMergeDateTimeRefiner.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractMergeDateTimeRefiner_1 = __importDefault(require_AbstractMergeDateTimeRefiner());
    var RUMergeDateTimeRefiner = class extends AbstractMergeDateTimeRefiner_1.default {
      patternBetween() {
        return new RegExp(`^\\s*(T|\u0432|,|-)?\\s*$`);
      }
    };
    exports.default = RUMergeDateTimeRefiner;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUCasualDateParser.js
var require_RUCasualDateParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUCasualDateParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var references = __importStar(require_casualReferences());
    var constants_1 = require_constants9();
    var PATTERN = new RegExp(`(?:\u0441|\u0441\u043E)?\\s*(\u0441\u0435\u0433\u043E\u0434\u043D\u044F|\u0432\u0447\u0435\u0440\u0430|\u0437\u0430\u0432\u0442\u0440\u0430|\u043F\u043E\u0441\u043B\u0435\u0437\u0430\u0432\u0442\u0440\u0430|\u043F\u043E\u0437\u0430\u0432\u0447\u0435\u0440\u0430)${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var RUCasualDateParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern(context) {
        return PATTERN;
      }
      innerExtract(context, match) {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();
        switch (lowerText) {
          case "\u0441\u0435\u0433\u043E\u0434\u043D\u044F":
            return references.today(context.reference);
          case "\u0432\u0447\u0435\u0440\u0430":
            return references.yesterday(context.reference);
          case "\u0437\u0430\u0432\u0442\u0440\u0430":
            return references.tomorrow(context.reference);
          case "\u043F\u043E\u0441\u043B\u0435\u0437\u0430\u0432\u0442\u0440\u0430":
            return references.theDayAfter(context.reference, 2);
          case "\u043F\u043E\u0437\u0430\u0432\u0447\u0435\u0440\u0430":
            return references.theDayBefore(context.reference, 2);
        }
        return component;
      }
    };
    exports.default = RUCasualDateParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUCasualTimeParser.js
var require_RUCasualTimeParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUCasualTimeParser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var references = __importStar(require_casualReferences());
    var dayjs_1 = require_dayjs();
    var dayjs_2 = __importDefault(require_dayjs_min());
    var constants_1 = require_constants9();
    var PATTERN = new RegExp(`(\u0441\u0435\u0439\u0447\u0430\u0441|\u043F\u0440\u043E\u0448\u043B\u044B\u043C\\s*\u0432\u0435\u0447\u0435\u0440\u043E\u043C|\u043F\u0440\u043E\u0448\u043B\u043E\u0439\\s*\u043D\u043E\u0447\u044C\u044E|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439\\s*\u043D\u043E\u0447\u044C\u044E|\u0441\u0435\u0433\u043E\u0434\u043D\u044F\\s*\u043D\u043E\u0447\u044C\u044E|\u044D\u0442\u043E\u0439\\s*\u043D\u043E\u0447\u044C\u044E|\u043D\u043E\u0447\u044C\u044E|\u044D\u0442\u0438\u043C \u0443\u0442\u0440\u043E\u043C|\u0443\u0442\u0440\u043E\u043C|\u0443\u0442\u0440\u0430|\u0432\\s*\u043F\u043E\u043B\u0434\u0435\u043D\u044C|\u0432\u0435\u0447\u0435\u0440\u043E\u043C|\u0432\u0435\u0447\u0435\u0440\u0430|\u0432\\s*\u043F\u043E\u043B\u043D\u043E\u0447\u044C)${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var RUCasualTimeParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        let targetDate = dayjs_2.default(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        if (lowerText === "\u0441\u0435\u0439\u0447\u0430\u0441") {
          return references.now(context.reference);
        }
        if (lowerText === "\u0432\u0435\u0447\u0435\u0440\u043E\u043C" || lowerText === "\u0432\u0435\u0447\u0435\u0440\u0430") {
          return references.evening(context.reference);
        }
        if (lowerText.endsWith("\u0443\u0442\u0440\u043E\u043C") || lowerText.endsWith("\u0443\u0442\u0440\u0430")) {
          return references.morning(context.reference);
        }
        if (lowerText.match(/в\s*полдень/)) {
          return references.noon(context.reference);
        }
        if (lowerText.match(/прошлой\s*ночью/)) {
          return references.lastNight(context.reference);
        }
        if (lowerText.match(/прошлым\s*вечером/)) {
          return references.yesterdayEvening(context.reference);
        }
        if (lowerText.match(/следующей\s*ночью/)) {
          const daysToAdd = targetDate.hour() < 22 ? 1 : 2;
          targetDate = targetDate.add(daysToAdd, "day");
          dayjs_1.assignSimilarDate(component, targetDate);
          component.imply("hour", 0);
        }
        if (lowerText.match(/в\s*полночь/) || lowerText.endsWith("\u043D\u043E\u0447\u044C\u044E")) {
          return references.midnight(context.reference);
        }
        return component;
      }
    };
    exports.default = RUCasualTimeParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUWeekdayParser.js
var require_RUWeekdayParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUWeekdayParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var pattern_1 = require_pattern();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var weekdays_1 = require_weekdays();
    var PATTERN = new RegExp(`(?:(?:,|\\(|\uFF08)\\s*)?(?:\u0432\\s*?)?(?:(\u044D\u0442\u0443|\u044D\u0442\u043E\u0442|\u043F\u0440\u043E\u0448\u043B\u044B\u0439|\u043F\u0440\u043E\u0448\u043B\u0443\u044E|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E)\\s*)?(${pattern_1.matchAnyPattern(constants_1.WEEKDAY_DICTIONARY)})(?:\\s*(?:,|\\)|\uFF09))?(?:\\s*\u043D\u0430\\s*(\u044D\u0442\u043E\u0439|\u043F\u0440\u043E\u0448\u043B\u043E\u0439|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439)\\s*\u043D\u0435\u0434\u0435\u043B\u0435)?${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var PREFIX_GROUP = 1;
    var WEEKDAY_GROUP = 2;
    var POSTFIX_GROUP = 3;
    var RUWeekdayParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      innerPattern() {
        return PATTERN;
      }
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();
        let modifier = null;
        if (modifierWord == "\u043F\u0440\u043E\u0448\u043B\u044B\u0439" || modifierWord == "\u043F\u0440\u043E\u0448\u043B\u0443\u044E" || modifierWord == "\u043F\u0440\u043E\u0448\u043B\u043E\u0439") {
          modifier = "last";
        } else if (modifierWord == "\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439" || modifierWord == "\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E" || modifierWord == "\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439" || modifierWord == "\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E") {
          modifier = "next";
        } else if (modifierWord == "\u044D\u0442\u043E\u0442" || modifierWord == "\u044D\u0442\u0443" || modifierWord == "\u044D\u0442\u043E\u0439") {
          modifier = "this";
        }
        return weekdays_1.createParsingComponentsAtWeekday(context.reference, weekday, modifier);
      }
    };
    exports.default = RUWeekdayParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RURelativeDateFormatParser.js
var require_RURelativeDateFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RURelativeDateFormatParser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var results_1 = require_results();
    var dayjs_1 = __importDefault(require_dayjs_min());
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var pattern_1 = require_pattern();
    var PATTERN = new RegExp(`(\u0432 \u043F\u0440\u043E\u0448\u043B\u043E\u043C|\u043D\u0430 \u043F\u0440\u043E\u0448\u043B\u043E\u0439|\u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439|\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C|\u043D\u0430 \u044D\u0442\u043E\u0439|\u0432 \u044D\u0442\u043E\u043C)\\s*(${pattern_1.matchAnyPattern(constants_1.TIME_UNIT_DICTIONARY)})(?=\\s*)${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var MODIFIER_WORD_GROUP = 1;
    var RELATIVE_WORD_GROUP = 2;
    var RURelativeDateFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
        const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
        const timeunit = constants_1.TIME_UNIT_DICTIONARY[unitWord];
        if (modifier == "\u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439" || modifier == "\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C") {
          const timeUnits = {};
          timeUnits[timeunit] = 1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        if (modifier == "\u0432 \u043F\u0440\u043E\u0448\u043B\u043E\u043C" || modifier == "\u043D\u0430 \u043F\u0440\u043E\u0448\u043B\u043E\u0439") {
          const timeUnits = {};
          timeUnits[timeunit] = -1;
          return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }
        const components = context.createParsingComponents();
        let date = dayjs_1.default(context.reference.instant);
        if (timeunit.match(/week/i)) {
          date = date.add(-date.get("d"), "d");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.imply("year", date.year());
        } else if (timeunit.match(/month/i)) {
          date = date.add(-date.date() + 1, "d");
          components.imply("day", date.date());
          components.assign("year", date.year());
          components.assign("month", date.month() + 1);
        } else if (timeunit.match(/year/i)) {
          date = date.add(-date.date() + 1, "d");
          date = date.add(-date.month(), "month");
          components.imply("day", date.date());
          components.imply("month", date.month() + 1);
          components.assign("year", date.year());
        }
        return components;
      }
    };
    exports.default = RURelativeDateFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitCasualRelativeFormatParser.js
var require_RUTimeUnitCasualRelativeFormatParser = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/parsers/RUTimeUnitCasualRelativeFormatParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants9();
    var results_1 = require_results();
    var AbstractParserWithWordBoundary_1 = require_AbstractParserWithWordBoundary();
    var timeunits_1 = require_timeunits();
    var PATTERN = new RegExp(`(\u044D\u0442\u0438|\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435|\u043F\u0440\u043E\u0448\u043B\u044B\u0435|\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435|\u043F\u043E\u0441\u043B\u0435|\u0447\u0435\u0440\u0435\u0437|\\+|-)\\s*(${constants_1.TIME_UNITS_PATTERN})${constants_1.REGEX_PARTS.rightBoundary}`, constants_1.REGEX_PARTS.flags);
    var RUTimeUnitCasualRelativeFormatParser = class extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
      patternLeftBoundary() {
        return constants_1.REGEX_PARTS.leftBoundary;
      }
      innerPattern() {
        return PATTERN;
      }
      innerExtract(context, match) {
        const prefix = match[1].toLowerCase();
        let timeUnits = constants_1.parseTimeUnits(match[2]);
        switch (prefix) {
          case "\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435":
          case "\u043F\u0440\u043E\u0448\u043B\u044B\u0435":
          case "-":
            timeUnits = timeunits_1.reverseTimeUnits(timeUnits);
            break;
        }
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
      }
    };
    exports.default = RUTimeUnitCasualRelativeFormatParser;
  }
});

// node_modules/chrono-node/dist/locales/ru/index.js
var require_ru = __commonJS({
  "node_modules/chrono-node/dist/locales/ru/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
    var RUTimeUnitWithinFormatParser_1 = __importDefault(require_RUTimeUnitWithinFormatParser());
    var RUMonthNameLittleEndianParser_1 = __importDefault(require_RUMonthNameLittleEndianParser());
    var RUMonthNameParser_1 = __importDefault(require_RUMonthNameParser());
    var RUTimeExpressionParser_1 = __importDefault(require_RUTimeExpressionParser());
    var RUTimeUnitAgoFormatParser_1 = __importDefault(require_RUTimeUnitAgoFormatParser());
    var RUMergeDateRangeRefiner_1 = __importDefault(require_RUMergeDateRangeRefiner());
    var RUMergeDateTimeRefiner_1 = __importDefault(require_RUMergeDateTimeRefiner());
    var configurations_1 = require_configurations();
    var RUCasualDateParser_1 = __importDefault(require_RUCasualDateParser());
    var RUCasualTimeParser_1 = __importDefault(require_RUCasualTimeParser());
    var RUWeekdayParser_1 = __importDefault(require_RUWeekdayParser());
    var RURelativeDateFormatParser_1 = __importDefault(require_RURelativeDateFormatParser());
    var chrono_1 = require_chrono();
    var SlashDateFormatParser_1 = __importDefault(require_SlashDateFormatParser());
    var RUTimeUnitCasualRelativeFormatParser_1 = __importDefault(require_RUTimeUnitCasualRelativeFormatParser());
    exports.casual = new chrono_1.Chrono(createCasualConfiguration());
    exports.strict = new chrono_1.Chrono(createConfiguration(true));
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
    function createCasualConfiguration() {
      const option = createConfiguration(false);
      option.parsers.unshift(new RUCasualDateParser_1.default());
      option.parsers.unshift(new RUCasualTimeParser_1.default());
      option.parsers.unshift(new RUMonthNameParser_1.default());
      option.parsers.unshift(new RURelativeDateFormatParser_1.default());
      option.parsers.unshift(new RUTimeUnitCasualRelativeFormatParser_1.default());
      return option;
    }
    exports.createCasualConfiguration = createCasualConfiguration;
    function createConfiguration(strictMode = true) {
      return configurations_1.includeCommonConfiguration({
        parsers: [
          new SlashDateFormatParser_1.default(true),
          new RUTimeUnitWithinFormatParser_1.default(),
          new RUMonthNameLittleEndianParser_1.default(),
          new RUWeekdayParser_1.default(),
          new RUTimeExpressionParser_1.default(strictMode),
          new RUTimeUnitAgoFormatParser_1.default()
        ],
        refiners: [new RUMergeDateTimeRefiner_1.default(), new RUMergeDateRangeRefiner_1.default()]
      }, strictMode);
    }
    exports.createConfiguration = createConfiguration;
  }
});

// node_modules/chrono-node/dist/index.js
var require_dist = __commonJS({
  "node_modules/chrono-node/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDate = exports.parse = exports.casual = exports.strict = exports.ru = exports.zh = exports.nl = exports.pt = exports.ja = exports.fr = exports.de = exports.Weekday = exports.Meridiem = exports.Chrono = exports.en = void 0;
    var en = __importStar(require_en());
    exports.en = en;
    var chrono_1 = require_chrono();
    Object.defineProperty(exports, "Chrono", { enumerable: true, get: function() {
      return chrono_1.Chrono;
    } });
    var Meridiem;
    (function(Meridiem2) {
      Meridiem2[Meridiem2["AM"] = 0] = "AM";
      Meridiem2[Meridiem2["PM"] = 1] = "PM";
    })(Meridiem = exports.Meridiem || (exports.Meridiem = {}));
    var Weekday;
    (function(Weekday2) {
      Weekday2[Weekday2["SUNDAY"] = 0] = "SUNDAY";
      Weekday2[Weekday2["MONDAY"] = 1] = "MONDAY";
      Weekday2[Weekday2["TUESDAY"] = 2] = "TUESDAY";
      Weekday2[Weekday2["WEDNESDAY"] = 3] = "WEDNESDAY";
      Weekday2[Weekday2["THURSDAY"] = 4] = "THURSDAY";
      Weekday2[Weekday2["FRIDAY"] = 5] = "FRIDAY";
      Weekday2[Weekday2["SATURDAY"] = 6] = "SATURDAY";
    })(Weekday = exports.Weekday || (exports.Weekday = {}));
    var de = __importStar(require_de());
    exports.de = de;
    var fr = __importStar(require_fr());
    exports.fr = fr;
    var ja = __importStar(require_ja());
    exports.ja = ja;
    var pt = __importStar(require_pt());
    exports.pt = pt;
    var nl = __importStar(require_nl());
    exports.nl = nl;
    var zh = __importStar(require_zh());
    exports.zh = zh;
    var ru = __importStar(require_ru());
    exports.ru = ru;
    exports.strict = en.strict;
    exports.casual = en.casual;
    function parse(text, ref, option) {
      return exports.casual.parse(text, ref, option);
    }
    exports.parse = parse;
    function parseDate(text, ref, option) {
      return exports.casual.parseDate(text, ref, option);
    }
    exports.parseDate = parseDate;
  }
});

// node_modules/@vvo/tzdb/raw-time-zones.json
var require_raw_time_zones = __commonJS({
  "node_modules/@vvo/tzdb/raw-time-zones.json"(exports, module2) {
    module2.exports = [
      { name: "Pacific/Niue", alternativeName: "Niue Time", group: ["Pacific/Niue"], continentCode: "OC", continentName: "Oceania", countryName: "Niue", countryCode: "NU", mainCities: ["Alofi"], rawOffsetInMinutes: -660, abbreviation: "NUT", rawFormat: "-11:00 Niue Time - Alofi" },
      { name: "Pacific/Midway", alternativeName: "Samoa Time", group: ["Pacific/Midway"], continentCode: "OC", continentName: "Oceania", countryName: "United States Minor Outlying Islands", countryCode: "UM", mainCities: ["Midway"], rawOffsetInMinutes: -660, abbreviation: "SST", rawFormat: "-11:00 Samoa Time - Midway" },
      { name: "Pacific/Pago_Pago", alternativeName: "Samoa Time", group: ["Pacific/Pago_Pago", "US/Samoa", "Pacific/Samoa", "Pacific/Midway"], continentCode: "OC", continentName: "Oceania", countryName: "American Samoa", countryCode: "AS", mainCities: ["Pago Pago"], rawOffsetInMinutes: -660, abbreviation: "SST", rawFormat: "-11:00 Samoa Time - Pago Pago" },
      { name: "Pacific/Rarotonga", alternativeName: "Cook Islands Time", group: ["Pacific/Rarotonga"], continentCode: "OC", continentName: "Oceania", countryName: "Cook Islands", countryCode: "CK", mainCities: ["Avarua"], rawOffsetInMinutes: -600, abbreviation: "CKT", rawFormat: "-10:00 Cook Islands Time - Avarua" },
      { name: "America/Adak", alternativeName: "Hawaii-Aleutian Time", group: ["America/Adak", "US/Aleutian", "America/Atka"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Adak"], rawOffsetInMinutes: -600, abbreviation: "HAST", rawFormat: "-10:00 Hawaii-Aleutian Time - Adak" },
      { name: "Pacific/Honolulu", alternativeName: "Hawaii-Aleutian Time", group: ["Pacific/Honolulu", "US/Hawaii", "Pacific/Johnston"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Honolulu", "East Honolulu", "Pearl City", "Hilo"], rawOffsetInMinutes: -600, abbreviation: "HAST", rawFormat: "-10:00 Hawaii-Aleutian Time - Honolulu, East Honolulu, Pearl City, Hilo" },
      { name: "Pacific/Tahiti", alternativeName: "Tahiti Time", group: ["Pacific/Tahiti"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Faaa", "Papeete", "Punaauia"], rawOffsetInMinutes: -600, abbreviation: "TAHT", rawFormat: "-10:00 Tahiti Time - Faaa, Papeete, Punaauia" },
      { name: "Pacific/Marquesas", alternativeName: "Marquesas Time", group: ["Pacific/Marquesas"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Marquesas"], rawOffsetInMinutes: -570, abbreviation: "MART", rawFormat: "-09:30 Marquesas Time - Marquesas" },
      { name: "America/Anchorage", alternativeName: "Alaska Time", group: ["America/Anchorage", "America/Juneau", "America/Metlakatla", "America/Nome", "America/Sitka", "America/Yakutat", "US/Alaska"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Anchorage", "Juneau", "Fairbanks", "Eagle River"], rawOffsetInMinutes: -540, abbreviation: "AKST", rawFormat: "-09:00 Alaska Time - Anchorage, Juneau, Fairbanks, Eagle River" },
      { name: "Pacific/Gambier", alternativeName: "Gambier Time", group: ["Pacific/Gambier"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Gambier"], rawOffsetInMinutes: -540, abbreviation: "GAMT", rawFormat: "-09:00 Gambier Time - Gambier" },
      { name: "America/Los_Angeles", alternativeName: "Pacific Time", group: ["America/Los_Angeles", "US/Pacific"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Los Angeles", "San Diego", "San Jose", "San Francisco"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Los Angeles, San Diego, San Jose, San Francisco" },
      { name: "America/Tijuana", alternativeName: "Pacific Time", group: ["America/Tijuana", "Mexico/BajaNorte", "America/Ensenada", "America/Santa_Isabel"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Tijuana", "Mexicali", "Ensenada", "Rosarito"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Tijuana, Mexicali, Ensenada, Rosarito" },
      { name: "America/Vancouver", alternativeName: "Pacific Time", group: ["America/Vancouver", "Canada/Pacific"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Vancouver", "Surrey", "Okanagan", "Victoria"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Vancouver, Surrey, Okanagan, Victoria" },
      { name: "Pacific/Pitcairn", alternativeName: "Pitcairn Time", group: ["Pacific/Pitcairn"], continentCode: "OC", continentName: "Oceania", countryName: "Pitcairn", countryCode: "PN", mainCities: ["Adamstown"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pitcairn Time - Adamstown" },
      { name: "America/Mazatlan", alternativeName: "Mexican Pacific Time", group: ["America/Mazatlan", "Mexico/BajaSur"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Culiac\xE1n", "Mazatl\xE1n", "Tepic", "Los Mochis"], rawOffsetInMinutes: -420, abbreviation: "GMT-7", rawFormat: "-07:00 Mexican Pacific Time - Culiac\xE1n, Mazatl\xE1n, Tepic, Los Mochis" },
      { name: "America/Hermosillo", alternativeName: "Mexican Pacific Time", group: ["America/Hermosillo"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Hermosillo", "Ciudad Obreg\xF3n", "Nogales", "San Luis R\xEDo Colorado"], rawOffsetInMinutes: -420, abbreviation: "GMT-7", rawFormat: "-07:00 Mexican Pacific Time - Hermosillo, Ciudad Obreg\xF3n, Nogales, San Luis R\xEDo Colorado" },
      { name: "America/Edmonton", alternativeName: "Mountain Time", group: ["America/Cambridge_Bay", "America/Edmonton", "America/Inuvik", "America/Yellowknife", "Canada/Mountain"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Calgary", "Edmonton", "Red Deer", "Sherwood Park"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Calgary, Edmonton, Red Deer, Sherwood Park" },
      { name: "America/Denver", alternativeName: "Mountain Time", group: ["America/Boise", "America/Denver", "Navajo", "US/Mountain", "America/Shiprock"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Denver", "El Paso", "Albuquerque", "Colorado Springs"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs" },
      { name: "America/Phoenix", alternativeName: "Mountain Time", group: ["America/Phoenix", "US/Arizona", "America/Creston"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Phoenix", "Tucson", "Mesa", "Chandler"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Phoenix, Tucson, Mesa, Chandler" },
      { name: "America/Whitehorse", alternativeName: "Yukon Time", group: ["America/Creston", "America/Dawson", "America/Dawson_Creek", "America/Fort_Nelson", "America/Whitehorse", "Canada/Yukon"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Whitehorse", "Fort St. John", "Creston", "Dawson"], rawOffsetInMinutes: -420, abbreviation: "YT", rawFormat: "-07:00 Yukon Time - Whitehorse, Fort St. John, Creston, Dawson" },
      { name: "America/Belize", alternativeName: "Central Time", group: ["America/Belize"], continentCode: "NA", continentName: "North America", countryName: "Belize", countryCode: "BZ", mainCities: ["Belize City", "San Ignacio", "San Pedro", "Orange Walk"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Belize City, San Ignacio, San Pedro, Orange Walk" },
      { name: "America/Chicago", alternativeName: "Central Time", group: ["America/Chicago", "America/Indiana/Knox", "America/Indiana/Tell_City", "America/Menominee", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "US/Central", "US/Indiana-Starke", "America/Knox_IN"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Chicago", "Houston", "San Antonio", "Dallas"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Chicago, Houston, San Antonio, Dallas" },
      { name: "America/Guatemala", alternativeName: "Central Time", group: ["America/Guatemala"], continentCode: "NA", continentName: "North America", countryName: "Guatemala", countryCode: "GT", mainCities: ["Guatemala City", "Mixco", "Villa Nueva", "Cob\xE1n"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Guatemala City, Mixco, Villa Nueva, Cob\xE1n" },
      { name: "America/Managua", alternativeName: "Central Time", group: ["America/Managua"], continentCode: "NA", continentName: "North America", countryName: "Nicaragua", countryCode: "NI", mainCities: ["Managua", "Le\xF3n", "Masaya", "Chinandega"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Managua, Le\xF3n, Masaya, Chinandega" },
      { name: "America/Mexico_City", alternativeName: "Central Time", group: ["America/Bahia_Banderas", "America/Matamoros", "America/Merida", "America/Mexico_City", "America/Monterrey", "Mexico/General"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Mexico City", "Iztapalapa", "Puebla", "Ecatepec de Morelos"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Mexico City, Iztapalapa, Puebla, Ecatepec de Morelos" },
      { name: "America/Costa_Rica", alternativeName: "Central Time", group: ["America/Costa_Rica"], continentCode: "NA", continentName: "North America", countryName: "Costa Rica", countryCode: "CR", mainCities: ["San Jos\xE9", "Lim\xF3n", "San Francisco", "Alajuela"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - San Jos\xE9, Lim\xF3n, San Francisco, Alajuela" },
      { name: "America/El_Salvador", alternativeName: "Central Time", group: ["America/El_Salvador"], continentCode: "NA", continentName: "North America", countryName: "El Salvador", countryCode: "SV", mainCities: ["San Salvador", "Soyapango", "San Miguel", "Santa Ana"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - San Salvador, Soyapango, San Miguel, Santa Ana" },
      { name: "America/Regina", alternativeName: "Central Time", group: ["America/Regina", "America/Swift_Current", "Canada/Saskatchewan"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Saskatoon, Regina, Prince Albert, Moose Jaw" },
      { name: "America/Tegucigalpa", alternativeName: "Central Time", group: ["America/Tegucigalpa"], continentCode: "NA", continentName: "North America", countryName: "Honduras", countryCode: "HN", mainCities: ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Choloma"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Tegucigalpa, San Pedro Sula, La Ceiba, Choloma" },
      { name: "America/Winnipeg", alternativeName: "Central Time", group: ["America/Rainy_River", "America/Rankin_Inlet", "America/Resolute", "America/Winnipeg", "Canada/Central"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Winnipeg", "Brandon", "Steinbach", "Kenora"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Winnipeg, Brandon, Steinbach, Kenora" },
      { name: "Pacific/Easter", alternativeName: "Easter Island Time", group: ["Pacific/Easter", "Chile/EasterIsland"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Easter"], rawOffsetInMinutes: -360, abbreviation: "EAST", rawFormat: "-06:00 Easter Island Time - Easter" },
      { name: "Pacific/Galapagos", alternativeName: "Galapagos Time", group: ["Pacific/Galapagos"], continentCode: "SA", continentName: "South America", countryName: "Ecuador", countryCode: "EC", mainCities: ["Galapagos"], rawOffsetInMinutes: -360, abbreviation: "GALT", rawFormat: "-06:00 Galapagos Time - Galapagos" },
      { name: "America/Ojinaga", alternativeName: "Mountain Time", group: ["America/Chihuahua", "America/Ojinaga"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Ciudad Ju\xE1rez", "Chihuahua", "Ciudad Delicias", "Cuauht\xE9moc"], rawOffsetInMinutes: -360, abbreviation: "MST", rawFormat: "-06:00 Mountain Time - Ciudad Ju\xE1rez, Chihuahua, Ciudad Delicias, Cuauht\xE9moc" },
      { name: "America/Rio_Branco", alternativeName: "Acre Time", group: ["America/Eirunepe", "America/Rio_Branco", "Brazil/Acre", "America/Porto_Acre"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Eirunep\xE9"], rawOffsetInMinutes: -300, abbreviation: "ACT", rawFormat: "-05:00 Acre Time - Rio Branco, Cruzeiro do Sul, Sena Madureira, Eirunep\xE9" },
      { name: "America/Bogota", alternativeName: "Colombia Time", group: ["America/Bogota"], continentCode: "SA", continentName: "South America", countryName: "Colombia", countryCode: "CO", mainCities: ["Bogot\xE1", "Cali", "Medell\xEDn", "Barranquilla"], rawOffsetInMinutes: -300, abbreviation: "COT", rawFormat: "-05:00 Colombia Time - Bogot\xE1, Cali, Medell\xEDn, Barranquilla" },
      { name: "America/Havana", alternativeName: "Cuba Time", group: ["America/Havana", "Cuba"], continentCode: "NA", continentName: "North America", countryName: "Cuba", countryCode: "CU", mainCities: ["Havana", "Santiago de Cuba", "Camag\xFCey", "Holgu\xEDn"], rawOffsetInMinutes: -300, abbreviation: "CST", rawFormat: "-05:00 Cuba Time - Havana, Santiago de Cuba, Camag\xFCey, Holgu\xEDn" },
      { name: "America/Atikokan", alternativeName: "Eastern Time", group: ["America/Atikokan"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Atikokan"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Atikokan" },
      { name: "America/Cancun", alternativeName: "Eastern Time", group: ["America/Cancun"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Canc\xFAn", "Chetumal", "Playa del Carmen", "Cozumel"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Canc\xFAn, Chetumal, Playa del Carmen, Cozumel" },
      { name: "America/Grand_Turk", alternativeName: "Eastern Time", group: ["America/Grand_Turk"], continentCode: "NA", continentName: "North America", countryName: "Turks and Caicos Islands", countryCode: "TC", mainCities: ["Cockburn Town"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Cockburn Town" },
      { name: "America/Cayman", alternativeName: "Eastern Time", group: ["America/Cayman"], continentCode: "NA", continentName: "North America", countryName: "Cayman Islands", countryCode: "KY", mainCities: ["George Town", "West Bay"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - George Town, West Bay" },
      { name: "America/Jamaica", alternativeName: "Eastern Time", group: ["America/Jamaica", "Jamaica"], continentCode: "NA", continentName: "North America", countryName: "Jamaica", countryCode: "JM", mainCities: ["Kingston", "New Kingston", "Spanish Town", "Portmore"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Kingston, New Kingston, Spanish Town, Portmore" },
      { name: "America/Nassau", alternativeName: "Eastern Time", group: ["America/Nassau"], continentCode: "NA", continentName: "North America", countryName: "Bahamas", countryCode: "BS", mainCities: ["Nassau", "Lucaya", "Freeport"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Nassau, Lucaya, Freeport" },
      { name: "America/New_York", alternativeName: "Eastern Time", group: ["America/Detroit", "America/Indiana/Indianapolis", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/New_York", "US/Michigan", "US/East-Indiana", "America/Indianapolis", "America/Fort_Wayne", "America/Louisville", "US/Eastern"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["New York City", "Brooklyn", "Queens", "Philadelphia"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - New York City, Brooklyn, Queens, Philadelphia" },
      { name: "America/Panama", alternativeName: "Eastern Time", group: ["America/Panama", "America/Atikokan", "America/Cayman", "America/Coral_Harbour"], continentCode: "NA", continentName: "North America", countryName: "Panama", countryCode: "PA", mainCities: ["Panam\xE1", "San Miguelito", "Juan D\xEDaz", "David"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Panam\xE1, San Miguelito, Juan D\xEDaz, David" },
      { name: "America/Port-au-Prince", alternativeName: "Eastern Time", group: ["America/Port-au-Prince"], continentCode: "NA", continentName: "North America", countryName: "Haiti", countryCode: "HT", mainCities: ["Port-au-Prince", "Carrefour", "Delmas 73", "Port-de-Paix"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Port-au-Prince, Carrefour, Delmas 73, Port-de-Paix" },
      { name: "America/Toronto", alternativeName: "Eastern Time", group: ["America/Iqaluit", "America/Nipigon", "America/Pangnirtung", "America/Thunder_Bay", "America/Toronto", "Canada/Eastern", "America/Nassau", "America/Montreal"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Toronto", "Montr\xE9al", "Ottawa", "Mississauga"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Toronto, Montr\xE9al, Ottawa, Mississauga" },
      { name: "America/Guayaquil", alternativeName: "Ecuador Time", group: ["America/Guayaquil"], continentCode: "SA", continentName: "South America", countryName: "Ecuador", countryCode: "EC", mainCities: ["Quito", "Guayaquil", "Cuenca", "Santo Domingo de los Colorados"], rawOffsetInMinutes: -300, abbreviation: "ECT", rawFormat: "-05:00 Ecuador Time - Quito, Guayaquil, Cuenca, Santo Domingo de los Colorados" },
      { name: "America/Lima", alternativeName: "Peru Time", group: ["America/Lima"], continentCode: "SA", continentName: "South America", countryName: "Peru", countryCode: "PE", mainCities: ["Lima", "Callao", "Arequipa", "Trujillo"], rawOffsetInMinutes: -300, abbreviation: "PET", rawFormat: "-05:00 Peru Time - Lima, Callao, Arequipa, Trujillo" },
      { name: "America/Manaus", alternativeName: "Amazon Time", group: ["America/Boa_Vista", "America/Campo_Grande", "America/Cuiaba", "America/Manaus", "America/Porto_Velho", "Brazil/West"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Manaus", "Campo Grande", "Cuiab\xE1", "Porto Velho"], rawOffsetInMinutes: -240, abbreviation: "AMT", rawFormat: "-04:00 Amazon Time - Manaus, Campo Grande, Cuiab\xE1, Porto Velho" },
      { name: "America/St_Kitts", alternativeName: "Atlantic Time", group: ["America/St_Kitts"], continentCode: "NA", continentName: "North America", countryName: "Saint Kitts and Nevis", countryCode: "KN", mainCities: ["Basseterre"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Basseterre" },
      { name: "America/Blanc-Sablon", alternativeName: "Atlantic Time", group: ["America/Blanc-Sablon"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Blanc-Sablon"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Blanc-Sablon" },
      { name: "America/Montserrat", alternativeName: "Atlantic Time", group: ["America/Montserrat"], continentCode: "NA", continentName: "North America", countryName: "Montserrat", countryCode: "MS", mainCities: ["Brades", "Plymouth"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Brades, Plymouth" },
      { name: "America/Barbados", alternativeName: "Atlantic Time", group: ["America/Barbados"], continentCode: "NA", continentName: "North America", countryName: "Barbados", countryCode: "BB", mainCities: ["Bridgetown"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Bridgetown" },
      { name: "America/St_Lucia", alternativeName: "Atlantic Time", group: ["America/St_Lucia"], continentCode: "NA", continentName: "North America", countryName: "Saint Lucia", countryCode: "LC", mainCities: ["Castries"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Castries" },
      { name: "America/Port_of_Spain", alternativeName: "Atlantic Time", group: ["America/Port_of_Spain"], continentCode: "NA", continentName: "North America", countryName: "Trinidad and Tobago", countryCode: "TT", mainCities: ["Chaguanas", "Mon Repos", "San Fernando", "Port of Spain"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Chaguanas, Mon Repos, San Fernando, Port of Spain" },
      { name: "America/Martinique", alternativeName: "Atlantic Time", group: ["America/Martinique"], continentCode: "NA", continentName: "North America", countryName: "Martinique", countryCode: "MQ", mainCities: ["Fort-de-France", "Le Lamentin", "Le Robert", "Sainte-Marie"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie" },
      { name: "America/St_Barthelemy", alternativeName: "Atlantic Time", group: ["America/St_Barthelemy"], continentCode: "NA", continentName: "North America", countryName: "Saint Barthelemy", countryCode: "BL", mainCities: ["Gustavia"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Gustavia" },
      { name: "America/Halifax", alternativeName: "Atlantic Time", group: ["America/Glace_Bay", "America/Goose_Bay", "America/Halifax", "America/Moncton", "Canada/Atlantic"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Halifax", "Moncton", "Sydney", "Dartmouth"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Halifax, Moncton, Sydney, Dartmouth" },
      { name: "Atlantic/Bermuda", alternativeName: "Atlantic Time", group: ["Atlantic/Bermuda"], continentCode: "NA", continentName: "North America", countryName: "Bermuda", countryCode: "BM", mainCities: ["Hamilton"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Hamilton" },
      { name: "America/St_Vincent", alternativeName: "Atlantic Time", group: ["America/St_Vincent"], continentCode: "NA", continentName: "North America", countryName: "Saint Vincent and the Grenadines", countryCode: "VC", mainCities: ["Kingstown", "Kingstown Park"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Kingstown, Kingstown Park" },
      { name: "America/Kralendijk", alternativeName: "Atlantic Time", group: ["America/Kralendijk"], continentCode: "NA", continentName: "North America", countryName: "Bonaire, Saint Eustatius and Saba ", countryCode: "BQ", mainCities: ["Kralendijk"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Kralendijk" },
      { name: "America/Guadeloupe", alternativeName: "Atlantic Time", group: ["America/Guadeloupe"], continentCode: "NA", continentName: "North America", countryName: "Guadeloupe", countryCode: "GP", mainCities: ["Les Abymes", "Baie-Mahault", "Le Gosier", "Petit-Bourg"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg" },
      { name: "America/Marigot", alternativeName: "Atlantic Time", group: ["America/Marigot"], continentCode: "NA", continentName: "North America", countryName: "Saint Martin", countryCode: "MF", mainCities: ["Marigot"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Marigot" },
      { name: "America/Aruba", alternativeName: "Atlantic Time", group: ["America/Aruba"], continentCode: "NA", continentName: "North America", countryName: "Aruba", countryCode: "AW", mainCities: ["Oranjestad", "Tanki Leendert", "San Nicolas"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Oranjestad, Tanki Leendert, San Nicolas" },
      { name: "America/Lower_Princes", alternativeName: "Atlantic Time", group: ["America/Lower_Princes"], continentCode: "NA", continentName: "North America", countryName: "Sint Maarten", countryCode: "SX", mainCities: ["Philipsburg"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Philipsburg" },
      { name: "America/Tortola", alternativeName: "Atlantic Time", group: ["America/Tortola"], continentCode: "NA", continentName: "North America", countryName: "British Virgin Islands", countryCode: "VG", mainCities: ["Road Town"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Road Town" },
      { name: "America/Dominica", alternativeName: "Atlantic Time", group: ["America/Dominica"], continentCode: "NA", continentName: "North America", countryName: "Dominica", countryCode: "DM", mainCities: ["Roseau"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Roseau" },
      { name: "America/St_Thomas", alternativeName: "Atlantic Time", group: ["America/St_Thomas"], continentCode: "NA", continentName: "North America", countryName: "U.S. Virgin Islands", countryCode: "VI", mainCities: ["Saint Croix", "Charlotte Amalie"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint Croix, Charlotte Amalie" },
      { name: "America/Grenada", alternativeName: "Atlantic Time", group: ["America/Grenada"], continentCode: "NA", continentName: "North America", countryName: "Grenada", countryCode: "GD", mainCities: ["Saint George's"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint George's" },
      { name: "America/Antigua", alternativeName: "Atlantic Time", group: ["America/Antigua"], continentCode: "NA", continentName: "North America", countryName: "Antigua and Barbuda", countryCode: "AG", mainCities: ["Saint John\u2019s"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint John\u2019s" },
      { name: "America/Puerto_Rico", alternativeName: "Atlantic Time", group: ["America/Puerto_Rico", "America/Virgin", "America/Anguilla", "America/Antigua", "America/Aruba", "America/Blanc-Sablon", "America/Curacao", "America/Dominica", "America/Grenada", "America/Guadeloupe", "America/Kralendijk", "America/Lower_Princes", "America/Marigot", "America/Montserrat", "America/Port_of_Spain", "America/St_Barthelemy", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Tortola"], continentCode: "NA", continentName: "North America", countryName: "Puerto Rico", countryCode: "PR", mainCities: ["San Juan", "Bayam\xF3n", "Carolina", "Ponce"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - San Juan, Bayam\xF3n, Carolina, Ponce" },
      { name: "America/Santo_Domingo", alternativeName: "Atlantic Time", group: ["America/Santo_Domingo"], continentCode: "NA", continentName: "North America", countryName: "Dominican Republic", countryCode: "DO", mainCities: ["Santo Domingo", "Santiago de los Caballeros", "Santo Domingo Oeste", "Santo Domingo Este"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este" },
      { name: "America/Anguilla", alternativeName: "Atlantic Time", group: ["America/Anguilla"], continentCode: "NA", continentName: "North America", countryName: "Anguilla", countryCode: "AI", mainCities: ["The Valley"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - The Valley" },
      { name: "America/Thule", alternativeName: "Atlantic Time", group: ["America/Thule"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Thule"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Thule" },
      { name: "America/Curacao", alternativeName: "Atlantic Time", group: ["America/Curacao"], continentCode: "NA", continentName: "North America", countryName: "Curacao", countryCode: "CW", mainCities: ["Willemstad"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Willemstad" },
      { name: "America/La_Paz", alternativeName: "Bolivia Time", group: ["America/La_Paz"], continentCode: "SA", continentName: "South America", countryName: "Bolivia", countryCode: "BO", mainCities: ["La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre"], rawOffsetInMinutes: -240, abbreviation: "BOT", rawFormat: "-04:00 Bolivia Time - La Paz, Santa Cruz de la Sierra, Cochabamba, Sucre" },
      { name: "America/Santiago", alternativeName: "Chile Time", group: ["America/Santiago", "Chile/Continental"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Santiago", "Puente Alto", "Antofagasta", "Vi\xF1a del Mar"], rawOffsetInMinutes: -240, abbreviation: "CLT", rawFormat: "-04:00 Chile Time - Santiago, Puente Alto, Antofagasta, Vi\xF1a del Mar" },
      { name: "America/Guyana", alternativeName: "Guyana Time", group: ["America/Guyana"], continentCode: "SA", continentName: "South America", countryName: "Guyana", countryCode: "GY", mainCities: ["Georgetown", "Linden", "New Amsterdam"], rawOffsetInMinutes: -240, abbreviation: "GYT", rawFormat: "-04:00 Guyana Time - Georgetown, Linden, New Amsterdam" },
      { name: "America/Asuncion", alternativeName: "Paraguay Time", group: ["America/Asuncion"], continentCode: "SA", continentName: "South America", countryName: "Paraguay", countryCode: "PY", mainCities: ["Asunci\xF3n", "Ciudad del Este", "San Lorenzo", "Capiat\xE1"], rawOffsetInMinutes: -240, abbreviation: "PYT", rawFormat: "-04:00 Paraguay Time - Asunci\xF3n, Ciudad del Este, San Lorenzo, Capiat\xE1" },
      { name: "America/Caracas", alternativeName: "Venezuela Time", group: ["America/Caracas"], continentCode: "SA", continentName: "South America", countryName: "Venezuela", countryCode: "VE", mainCities: ["Caracas", "Maracaibo", "Maracay", "Valencia"], rawOffsetInMinutes: -240, abbreviation: "VET", rawFormat: "-04:00 Venezuela Time - Caracas, Maracaibo, Maracay, Valencia" },
      { name: "America/St_Johns", alternativeName: "Newfoundland Time", group: ["America/St_Johns", "Canada/Newfoundland"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["St. John's", "Mount Pearl", "Corner Brook", "Conception Bay South"], rawOffsetInMinutes: -210, abbreviation: "NST", rawFormat: "-03:30 Newfoundland Time - St. John's, Mount Pearl, Corner Brook, Conception Bay South" },
      { name: "America/Argentina/Buenos_Aires", alternativeName: "Argentina Time", group: ["America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Buenos_Aires", "America/Catamarca", "America/Argentina/ComodRivadavia", "America/Cordoba", "America/Rosario", "America/Jujuy", "America/Mendoza"], continentCode: "SA", continentName: "South America", countryName: "Argentina", countryCode: "AR", mainCities: ["Buenos Aires", "C\xF3rdoba", "Rosario", "Mendoza"], rawOffsetInMinutes: -180, abbreviation: "ART", rawFormat: "-03:00 Argentina Time - Buenos Aires, C\xF3rdoba, Rosario, Mendoza" },
      { name: "America/Sao_Paulo", alternativeName: "Brasilia Time", group: ["America/Araguaina", "America/Bahia", "America/Belem", "America/Fortaleza", "America/Maceio", "America/Recife", "America/Santarem", "America/Sao_Paulo", "Brazil/East"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["S\xE3o Paulo", "Rio de Janeiro", "Salvador", "Fortaleza"], rawOffsetInMinutes: -180, abbreviation: "BRT", rawFormat: "-03:00 Brasilia Time - S\xE3o Paulo, Rio de Janeiro, Salvador, Fortaleza" },
      { name: "Antarctica/Palmer", alternativeName: "Chile Time", group: ["Antarctica/Palmer", "Antarctica/Rothera"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Palmer", "Rothera"], rawOffsetInMinutes: -180, abbreviation: "CLT", rawFormat: "-03:00 Chile Time - Palmer, Rothera" },
      { name: "America/Punta_Arenas", alternativeName: "Chile Time", group: ["America/Punta_Arenas"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Punta Arenas", "Puerto Natales"], rawOffsetInMinutes: -180, abbreviation: "CLT", rawFormat: "-03:00 Chile Time - Punta Arenas, Puerto Natales" },
      { name: "Atlantic/Stanley", alternativeName: "Falkland Islands Time", group: ["Atlantic/Stanley"], continentCode: "SA", continentName: "South America", countryName: "Falkland Islands", countryCode: "FK", mainCities: ["Stanley"], rawOffsetInMinutes: -180, abbreviation: "FKST", rawFormat: "-03:00 Falkland Islands Time - Stanley" },
      { name: "America/Cayenne", alternativeName: "French Guiana Time", group: ["America/Cayenne"], continentCode: "SA", continentName: "South America", countryName: "French Guiana", countryCode: "GF", mainCities: ["Cayenne", "Matoury", "Saint-Laurent-du-Maroni", "Kourou"], rawOffsetInMinutes: -180, abbreviation: "GFT", rawFormat: "-03:00 French Guiana Time - Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou" },
      { name: "America/Miquelon", alternativeName: "St. Pierre & Miquelon Time", group: ["America/Miquelon"], continentCode: "NA", continentName: "North America", countryName: "Saint Pierre and Miquelon", countryCode: "PM", mainCities: ["Saint-Pierre"], rawOffsetInMinutes: -180, abbreviation: "PM", rawFormat: "-03:00 St. Pierre & Miquelon Time - Saint-Pierre" },
      { name: "America/Paramaribo", alternativeName: "Suriname Time", group: ["America/Paramaribo"], continentCode: "SA", continentName: "South America", countryName: "Suriname", countryCode: "SR", mainCities: ["Paramaribo", "Lelydorp"], rawOffsetInMinutes: -180, abbreviation: "SRT", rawFormat: "-03:00 Suriname Time - Paramaribo, Lelydorp" },
      { name: "America/Montevideo", alternativeName: "Uruguay Time", group: ["America/Montevideo"], continentCode: "SA", continentName: "South America", countryName: "Uruguay", countryCode: "UY", mainCities: ["Montevideo", "Salto", "Paysand\xFA", "Las Piedras"], rawOffsetInMinutes: -180, abbreviation: "UYT", rawFormat: "-03:00 Uruguay Time - Montevideo, Salto, Paysand\xFA, Las Piedras" },
      { name: "America/Nuuk", alternativeName: "West Greenland Time", group: ["America/Nuuk", "America/Godthab"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Nuuk"], rawOffsetInMinutes: -180, abbreviation: "WGT", rawFormat: "-03:00 West Greenland Time - Nuuk" },
      { name: "America/Noronha", alternativeName: "Fernando de Noronha Time", group: ["America/Noronha", "Brazil/DeNoronha"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Noronha"], rawOffsetInMinutes: -120, abbreviation: "FNT", rawFormat: "-02:00 Fernando de Noronha Time - Noronha" },
      { name: "Atlantic/South_Georgia", alternativeName: "South Georgia Time", group: ["Atlantic/South_Georgia"], continentCode: "AN", continentName: "Antarctica", countryName: "South Georgia and the South Sandwich Islands", countryCode: "GS", mainCities: ["Grytviken"], rawOffsetInMinutes: -120, abbreviation: "GST", rawFormat: "-02:00 South Georgia Time - Grytviken" },
      { name: "Atlantic/Azores", alternativeName: "Azores Time", group: ["Atlantic/Azores"], continentCode: "EU", continentName: "Europe", countryName: "Portugal", countryCode: "PT", mainCities: ["Ponta Delgada"], rawOffsetInMinutes: -60, abbreviation: "AZOT", rawFormat: "-01:00 Azores Time - Ponta Delgada" },
      { name: "Atlantic/Cape_Verde", alternativeName: "Cape Verde Time", group: ["Atlantic/Cape_Verde"], continentCode: "AF", continentName: "Africa", countryName: "Cabo Verde", countryCode: "CV", mainCities: ["Praia", "Mindelo", "Santa Maria", "Cova Figueira"], rawOffsetInMinutes: -60, abbreviation: "CVT", rawFormat: "-01:00 Cape Verde Time - Praia, Mindelo, Santa Maria, Cova Figueira" },
      { name: "America/Scoresbysund", alternativeName: "East Greenland Time", group: ["America/Scoresbysund"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Scoresbysund"], rawOffsetInMinutes: -60, abbreviation: "EGT", rawFormat: "-01:00 East Greenland Time - Scoresbysund" },
      { name: "Africa/Abidjan", alternativeName: "Greenwich Mean Time", group: ["Africa/Abidjan", "Iceland", "Africa/Accra", "Africa/Bamako", "Africa/Banjul", "Africa/Conakry", "Africa/Dakar", "Africa/Freetown", "Africa/Lome", "Africa/Nouakchott", "Africa/Ouagadougou", "Atlantic/Reykjavik", "Atlantic/St_Helena", "Africa/Timbuktu"], continentCode: "AF", continentName: "Africa", countryName: "Ivory Coast", countryCode: "CI", mainCities: ["Abidjan", "Abobo", "Bouak\xE9", "Daloa"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Abidjan, Abobo, Bouak\xE9, Daloa" },
      { name: "Africa/Accra", alternativeName: "Greenwich Mean Time", group: ["Africa/Accra"], continentCode: "AF", continentName: "Africa", countryName: "Ghana", countryCode: "GH", mainCities: ["Accra", "Kumasi", "Tamale", "Takoradi"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Accra, Kumasi, Tamale, Takoradi" },
      { name: "Africa/Bamako", alternativeName: "Greenwich Mean Time", group: ["Africa/Bamako"], continentCode: "AF", continentName: "Africa", countryName: "Mali", countryCode: "ML", mainCities: ["Bamako", "S\xE9gou", "Sikasso", "Mopti"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Bamako, S\xE9gou, Sikasso, Mopti" },
      { name: "Africa/Bissau", alternativeName: "Greenwich Mean Time", group: ["Africa/Bissau"], continentCode: "AF", continentName: "Africa", countryName: "Guinea-Bissau", countryCode: "GW", mainCities: ["Bissau", "Bafat\xE1"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Bissau, Bafat\xE1" },
      { name: "Africa/Conakry", alternativeName: "Greenwich Mean Time", group: ["Africa/Conakry"], continentCode: "AF", continentName: "Africa", countryName: "Guinea", countryCode: "GN", mainCities: ["Camayenne", "Conakry", "Nz\xE9r\xE9kor\xE9", "Kindia"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Camayenne, Conakry, Nz\xE9r\xE9kor\xE9, Kindia" },
      { name: "Africa/Dakar", alternativeName: "Greenwich Mean Time", group: ["Africa/Dakar"], continentCode: "AF", continentName: "Africa", countryName: "Senegal", countryCode: "SN", mainCities: ["Dakar", "Pikine", "Touba", "Thi\xE8s"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Dakar, Pikine, Touba, Thi\xE8s" },
      { name: "America/Danmarkshavn", alternativeName: "Greenwich Mean Time", group: ["America/Danmarkshavn"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Danmarkshavn"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Danmarkshavn" },
      { name: "Europe/Isle_of_Man", alternativeName: "Greenwich Mean Time", group: ["Europe/Isle_of_Man"], continentCode: "EU", continentName: "Europe", countryName: "Isle of Man", countryCode: "IM", mainCities: ["Douglas"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Douglas" },
      { name: "Europe/Dublin", alternativeName: "Greenwich Mean Time", group: ["Europe/Dublin", "Eire"], continentCode: "EU", continentName: "Europe", countryName: "Ireland", countryCode: "IE", mainCities: ["Dublin", "South Dublin", "Cork", "Luimneach"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Dublin, South Dublin, Cork, Luimneach" },
      { name: "Africa/Freetown", alternativeName: "Greenwich Mean Time", group: ["Africa/Freetown"], continentCode: "AF", continentName: "Africa", countryName: "Sierra Leone", countryCode: "SL", mainCities: ["Freetown", "Bo", "Kenema", "Koidu"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Freetown, Bo, Kenema, Koidu" },
      { name: "Atlantic/St_Helena", alternativeName: "Greenwich Mean Time", group: ["Atlantic/St_Helena"], continentCode: "AF", continentName: "Africa", countryName: "Saint Helena", countryCode: "SH", mainCities: ["Jamestown"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Jamestown" },
      { name: "Africa/Lome", alternativeName: "Greenwich Mean Time", group: ["Africa/Lome"], continentCode: "AF", continentName: "Africa", countryName: "Togo", countryCode: "TG", mainCities: ["Lom\xE9", "Sokod\xE9", "Kara", "Atakpam\xE9"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Lom\xE9, Sokod\xE9, Kara, Atakpam\xE9" },
      { name: "Europe/London", alternativeName: "Greenwich Mean Time", group: ["Europe/London", "GB", "GB-Eire", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey", "Europe/Belfast"], continentCode: "EU", continentName: "Europe", countryName: "United Kingdom", countryCode: "GB", mainCities: ["London", "Birmingham", "Liverpool", "Sheffield"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - London, Birmingham, Liverpool, Sheffield" },
      { name: "Africa/Monrovia", alternativeName: "Greenwich Mean Time", group: ["Africa/Monrovia"], continentCode: "AF", continentName: "Africa", countryName: "Liberia", countryCode: "LR", mainCities: ["Monrovia", "Gbarnga", "Kakata", "Bensonville"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Monrovia, Gbarnga, Kakata, Bensonville" },
      { name: "Africa/Nouakchott", alternativeName: "Greenwich Mean Time", group: ["Africa/Nouakchott"], continentCode: "AF", continentName: "Africa", countryName: "Mauritania", countryCode: "MR", mainCities: ["Nouakchott", "Nouadhibou", "N\xE9ma", "Ka\xE9di"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Nouakchott, Nouadhibou, N\xE9ma, Ka\xE9di" },
      { name: "Africa/Ouagadougou", alternativeName: "Greenwich Mean Time", group: ["Africa/Ouagadougou"], continentCode: "AF", continentName: "Africa", countryName: "Burkina Faso", countryCode: "BF", mainCities: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya" },
      { name: "Atlantic/Reykjavik", alternativeName: "Greenwich Mean Time", group: ["Atlantic/Reykjavik", "Iceland"], continentCode: "EU", continentName: "Europe", countryName: "Iceland", countryCode: "IS", mainCities: ["Reykjav\xEDk", "K\xF3pavogur", "Hafnarfj\xF6r\xF0ur", "Reykjanesb\xE6r"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Reykjav\xEDk, K\xF3pavogur, Hafnarfj\xF6r\xF0ur, Reykjanesb\xE6r" },
      { name: "Europe/Jersey", alternativeName: "Greenwich Mean Time", group: ["Europe/Jersey"], continentCode: "EU", continentName: "Europe", countryName: "Jersey", countryCode: "JE", mainCities: ["Saint Helier"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Saint Helier" },
      { name: "Europe/Guernsey", alternativeName: "Greenwich Mean Time", group: ["Europe/Guernsey"], continentCode: "EU", continentName: "Europe", countryName: "Guernsey", countryCode: "GG", mainCities: ["Saint Peter Port"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Saint Peter Port" },
      { name: "Africa/Banjul", alternativeName: "Greenwich Mean Time", group: ["Africa/Banjul"], continentCode: "AF", continentName: "Africa", countryName: "Gambia", countryCode: "GM", mainCities: ["Serekunda", "Brikama", "Bakau", "Banjul"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Serekunda, Brikama, Bakau, Banjul" },
      { name: "Africa/Sao_Tome", alternativeName: "Greenwich Mean Time", group: ["Africa/Sao_Tome"], continentCode: "AF", continentName: "Africa", countryName: "Sao Tome and Principe", countryCode: "ST", mainCities: ["S\xE3o Tom\xE9"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - S\xE3o Tom\xE9" },
      { name: "Antarctica/Troll", alternativeName: "Greenwich Mean Time", group: ["Antarctica/Troll"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Troll"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Troll" },
      { name: "Africa/Casablanca", alternativeName: "Western European Time", group: ["Africa/Casablanca"], continentCode: "AF", continentName: "Africa", countryName: "Morocco", countryCode: "MA", mainCities: ["Casablanca", "Rabat", "F\xE8s", "Sale"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Casablanca, Rabat, F\xE8s, Sale" },
      { name: "Africa/El_Aaiun", alternativeName: "Western European Time", group: ["Africa/El_Aaiun"], continentCode: "AF", continentName: "Africa", countryName: "Western Sahara", countryCode: "EH", mainCities: ["Laayoune", "Dakhla"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Laayoune, Dakhla" },
      { name: "Atlantic/Canary", alternativeName: "Western European Time", group: ["Atlantic/Canary"], continentCode: "EU", continentName: "Europe", countryName: "Spain", countryCode: "ES", mainCities: ["Las Palmas de Gran Canaria", "Santa Cruz de Tenerife", "La Laguna", "Telde"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde" },
      { name: "Europe/Lisbon", alternativeName: "Western European Time", group: ["Atlantic/Madeira", "Europe/Lisbon", "Portugal"], continentCode: "EU", continentName: "Europe", countryName: "Portugal", countryCode: "PT", mainCities: ["Lisbon", "Porto", "Amadora", "Braga"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Lisbon, Porto, Amadora, Braga" },
      { name: "Atlantic/Faroe", alternativeName: "Western European Time", group: ["Atlantic/Faroe", "Atlantic/Faeroe"], continentCode: "EU", continentName: "Europe", countryName: "Faroe Islands", countryCode: "FO", mainCities: ["T\xF3rshavn"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - T\xF3rshavn" },
      { name: "Africa/Windhoek", alternativeName: "Central Africa Time", group: ["Africa/Windhoek"], continentCode: "AF", continentName: "Africa", countryName: "Namibia", countryCode: "NA", mainCities: ["Windhoek", "Rundu", "Walvis Bay", "Oshakati"], rawOffsetInMinutes: 60, abbreviation: "CAT", rawFormat: "+01:00 Central Africa Time - Windhoek, Rundu, Walvis Bay, Oshakati" },
      { name: "Africa/Algiers", alternativeName: "Central European Time", group: ["Africa/Algiers"], continentCode: "AF", continentName: "Africa", countryName: "Algeria", countryCode: "DZ", mainCities: ["Algiers", "Boumerdas", "Oran", "T\xE9bessa"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Algiers, Boumerdas, Oran, T\xE9bessa" },
      { name: "Europe/Amsterdam", alternativeName: "Central European Time", group: ["Europe/Amsterdam"], continentCode: "EU", continentName: "Europe", countryName: "Netherlands", countryCode: "NL", mainCities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Amsterdam, Rotterdam, The Hague, Utrecht" },
      { name: "Europe/Andorra", alternativeName: "Central European Time", group: ["Europe/Andorra"], continentCode: "EU", continentName: "Europe", countryName: "Andorra", countryCode: "AD", mainCities: ["Andorra la Vella", "les Escaldes"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Andorra la Vella, les Escaldes" },
      { name: "Europe/Belgrade", alternativeName: "Central European Time", group: ["Europe/Belgrade", "Europe/Ljubljana", "Europe/Podgorica", "Europe/Sarajevo", "Europe/Skopje", "Europe/Zagreb"], continentCode: "EU", continentName: "Europe", countryName: "Serbia", countryCode: "RS", mainCities: ["Belgrade", "Ni\u0161", "Novi Sad", "Zemun"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Belgrade, Ni\u0161, Novi Sad, Zemun" },
      { name: "Europe/Berlin", alternativeName: "Central European Time", group: ["Europe/Berlin", "Europe/Busingen", "Arctic/Longyearbyen", "Europe/Copenhagen", "Europe/Oslo", "Europe/Stockholm", "Atlantic/Jan_Mayen"], continentCode: "EU", continentName: "Europe", countryName: "Germany", countryCode: "DE", mainCities: ["Berlin", "Hamburg", "Munich", "K\xF6ln"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Berlin, Hamburg, Munich, K\xF6ln" },
      { name: "Europe/Malta", alternativeName: "Central European Time", group: ["Europe/Malta"], continentCode: "EU", continentName: "Europe", countryName: "Malta", countryCode: "MT", mainCities: ["Birkirkara", "Qormi", "Mosta", "\u017Babbar"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Birkirkara, Qormi, Mosta, \u017Babbar" },
      { name: "Europe/Bratislava", alternativeName: "Central European Time", group: ["Europe/Bratislava"], continentCode: "EU", continentName: "Europe", countryName: "Slovakia", countryCode: "SK", mainCities: ["Bratislava", "Ko\u0161ice", "Nitra", "Pre\u0161ov"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Bratislava, Ko\u0161ice, Nitra, Pre\u0161ov" },
      { name: "Europe/Brussels", alternativeName: "Central European Time", group: ["Europe/Brussels", "Europe/Amsterdam", "Europe/Luxembourg"], continentCode: "EU", continentName: "Europe", countryName: "Belgium", countryCode: "BE", mainCities: ["Brussels", "Antwerpen", "Gent", "Charleroi"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Brussels, Antwerpen, Gent, Charleroi" },
      { name: "Europe/Budapest", alternativeName: "Central European Time", group: ["Europe/Budapest"], continentCode: "EU", continentName: "Europe", countryName: "Hungary", countryCode: "HU", mainCities: ["Budapest", "Debrecen", "Szeged", "P\xE9cs"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Budapest, Debrecen, Szeged, P\xE9cs" },
      { name: "Europe/Copenhagen", alternativeName: "Central European Time", group: ["Europe/Copenhagen"], continentCode: "EU", continentName: "Europe", countryName: "Denmark", countryCode: "DK", mainCities: ["Copenhagen", "\xC5rhus", "Odense", "Aalborg"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Copenhagen, \xC5rhus, Odense, Aalborg" },
      { name: "Europe/Gibraltar", alternativeName: "Central European Time", group: ["Europe/Gibraltar"], continentCode: "EU", continentName: "Europe", countryName: "Gibraltar", countryCode: "GI", mainCities: ["Gibraltar"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Gibraltar" },
      { name: "Europe/Ljubljana", alternativeName: "Central European Time", group: ["Europe/Ljubljana"], continentCode: "EU", continentName: "Europe", countryName: "Slovenia", countryCode: "SI", mainCities: ["Ljubljana", "Maribor", "Kranj", "Celje"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Ljubljana, Maribor, Kranj, Celje" },
      { name: "Arctic/Longyearbyen", alternativeName: "Central European Time", group: ["Arctic/Longyearbyen"], continentCode: "EU", continentName: "Europe", countryName: "Svalbard and Jan Mayen", countryCode: "SJ", mainCities: ["Longyearbyen"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Longyearbyen" },
      { name: "Europe/Luxembourg", alternativeName: "Central European Time", group: ["Europe/Luxembourg"], continentCode: "EU", continentName: "Europe", countryName: "Luxembourg", countryCode: "LU", mainCities: ["Luxembourg", "Esch-sur-Alzette", "Dudelange"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Luxembourg, Esch-sur-Alzette, Dudelange" },
      { name: "Europe/Madrid", alternativeName: "Central European Time", group: ["Africa/Ceuta", "Europe/Madrid"], continentCode: "EU", continentName: "Europe", countryName: "Spain", countryCode: "ES", mainCities: ["Madrid", "Barcelona", "Valencia", "Sevilla"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Madrid, Barcelona, Valencia, Sevilla" },
      { name: "Europe/Monaco", alternativeName: "Central European Time", group: ["Europe/Monaco"], continentCode: "EU", continentName: "Europe", countryName: "Monaco", countryCode: "MC", mainCities: ["Monaco", "Monte-Carlo"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Monaco, Monte-Carlo" },
      { name: "Europe/Oslo", alternativeName: "Central European Time", group: ["Europe/Oslo", "Atlantic/Jan_Mayen"], continentCode: "EU", continentName: "Europe", countryName: "Norway", countryCode: "NO", mainCities: ["Oslo", "Bergen", "Trondheim", "Stavanger"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Oslo, Bergen, Trondheim, Stavanger" },
      { name: "Europe/Paris", alternativeName: "Central European Time", group: ["Europe/Paris", "Europe/Monaco"], continentCode: "EU", continentName: "Europe", countryName: "France", countryCode: "FR", mainCities: ["Paris", "Marseille", "Toulouse", "Lyon"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Paris, Marseille, Toulouse, Lyon" },
      { name: "Europe/Podgorica", alternativeName: "Central European Time", group: ["Europe/Podgorica"], continentCode: "EU", continentName: "Europe", countryName: "Montenegro", countryCode: "ME", mainCities: ["Podgorica", "Nik\u0161i\u0107", "Herceg Novi", "Pljevlja"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Podgorica, Nik\u0161i\u0107, Herceg Novi, Pljevlja" },
      { name: "Europe/Prague", alternativeName: "Central European Time", group: ["Europe/Prague", "Europe/Bratislava"], continentCode: "EU", continentName: "Europe", countryName: "Czechia", countryCode: "CZ", mainCities: ["Prague", "Brno", "Ostrava", "Pilsen"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Prague, Brno, Ostrava, Pilsen" },
      { name: "Europe/Rome", alternativeName: "Central European Time", group: ["Europe/Rome", "Europe/San_Marino", "Europe/Vatican"], continentCode: "EU", continentName: "Europe", countryName: "Italy", countryCode: "IT", mainCities: ["Rome", "Milan", "Naples", "Turin"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Rome, Milan, Naples, Turin" },
      { name: "Europe/San_Marino", alternativeName: "Central European Time", group: ["Europe/San_Marino"], continentCode: "EU", continentName: "Europe", countryName: "San Marino", countryCode: "SM", mainCities: ["San Marino"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - San Marino" },
      { name: "Europe/Sarajevo", alternativeName: "Central European Time", group: ["Europe/Sarajevo"], continentCode: "EU", continentName: "Europe", countryName: "Bosnia and Herzegovina", countryCode: "BA", mainCities: ["Sarajevo", "Banja Luka", "Zenica", "Tuzla"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Sarajevo, Banja Luka, Zenica, Tuzla" },
      { name: "Europe/Skopje", alternativeName: "Central European Time", group: ["Europe/Skopje"], continentCode: "EU", continentName: "Europe", countryName: "North Macedonia", countryCode: "MK", mainCities: ["Skopje", "Bitola", "Kumanovo", "Prilep"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Skopje, Bitola, Kumanovo, Prilep" },
      { name: "Europe/Stockholm", alternativeName: "Central European Time", group: ["Europe/Stockholm"], continentCode: "EU", continentName: "Europe", countryName: "Sweden", countryCode: "SE", mainCities: ["Stockholm", "G\xF6teborg", "Malm\xF6", "Uppsala"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Stockholm, G\xF6teborg, Malm\xF6, Uppsala" },
      { name: "Europe/Tirane", alternativeName: "Central European Time", group: ["Europe/Tirane"], continentCode: "EU", continentName: "Europe", countryName: "Albania", countryCode: "AL", mainCities: ["Tirana", "Durr\xEBs", "Elbasan", "Vlor\xEB"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Tirana, Durr\xEBs, Elbasan, Vlor\xEB" },
      { name: "Africa/Tunis", alternativeName: "Central European Time", group: ["Africa/Tunis"], continentCode: "AF", continentName: "Africa", countryName: "Tunisia", countryCode: "TN", mainCities: ["Tunis", "Sfax", "Sousse", "Kairouan"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Tunis, Sfax, Sousse, Kairouan" },
      { name: "Europe/Vaduz", alternativeName: "Central European Time", group: ["Europe/Vaduz"], continentCode: "EU", continentName: "Europe", countryName: "Liechtenstein", countryCode: "LI", mainCities: ["Vaduz"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vaduz" },
      { name: "Europe/Vatican", alternativeName: "Central European Time", group: ["Europe/Vatican"], continentCode: "EU", continentName: "Europe", countryName: "Vatican", countryCode: "VA", mainCities: ["Vatican City"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vatican City" },
      { name: "Europe/Vienna", alternativeName: "Central European Time", group: ["Europe/Vienna"], continentCode: "EU", continentName: "Europe", countryName: "Austria", countryCode: "AT", mainCities: ["Vienna", "Graz", "Linz", "Favoriten"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vienna, Graz, Linz, Favoriten" },
      { name: "Europe/Warsaw", alternativeName: "Central European Time", group: ["Europe/Warsaw", "Poland"], continentCode: "EU", continentName: "Europe", countryName: "Poland", countryCode: "PL", mainCities: ["Warsaw", "\u0141\xF3d\u017A", "Krak\xF3w", "Wroc\u0142aw"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Warsaw, \u0141\xF3d\u017A, Krak\xF3w, Wroc\u0142aw" },
      { name: "Europe/Zagreb", alternativeName: "Central European Time", group: ["Europe/Zagreb"], continentCode: "EU", continentName: "Europe", countryName: "Croatia", countryCode: "HR", mainCities: ["Zagreb", "Split", "Rijeka", "Osijek"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Zagreb, Split, Rijeka, Osijek" },
      { name: "Europe/Zurich", alternativeName: "Central European Time", group: ["Europe/Zurich", "Europe/Busingen", "Europe/Vaduz"], continentCode: "EU", continentName: "Europe", countryName: "Switzerland", countryCode: "CH", mainCities: ["Z\xFCrich", "Gen\xE8ve", "Basel", "Lausanne"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Z\xFCrich, Gen\xE8ve, Basel, Lausanne" },
      { name: "Africa/Bangui", alternativeName: "West Africa Time", group: ["Africa/Bangui"], continentCode: "AF", continentName: "Africa", countryName: "Central African Republic", countryCode: "CF", mainCities: ["Bangui", "Bimbo", "Mba\xEFki", "Berb\xE9rati"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Bangui, Bimbo, Mba\xEFki, Berb\xE9rati" },
      { name: "Africa/Malabo", alternativeName: "West Africa Time", group: ["Africa/Malabo"], continentCode: "AF", continentName: "Africa", countryName: "Equatorial Guinea", countryCode: "GQ", mainCities: ["Bata", "Malabo", "Ebebiyin"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Bata, Malabo, Ebebiyin" },
      { name: "Africa/Brazzaville", alternativeName: "West Africa Time", group: ["Africa/Brazzaville"], continentCode: "AF", continentName: "Africa", countryName: "Republic of the Congo", countryCode: "CG", mainCities: ["Brazzaville", "Pointe-Noire", "Dolisie", "Kayes"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Brazzaville, Pointe-Noire, Dolisie, Kayes" },
      { name: "Africa/Porto-Novo", alternativeName: "West Africa Time", group: ["Africa/Porto-Novo"], continentCode: "AF", continentName: "Africa", countryName: "Benin", countryCode: "BJ", mainCities: ["Cotonou", "Abomey-Calavi", "Djougou", "Porto-Novo"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Cotonou, Abomey-Calavi, Djougou, Porto-Novo" },
      { name: "Africa/Douala", alternativeName: "West Africa Time", group: ["Africa/Douala"], continentCode: "AF", continentName: "Africa", countryName: "Cameroon", countryCode: "CM", mainCities: ["Douala", "Yaound\xE9", "Garoua", "Kouss\xE9ri"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Douala, Yaound\xE9, Garoua, Kouss\xE9ri" },
      { name: "Africa/Kinshasa", alternativeName: "West Africa Time", group: ["Africa/Kinshasa"], continentCode: "AF", continentName: "Africa", countryName: "Democratic Republic of the Congo", countryCode: "CD", mainCities: ["Kinshasa", "Masina", "Kikwit", "Mbandaka"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Kinshasa, Masina, Kikwit, Mbandaka" },
      { name: "Africa/Lagos", alternativeName: "West Africa Time", group: ["Africa/Lagos", "Africa/Bangui", "Africa/Brazzaville", "Africa/Douala", "Africa/Kinshasa", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Niamey", "Africa/Porto-Novo"], continentCode: "AF", continentName: "Africa", countryName: "Nigeria", countryCode: "NG", mainCities: ["Lagos", "Kano", "Ibadan", "Port Harcourt"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Lagos, Kano, Ibadan, Port Harcourt" },
      { name: "Africa/Libreville", alternativeName: "West Africa Time", group: ["Africa/Libreville"], continentCode: "AF", continentName: "Africa", countryName: "Gabon", countryCode: "GA", mainCities: ["Libreville", "Port-Gentil", "Franceville", "Oyem"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Libreville, Port-Gentil, Franceville, Oyem" },
      { name: "Africa/Luanda", alternativeName: "West Africa Time", group: ["Africa/Luanda"], continentCode: "AF", continentName: "Africa", countryName: "Angola", countryCode: "AO", mainCities: ["Luanda", "N\u2019dalatando", "Huambo", "Lobito"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Luanda, N\u2019dalatando, Huambo, Lobito" },
      { name: "Africa/Ndjamena", alternativeName: "West Africa Time", group: ["Africa/Ndjamena"], continentCode: "AF", continentName: "Africa", countryName: "Chad", countryCode: "TD", mainCities: ["N'Djamena", "Moundou", "Sarh", "Ab\xE9ch\xE9"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - N'Djamena, Moundou, Sarh, Ab\xE9ch\xE9" },
      { name: "Africa/Niamey", alternativeName: "West Africa Time", group: ["Africa/Niamey"], continentCode: "AF", continentName: "Africa", countryName: "Niger", countryCode: "NE", mainCities: ["Niamey", "Zinder", "Maradi", "Agadez"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Niamey, Zinder, Maradi, Agadez" },
      { name: "Africa/Bujumbura", alternativeName: "Central Africa Time", group: ["Africa/Bujumbura"], continentCode: "AF", continentName: "Africa", countryName: "Burundi", countryCode: "BI", mainCities: ["Bujumbura", "Muyinga", "Gitega", "Ruyigi"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Bujumbura, Muyinga, Gitega, Ruyigi" },
      { name: "Africa/Gaborone", alternativeName: "Central Africa Time", group: ["Africa/Gaborone"], continentCode: "AF", continentName: "Africa", countryName: "Botswana", countryCode: "BW", mainCities: ["Gaborone", "Francistown", "Molepolole", "Selebi-Phikwe"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Gaborone, Francistown, Molepolole, Selebi-Phikwe" },
      { name: "Africa/Harare", alternativeName: "Central Africa Time", group: ["Africa/Harare"], continentCode: "AF", continentName: "Africa", countryName: "Zimbabwe", countryCode: "ZW", mainCities: ["Harare", "Bulawayo", "Chitungwiza", "Mutare"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Harare, Bulawayo, Chitungwiza, Mutare" },
      { name: "Africa/Juba", alternativeName: "Central Africa Time", group: ["Africa/Juba"], continentCode: "AF", continentName: "Africa", countryName: "South Sudan", countryCode: "SS", mainCities: ["Juba", "Winejok", "Yei", "Malakal"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Juba, Winejok, Yei, Malakal" },
      { name: "Africa/Khartoum", alternativeName: "Central Africa Time", group: ["Africa/Khartoum"], continentCode: "AF", continentName: "Africa", countryName: "Sudan", countryCode: "SD", mainCities: ["Khartoum", "Omdurman", "Nyala", "Port Sudan"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Khartoum, Omdurman, Nyala, Port Sudan" },
      { name: "Africa/Kigali", alternativeName: "Central Africa Time", group: ["Africa/Kigali"], continentCode: "AF", continentName: "Africa", countryName: "Rwanda", countryCode: "RW", mainCities: ["Kigali", "Gisenyi", "Butare", "Gitarama"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Kigali, Gisenyi, Butare, Gitarama" },
      { name: "Africa/Blantyre", alternativeName: "Central Africa Time", group: ["Africa/Blantyre"], continentCode: "AF", continentName: "Africa", countryName: "Malawi", countryCode: "MW", mainCities: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lilongwe, Blantyre, Mzuzu, Zomba" },
      { name: "Africa/Lubumbashi", alternativeName: "Central Africa Time", group: ["Africa/Lubumbashi"], continentCode: "AF", continentName: "Africa", countryName: "Democratic Republic of the Congo", countryCode: "CD", mainCities: ["Lubumbashi", "Mbuji-Mayi", "Kisangani", "Kananga"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lubumbashi, Mbuji-Mayi, Kisangani, Kananga" },
      { name: "Africa/Lusaka", alternativeName: "Central Africa Time", group: ["Africa/Lusaka"], continentCode: "AF", continentName: "Africa", countryName: "Zambia", countryCode: "ZM", mainCities: ["Lusaka", "Kitwe", "Ndola", "Kabwe"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lusaka, Kitwe, Ndola, Kabwe" },
      { name: "Africa/Maputo", alternativeName: "Central Africa Time", group: ["Africa/Maputo", "Africa/Blantyre", "Africa/Bujumbura", "Africa/Gaborone", "Africa/Harare", "Africa/Kigali", "Africa/Lubumbashi", "Africa/Lusaka"], continentCode: "AF", continentName: "Africa", countryName: "Mozambique", countryCode: "MZ", mainCities: ["Maputo", "Matola", "Nampula", "Beira"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Maputo, Matola, Nampula, Beira" },
      { name: "Europe/Athens", alternativeName: "Eastern European Time", group: ["Europe/Athens"], continentCode: "EU", continentName: "Europe", countryName: "Greece", countryCode: "GR", mainCities: ["Athens", "Thessalon\xEDki", "P\xE1tra", "Piraeus"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Athens, Thessalon\xEDki, P\xE1tra, Piraeus" },
      { name: "Asia/Beirut", alternativeName: "Eastern European Time", group: ["Asia/Beirut"], continentCode: "AS", continentName: "Asia", countryName: "Lebanon", countryCode: "LB", mainCities: ["Beirut", "Ra\u2019s Bayr\u016Bt", "Tripoli", "Sidon"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Beirut, Ra\u2019s Bayr\u016Bt, Tripoli, Sidon" },
      { name: "Europe/Bucharest", alternativeName: "Eastern European Time", group: ["Europe/Bucharest"], continentCode: "EU", continentName: "Europe", countryName: "Romania", countryCode: "RO", mainCities: ["Bucharest", "Sector 3", "Ia\u015Fi", "Sector 6"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Bucharest, Sector 3, Ia\u015Fi, Sector 6" },
      { name: "Africa/Cairo", alternativeName: "Eastern European Time", group: ["Africa/Cairo", "Egypt"], continentCode: "AF", continentName: "Africa", countryName: "Egypt", countryCode: "EG", mainCities: ["Cairo", "Alexandria", "Giza", "Shubr\u0101 al Khaymah"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Cairo, Alexandria, Giza, Shubr\u0101 al Khaymah" },
      { name: "Europe/Chisinau", alternativeName: "Eastern European Time", group: ["Europe/Chisinau", "Europe/Tiraspol"], continentCode: "EU", continentName: "Europe", countryName: "Moldova", countryCode: "MD", mainCities: ["Chisinau", "Tiraspol", "B\u0103l\u0163i", "Bender"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Chisinau, Tiraspol, B\u0103l\u0163i, Bender" },
      { name: "Asia/Hebron", alternativeName: "Eastern European Time", group: ["Asia/Gaza", "Asia/Hebron"], continentCode: "AS", continentName: "Asia", countryName: "Palestinian Territory", countryCode: "PS", mainCities: ["East Jerusalem", "Gaza", "Kh\u0101n Y\u016Bnis", "Jab\u0101ly\u0101"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - East Jerusalem, Gaza, Kh\u0101n Y\u016Bnis, Jab\u0101ly\u0101" },
      { name: "Europe/Helsinki", alternativeName: "Eastern European Time", group: ["Europe/Helsinki", "Europe/Mariehamn"], continentCode: "EU", continentName: "Europe", countryName: "Finland", countryCode: "FI", mainCities: ["Helsinki", "Espoo", "Tampere", "Oulu"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Helsinki, Espoo, Tampere, Oulu" },
      { name: "Europe/Kaliningrad", alternativeName: "Eastern European Time", group: ["Europe/Kaliningrad"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Kaliningrad", "Chernyakhovsk", "Sovetsk", "Baltiysk"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk" },
      { name: "Europe/Kyiv", alternativeName: "Eastern European Time", group: ["Europe/Kyiv", "Europe/Uzhgorod", "Europe/Zaporozhye", "Europe/Kiev"], continentCode: "EU", continentName: "Europe", countryName: "Ukraine", countryCode: "UA", mainCities: ["Kyiv", "Kharkiv", "Donetsk", "Odesa"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Kyiv, Kharkiv, Donetsk, Odesa" },
      { name: "Europe/Mariehamn", alternativeName: "Eastern European Time", group: ["Europe/Mariehamn"], continentCode: "EU", continentName: "Europe", countryName: "Aland Islands", countryCode: "AX", mainCities: ["Mariehamn"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Mariehamn" },
      { name: "Asia/Nicosia", alternativeName: "Eastern European Time", group: ["Asia/Famagusta", "Asia/Nicosia", "Europe/Nicosia"], continentCode: "EU", continentName: "Europe", countryName: "Cyprus", countryCode: "CY", mainCities: ["Nicosia", "Limassol", "Larnaca", "Str\xF3volos"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Nicosia, Limassol, Larnaca, Str\xF3volos" },
      { name: "Europe/Riga", alternativeName: "Eastern European Time", group: ["Europe/Riga"], continentCode: "EU", continentName: "Europe", countryName: "Latvia", countryCode: "LV", mainCities: ["Riga", "Daugavpils", "Liep\u0101ja", "Jelgava"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Riga, Daugavpils, Liep\u0101ja, Jelgava" },
      { name: "Europe/Sofia", alternativeName: "Eastern European Time", group: ["Europe/Sofia"], continentCode: "EU", continentName: "Europe", countryName: "Bulgaria", countryCode: "BG", mainCities: ["Sofia", "Plovdiv", "Varna", "Burgas"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Sofia, Plovdiv, Varna, Burgas" },
      { name: "Europe/Tallinn", alternativeName: "Eastern European Time", group: ["Europe/Tallinn"], continentCode: "EU", continentName: "Europe", countryName: "Estonia", countryCode: "EE", mainCities: ["Tallinn", "Tartu", "Narva", "Kohtla-J\xE4rve"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Tallinn, Tartu, Narva, Kohtla-J\xE4rve" },
      { name: "Africa/Tripoli", alternativeName: "Eastern European Time", group: ["Africa/Tripoli", "Libya"], continentCode: "AF", continentName: "Africa", countryName: "Libya", countryCode: "LY", mainCities: ["Tripoli", "Benghazi", "Ajdabiya", "Mi\u015Fr\u0101tah"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Tripoli, Benghazi, Ajdabiya, Mi\u015Fr\u0101tah" },
      { name: "Europe/Vilnius", alternativeName: "Eastern European Time", group: ["Europe/Vilnius"], continentCode: "EU", continentName: "Europe", countryName: "Lithuania", countryCode: "LT", mainCities: ["Vilnius", "Kaunas", "Klaip\u0117da", "\u0160iauliai"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Vilnius, Kaunas, Klaip\u0117da, \u0160iauliai" },
      { name: "Asia/Jerusalem", alternativeName: "Israel Time", group: ["Asia/Jerusalem", "Israel", "Asia/Tel_Aviv"], continentCode: "AS", continentName: "Asia", countryName: "Israel", countryCode: "IL", mainCities: ["Jerusalem", "Tel Aviv", "West Jerusalem", "Haifa"], rawOffsetInMinutes: 120, abbreviation: "IST", rawFormat: "+02:00 Israel Time - Jerusalem, Tel Aviv, West Jerusalem, Haifa" },
      { name: "Africa/Johannesburg", alternativeName: "South Africa Time", group: ["Africa/Johannesburg", "Africa/Maseru", "Africa/Mbabane"], continentCode: "AF", continentName: "Africa", countryName: "South Africa", countryCode: "ZA", mainCities: ["Johannesburg", "Cape Town", "Durban", "Soweto"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Johannesburg, Cape Town, Durban, Soweto" },
      { name: "Africa/Mbabane", alternativeName: "South Africa Time", group: ["Africa/Mbabane"], continentCode: "AF", continentName: "Africa", countryName: "Eswatini", countryCode: "SZ", mainCities: ["Manzini", "Mbabane", "Lobamba"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Manzini, Mbabane, Lobamba" },
      { name: "Africa/Maseru", alternativeName: "South Africa Time", group: ["Africa/Maseru"], continentCode: "AF", continentName: "Africa", countryName: "Lesotho", countryCode: "LS", mainCities: ["Maseru", "Mafeteng", "Leribe", "Maputsoe"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Maseru, Mafeteng, Leribe, Maputsoe" },
      { name: "Asia/Kuwait", alternativeName: "Arabian Time", group: ["Asia/Kuwait"], continentCode: "AS", continentName: "Asia", countryName: "Kuwait", countryCode: "KW", mainCities: ["Al A\u1E29mad\u012B", "\u1E28awall\u012B", "As S\u0101lim\u012Byah", "\u015Eab\u0101\u1E29 as S\u0101lim"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Al A\u1E29mad\u012B, \u1E28awall\u012B, As S\u0101lim\u012Byah, \u015Eab\u0101\u1E29 as S\u0101lim" },
      { name: "Asia/Baghdad", alternativeName: "Arabian Time", group: ["Asia/Baghdad"], continentCode: "AS", continentName: "Asia", countryName: "Iraq", countryCode: "IQ", mainCities: ["Baghdad", "Basrah", "Al Maw\u015Fil al Jad\u012Bdah", "Al Ba\u015Frah al Qad\u012Bmah"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Baghdad, Basrah, Al Maw\u015Fil al Jad\u012Bdah, Al Ba\u015Frah al Qad\u012Bmah" },
      { name: "Asia/Qatar", alternativeName: "Arabian Time", group: ["Asia/Qatar", "Asia/Bahrain"], continentCode: "AS", continentName: "Asia", countryName: "Qatar", countryCode: "QA", mainCities: ["Doha", "Ar Rayy\u0101n", "Umm \u015Eal\u0101l Mu\u1E29ammad", "Al Wakrah"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Doha, Ar Rayy\u0101n, Umm \u015Eal\u0101l Mu\u1E29ammad, Al Wakrah" },
      { name: "Asia/Riyadh", alternativeName: "Arabian Time", group: ["Asia/Riyadh", "Antarctica/Syowa", "Asia/Aden", "Asia/Kuwait"], continentCode: "AS", continentName: "Asia", countryName: "Saudi Arabia", countryCode: "SA", mainCities: ["Jeddah", "Riyadh", "Mecca", "Medina"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Jeddah, Riyadh, Mecca, Medina" },
      { name: "Asia/Bahrain", alternativeName: "Arabian Time", group: ["Asia/Bahrain"], continentCode: "AS", continentName: "Asia", countryName: "Bahrain", countryCode: "BH", mainCities: ["Manama", "Al Muharraq", "Ar Rif\u0101\u2018", "D\u0101r Kulayb"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Manama, Al Muharraq, Ar Rif\u0101\u2018, D\u0101r Kulayb" },
      { name: "Asia/Aden", alternativeName: "Arabian Time", group: ["Asia/Aden"], continentCode: "AS", continentName: "Asia", countryName: "Yemen", countryCode: "YE", mainCities: ["Sanaa", "Al \u1E28udaydah", "Taiz", "Aden"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Sanaa, Al \u1E28udaydah, Taiz, Aden" },
      { name: "Africa/Addis_Ababa", alternativeName: "East Africa Time", group: ["Africa/Addis_Ababa"], continentCode: "AF", continentName: "Africa", countryName: "Ethiopia", countryCode: "ET", mainCities: ["Addis Ababa", "Dire Dawa", "Mek'ele", "Nazr\u0113t"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Addis Ababa, Dire Dawa, Mek'ele, Nazr\u0113t" },
      { name: "Indian/Antananarivo", alternativeName: "East Africa Time", group: ["Indian/Antananarivo"], continentCode: "AF", continentName: "Africa", countryName: "Madagascar", countryCode: "MG", mainCities: ["Antananarivo", "Toamasina", "Antsirabe", "Mahajanga"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Antananarivo, Toamasina, Antsirabe, Mahajanga" },
      { name: "Africa/Asmara", alternativeName: "East Africa Time", group: ["Africa/Asmara"], continentCode: "AF", continentName: "Africa", countryName: "Eritrea", countryCode: "ER", mainCities: ["Asmara", "Keren", "Massawa", "Assab"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Asmara, Keren, Massawa, Assab" },
      { name: "Africa/Dar_es_Salaam", alternativeName: "East Africa Time", group: ["Africa/Dar_es_Salaam"], continentCode: "AF", continentName: "Africa", countryName: "Tanzania", countryCode: "TZ", mainCities: ["Dar es Salaam", "Mwanza", "Zanzibar", "Arusha"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Dar es Salaam, Mwanza, Zanzibar, Arusha" },
      { name: "Africa/Djibouti", alternativeName: "East Africa Time", group: ["Africa/Djibouti"], continentCode: "AF", continentName: "Africa", countryName: "Djibouti", countryCode: "DJ", mainCities: ["Djibouti", "'Ali Sabieh", "Tadjourah", "Obock"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Djibouti, 'Ali Sabieh, Tadjourah, Obock" },
      { name: "Africa/Kampala", alternativeName: "East Africa Time", group: ["Africa/Kampala"], continentCode: "AF", continentName: "Africa", countryName: "Uganda", countryCode: "UG", mainCities: ["Kampala", "Gulu", "Lira", "Mbarara"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Kampala, Gulu, Lira, Mbarara" },
      { name: "Indian/Mayotte", alternativeName: "East Africa Time", group: ["Indian/Mayotte"], continentCode: "AF", continentName: "Africa", countryName: "Mayotte", countryCode: "YT", mainCities: ["Mamoudzou", "Koungou", "Dzaoudzi"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Mamoudzou, Koungou, Dzaoudzi" },
      { name: "Africa/Mogadishu", alternativeName: "East Africa Time", group: ["Africa/Mogadishu"], continentCode: "AF", continentName: "Africa", countryName: "Somalia", countryCode: "SO", mainCities: ["Mogadishu", "Hargeysa", "Berbera", "Kismayo"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Mogadishu, Hargeysa, Berbera, Kismayo" },
      { name: "Indian/Comoro", alternativeName: "East Africa Time", group: ["Indian/Comoro"], continentCode: "AF", continentName: "Africa", countryName: "Comoros", countryCode: "KM", mainCities: ["Moroni", "Moutsamoudou"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Moroni, Moutsamoudou" },
      { name: "Africa/Nairobi", alternativeName: "East Africa Time", group: ["Africa/Nairobi", "Africa/Addis_Ababa", "Africa/Asmara", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Kampala", "Africa/Mogadishu", "Indian/Antananarivo", "Indian/Comoro", "Indian/Mayotte", "Africa/Asmera"], continentCode: "AF", continentName: "Africa", countryName: "Kenya", countryCode: "KE", mainCities: ["Nairobi", "Kakamega", "Mombasa", "Ruiru"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Nairobi, Kakamega, Mombasa, Ruiru" },
      { name: "Asia/Damascus", alternativeName: "Eastern European Time", group: ["Asia/Damascus"], continentCode: "AS", continentName: "Asia", countryName: "Syria", countryCode: "SY", mainCities: ["Aleppo", "Damascus", "Homs", "\u1E28am\u0101h"], rawOffsetInMinutes: 180, abbreviation: "EET", rawFormat: "+03:00 Eastern European Time - Aleppo, Damascus, Homs, \u1E28am\u0101h" },
      { name: "Asia/Amman", alternativeName: "Eastern European Time", group: ["Asia/Amman"], continentCode: "AS", continentName: "Asia", countryName: "Jordan", countryCode: "JO", mainCities: ["Amman", "Zarqa", "Irbid", "Russeifa"], rawOffsetInMinutes: 180, abbreviation: "EET", rawFormat: "+03:00 Eastern European Time - Amman, Zarqa, Irbid, Russeifa" },
      { name: "Europe/Minsk", alternativeName: "Moscow Time", group: ["Europe/Minsk"], continentCode: "EU", continentName: "Europe", countryName: "Belarus", countryCode: "BY", mainCities: ["Minsk", "Homyel'", "Mahilyow", "Vitebsk"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Minsk, Homyel', Mahilyow, Vitebsk" },
      { name: "Europe/Moscow", alternativeName: "Moscow Time", group: ["Europe/Kirov", "Europe/Moscow", "Europe/Volgograd", "W-SU"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Moscow", "Saint Petersburg", "Nizhniy Novgorod", "Kazan"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan" },
      { name: "Europe/Simferopol", alternativeName: "Moscow Time", group: ["Europe/Simferopol"], continentCode: "EU", continentName: "Europe", countryName: "Ukraine", countryCode: "UA", mainCities: ["Sevastopol", "Simferopol", "Kerch", "Yevpatoriya"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Sevastopol, Simferopol, Kerch, Yevpatoriya" },
      { name: "Antarctica/Syowa", alternativeName: "Syowa Time", group: ["Antarctica/Syowa"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Syowa"], rawOffsetInMinutes: 180, abbreviation: "SYOT", rawFormat: "+03:00 Syowa Time - Syowa" },
      { name: "Europe/Istanbul", alternativeName: "Turkey Time", group: ["Europe/Istanbul", "Turkey", "Asia/Istanbul"], continentCode: "AS", continentName: "Asia", countryName: "Turkey", countryCode: "TR", mainCities: ["Istanbul", "Ankara", "\u0130zmir", "Bursa"], rawOffsetInMinutes: 180, abbreviation: "TRT", rawFormat: "+03:00 Turkey Time - Istanbul, Ankara, \u0130zmir, Bursa" },
      { name: "Asia/Tehran", alternativeName: "Iran Time", group: ["Asia/Tehran", "Iran"], continentCode: "AS", continentName: "Asia", countryName: "Iran", countryCode: "IR", mainCities: ["Tehran", "Mashhad", "Isfahan", "Karaj"], rawOffsetInMinutes: 210, abbreviation: "IRST", rawFormat: "+03:30 Iran Time - Tehran, Mashhad, Isfahan, Karaj" },
      { name: "Asia/Yerevan", alternativeName: "Armenia Time", group: ["Asia/Yerevan"], continentCode: "AS", continentName: "Asia", countryName: "Armenia", countryCode: "AM", mainCities: ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat"], rawOffsetInMinutes: 240, abbreviation: "AMT", rawFormat: "+04:00 Armenia Time - Yerevan, Gyumri, Vanadzor, Vagharshapat" },
      { name: "Asia/Baku", alternativeName: "Azerbaijan Time", group: ["Asia/Baku"], continentCode: "AS", continentName: "Asia", countryName: "Azerbaijan", countryCode: "AZ", mainCities: ["Baku", "Ganja", "Sumqay\u0131t", "Lankaran"], rawOffsetInMinutes: 240, abbreviation: "AZT", rawFormat: "+04:00 Azerbaijan Time - Baku, Ganja, Sumqay\u0131t, Lankaran" },
      { name: "Asia/Tbilisi", alternativeName: "Georgia Time", group: ["Asia/Tbilisi"], continentCode: "AS", continentName: "Asia", countryName: "Georgia", countryCode: "GE", mainCities: ["Tbilisi", "Kutaisi", "Batumi", "Sokhumi"], rawOffsetInMinutes: 240, abbreviation: "GET", rawFormat: "+04:00 Georgia Time - Tbilisi, Kutaisi, Batumi, Sokhumi" },
      { name: "Asia/Dubai", alternativeName: "Gulf Time", group: ["Asia/Dubai", "Asia/Muscat", "Indian/Mahe", "Indian/Reunion"], continentCode: "AS", continentName: "Asia", countryName: "United Arab Emirates", countryCode: "AE", mainCities: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman City"], rawOffsetInMinutes: 240, abbreviation: "GST", rawFormat: "+04:00 Gulf Time - Dubai, Sharjah, Abu Dhabi, Ajman City" },
      { name: "Asia/Muscat", alternativeName: "Gulf Time", group: ["Asia/Muscat"], continentCode: "AS", continentName: "Asia", countryName: "Oman", countryCode: "OM", mainCities: ["Muscat", "Seeb", "\u015Eal\u0101lah", "Bawshar"], rawOffsetInMinutes: 240, abbreviation: "GST", rawFormat: "+04:00 Gulf Time - Muscat, Seeb, \u015Eal\u0101lah, Bawshar" },
      { name: "Indian/Mauritius", alternativeName: "Mauritius Time", group: ["Indian/Mauritius"], continentCode: "AF", continentName: "Africa", countryName: "Mauritius", countryCode: "MU", mainCities: ["Port Louis", "Beau Bassin-Rose Hill", "Vacoas", "Curepipe"], rawOffsetInMinutes: 240, abbreviation: "MUT", rawFormat: "+04:00 Mauritius Time - Port Louis, Beau Bassin-Rose Hill, Vacoas, Curepipe" },
      { name: "Indian/Reunion", alternativeName: "R\xE9union Time", group: ["Indian/Reunion"], continentCode: "AF", continentName: "Africa", countryName: "Reunion", countryCode: "RE", mainCities: ["Saint-Denis", "Saint-Paul", "Le Tampon", "Saint-Pierre"], rawOffsetInMinutes: 240, abbreviation: "RET", rawFormat: "+04:00 R\xE9union Time - Saint-Denis, Saint-Paul, Le Tampon, Saint-Pierre" },
      { name: "Europe/Samara", alternativeName: "Samara Time", group: ["Europe/Astrakhan", "Europe/Samara", "Europe/Saratov", "Europe/Ulyanovsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Samara", "Saratov", "Tolyatti", "Izhevsk"], rawOffsetInMinutes: 240, abbreviation: "SAMT", rawFormat: "+04:00 Samara Time - Samara, Saratov, Tolyatti, Izhevsk" },
      { name: "Indian/Mahe", alternativeName: "Seychelles Time", group: ["Indian/Mahe"], continentCode: "AF", continentName: "Africa", countryName: "Seychelles", countryCode: "SC", mainCities: ["Victoria"], rawOffsetInMinutes: 240, abbreviation: "SCT", rawFormat: "+04:00 Seychelles Time - Victoria" },
      { name: "Asia/Kabul", alternativeName: "Afghanistan Time", group: ["Asia/Kabul"], continentCode: "AS", continentName: "Asia", countryName: "Afghanistan", countryCode: "AF", mainCities: ["Kabul", "Her\u0101t", "Maz\u0101r-e Shar\u012Bf", "Kandah\u0101r"], rawOffsetInMinutes: 270, abbreviation: "AFT", rawFormat: "+04:30 Afghanistan Time - Kabul, Her\u0101t, Maz\u0101r-e Shar\u012Bf, Kandah\u0101r" },
      { name: "Indian/Kerguelen", alternativeName: "French Southern & Antarctic Time", group: ["Indian/Kerguelen"], continentCode: "AN", continentName: "Antarctica", countryName: "French Southern Territories", countryCode: "TF", mainCities: ["Port-aux-Fran\xE7ais"], rawOffsetInMinutes: 300, abbreviation: "FSAT", rawFormat: "+05:00 French Southern & Antarctic Time - Port-aux-Fran\xE7ais" },
      { name: "Indian/Maldives", alternativeName: "Maldives Time", group: ["Indian/Maldives", "Indian/Kerguelen"], continentCode: "AS", continentName: "Asia", countryName: "Maldives", countryCode: "MV", mainCities: ["Male"], rawOffsetInMinutes: 300, abbreviation: "MVT", rawFormat: "+05:00 Maldives Time - Male" },
      { name: "Antarctica/Mawson", alternativeName: "Mawson Time", group: ["Antarctica/Mawson"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Mawson"], rawOffsetInMinutes: 300, abbreviation: "MAWT", rawFormat: "+05:00 Mawson Time - Mawson" },
      { name: "Asia/Karachi", alternativeName: "Pakistan Time", group: ["Asia/Karachi"], continentCode: "AS", continentName: "Asia", countryName: "Pakistan", countryCode: "PK", mainCities: ["Karachi", "Lahore", "Faisalabad", "Rawalpindi"], rawOffsetInMinutes: 300, abbreviation: "PKT", rawFormat: "+05:00 Pakistan Time - Karachi, Lahore, Faisalabad, Rawalpindi" },
      { name: "Asia/Dushanbe", alternativeName: "Tajikistan Time", group: ["Asia/Dushanbe"], continentCode: "AS", continentName: "Asia", countryName: "Tajikistan", countryCode: "TJ", mainCities: ["Dushanbe", "Isfara", "Istaravshan", "K\u016Dlob"], rawOffsetInMinutes: 300, abbreviation: "TJT", rawFormat: "+05:00 Tajikistan Time - Dushanbe, Isfara, Istaravshan, K\u016Dlob" },
      { name: "Asia/Ashgabat", alternativeName: "Turkmenistan Time", group: ["Asia/Ashgabat", "Asia/Ashkhabad"], continentCode: "AS", continentName: "Asia", countryName: "Turkmenistan", countryCode: "TM", mainCities: ["Ashgabat", "T\xFCrkmenabat", "Da\u015Foguz", "Mary"], rawOffsetInMinutes: 300, abbreviation: "TMT", rawFormat: "+05:00 Turkmenistan Time - Ashgabat, T\xFCrkmenabat, Da\u015Foguz, Mary" },
      { name: "Asia/Tashkent", alternativeName: "Uzbekistan Time", group: ["Asia/Samarkand", "Asia/Tashkent"], continentCode: "AS", continentName: "Asia", countryName: "Uzbekistan", countryCode: "UZ", mainCities: ["Tashkent", "Namangan", "Samarkand", "Andijon"], rawOffsetInMinutes: 300, abbreviation: "UZT", rawFormat: "+05:00 Uzbekistan Time - Tashkent, Namangan, Samarkand, Andijon" },
      { name: "Asia/Aqtobe", alternativeName: "West Kazakhstan Time", group: ["Asia/Aqtau", "Asia/Aqtobe", "Asia/Atyrau", "Asia/Oral", "Asia/Qyzylorda"], continentCode: "AS", continentName: "Asia", countryName: "Kazakhstan", countryCode: "KZ", mainCities: ["Aktobe", "Kyzylorda", "Oral", "Atyrau"], rawOffsetInMinutes: 300, abbreviation: "AQTT", rawFormat: "+05:00 West Kazakhstan Time - Aktobe, Kyzylorda, Oral, Atyrau" },
      { name: "Asia/Yekaterinburg", alternativeName: "Yekaterinburg Time", group: ["Asia/Yekaterinburg"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Yekaterinburg", "Chelyabinsk", "Ufa", "Perm"], rawOffsetInMinutes: 300, abbreviation: "YEKT", rawFormat: "+05:00 Yekaterinburg Time - Yekaterinburg, Chelyabinsk, Ufa, Perm" },
      { name: "Asia/Colombo", alternativeName: "India Time", group: ["Asia/Colombo"], continentCode: "AS", continentName: "Asia", countryName: "Sri Lanka", countryCode: "LK", mainCities: ["Colombo", "Dehiwala-Mount Lavinia", "Maharagama", "Jaffna"], rawOffsetInMinutes: 330, abbreviation: "IST", rawFormat: "+05:30 India Time - Colombo, Dehiwala-Mount Lavinia, Maharagama, Jaffna" },
      { name: "Asia/Kolkata", alternativeName: "India Time", group: ["Asia/Kolkata", "Asia/Calcutta"], continentCode: "AS", continentName: "Asia", countryName: "India", countryCode: "IN", mainCities: ["Mumbai", "Delhi", "Bengaluru", "Hyder\u0101b\u0101d"], rawOffsetInMinutes: 330, abbreviation: "IST", rawFormat: "+05:30 India Time - Mumbai, Delhi, Bengaluru, Hyder\u0101b\u0101d" },
      { name: "Asia/Kathmandu", alternativeName: "Nepal Time", group: ["Asia/Kathmandu", "Asia/Katmandu"], continentCode: "AS", continentName: "Asia", countryName: "Nepal", countryCode: "NP", mainCities: ["Kathmandu", "Pokhara", "P\u0101tan", "Biratnagar"], rawOffsetInMinutes: 345, abbreviation: "NPT", rawFormat: "+05:45 Nepal Time - Kathmandu, Pokhara, P\u0101tan, Biratnagar" },
      { name: "Asia/Dhaka", alternativeName: "Bangladesh Time", group: ["Asia/Dhaka", "Asia/Dacca"], continentCode: "AS", continentName: "Asia", countryName: "Bangladesh", countryCode: "BD", mainCities: ["Dhaka", "Chattogram", "Khulna", "R\u0101jsh\u0101hi"], rawOffsetInMinutes: 360, abbreviation: "BST", rawFormat: "+06:00 Bangladesh Time - Dhaka, Chattogram, Khulna, R\u0101jsh\u0101hi" },
      { name: "Asia/Thimphu", alternativeName: "Bhutan Time", group: ["Asia/Thimphu", "Asia/Thimbu"], continentCode: "AS", continentName: "Asia", countryName: "Bhutan", countryCode: "BT", mainCities: ["Thimphu", "Tsirang", "Pun\u0101kha", "Phuntsholing"], rawOffsetInMinutes: 360, abbreviation: "BTT", rawFormat: "+06:00 Bhutan Time - Thimphu, Tsirang, Pun\u0101kha, Phuntsholing" },
      { name: "Asia/Urumqi", alternativeName: "China Time", group: ["Asia/Urumqi", "Antarctica/Vostok", "Asia/Kashgar"], continentCode: "AS", continentName: "Asia", countryName: "China", countryCode: "CN", mainCities: ["\xDCr\xFCmqi", "Shihezi", "Korla", "Aksu"], rawOffsetInMinutes: 360, abbreviation: "CST", rawFormat: "+06:00 China Time - \xDCr\xFCmqi, Shihezi, Korla, Aksu" },
      { name: "Asia/Almaty", alternativeName: "East Kazakhstan Time", group: ["Asia/Almaty", "Asia/Qostanay"], continentCode: "AS", continentName: "Asia", countryName: "Kazakhstan", countryCode: "KZ", mainCities: ["Almaty", "Shymkent", "Karagandy", "Taraz"], rawOffsetInMinutes: 360, abbreviation: "ALMT", rawFormat: "+06:00 East Kazakhstan Time - Almaty, Shymkent, Karagandy, Taraz" },
      { name: "Indian/Chagos", alternativeName: "Indian Ocean Time", group: ["Indian/Chagos"], continentCode: "AS", continentName: "Asia", countryName: "British Indian Ocean Territory", countryCode: "IO", mainCities: ["Chagos"], rawOffsetInMinutes: 360, abbreviation: "IOT", rawFormat: "+06:00 Indian Ocean Time - Chagos" },
      { name: "Asia/Bishkek", alternativeName: "Kyrgyzstan Time", group: ["Asia/Bishkek"], continentCode: "AS", continentName: "Asia", countryName: "Kyrgyzstan", countryCode: "KG", mainCities: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"], rawOffsetInMinutes: 360, abbreviation: "KGT", rawFormat: "+06:00 Kyrgyzstan Time - Bishkek, Osh, Jalal-Abad, Karakol" },
      { name: "Asia/Omsk", alternativeName: "Omsk Time", group: ["Asia/Omsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Omsk", "Tara", "Kalachinsk"], rawOffsetInMinutes: 360, abbreviation: "OMST", rawFormat: "+06:00 Omsk Time - Omsk, Tara, Kalachinsk" },
      { name: "Antarctica/Vostok", alternativeName: "Vostok Time", group: ["Antarctica/Vostok"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Vostok"], rawOffsetInMinutes: 360, abbreviation: "VOST", rawFormat: "+06:00 Vostok Time - Vostok" },
      { name: "Indian/Cocos", alternativeName: "Cocos Islands Time", group: ["Indian/Cocos"], continentCode: "AS", continentName: "Asia", countryName: "Cocos Islands", countryCode: "CC", mainCities: ["West Island"], rawOffsetInMinutes: 390, abbreviation: "CCT", rawFormat: "+06:30 Cocos Islands Time - West Island" },
      { name: "Asia/Yangon", alternativeName: "Myanmar Time", group: ["Asia/Yangon", "Indian/Cocos", "Asia/Rangoon"], continentCode: "AS", continentName: "Asia", countryName: "Myanmar", countryCode: "MM", mainCities: ["Yangon", "Mandalay", "Nay Pyi Taw", "Mawlamyine"], rawOffsetInMinutes: 390, abbreviation: "MMT", rawFormat: "+06:30 Myanmar Time - Yangon, Mandalay, Nay Pyi Taw, Mawlamyine" },
      { name: "Indian/Christmas", alternativeName: "Christmas Island Time", group: ["Indian/Christmas"], continentCode: "OC", continentName: "Oceania", countryName: "Christmas Island", countryCode: "CX", mainCities: ["Flying Fish Cove"], rawOffsetInMinutes: 420, abbreviation: "CXT", rawFormat: "+07:00 Christmas Island Time - Flying Fish Cove" },
      { name: "Antarctica/Davis", alternativeName: "Davis Time", group: ["Antarctica/Davis"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Davis"], rawOffsetInMinutes: 420, abbreviation: "DAVT", rawFormat: "+07:00 Davis Time - Davis" },
      { name: "Asia/Hovd", alternativeName: "Hovd Time", group: ["Asia/Hovd"], continentCode: "AS", continentName: "Asia", countryName: "Mongolia", countryCode: "MN", mainCities: ["Ulaangom", "Khovd", "\xD6lgii", "Altai"], rawOffsetInMinutes: 420, abbreviation: "HOVT", rawFormat: "+07:00 Hovd Time - Ulaangom, Khovd, \xD6lgii, Altai" },
      { name: "Asia/Bangkok", alternativeName: "Indochina Time", group: ["Asia/Bangkok", "Asia/Phnom_Penh", "Asia/Vientiane", "Indian/Christmas"], continentCode: "AS", continentName: "Asia", countryName: "Thailand", countryCode: "TH", mainCities: ["Bangkok", "Samut Prakan", "Mueang Nonthaburi", "Udon Thani"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Bangkok, Samut Prakan, Mueang Nonthaburi, Udon Thani" },
      { name: "Asia/Ho_Chi_Minh", alternativeName: "Indochina Time", group: ["Asia/Ho_Chi_Minh", "Asia/Saigon"], continentCode: "AS", continentName: "Asia", countryName: "Vietnam", countryCode: "VN", mainCities: ["Ho Chi Minh City", "Da Nang", "Bi\xEAn H\xF2a", "C\u1EA7n Th\u01A1"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Ho Chi Minh City, Da Nang, Bi\xEAn H\xF2a, C\u1EA7n Th\u01A1" },
      { name: "Asia/Phnom_Penh", alternativeName: "Indochina Time", group: ["Asia/Phnom_Penh"], continentCode: "AS", continentName: "Asia", countryName: "Cambodia", countryCode: "KH", mainCities: ["Phnom Penh", "Takeo", "Siem Reap", "Battambang"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Phnom Penh, Takeo, Siem Reap, Battambang" },
      { name: "Asia/Vientiane", alternativeName: "Indochina Time", group: ["Asia/Vientiane"], continentCode: "AS", continentName: "Asia", countryName: "Laos", countryCode: "LA", mainCities: ["Vientiane", "Savannakhet", "Pakse", "Thakh\xE8k"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Vientiane, Savannakhet, Pakse, Thakh\xE8k" },
      { name: "Asia/Novosibirsk", alternativeName: "Novosibirsk Time", group: ["Asia/Barnaul", "Asia/Krasnoyarsk", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Tomsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Novosibirsk", "Krasnoyarsk", "Barnaul", "Tomsk"], rawOffsetInMinutes: 420, abbreviation: "NOVT", rawFormat: "+07:00 Novosibirsk Time - Novosibirsk, Krasnoyarsk, Barnaul, Tomsk" },
      { name: "Asia/Jakarta", alternativeName: "Western Indonesia Time", group: ["Asia/Jakarta", "Asia/Pontianak"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Jakarta", "Surabaya", "Bekasi", "Bandung"], rawOffsetInMinutes: 420, abbreviation: "WIB", rawFormat: "+07:00 Western Indonesia Time - Jakarta, Surabaya, Bekasi, Bandung" },
      { name: "Australia/Perth", alternativeName: "Australian Western Time", group: ["Australia/Perth", "Australia/West"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Perth", "Rockingham", "Mandurah", "Bunbury"], rawOffsetInMinutes: 480, abbreviation: "AWST", rawFormat: "+08:00 Australian Western Time - Perth, Rockingham, Mandurah, Bunbury" },
      { name: "Asia/Brunei", alternativeName: "Brunei Darussalam Time", group: ["Asia/Brunei"], continentCode: "AS", continentName: "Asia", countryName: "Brunei", countryCode: "BN", mainCities: ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong"], rawOffsetInMinutes: 480, abbreviation: "BNT", rawFormat: "+08:00 Brunei Darussalam Time - Bandar Seri Begawan, Kuala Belait, Seria, Tutong" },
      { name: "Asia/Makassar", alternativeName: "Central Indonesia Time", group: ["Asia/Makassar", "Asia/Ujung_Pandang"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Makassar", "Denpasar", "Samarinda", "Banjarmasin"], rawOffsetInMinutes: 480, abbreviation: "WITA", rawFormat: "+08:00 Central Indonesia Time - Makassar, Denpasar, Samarinda, Banjarmasin" },
      { name: "Asia/Macau", alternativeName: "China Time", group: ["Asia/Macau", "Asia/Macao"], continentCode: "AS", continentName: "Asia", countryName: "Macao", countryCode: "MO", mainCities: ["Macau"], rawOffsetInMinutes: 480, abbreviation: "CST", rawFormat: "+08:00 China Time - Macau" },
      { name: "Asia/Shanghai", alternativeName: "China Time", group: ["Asia/Shanghai", "PRC", "Asia/Chongqing", "Asia/Harbin", "Asia/Chungking"], continentCode: "AS", continentName: "Asia", countryName: "China", countryCode: "CN", mainCities: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"], rawOffsetInMinutes: 480, abbreviation: "CST", rawFormat: "+08:00 China Time - Shanghai, Beijing, Shenzhen, Guangzhou" },
      { name: "Asia/Hong_Kong", alternativeName: "Hong Kong Time", group: ["Asia/Hong_Kong", "Hongkong"], continentCode: "AS", continentName: "Asia", countryName: "Hong Kong", countryCode: "HK", mainCities: ["Hong Kong", "Kowloon", "Victoria", "Tuen Mun"], rawOffsetInMinutes: 480, abbreviation: "HKT", rawFormat: "+08:00 Hong Kong Time - Hong Kong, Kowloon, Victoria, Tuen Mun" },
      { name: "Asia/Irkutsk", alternativeName: "Irkutsk Time", group: ["Asia/Irkutsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Irkutsk", "Ulan-Ude", "Bratsk", "Angarsk"], rawOffsetInMinutes: 480, abbreviation: "IRKT", rawFormat: "+08:00 Irkutsk Time - Irkutsk, Ulan-Ude, Bratsk, Angarsk" },
      { name: "Asia/Kuala_Lumpur", alternativeName: "Malaysia Time", group: ["Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Brunei"], continentCode: "AS", continentName: "Asia", countryName: "Malaysia", countryCode: "MY", mainCities: ["Johor Bahru", "Kota Bharu", "Kuala Lumpur", "Petaling Jaya"], rawOffsetInMinutes: 480, abbreviation: "MYT", rawFormat: "+08:00 Malaysia Time - Johor Bahru, Kota Bharu, Kuala Lumpur, Petaling Jaya" },
      { name: "Asia/Manila", alternativeName: "Philippine Time", group: ["Asia/Manila"], continentCode: "AS", continentName: "Asia", countryName: "Philippines", countryCode: "PH", mainCities: ["Quezon City", "Davao", "Manila", "Caloocan City"], rawOffsetInMinutes: 480, abbreviation: "PHT", rawFormat: "+08:00 Philippine Time - Quezon City, Davao, Manila, Caloocan City" },
      { name: "Asia/Singapore", alternativeName: "Singapore Time", group: ["Asia/Singapore", "Singapore", "Asia/Kuala_Lumpur"], continentCode: "AS", continentName: "Asia", countryName: "Singapore", countryCode: "SG", mainCities: ["Singapore", "Woodlands", "Geylang", "Queenstown Estate"], rawOffsetInMinutes: 480, abbreviation: "SGT", rawFormat: "+08:00 Singapore Time - Singapore, Woodlands, Geylang, Queenstown Estate" },
      { name: "Asia/Taipei", alternativeName: "Taipei Time", group: ["Asia/Taipei", "ROC"], continentCode: "AS", continentName: "Asia", countryName: "Taiwan", countryCode: "TW", mainCities: ["Taipei", "Kaohsiung", "Taichung", "Tainan"], rawOffsetInMinutes: 480, abbreviation: "TWT", rawFormat: "+08:00 Taipei Time - Taipei, Kaohsiung, Taichung, Tainan" },
      { name: "Asia/Ulaanbaatar", alternativeName: "Ulaanbaatar Time", group: ["Asia/Choibalsan", "Asia/Ulaanbaatar", "Asia/Ulan_Bator"], continentCode: "AS", continentName: "Asia", countryName: "Mongolia", countryCode: "MN", mainCities: ["Ulan Bator", "Erdenet", "Darhan", "M\xF6r\xF6n"], rawOffsetInMinutes: 480, abbreviation: "ULAT", rawFormat: "+08:00 Ulaanbaatar Time - Ulan Bator, Erdenet, Darhan, M\xF6r\xF6n" },
      { name: "Australia/Eucla", alternativeName: "Australian Central Western Time", group: ["Australia/Eucla"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Eucla"], rawOffsetInMinutes: 525, abbreviation: "ACWST", rawFormat: "+08:45 Australian Central Western Time - Eucla" },
      { name: "Asia/Dili", alternativeName: "East Timor Time", group: ["Asia/Dili"], continentCode: "OC", continentName: "Oceania", countryName: "Timor Leste", countryCode: "TL", mainCities: ["Dili", "Maliana", "Suai", "Likis\xE1"], rawOffsetInMinutes: 540, abbreviation: "TLT", rawFormat: "+09:00 East Timor Time - Dili, Maliana, Suai, Likis\xE1" },
      { name: "Asia/Jayapura", alternativeName: "Eastern Indonesia Time", group: ["Asia/Jayapura"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Jayapura", "Ambon", "Sorong", "Ternate"], rawOffsetInMinutes: 540, abbreviation: "WIT", rawFormat: "+09:00 Eastern Indonesia Time - Jayapura, Ambon, Sorong, Ternate" },
      { name: "Asia/Tokyo", alternativeName: "Japan Time", group: ["Asia/Tokyo", "Japan"], continentCode: "AS", continentName: "Asia", countryName: "Japan", countryCode: "JP", mainCities: ["Tokyo", "Yokohama", "Osaka", "Nagoya"], rawOffsetInMinutes: 540, abbreviation: "JST", rawFormat: "+09:00 Japan Time - Tokyo, Yokohama, Osaka, Nagoya" },
      { name: "Asia/Pyongyang", alternativeName: "Korean Time", group: ["Asia/Pyongyang"], continentCode: "AS", continentName: "Asia", countryName: "North Korea", countryCode: "KP", mainCities: ["Pyongyang", "Hamh\u016Dng", "Namp\u2019o", "Sunch\u2019\u014Fn"], rawOffsetInMinutes: 540, abbreviation: "KST", rawFormat: "+09:00 Korean Time - Pyongyang, Hamh\u016Dng, Namp\u2019o, Sunch\u2019\u014Fn" },
      { name: "Asia/Seoul", alternativeName: "Korean Time", group: ["Asia/Seoul", "ROK"], continentCode: "AS", continentName: "Asia", countryName: "South Korea", countryCode: "KR", mainCities: ["Seoul", "Busan", "Incheon", "Daegu"], rawOffsetInMinutes: 540, abbreviation: "KST", rawFormat: "+09:00 Korean Time - Seoul, Busan, Incheon, Daegu" },
      { name: "Pacific/Palau", alternativeName: "Palau Time", group: ["Pacific/Palau"], continentCode: "OC", continentName: "Oceania", countryName: "Palau", countryCode: "PW", mainCities: ["Ngerulmud"], rawOffsetInMinutes: 540, abbreviation: "PWT", rawFormat: "+09:00 Palau Time - Ngerulmud" },
      { name: "Asia/Chita", alternativeName: "Yakutsk Time", group: ["Asia/Chita", "Asia/Khandyga", "Asia/Yakutsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Chita", "Yakutsk", "Blagoveshchensk", "Belogorsk"], rawOffsetInMinutes: 540, abbreviation: "YAKT", rawFormat: "+09:00 Yakutsk Time - Chita, Yakutsk, Blagoveshchensk, Belogorsk" },
      { name: "Australia/Adelaide", alternativeName: "Australian Central Time", group: ["Australia/Adelaide", "Australia/Broken_Hill", "Australia/South", "Australia/Yancowinna"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Adelaide", "Adelaide Hills", "Mount Gambier", "Morphett Vale"], rawOffsetInMinutes: 570, abbreviation: "ACST", rawFormat: "+09:30 Australian Central Time - Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale" },
      { name: "Australia/Darwin", alternativeName: "Australian Central Time", group: ["Australia/Darwin", "Australia/North"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Darwin", "Alice Springs", "Palmerston"], rawOffsetInMinutes: 570, abbreviation: "ACST", rawFormat: "+09:30 Australian Central Time - Darwin, Alice Springs, Palmerston" },
      { name: "Australia/Brisbane", alternativeName: "Australian Eastern Time", group: ["Australia/Brisbane", "Australia/Lindeman", "Australia/Queensland"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Brisbane", "Gold Coast", "Logan City", "Townsville"], rawOffsetInMinutes: 600, abbreviation: "AEST", rawFormat: "+10:00 Australian Eastern Time - Brisbane, Gold Coast, Logan City, Townsville" },
      { name: "Australia/Sydney", alternativeName: "Australian Eastern Time", group: ["Antarctica/Macquarie", "Australia/Hobart", "Australia/Melbourne", "Australia/Sydney", "Australia/Tasmania", "Australia/Currie", "Australia/Victoria", "Australia/ACT", "Australia/NSW", "Australia/Canberra"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Sydney", "Melbourne", "Canberra", "Newcastle"], rawOffsetInMinutes: 600, abbreviation: "AEST", rawFormat: "+10:00 Australian Eastern Time - Sydney, Melbourne, Canberra, Newcastle" },
      { name: "Pacific/Guam", alternativeName: "Chamorro Time", group: ["Pacific/Guam", "Pacific/Saipan"], continentCode: "OC", continentName: "Oceania", countryName: "Guam", countryCode: "GU", mainCities: ["Dededo Village", "Yigo Village", "Tamuning-Tumon-Harmon Village", "Tamuning"], rawOffsetInMinutes: 600, abbreviation: "ChST", rawFormat: "+10:00 Chamorro Time - Dededo Village, Yigo Village, Tamuning-Tumon-Harmon Village, Tamuning" },
      { name: "Pacific/Saipan", alternativeName: "Chamorro Time", group: ["Pacific/Saipan"], continentCode: "OC", continentName: "Oceania", countryName: "Northern Mariana Islands", countryCode: "MP", mainCities: ["Saipan"], rawOffsetInMinutes: 600, abbreviation: "ChST", rawFormat: "+10:00 Chamorro Time - Saipan" },
      { name: "Pacific/Chuuk", alternativeName: "Chuuk Time", group: ["Pacific/Chuuk", "Pacific/Truk", "Pacific/Yap"], continentCode: "OC", continentName: "Oceania", countryName: "Micronesia", countryCode: "FM", mainCities: ["Chuuk"], rawOffsetInMinutes: 600, abbreviation: "CHUT", rawFormat: "+10:00 Chuuk Time - Chuuk" },
      { name: "Antarctica/DumontDUrville", alternativeName: "Dumont-d\u2019Urville Time", group: ["Antarctica/DumontDUrville"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["DumontDUrville"], rawOffsetInMinutes: 600, abbreviation: "DDUT", rawFormat: "+10:00 Dumont-d\u2019Urville Time - DumontDUrville" },
      { name: "Pacific/Port_Moresby", alternativeName: "Papua New Guinea Time", group: ["Pacific/Port_Moresby", "Antarctica/DumontDUrville", "Pacific/Chuuk", "Pacific/Yap", "Pacific/Truk"], continentCode: "OC", continentName: "Oceania", countryName: "Papua New Guinea", countryCode: "PG", mainCities: ["Port Moresby", "Lae", "Mount Hagen", "Popondetta"], rawOffsetInMinutes: 600, abbreviation: "PGT", rawFormat: "+10:00 Papua New Guinea Time - Port Moresby, Lae, Mount Hagen, Popondetta" },
      { name: "Asia/Vladivostok", alternativeName: "Vladivostok Time", group: ["Asia/Ust-Nera", "Asia/Vladivostok"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Khabarovsk", "Vladivostok", "Khabarovsk Vtoroy", "Komsomolsk-on-Amur"], rawOffsetInMinutes: 600, abbreviation: "VLAT", rawFormat: "+10:00 Vladivostok Time - Khabarovsk, Vladivostok, Khabarovsk Vtoroy, Komsomolsk-on-Amur" },
      { name: "Australia/Lord_Howe", alternativeName: "Lord Howe Time", group: ["Australia/Lord_Howe", "Australia/LHI"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Lord Howe"], rawOffsetInMinutes: 630, abbreviation: "LHST", rawFormat: "+10:30 Lord Howe Time - Lord Howe" },
      { name: "Pacific/Bougainville", alternativeName: "Bougainville Time", group: ["Pacific/Bougainville"], continentCode: "OC", continentName: "Oceania", countryName: "Papua New Guinea", countryCode: "PG", mainCities: ["Arawa"], rawOffsetInMinutes: 660, abbreviation: "BST", rawFormat: "+11:00 Bougainville Time - Arawa" },
      { name: "Antarctica/Casey", alternativeName: "Casey Time", group: ["Antarctica/Casey"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Casey"], rawOffsetInMinutes: 660, abbreviation: "CAST", rawFormat: "+11:00 Casey Time - Casey" },
      { name: "Pacific/Kosrae", alternativeName: "Kosrae Time", group: ["Pacific/Kosrae", "Pacific/Pohnpei"], continentCode: "OC", continentName: "Oceania", countryName: "Micronesia", countryCode: "FM", mainCities: ["Kosrae", "Palikir - National Government Center"], rawOffsetInMinutes: 660, abbreviation: "KOST", rawFormat: "+11:00 Kosrae Time - Kosrae, Palikir - National Government Center" },
      { name: "Pacific/Noumea", alternativeName: "New Caledonia Time", group: ["Pacific/Noumea"], continentCode: "OC", continentName: "Oceania", countryName: "New Caledonia", countryCode: "NC", mainCities: ["Noum\xE9a", "Mont-Dore", "Dumb\xE9a"], rawOffsetInMinutes: 660, abbreviation: "NCT", rawFormat: "+11:00 New Caledonia Time - Noum\xE9a, Mont-Dore, Dumb\xE9a" },
      { name: "Pacific/Norfolk", alternativeName: "Norfolk Island Time", group: ["Pacific/Norfolk"], continentCode: "OC", continentName: "Oceania", countryName: "Norfolk Island", countryCode: "NF", mainCities: ["Kingston"], rawOffsetInMinutes: 660, abbreviation: "NFT", rawFormat: "+11:00 Norfolk Island Time - Kingston" },
      { name: "Asia/Sakhalin", alternativeName: "Sakhalin Time", group: ["Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Yuzhno-Sakhalinsk", "Magadan", "Korsakov", "Kholmsk"], rawOffsetInMinutes: 660, abbreviation: "SAKT", rawFormat: "+11:00 Sakhalin Time - Yuzhno-Sakhalinsk, Magadan, Korsakov, Kholmsk" },
      { name: "Pacific/Guadalcanal", alternativeName: "Solomon Islands Time", group: ["Pacific/Guadalcanal", "Pacific/Pohnpei", "Pacific/Ponape"], continentCode: "OC", continentName: "Oceania", countryName: "Solomon Islands", countryCode: "SB", mainCities: ["Honiara"], rawOffsetInMinutes: 660, abbreviation: "SBT", rawFormat: "+11:00 Solomon Islands Time - Honiara" },
      { name: "Pacific/Efate", alternativeName: "Vanuatu Time", group: ["Pacific/Efate"], continentCode: "OC", continentName: "Oceania", countryName: "Vanuatu", countryCode: "VU", mainCities: ["Port-Vila"], rawOffsetInMinutes: 660, abbreviation: "VUT", rawFormat: "+11:00 Vanuatu Time - Port-Vila" },
      { name: "Pacific/Fiji", alternativeName: "Fiji Time", group: ["Pacific/Fiji"], continentCode: "OC", continentName: "Oceania", countryName: "Fiji", countryCode: "FJ", mainCities: ["Suva", "Lautoka", "Nadi", "Labasa"], rawOffsetInMinutes: 720, abbreviation: "FJT", rawFormat: "+12:00 Fiji Time - Suva, Lautoka, Nadi, Labasa" },
      { name: "Pacific/Tarawa", alternativeName: "Gilbert Islands Time", group: ["Pacific/Tarawa", "Pacific/Funafuti", "Pacific/Majuro", "Pacific/Wake", "Pacific/Wallis"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Tarawa"], rawOffsetInMinutes: 720, abbreviation: "GILT", rawFormat: "+12:00 Gilbert Islands Time - Tarawa" },
      { name: "Pacific/Majuro", alternativeName: "Marshall Islands Time", group: ["Pacific/Kwajalein", "Pacific/Majuro", "Kwajalein"], continentCode: "OC", continentName: "Oceania", countryName: "Marshall Islands", countryCode: "MH", mainCities: ["Majuro", "Kwajalein", "RMI Capitol"], rawOffsetInMinutes: 720, abbreviation: "MHT", rawFormat: "+12:00 Marshall Islands Time - Majuro, Kwajalein, RMI Capitol" },
      { name: "Pacific/Nauru", alternativeName: "Nauru Time", group: ["Pacific/Nauru"], continentCode: "OC", continentName: "Oceania", countryName: "Nauru", countryCode: "NR", mainCities: ["Yaren"], rawOffsetInMinutes: 720, abbreviation: "NRT", rawFormat: "+12:00 Nauru Time - Yaren" },
      { name: "Pacific/Auckland", alternativeName: "New Zealand Time", group: ["Pacific/Auckland", "NZ", "Antarctica/McMurdo", "Antarctica/South_Pole"], continentCode: "OC", continentName: "Oceania", countryName: "New Zealand", countryCode: "NZ", mainCities: ["Auckland", "Wellington", "Christchurch", "Manukau City"], rawOffsetInMinutes: 720, abbreviation: "NZST", rawFormat: "+12:00 New Zealand Time - Auckland, Wellington, Christchurch, Manukau City" },
      { name: "Antarctica/McMurdo", alternativeName: "New Zealand Time", group: ["Antarctica/McMurdo"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["McMurdo"], rawOffsetInMinutes: 720, abbreviation: "NZST", rawFormat: "+12:00 New Zealand Time - McMurdo" },
      { name: "Asia/Kamchatka", alternativeName: "Petropavlovsk-Kamchatski Time", group: ["Asia/Anadyr", "Asia/Kamchatka"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Petropavlovsk-Kamchatsky", "Yelizovo", "Vilyuchinsk", "Anadyr"], rawOffsetInMinutes: 720, abbreviation: "PETT", rawFormat: "+12:00 Petropavlovsk-Kamchatski Time - Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Anadyr" },
      { name: "Pacific/Funafuti", alternativeName: "Tuvalu Time", group: ["Pacific/Funafuti"], continentCode: "OC", continentName: "Oceania", countryName: "Tuvalu", countryCode: "TV", mainCities: ["Funafuti"], rawOffsetInMinutes: 720, abbreviation: "TVT", rawFormat: "+12:00 Tuvalu Time - Funafuti" },
      { name: "Pacific/Wake", alternativeName: "Wake Island Time", group: ["Pacific/Wake"], continentCode: "OC", continentName: "Oceania", countryName: "United States Minor Outlying Islands", countryCode: "UM", mainCities: ["Wake"], rawOffsetInMinutes: 720, abbreviation: "WAKT", rawFormat: "+12:00 Wake Island Time - Wake" },
      { name: "Pacific/Wallis", alternativeName: "Wallis & Futuna Time", group: ["Pacific/Wallis"], continentCode: "OC", continentName: "Oceania", countryName: "Wallis and Futuna", countryCode: "WF", mainCities: ["Mata-Utu"], rawOffsetInMinutes: 720, abbreviation: "WFT", rawFormat: "+12:00 Wallis & Futuna Time - Mata-Utu" },
      { name: "Pacific/Chatham", alternativeName: "Chatham Time", group: ["Pacific/Chatham", "NZ-CHAT"], continentCode: "OC", continentName: "Oceania", countryName: "New Zealand", countryCode: "NZ", mainCities: ["Chatham"], rawOffsetInMinutes: 765, abbreviation: "CHAST", rawFormat: "+12:45 Chatham Time - Chatham" },
      { name: "Pacific/Apia", alternativeName: "Apia Time", group: ["Pacific/Apia"], continentCode: "OC", continentName: "Oceania", countryName: "Samoa", countryCode: "WS", mainCities: ["Apia"], rawOffsetInMinutes: 780, abbreviation: "WST", rawFormat: "+13:00 Apia Time - Apia" },
      { name: "Pacific/Kanton", alternativeName: "Phoenix Islands Time", group: ["Pacific/Kanton", "Pacific/Enderbury"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Kanton"], rawOffsetInMinutes: 780, abbreviation: "PHOT", rawFormat: "+13:00 Phoenix Islands Time - Kanton" },
      { name: "Pacific/Fakaofo", alternativeName: "Tokelau Time", group: ["Pacific/Fakaofo"], continentCode: "OC", continentName: "Oceania", countryName: "Tokelau", countryCode: "TK", mainCities: ["Fakaofo"], rawOffsetInMinutes: 780, abbreviation: "TKT", rawFormat: "+13:00 Tokelau Time - Fakaofo" },
      { name: "Pacific/Tongatapu", alternativeName: "Tonga Time", group: ["Pacific/Tongatapu"], continentCode: "OC", continentName: "Oceania", countryName: "Tonga", countryCode: "TO", mainCities: ["Nuku\u2018alofa"], rawOffsetInMinutes: 780, abbreviation: "TOT", rawFormat: "+13:00 Tonga Time - Nuku\u2018alofa" },
      { name: "Pacific/Kiritimati", alternativeName: "Line Islands Time", group: ["Pacific/Kiritimati"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Kiritimati"], rawOffsetInMinutes: 840, abbreviation: "LINT", rawFormat: "+14:00 Line Islands Time - Kiritimati" }
    ];
  }
});

// node_modules/@vvo/tzdb/time-zones-names.json
var require_time_zones_names = __commonJS({
  "node_modules/@vvo/tzdb/time-zones-names.json"(exports, module2) {
    module2.exports = [
      "Africa/Abidjan",
      "Africa/Accra",
      "Africa/Addis_Ababa",
      "Africa/Algiers",
      "Africa/Asmara",
      "Africa/Bamako",
      "Africa/Bangui",
      "Africa/Banjul",
      "Africa/Bissau",
      "Africa/Blantyre",
      "Africa/Brazzaville",
      "Africa/Bujumbura",
      "Africa/Cairo",
      "Africa/Casablanca",
      "Africa/Ceuta",
      "Africa/Conakry",
      "Africa/Dakar",
      "Africa/Dar_es_Salaam",
      "Africa/Djibouti",
      "Africa/Douala",
      "Africa/El_Aaiun",
      "Africa/Freetown",
      "Africa/Gaborone",
      "Africa/Harare",
      "Africa/Johannesburg",
      "Africa/Juba",
      "Africa/Kampala",
      "Africa/Khartoum",
      "Africa/Kigali",
      "Africa/Kinshasa",
      "Africa/Lagos",
      "Africa/Libreville",
      "Africa/Lome",
      "Africa/Luanda",
      "Africa/Lubumbashi",
      "Africa/Lusaka",
      "Africa/Malabo",
      "Africa/Maputo",
      "Africa/Maseru",
      "Africa/Mbabane",
      "Africa/Mogadishu",
      "Africa/Monrovia",
      "Africa/Nairobi",
      "Africa/Ndjamena",
      "Africa/Niamey",
      "Africa/Nouakchott",
      "Africa/Ouagadougou",
      "Africa/Porto-Novo",
      "Africa/Sao_Tome",
      "Africa/Tripoli",
      "Africa/Tunis",
      "Africa/Windhoek",
      "America/Adak",
      "America/Anchorage",
      "America/Anguilla",
      "America/Antigua",
      "America/Araguaina",
      "America/Argentina/Buenos_Aires",
      "America/Argentina/Catamarca",
      "America/Argentina/Cordoba",
      "America/Argentina/Jujuy",
      "America/Argentina/La_Rioja",
      "America/Argentina/Mendoza",
      "America/Argentina/Rio_Gallegos",
      "America/Argentina/Salta",
      "America/Argentina/San_Juan",
      "America/Argentina/San_Luis",
      "America/Argentina/Tucuman",
      "America/Argentina/Ushuaia",
      "America/Aruba",
      "America/Asuncion",
      "America/Atikokan",
      "America/Bahia",
      "America/Bahia_Banderas",
      "America/Barbados",
      "America/Belem",
      "America/Belize",
      "America/Blanc-Sablon",
      "America/Boa_Vista",
      "America/Bogota",
      "America/Boise",
      "America/Cambridge_Bay",
      "America/Campo_Grande",
      "America/Cancun",
      "America/Caracas",
      "America/Cayenne",
      "America/Cayman",
      "America/Chicago",
      "America/Chihuahua",
      "America/Costa_Rica",
      "America/Creston",
      "America/Cuiaba",
      "America/Curacao",
      "America/Danmarkshavn",
      "America/Dawson",
      "America/Dawson_Creek",
      "America/Denver",
      "America/Detroit",
      "America/Dominica",
      "America/Edmonton",
      "America/Eirunepe",
      "America/El_Salvador",
      "America/Fort_Nelson",
      "America/Fortaleza",
      "America/Glace_Bay",
      "America/Goose_Bay",
      "America/Grand_Turk",
      "America/Grenada",
      "America/Guadeloupe",
      "America/Guatemala",
      "America/Guayaquil",
      "America/Guyana",
      "America/Halifax",
      "America/Havana",
      "America/Hermosillo",
      "America/Indiana/Indianapolis",
      "America/Indiana/Knox",
      "America/Indiana/Marengo",
      "America/Indiana/Petersburg",
      "America/Indiana/Tell_City",
      "America/Indiana/Vevay",
      "America/Indiana/Vincennes",
      "America/Indiana/Winamac",
      "America/Inuvik",
      "America/Iqaluit",
      "America/Jamaica",
      "America/Juneau",
      "America/Kentucky/Louisville",
      "America/Kentucky/Monticello",
      "America/Kralendijk",
      "America/La_Paz",
      "America/Lima",
      "America/Los_Angeles",
      "America/Lower_Princes",
      "America/Maceio",
      "America/Managua",
      "America/Manaus",
      "America/Marigot",
      "America/Martinique",
      "America/Matamoros",
      "America/Mazatlan",
      "America/Menominee",
      "America/Merida",
      "America/Metlakatla",
      "America/Mexico_City",
      "America/Miquelon",
      "America/Moncton",
      "America/Monterrey",
      "America/Montevideo",
      "America/Montserrat",
      "America/Nassau",
      "America/New_York",
      "America/Nipigon",
      "America/Nome",
      "America/Noronha",
      "America/North_Dakota/Beulah",
      "America/North_Dakota/Center",
      "America/North_Dakota/New_Salem",
      "America/Nuuk",
      "America/Ojinaga",
      "America/Panama",
      "America/Pangnirtung",
      "America/Paramaribo",
      "America/Phoenix",
      "America/Port-au-Prince",
      "America/Port_of_Spain",
      "America/Porto_Velho",
      "America/Puerto_Rico",
      "America/Punta_Arenas",
      "America/Rainy_River",
      "America/Rankin_Inlet",
      "America/Recife",
      "America/Regina",
      "America/Resolute",
      "America/Rio_Branco",
      "America/Santarem",
      "America/Santiago",
      "America/Santo_Domingo",
      "America/Sao_Paulo",
      "America/Scoresbysund",
      "America/Sitka",
      "America/St_Barthelemy",
      "America/St_Johns",
      "America/St_Kitts",
      "America/St_Lucia",
      "America/St_Thomas",
      "America/St_Vincent",
      "America/Swift_Current",
      "America/Tegucigalpa",
      "America/Thule",
      "America/Thunder_Bay",
      "America/Tijuana",
      "America/Toronto",
      "America/Tortola",
      "America/Vancouver",
      "America/Whitehorse",
      "America/Winnipeg",
      "America/Yakutat",
      "America/Yellowknife",
      "Antarctica/Casey",
      "Antarctica/Davis",
      "Antarctica/DumontDUrville",
      "Antarctica/Macquarie",
      "Antarctica/Mawson",
      "Antarctica/McMurdo",
      "Antarctica/Palmer",
      "Antarctica/Rothera",
      "Antarctica/Syowa",
      "Antarctica/Troll",
      "Antarctica/Vostok",
      "Arctic/Longyearbyen",
      "Asia/Aden",
      "Asia/Almaty",
      "Asia/Amman",
      "Asia/Anadyr",
      "Asia/Aqtau",
      "Asia/Aqtobe",
      "Asia/Ashgabat",
      "Asia/Atyrau",
      "Asia/Baghdad",
      "Asia/Bahrain",
      "Asia/Baku",
      "Asia/Bangkok",
      "Asia/Barnaul",
      "Asia/Beirut",
      "Asia/Bishkek",
      "Asia/Brunei",
      "Asia/Chita",
      "Asia/Choibalsan",
      "Asia/Colombo",
      "Asia/Damascus",
      "Asia/Dhaka",
      "Asia/Dili",
      "Asia/Dubai",
      "Asia/Dushanbe",
      "Asia/Famagusta",
      "Asia/Gaza",
      "Asia/Hebron",
      "Asia/Ho_Chi_Minh",
      "Asia/Hong_Kong",
      "Asia/Hovd",
      "Asia/Irkutsk",
      "Asia/Jakarta",
      "Asia/Jayapura",
      "Asia/Jerusalem",
      "Asia/Kabul",
      "Asia/Kamchatka",
      "Asia/Karachi",
      "Asia/Kathmandu",
      "Asia/Khandyga",
      "Asia/Kolkata",
      "Asia/Krasnoyarsk",
      "Asia/Kuala_Lumpur",
      "Asia/Kuching",
      "Asia/Kuwait",
      "Asia/Macau",
      "Asia/Magadan",
      "Asia/Makassar",
      "Asia/Manila",
      "Asia/Muscat",
      "Asia/Nicosia",
      "Asia/Novokuznetsk",
      "Asia/Novosibirsk",
      "Asia/Omsk",
      "Asia/Oral",
      "Asia/Phnom_Penh",
      "Asia/Pontianak",
      "Asia/Pyongyang",
      "Asia/Qatar",
      "Asia/Qostanay",
      "Asia/Qyzylorda",
      "Asia/Riyadh",
      "Asia/Sakhalin",
      "Asia/Samarkand",
      "Asia/Seoul",
      "Asia/Shanghai",
      "Asia/Singapore",
      "Asia/Srednekolymsk",
      "Asia/Taipei",
      "Asia/Tashkent",
      "Asia/Tbilisi",
      "Asia/Tehran",
      "Asia/Thimphu",
      "Asia/Tokyo",
      "Asia/Tomsk",
      "Asia/Ulaanbaatar",
      "Asia/Urumqi",
      "Asia/Ust-Nera",
      "Asia/Vientiane",
      "Asia/Vladivostok",
      "Asia/Yakutsk",
      "Asia/Yangon",
      "Asia/Yekaterinburg",
      "Asia/Yerevan",
      "Atlantic/Azores",
      "Atlantic/Bermuda",
      "Atlantic/Canary",
      "Atlantic/Cape_Verde",
      "Atlantic/Faroe",
      "Atlantic/Madeira",
      "Atlantic/Reykjavik",
      "Atlantic/South_Georgia",
      "Atlantic/St_Helena",
      "Atlantic/Stanley",
      "Australia/Adelaide",
      "Australia/Brisbane",
      "Australia/Broken_Hill",
      "Australia/Darwin",
      "Australia/Eucla",
      "Australia/Hobart",
      "Australia/Lindeman",
      "Australia/Lord_Howe",
      "Australia/Melbourne",
      "Australia/Perth",
      "Australia/Sydney",
      "Europe/Amsterdam",
      "Europe/Andorra",
      "Europe/Astrakhan",
      "Europe/Athens",
      "Europe/Belgrade",
      "Europe/Berlin",
      "Europe/Bratislava",
      "Europe/Brussels",
      "Europe/Bucharest",
      "Europe/Budapest",
      "Europe/Busingen",
      "Europe/Chisinau",
      "Europe/Copenhagen",
      "Europe/Dublin",
      "Europe/Gibraltar",
      "Europe/Guernsey",
      "Europe/Helsinki",
      "Europe/Isle_of_Man",
      "Europe/Istanbul",
      "Europe/Jersey",
      "Europe/Kaliningrad",
      "Europe/Kirov",
      "Europe/Kyiv",
      "Europe/Lisbon",
      "Europe/Ljubljana",
      "Europe/London",
      "Europe/Luxembourg",
      "Europe/Madrid",
      "Europe/Malta",
      "Europe/Mariehamn",
      "Europe/Minsk",
      "Europe/Monaco",
      "Europe/Moscow",
      "Europe/Oslo",
      "Europe/Paris",
      "Europe/Podgorica",
      "Europe/Prague",
      "Europe/Riga",
      "Europe/Rome",
      "Europe/Samara",
      "Europe/San_Marino",
      "Europe/Sarajevo",
      "Europe/Saratov",
      "Europe/Simferopol",
      "Europe/Skopje",
      "Europe/Sofia",
      "Europe/Stockholm",
      "Europe/Tallinn",
      "Europe/Tirane",
      "Europe/Ulyanovsk",
      "Europe/Uzhgorod",
      "Europe/Vaduz",
      "Europe/Vatican",
      "Europe/Vienna",
      "Europe/Vilnius",
      "Europe/Volgograd",
      "Europe/Warsaw",
      "Europe/Zagreb",
      "Europe/Zaporozhye",
      "Europe/Zurich",
      "Indian/Antananarivo",
      "Indian/Chagos",
      "Indian/Christmas",
      "Indian/Cocos",
      "Indian/Comoro",
      "Indian/Kerguelen",
      "Indian/Mahe",
      "Indian/Maldives",
      "Indian/Mauritius",
      "Indian/Mayotte",
      "Indian/Reunion",
      "Pacific/Apia",
      "Pacific/Auckland",
      "Pacific/Bougainville",
      "Pacific/Chatham",
      "Pacific/Chuuk",
      "Pacific/Easter",
      "Pacific/Efate",
      "Pacific/Fakaofo",
      "Pacific/Fiji",
      "Pacific/Funafuti",
      "Pacific/Galapagos",
      "Pacific/Gambier",
      "Pacific/Guadalcanal",
      "Pacific/Guam",
      "Pacific/Honolulu",
      "Pacific/Kanton",
      "Pacific/Kiritimati",
      "Pacific/Kosrae",
      "Pacific/Kwajalein",
      "Pacific/Majuro",
      "Pacific/Marquesas",
      "Pacific/Midway",
      "Pacific/Nauru",
      "Pacific/Niue",
      "Pacific/Norfolk",
      "Pacific/Noumea",
      "Pacific/Pago_Pago",
      "Pacific/Palau",
      "Pacific/Pitcairn",
      "Pacific/Pohnpei",
      "Pacific/Port_Moresby",
      "Pacific/Rarotonga",
      "Pacific/Saipan",
      "Pacific/Tahiti",
      "Pacific/Tarawa",
      "Pacific/Tongatapu",
      "Pacific/Wake",
      "Pacific/Wallis"
    ];
  }
});

// node_modules/@vvo/tzdb/dist/formatTimeZone.js
var require_formatTimeZone = __commonJS({
  "node_modules/@vvo/tzdb/dist/formatTimeZone.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = format;
    function format({
      alternativeName,
      mainCities,
      rawOffsetInMinutes,
      currentTimeOffsetInMinutes
    }, {
      useCurrentOffset = false
    } = {}) {
      const offsetInHours = useCurrentOffset ? getOffsetString(currentTimeOffsetInMinutes) : getOffsetString(rawOffsetInMinutes);
      return `${offsetInHours.padStart(6, "+")} ${alternativeName} - ${mainCities.join(", ")}`;
    }
    function getOffsetString(offsetInMinutes) {
      const absOffsetInMinutes = Math.abs(offsetInMinutes);
      const [hours, minutes] = [Math.floor(absOffsetInMinutes / 60), absOffsetInMinutes % 60].map((v) => {
        return v.toString().padStart(2, "0");
      });
      const durationInHoursMinutes = `${hours}:${minutes}`;
      return `${offsetInMinutes >= 0 ? "+" : "-"}${durationInHoursMinutes}`;
    }
  }
});

// node_modules/@vvo/tzdb/dist/utils/timeZone.js
var require_timeZone = __commonJS({
  "node_modules/@vvo/tzdb/dist/utils/timeZone.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getZoneOffset = getZoneOffset;
    var ianaRegex = /^[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?$/;
    var typeToPos = {
      year: 0,
      month: 1,
      day: 2,
      hour: 3,
      minute: 4,
      second: 5
    };
    function isValidIanaSpecifier(s) {
      return !!(s && s.match(ianaRegex));
    }
    function hackyOffset(dtf, date) {
      const formatted = dtf.format(date).replace(/\u200E/g, "");
      const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
      const [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
      return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
    }
    function partsOffset(dtf, date) {
      const formatted = dtf.formatToParts(date);
      const filled = [];
      for (let i = 0; i < formatted.length; i++) {
        const {
          type,
          value
        } = formatted[i];
        const pos = typeToPos[type];
        if (typeof pos !== "undefined") {
          filled[pos] = parseInt(value, 10);
        }
      }
      return filled;
    }
    function makeDTF(zone) {
      return new Intl.DateTimeFormat("en-US", {
        hourCycle: "h23",
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
    function objToLocalTS(obj) {
      let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
      if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
      }
      return +d;
    }
    function getZoneOffset(timeZoneName) {
      if (!isValidIanaSpecifier(timeZoneName)) {
        return false;
      }
      const date = new Date(Date.now());
      let dtf;
      try {
        dtf = makeDTF(timeZoneName);
      } catch (_) {
        return false;
      }
      const [year, month, day, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
      const asUTC = objToLocalTS({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond: 0
      });
      let asTS = +date;
      const over = asTS % 1e3;
      asTS -= over >= 0 ? over : 1e3 + over;
      return (asUTC - asTS) / (60 * 1e3);
    }
  }
});

// node_modules/@vvo/tzdb/dist/getTimeZones.js
var require_getTimeZones = __commonJS({
  "node_modules/@vvo/tzdb/dist/getTimeZones.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getTimeZones;
    var _rawTimeZones = _interopRequireDefault(require_raw_time_zones());
    var _formatTimeZone = _interopRequireDefault(require_formatTimeZone());
    var _timeZone = require_timeZone();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function getTimeZones(opts) {
      const includeUtc = !!opts && opts.includeUtc;
      return _rawTimeZones.default.reduce(function(acc, timeZone) {
        const timeZoneName = timeZone.name;
        const currentOffset = (0, _timeZone.getZoneOffset)(timeZoneName);
        if (currentOffset === false) {
          return acc;
        }
        const timeZoneWithCurrentTimeData = {
          ...timeZone,
          currentTimeOffsetInMinutes: currentOffset
        };
        acc.push({
          ...timeZoneWithCurrentTimeData,
          currentTimeFormat: (0, _formatTimeZone.default)(timeZoneWithCurrentTimeData, {
            useCurrentOffset: true
          })
        });
        return acc;
      }, includeUtc ? [utcTimezone] : []).sort((a, b) => {
        return compareNumbers(a, b) || compareStrings(a.alternativeName, b.alternativeName) || compareStrings(a.mainCities[0], b.mainCities[0]);
      });
    }
    function compareNumbers(x, y) {
      return x.currentTimeOffsetInMinutes - y.currentTimeOffsetInMinutes;
    }
    function compareStrings(x, y) {
      if (typeof x === "string" && typeof y === "string") {
        return x.localeCompare(y);
      }
      return 0;
    }
    var utcTimezone = {
      name: "Etc/UTC",
      alternativeName: "Coordinated Universal Time (UTC)",
      abbreviation: "UTC",
      group: ["Etc/UTC", "Etc/UCT", "UCT", "UTC", "Universal", "Zulu"],
      countryName: "",
      continentCode: "",
      continentName: "",
      mainCities: [""],
      rawOffsetInMinutes: 0,
      rawFormat: "+00:00 Coordinated Universal Time (UTC)",
      currentTimeOffsetInMinutes: 0,
      currentTimeFormat: "+00:00 Coordinated Universal Time (UTC)"
    };
  }
});

// node_modules/@vvo/tzdb/abbreviations.json
var require_abbreviations = __commonJS({
  "node_modules/@vvo/tzdb/abbreviations.json"(exports, module2) {
    module2.exports = {
      "Acre Time": "ACT",
      "Afghanistan Time": "AFT",
      "Alaska Daylight Time": "AKDT",
      "Alaska Standard Time": "AKST",
      "Alma-Ata Time": "ALMT",
      "Alpha Time Zone": "A",
      "Amazon Summer Time": "AMST",
      "Amazon Time": "AMT",
      "Anadyr Summer Time": "ANAST",
      "Anadyr Time": "ANAT",
      "Anywhere on Earth": "AoE",
      "Apia Time": "WST",
      "Aqtobe Time": "AQTT",
      "Arabia Daylight Time": "ADT",
      "Arabia Standard Time": "AST",
      "Arabian Time": "AST",
      "Argentina Time": "ART",
      "Armenia Summer Time": "AMST",
      "Armenia Time": "AMT",
      "Atlantic Daylight Time": "ADT",
      "Atlantic Standard Time": "AST",
      "Atlantic Time": "AT",
      "Australian Central Daylight Time": "ACDT",
      "Australian Central Standard Time": "ACST",
      "Australian Central Time": "ACT",
      "Australian Central Western Standard Time": "ACWST",
      "Australian Eastern Daylight Time": "AEDT",
      "Australian Eastern Standard Time": "AEST",
      "Australian Eastern Time": "AET",
      "Australian Western Daylight Time": "AWDT",
      "Australian Western Standard Time": "AWST",
      "Azerbaijan Summer Time": "AZST",
      "Azerbaijan Time": "AZT",
      "Azores Summer Time": "AZOST",
      "Azores Time": "AZOT",
      "Bangladesh Standard Time": "BST",
      "Bhutan Time": "BTT",
      "Bolivia Time": "BOT",
      "Bougainville Standard Time": "BST",
      "Brasilia Time": "BRT",
      "Bras\xEDlia Summer Time": "BRST",
      "Bras\xEDlia Time": "BRT",
      "Bravo Time Zone": "B",
      "British Summer Time": "BST",
      "Brunei Darussalam Time": "BNT",
      "Cape Verde Time": "CVT",
      "Casey Time": "CAST",
      "Cayman Islands Daylight Saving Time": "CIDST",
      "Cayman Islands Standard Time": "CIST",
      "Central Africa Time": "CAT",
      "Central Daylight Time": "CDT",
      "Central European Summer Time": "CEST",
      "Central European Time": "CET",
      "Central Indonesia Time": "WITA",
      "Central Indonesian Time": "WITA",
      "Central Standard Time": "CST",
      "Central Time": "CT",
      "Chamorro Standard Time": "ChST",
      "Charlie Time Zone": "C",
      "Chatham Island Daylight Time": "CHADT",
      "Chatham Island Standard Time": "CHAST",
      "Chatham Time": "CHAST",
      "Chile Standard Time": "CLT",
      "Chile Summer Time": "CLST",
      "China Standard Time": "CST",
      "Choibalsan Summer Time": "CHOST",
      "Choibalsan Time": "CHOT",
      "Christmas Island Time": "CXT",
      "Chuuk Time": "CHUT",
      "Cocos Islands Time": "CCT",
      "Colombia Time": "COT",
      "Cook Island Time": "CKT",
      "Cook Islands Time": "CKT",
      "Coordinated Universal Time": "UTC",
      "Cuba Daylight Time": "CDT",
      "Cuba Standard Time": "CST",
      "Davis Time": "DAVT",
      "Delta Time Zone": "D",
      "Dumont-d'Urville Time": "DDUT",
      "Dumont-d\u2019Urville Time": "DDUT",
      "East Africa Time": "EAT",
      "East Greenland Time": "EGT",
      "East Kazakhstan Time": "ALMT",
      "East Timor Time": "TLT",
      "Easter Island Standard Time": "EAST",
      "Easter Island Summer Time": "EASST",
      "Eastern Africa Time": "EAT",
      "Eastern Daylight Time": "EDT",
      "Eastern European Summer Time": "EEST",
      "Eastern European Time": "EET",
      "Eastern Greenland Summer Time": "EGST",
      "Eastern Indonesia Time": "WIT",
      "Eastern Indonesian Time": "WIT",
      "Eastern Standard Time": "EST",
      "Eastern Time": "ET",
      "Echo Time Zone": "E",
      "Ecuador Time": "ECT",
      "Falkland Island Time": "FKT",
      "Falkland Islands Summer Time": "FKST",
      "Falkland Islands Time": "FKST",
      "Fernando de Noronha Time": "FNT",
      "Fiji Summer Time": "FJST",
      "Fiji Time": "FJT",
      "Foxtrot Time Zone": "F",
      "French Guiana Time": "GFT",
      "French Southern & Antarctic Time": "FSAT",
      "French Southern and Antarctic Time": "TFT",
      "Further-Eastern European Time": "FET",
      "Galapagos Time": "GALT",
      "Gambier Time": "GAMT",
      "Georgia Standard Time": "GET",
      "Gilbert Island Time": "GILT",
      "Gilbert Islands Time": "GILT",
      "Golf Time Zone": "G",
      "Greenwich Mean Time": "GMT",
      "Gulf Standard Time": "GST",
      "Guyana Time": "GYT",
      "Hawaii Standard Time": "HST",
      "Hawaii-Aleutian Daylight Time": "HDT",
      "Hawaii-Aleutian Time": "HAST",
      "Hong Kong Time": "HKT",
      "Hotel Time Zone": "H",
      "Hovd Summer Time": "HOVST",
      "Hovd Time": "HOVT",
      "India Standard Time": "IST",
      "India Time Zone": "I",
      "Indian Chagos Time": "IOT",
      "Indian Ocean Time": "IOT",
      "Indochina Time": "ICT",
      "Iran Daylight Time": "IRDT",
      "Iran Standard Time": "IRST",
      "Irish Standard Time": "IST",
      "Irkutsk Summer Time": "IRKST",
      "Irkutsk Time": "IRKT",
      "Israel Daylight Time": "IDT",
      "Israel Standard Time": "IST",
      "Japan Standard Time": "JST",
      "Kamchatka Summer Time": "PETST",
      "Kamchatka Time": "PETT",
      "Kilo Time Zone": "K",
      "Korea Standard Time": "KST",
      "Korean Time": "KST",
      "Kosrae Time": "KOST",
      "Krasnoyarsk Summer Time": "KRAST",
      "Krasnoyarsk Time": "KRAT",
      "Kuybyshev Time": "KUYT",
      "Kyrgyzstan Time": "KGT",
      "Lima Time Zone": "L",
      "Line Islands Time": "LINT",
      "Lord Howe Daylight Time": "LHDT",
      "Lord Howe Standard Time": "LHST",
      "Magadan Summer Time": "MAGST",
      "Magadan Time": "MAGT",
      "Malaysia Time": "MYT",
      "Maldives Time": "MVT",
      "Marquesas Time": "MART",
      "Marshall Islands Time": "MHT",
      "Mauritius Time": "MUT",
      "Mawson Time": "MAWT",
      "Mike Time Zone": "M",
      "Moscow Daylight Time": "MSD",
      "Moscow Standard Time": "MSK",
      "Mountain Daylight Time": "MDT",
      "Mountain Standard Time": "MST",
      "Mountain Time": "MT",
      "Myanmar Time": "MMT",
      "Nauru Time": "NRT",
      "Nepal Time": "NPT",
      "New Caledonia Time": "NCT",
      "New Zealand Daylight Time": "NZDT",
      "New Zealand Standard Time": "NZST",
      "Newfoundland Daylight Time": "NDT",
      "Newfoundland Standard Time": "NST",
      "Niue Time": "NUT",
      "Norfolk Daylight Time": "NFDT",
      "Norfolk Island Time": "NFT",
      "Norfolk Time": "NFT",
      "November Time Zone": "N",
      "Novosibirsk Summer Time": "NOVST",
      "Novosibirsk Time": "NOVT",
      "Omsk Standard Time": "OMST",
      "Omsk Summer Time": "OMSST",
      "Oral Time": "ORAT",
      "Oscar Time Zone": "O",
      "Pacific Daylight Time": "PDT",
      "Pacific Standard Time": "PST",
      "Pacific Time": "PT",
      "Pakistan Standard Time": "PKT",
      "Palau Time": "PWT",
      "Papa Time Zone": "P",
      "Papua New Guinea Time": "PGT",
      "Paraguay Summer Time": "PYST",
      "Paraguay Time": "PYT",
      "Peru Time": "PET",
      "Petropavlovsk-Kamchatski Time": "PETT",
      "Philippine Time": "PHT",
      "Phoenix Island Time": "PHOT",
      "Phoenix Islands Time": "PHOT",
      "Pierre & Miquelon Daylight Time": "PMDT",
      "Pierre & Miquelon Standard Time": "PMST",
      "Pitcairn Standard Time": "PST",
      "Pohnpei Standard Time": "PONT",
      "Pyongyang Time": "PYT",
      "Quebec Time Zone": "Q",
      "Qyzylorda Time": "QYZT",
      "Reunion Time": "RET",
      "Romeo Time Zone": "R",
      "Rothera Time": "ROTT",
      "R\xE9union Time": "RET",
      "Sakhalin Time": "SAKT",
      "Samara Time": "SAMT",
      "Samoa Standard Time": "SST",
      "Seychelles Time": "SCT",
      "Sierra Time Zone": "S",
      "Singapore Time": "SGT",
      "Solomon Islands Time": "SBT",
      "South Africa Standard Time": "SAST",
      "South Georgia Time": "GST",
      "Srednekolymsk Time": "SRET",
      "St. Pierre & Miquelon Time": "PM",
      "Suriname Time": "SRT",
      "Syowa Time": "SYOT",
      "Tahiti Time": "TAHT",
      "Taipei Time": "TWT",
      "Tajikistan Time": "TJT",
      "Tango Time Zone": "T",
      "Tokelau Time": "TKT",
      "Tonga Summer Time": "TOST",
      "Tonga Time": "TOT",
      "Turkey Time": "TRT",
      "Turkmenistan Time": "TMT",
      "Tuvalu Time": "TVT",
      "Ulaanbaatar Summer Time": "ULAST",
      "Ulaanbaatar Time": "ULAT",
      "Uniform Time Zone": "U",
      "Uruguay Summer Time": "UYST",
      "Uruguay Time": "UYT",
      "Uzbekistan Time": "UZT",
      "Vanuatu Time": "VUT",
      "Venezuela Time": "VET",
      "Venezuelan Standard Time": "VET",
      "Victor Time Zone": "V",
      "Vladivostok Summer Time": "VLAST",
      "Vladivostok Time": "VLAT",
      "Vostok Time": "VOST",
      "Wake Island Time": "WAKT",
      "Wake Time": "WAKT",
      "Wallis & Futuna Time": "WFT",
      "Wallis and Futuna Time": "WFT",
      "West Africa Summer Time": "WAST",
      "West Africa Time": "WAT",
      "West Greenland Time": "WGT",
      "West Kazakhstan Time": "AQTT",
      "West Samoa Time": "WST",
      "Western Argentine Summer Time": "WARST",
      "Western European Summer Time": "WEST",
      "Western European Time": "WET",
      "Western Greenland Summer Time": "WGST",
      "Western Indonesia Time": "WIB",
      "Western Indonesian Time": "WIB",
      "Western Sahara Standard Time": "WT",
      "Western Sahara Summer Time": "WST",
      "Whiskey Time Zone": "W",
      "X-ray Time Zone": "X",
      "Yakutsk Summer Time": "YAKST",
      "Yakutsk Time": "YAKT",
      "Yankee Time Zone": "Y",
      "Yap Time": "YAPT",
      "Yekaterinburg Summer Time": "YEKST",
      "Yekaterinburg Time": "YEKT",
      "Yukon Time": "YT",
      "Zulu Time Zone": "Z"
    };
  }
});

// node_modules/@vvo/tzdb/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@vvo/tzdb/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "abbreviations", {
      enumerable: true,
      get: function() {
        return _abbreviations.default;
      }
    });
    Object.defineProperty(exports, "getTimeZones", {
      enumerable: true,
      get: function() {
        return _getTimeZones.default;
      }
    });
    Object.defineProperty(exports, "rawTimeZones", {
      enumerable: true,
      get: function() {
        return _rawTimeZones.default;
      }
    });
    Object.defineProperty(exports, "timeZonesNames", {
      enumerable: true,
      get: function() {
        return _timeZonesNames.default;
      }
    });
    var _rawTimeZones = _interopRequireDefault(require_raw_time_zones());
    var _timeZonesNames = _interopRequireDefault(require_time_zones_names());
    var _getTimeZones = _interopRequireDefault(require_getTimeZones());
    var _abbreviations = _interopRequireDefault(require_abbreviations());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// lib/index.js
var lib_exports = {};
__export(lib_exports, {
  default: () => lib_default
});
module.exports = __toCommonJS(lib_exports);
var import_axios5 = __toESM(require_axios2());

// lib/structures/system.js
var import_tinycolor2 = __toESM(require_tinycolor());
var import_axios = __toESM(require_axios2());
var import_valid_url = __toESM(require_valid_url());

// lib/utils.js
function validatePrivacy(keys, obj) {
  var priv = {};
  for (var k of keys) {
    if (obj[k] == null)
      continue;
    if (["private", "public"].includes(obj[k]))
      continue;
    priv[k] = obj[k] ? "public" : "private";
  }
  return priv;
}
function formatDate(d) {
  var y = ("000" + d.getFullYear()).slice(-4);
  var m = ("0" + (d.getMonth() + 1)).slice(-2);
  var d = ("0" + d.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
}

// lib/structures/system.js
var pKeys = [
  "description_privacy",
  "member_list_privacy",
  "group_list_privacy",
  "front_privacy",
  "front_history_privacy"
];
var KEYS = {
  id: {},
  uuid: {},
  name: {
    test: (n) => !n.length || n.length <= 100,
    err: "Name must be 100 characters or less"
  },
  description: {
    test: (d) => !d.length || d.length < 1e3,
    err: "Description must be 1000 characters or less"
  },
  tag: {},
  avatar_url: {
    test: async (a) => {
      if (!import_valid_url.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Avatar URL must be a valid image and less than 256 characters"
  },
  banner: {
    test: async (a) => {
      if (!import_valid_url.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Banner URL must be a valid image and less than 256 characters"
  },
  color: {
    test: (c) => {
      c = (0, import_tinycolor2.default)(c);
      return c.isValid();
    },
    err: "Color must be a valid hex code",
    transform: (c) => {
      c = (0, import_tinycolor2.default)(c);
      return c.toHex();
    }
  },
  created: {
    init: (d) => new Date(d)
  },
  privacy: {
    transform: (o) => validatePrivacy(pKeys, o)
  }
};
var System = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    for (var k in data) {
      if (KEYS[k]) {
        if (KEYS[k].init)
          data[k] = KEYS[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchSystem({ system: this.id, ...this, token });
    for (var k in data)
      if (KEYS[k])
        this[k] = data[k];
    return this;
  }
  async createMember(data) {
    var mem = await this.#api.createMember(data);
    if (!this.members)
      this.members = /* @__PURE__ */ new Map();
    this.members.set(mem.id, mem);
    return mem;
  }
  async getMember(member, token) {
    var mem = await this.#api.getMember({ member, token });
    if (!this.members)
      this.members = /* @__PURE__ */ new Map();
    this.members.set(mem.id, mem);
    return mem;
  }
  async getMembers(token) {
    var mems = await this.#api.getMembers({ system: this.id, token });
    this.members = mems;
    return mems;
  }
  async deleteMember(member, token) {
    await this.#api.deleteMember({ member, token });
    if (this.members)
      this.members.delete(member);
    return;
  }
  async createGroup(data) {
    var group = await this.#api.createGroup(data);
    if (!this.groups)
      this.groups = /* @__PURE__ */ new Map();
    this.groups.set(group.id, group);
    return group;
  }
  async getGroups(token) {
    var groups = await this.#api.getGroups({ system: this.id, token });
    this.groups = groups;
    return groups;
  }
  async getGroup(group, token) {
    var grp = await this.#api.getGroups({ system: this.id, group, token });
    if (!this.groups)
      this.groups = /* @__PURE__ */ new Map();
    this.groups.set(grp.id, grp);
    return grp;
  }
  async deleteGroup(group, token) {
    await this.#api.deleteGroup({ group, token });
    if (this.groups)
      this.groups.delete(group);
    return;
  }
  async createSwitch(data) {
    return this.#api.createSwitch(data);
  }
  async getSwitches(token, raw = false) {
    var switches = await this.#api.getSwitches({ system: this.id, token, raw });
    this.switches = switches;
    return switches;
  }
  async getFronters(token) {
    var fronters = await this.#api.getFronters({ system: this.id, token });
    this.fronters = fronters;
    return fronters;
  }
  async deleteSwitch(switchid, token) {
    await this.#api.deleteSwitch({ switch: switchid, token });
    if (this.switches)
      this.switches.delete(switchid);
    return;
  }
  async getSettings(token) {
    var settings = await this.#api.getSystemSettings({ token });
    this.config = settings;
    return settings;
  }
  async getGuildSettings(guild, token) {
    var settings = await this.#api.getSystemGuildSettings({ guild, token });
    if (!this.settings)
      this.settings = /* @__PURE__ */ new Map();
    this.settings.set(guild, settings);
    return settings;
  }
  async verify() {
    var sys = {};
    var errors = [];
    for (var k in KEYS) {
      var test = true;
      if (this[k] == null) {
        sys[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      if (KEYS[k].test)
        test = await KEYS[k].test(this[k]);
      if (!test) {
        errors.push(KEYS[k].err);
        continue;
      }
      if (KEYS[k].transform)
        this[k] = KEYS[k].transform(this[k]);
      sys[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return sys;
  }
};

// lib/structures/member.js
var import_tinycolor22 = __toESM(require_tinycolor());
var import_valid_url2 = __toESM(require_valid_url());
var import_axios2 = __toESM(require_axios2());
var chrono = __toESM(require_dist());
var parser = chrono.casual.clone();
parser.refiners.push({
  refine: (ctx, res) => {
    res.forEach((r) => {
      if (!r.start.isCertain("year"))
        r.start.assign("year", 2004);
    });
    return res;
  }
});
function hasKeys(obj, keys) {
  if (typeof obj !== "object")
    return false;
  var okeys = Object.keys(obj);
  for (var k of keys)
    if (!okeys.includes(k))
      return false;
  return true;
}
var pKeys2 = [
  "visibility",
  "name_privacy",
  "description_privacy",
  "birthday_privacy",
  "pronoun_privacy",
  "avatar_privacy",
  "metadata_privacy"
];
var KEYS2 = {
  id: {},
  uuid: {},
  system: {},
  name: {
    test: (n) => {
      console.log(n);
      return n != void 0 && (n.length && n.length <= 100);
    },
    err: "Name must be present and 100 characters or less",
    required: true
  },
  display_name: {
    test: (n) => !n.length || n.length <= 100,
    err: "Display name must be 100 characters or less"
  },
  description: {
    test: (d) => !d.length || d.length < 1e3,
    err: "Description must be 1000 characters or less"
  },
  pronouns: {
    test: (p) => !p.length || p.length <= 100,
    err: "Pronouns must be 100 characters or less"
  },
  color: {
    test: (c) => {
      c = (0, import_tinycolor22.default)(c);
      return c.isValid();
    },
    err: "Color must be a valid hex code",
    transform: (c) => {
      c = (0, import_tinycolor22.default)(c);
      return c.toHex();
    }
  },
  avatar_url: {
    test: async (a) => {
      if (!import_valid_url2.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios2.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Avatar URL must be a valid image and less than 256 characters"
  },
  banner: {
    test: async (a) => {
      if (!import_valid_url2.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios2.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Banner URL must be a valid image and less than 256 characters"
  },
  birthday: {
    test: (d) => {
      if (d instanceof Date)
        return true;
      d = new Date(parser.parseDate(d));
      return !isNaN(d.valueOf());
    },
    err: "Birthday must be a valid date",
    transform: (d) => {
      if (!d)
        return d;
      var date;
      if (!(d instanceof Date))
        date = parser.parseDate(d);
      else
        date = d;
      return formatDate(date);
    },
    init: (d) => d ? new Date(d) : d
  },
  proxy_tags: {
    test: (p) => typeof p == "object" && !p.some((t) => !hasKeys(t, ["prefix", "suffix"])),
    err: "Proxy tags must be an array of objects containing 'prefix' and 'suffix' keys"
  },
  keep_proxy: {
    test: (v) => typeof v == "boolean",
    err: "Keep proxy must be a boolean (true or false)"
  },
  created: {
    init: (d) => new Date(d)
  },
  privacy: {
    transform: (o) => validatePrivacy(pKeys2, o)
  }
};
var Member = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    for (var k in data) {
      if (KEYS2[k]) {
        if (KEYS2[k].init)
          data[k] = KEYS2[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchMember({ member: this.id, ...this, token });
    for (var k in data)
      if (KEYS2[k])
        this[k] = data[k];
    return this;
  }
  async delete(token) {
    return await this.#api.deleteMember({ member: this.id, token });
  }
  async getGroups(token) {
    var groups = await this.#api.getMemberGroups({ member: this.id, token });
    this.groups = groups;
    return groups;
  }
  async addGroups(groups, token) {
    await this.#api.addMemberGroups({ member: this.id, groups, token });
    var grps = await this.getGroups(token);
    this.groups = grps;
    return grps;
  }
  async removeGroups(groups, token) {
    await this.#api.removeMemberGroups({ member: this.id, groups, token });
    var grps = await this.getGroups(token);
    this.groups = grps;
    return grps;
  }
  async setGroups(groups, token) {
    await this.#api.setMemberGroups({ member: this.id, groups, token });
    var grps = await this.getGroups(token);
    this.groups = grps;
    return grps;
  }
  async getGuildSettings(guild, token) {
    var settings = await this.#api.getMemberGuildSettings({ member: this.id, guild, token });
    if (!this.settings)
      this.settings = /* @__PURE__ */ new Map();
    this.settings.set(guild, settings);
    return settings;
  }
  async verify() {
    var mem = {};
    var errors = [];
    for (var k in KEYS2) {
      if (!KEYS2[k].required) {
        if (this[k] == null) {
          mem[k] = this[k];
          continue;
        }
        if (this[k] == void 0)
          continue;
      }
      var test = true;
      if (KEYS2[k].test)
        test = await KEYS2[k].test(this[k]);
      if (!test) {
        errors.push(KEYS2[k].err);
      }
      if (KEYS2[k].transform)
        this[k] = KEYS2[k].transform(this[k]);
      mem[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return mem;
  }
};

// lib/structures/group.js
var import_axios3 = __toESM(require_axios2());
var import_valid_url3 = __toESM(require_valid_url());
var pKeys3 = [
  "description_privacy",
  "icon_privacy",
  "list_privacy",
  "visibility"
];
var KEYS3 = {
  id: {},
  uuid: {},
  name: {
    test: (n) => !n.length || n.length <= 100,
    err: "Name must be 100 characters or less"
  },
  display_name: {
    test: (n) => !n.length || n.length <= 100,
    err: "Display name must be 100 characters or less"
  },
  description: {
    test: (d) => !d.length || d.length < 1e3,
    err: "Description must be 1000 characters or less"
  },
  icon: {
    test: async (a) => {
      if (!import_valid_url3.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios3.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Icon URL must be a valid image and less than 256 characters"
  },
  banner: {
    test: async (a) => {
      if (a.length > 256)
        return false;
      if (!import_valid_url3.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios3.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Banner URL must be a valid image and less than 256 characters"
  },
  color: {
    test: (c) => {
      c = tc(c);
      return c.isValid();
    },
    err: "Color must be a valid hex code",
    transform: (c) => {
      c = tc(c);
      return c.toHex();
    }
  },
  created: {
    init: (d) => new Date(d)
  },
  privacy: {
    transform: (o) => validatePrivacy(pKeys3, o)
  }
};
var Group = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    for (var k in data) {
      if (KEYS3[k]) {
        if (KEYS3[k].init)
          data[k] = KEYS3[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchGroup({ group: this.id, ...this, token });
    for (var k in data)
      if (KEYS3[k])
        this[k] = data[k];
    return this;
  }
  async delete(token) {
    return await this.#api.deleteGroup({ group: this.id, token });
  }
  async getMembers(token) {
    var mems = await this.#api.getGroupMembers({ group: this.id, token });
    this.members = mems;
    return mems;
  }
  async addMembers(members, token) {
    await this.#api.addGroupMembers({ group: this.id, members, token });
    var mems = await this.getMembers(token);
    this.members = mems;
    return mems;
  }
  async removeMembers(members, token) {
    await this.#api.removeGroupMembers({ group: this.id, members, token });
    var mems = await this.getMembers(token);
    this.members = mems;
    return mems;
  }
  async setMembers(members, token) {
    await this.#api.setGroupMembers({ group: this.id, members, token });
    var mems = await this.getMembers(token);
    this.members = mems;
    return mems;
  }
  async verify() {
    var group = {};
    var errors = [];
    for (var k in KEYS3) {
      var test = true;
      if (this[k] == null) {
        group[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      if (KEYS3[k].test)
        test = await KEYS3[k].test(this[k]);
      if (!test) {
        errors.push(KEYS3[k].err);
        continue;
      }
      if (KEYS3[k].transform)
        this[k] = KEYS3[k].transform(this[k]);
      group[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return group;
  }
};

// lib/structures/switch.js
var KEYS4 = {
  id: {},
  timestamp: {
    init: (t) => new Date(t)
  },
  members: {
    transform: (mems) => {
      var arr = [];
      if (mems.values)
        for (var m of mems.values())
          arr.push(m.id ?? m);
      else
        arr = mems.map((m2) => m2.id ?? m2);
      return arr;
    }
  }
};
var Switch = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    if (!data.timestamp || !data.members)
      throw new Error("Switch objects require a timestamp and members key");
    for (var k in data) {
      if (KEYS4[k]) {
        if (KEYS4[k].init)
          data[k] = KEYS4[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patchTimestamp(timestamp, token) {
    var data = await this.#api.patchSwitchTimestamp({ switch: this.id, timestamp, token });
    for (var k in data)
      if (KEYS4[k])
        this[k] = data[k];
    return this;
  }
  async patchMembers(token, members) {
    var data = await this.#api.patchSwitchMembers({ switch: this.id, members, token });
    for (var k in data)
      if (KEYS4[k])
        this[k] = data[k];
    return this;
  }
  async delete(token) {
    return await this.#api.deleteSwitch({ switch: this.id, token });
  }
  async verify() {
    var sw = {};
    var errors = [];
    for (var k in KEYS4) {
      if (this[k] == null) {
        sw[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      var test = true;
      if (KEYS4[k].test)
        test = await KEYS4[k].test(this[k]);
      if (!test) {
        errors.push(KEYS4[k].err);
      }
      if (KEYS4[k].transform)
        this[k] = KEYS4[k].transform(this[k]);
      sw[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return sw;
  }
};

// lib/structures/message.js
var KEYS5 = {
  timestamp: {
    init: (t) => new Date(t)
  },
  id: {},
  original: {},
  sender: {},
  channel: {},
  system: {
    init: (s, api) => s ? new System(api, s) : null
  },
  member: {
    init: (m, api) => m ? new Member(api, m) : null
  }
};
var Message = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    for (var k in data) {
      if (KEYS5[k]) {
        if (KEYS5[k].init)
          data[k] = KEYS5[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
};

// lib/structures/systemSettings.js
var import_tzdb = __toESM(require_dist2());
function findTz(t) {
  var raw = import_tzdb.rawTimeZones.find((z) => {
    return [
      z.name.toLowerCase(),
      z.abbreviation.toLowerCase(),
      z.alternativeName.toLowerCase()
    ].includes(t.toLowerCase().replace("utc", "gmt"));
  });
  return raw;
}
var KEYS6 = {
  timezone: {
    test: (t) => findTz(t),
    err: "Timezone must be valid",
    transform: (t) => {
      var raw = findTz(t);
      return raw.abbreviation.replace("GMT", "UTC");
    }
  },
  pings_enabled: {
    transform: (v) => v ? true : false
  },
  latch_timeout: {
    test: (v) => !isNaN(v)
  },
  member_default_private: {
    transform: (v) => v ? true : false
  },
  group_default_prviate: {
    transform: (v) => v ? true : false
  },
  member_limit: {},
  group_limit: {}
};
var SystemSettings = class {
  #api;
  constructor(api, data = {}) {
    this.#api = api;
    for (var k in data) {
      if (KEYS6[k]) {
        if (KEYS6[k].init)
          data[k] = KEYS6[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchSystemSettings({ ...this, token });
    for (var k in data)
      if (KEYS6[k])
        this[k] = data[k];
    return this;
  }
  async verify() {
    var settings = {};
    var errors = [];
    for (var k in KEYS6) {
      var test = true;
      if (this[k] == null) {
        settings[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      if (KEYS6[k].test)
        test = await KEYS6[k].test(this[k]);
      if (!test) {
        errors.push(KEYS6[k].err);
        continue;
      }
      if (KEYS6[k].transform)
        this[k] = KEYS6[k].transform(this[k]);
      settings[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return settings;
  }
};

// lib/structures/systemGuildSettings.js
var apVals = [
  "off",
  "front",
  "latch",
  "member"
];
var KEYS7 = {
  guild: {},
  proxying_enabled: {
    transform: (v) => v ? true : false
  },
  autoproxy_mode: {
    test: (s) => apVals.includes(s),
    err: `Valid autoproxy mode values: ${apVals.join(", ")}`
  },
  autoproxy_member: {},
  tag: {
    test: (s) => s.length <= 79,
    err: "Server tag must be 79 characters or less"
  },
  tag_enabled: {
    transform: (v) => v ? true : false
  }
};
var SystemGuildSettings = class {
  #api;
  constructor(api, data = {}) {
    this.#api = api;
    for (var k in data) {
      if (KEYS7[k]) {
        if (KEYS7[k].init)
          data[k] = KEYS7[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchSystemGuildSettings({ ...this, token });
    for (var k in data)
      if (KEYS7[k])
        this[k] = data[k];
    return this;
  }
  async verify() {
    var settings = {};
    var errors = [];
    for (var k in KEYS7) {
      var test = true;
      if (this[k] == null) {
        settings[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      if (KEYS7[k].test)
        test = await KEYS7[k].test(this[k]);
      if (!test) {
        errors.push(KEYS7[k].err);
        continue;
      }
      if (KEYS7[k].transform)
        this[k] = KEYS7[k].transform(this[k]);
      settings[k] = this[k];
    }
    if (settings.autoproxy_mode == "member" && !settings.autoproxy_member)
      errors.push('Autoproxy member MUSt be supplied if mode is set to "member"');
    if (errors.length)
      throw new Error(errors.join("\n"));
    return settings;
  }
};

// lib/structures/memberGuildSettings.js
var import_axios4 = __toESM(require_axios2());
var import_valid_url4 = __toESM(require_valid_url());
var KEYS8 = {
  guild: {},
  display_name: {
    test: (s) => s.length <= 100,
    err: "Display name must be 100 characters or less"
  },
  avatar_url: {
    test: async (a) => {
      if (!import_valid_url4.default.isWebUri(a))
        return false;
      try {
        var data = await import_axios4.default.head(a);
        if (data.headers["content-type"]?.startsWith("image"))
          return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    err: "Avatar URL must be a valid image and less than 256 characters"
  }
};
var MemberGuildSettings = class {
  #api;
  constructor(api, data) {
    this.#api = api;
    for (var k in data) {
      if (KEYS8[k]) {
        if (KEYS8[k].init)
          data[k] = KEYS8[k].init(data[k]);
        this[k] = data[k];
      }
    }
  }
  async patch(token) {
    var data = await this.#api.patchMemberGuildSettings({ ...this, token });
    for (var k in data)
      if (KEYS8[k])
        this[k] = data[k];
    return this;
  }
  async verify() {
    var settings = {};
    var errors = [];
    for (var k in KEYS8) {
      var test = true;
      if (this[k] == null) {
        settings[k] = this[k];
        continue;
      }
      if (this[k] == void 0)
        continue;
      if (KEYS8[k].test)
        test = await KEYS8[k].test(this[k]);
      if (!test) {
        errors.push(KEYS8[k].err);
        continue;
      }
      if (KEYS8[k].transform)
        this[k] = KEYS8[k].transform(this[k]);
      settings[k] = this[k];
    }
    if (errors.length)
      throw new Error(errors.join("\n"));
    return settings;
  }
};

// lib/structures/apiError.js
var APIError = class {
  constructor(api, data = {}) {
    this.api = {
      baseURL: api.base_url,
      token: api.token,
      version: api.version
    };
    this.status = data.status || "???";
    this.code = data.data?.code || "???";
    this.message = data.data?.message || "Unknown error.";
    this.statusText = data.statusText || "Unknown error.";
    this.headers = data.headers || {};
  }
};

// lib/routes.js
var ROUTES = {
  1: {
    GET_SYSTEM: (sid) => ({ method: "GET", route: `/s/${sid}` }),
    GET_OWN_SYSTEM: () => ({ method: "GET", route: `/s` }),
    GET_ACCOUNT: (aid) => ({ method: "GET", route: `/a/${aid}` }),
    PATCH_SYSTEM: () => ({ method: "PATCH", route: `/s` }),
    ADD_MEMBER: () => ({ method: "POST", route: `/m` }),
    GET_MEMBER: (mid) => ({ method: "GET", route: `/m/${mid}` }),
    GET_MEMBERS: (sid) => ({ method: "GET", route: `/s/${sid}/members` }),
    PATCH_MEMBER: (mid) => ({ method: "PATCH", route: `/m/${mid}` }),
    DELETE_MEMBER: (mid) => ({ method: "DELETE", route: `/m/${mid}` }),
    ADD_SWITCH: () => ({ method: "POST", route: `/s/switches` }),
    GET_SWITCHES: (sid) => ({ method: "GET", route: `/s/${sid}/switches` }),
    GET_FRONTERS: (sid) => ({ method: "GET", route: `/s/${sid}/fronters` }),
    GET_MESSAGE: (mid) => ({ method: "GET", route: `/msg/${mid}` })
  },
  2: {
    GET_SYSTEM: (sid) => ({ method: "GET", route: `/systems/${sid}` }),
    GET_OWN_SYSTEM: () => ({ method: "GET", route: `/systems/@me` }),
    GET_ACCOUNT: (sid) => ({ method: "GET", route: `/systems/${sid}` }),
    ADD_MEMBER: () => ({ method: "POST", route: `/members` }),
    GET_MEMBER: (mid) => ({ method: "GET", route: `/members/${mid}` }),
    GET_MEMBERS: (sid) => ({ method: "GET", route: `/systems/${sid}/members` }),
    PATCH_MEMBER: (mid) => ({ method: "PATCH", route: `/members/${mid}` }),
    DELETE_MEMBER: (mid) => ({ method: "DELETE", route: `/members/${mid}` }),
    ADD_GROUP: () => ({ method: "POST", route: `/groups` }),
    GET_GROUPS: (sid) => ({ method: "GET", route: `/systems/${sid}/groups` }),
    GET_GROUP: (gid) => ({ method: "GET", route: `/groups/${gid}` }),
    PATCH_GROUP: (gid) => ({ method: "PATCH", route: `/groups/${gid}` }),
    DELETE_GROUP: (gid) => ({ method: "DELETE", route: `/groups/${gid}` }),
    GET_GROUP_MEMBERS: (gid) => ({ method: "GET", route: `/groups/${gid}/members` }),
    ADD_GROUP_MEMBERS: (gid) => ({ method: "POST", route: `/groups/${gid}/members/add` }),
    REMOVE_GROUP_MEMBERS: (gid) => ({ method: "POST", route: `/groups/${gid}/members/remove` }),
    SET_GROUP_MEMBERS: (gid) => ({ method: "POST", route: `/groups/${gid}/members/overwrite` }),
    GET_MEMBER_GROUPS: (mid) => ({ method: "GET", route: `/members/${mid}/groups` }),
    ADD_MEMBER_GROUPS: (mid) => ({ method: "POST", route: `/members/${mid}/groups/add` }),
    REMOVE_MEMBER_GROUPS: (mid) => ({ method: "POST", route: `/members/${mid}/groups/remove` }),
    SET_MEMBER_GROUPS: (mid) => ({ method: "POST", route: `/members/${mid}/groups/overwrite` }),
    ADD_SWITCH: () => ({ method: "POST", route: `/systems/@me/switches` }),
    GET_SWITCHES: (sid) => ({ method: "GET", route: `/systems/${sid}/switches` }),
    GET_FRONTERS: (sid) => ({ method: "GET", route: `/systems/${sid}/fronters` }),
    GET_SWITCH: (sid, swid) => ({ method: "GET", route: `/systems/${sid}/switches/${swid}` }),
    PATCH_SWITCH: (swid) => ({ method: "PATCH", route: `/systems/@me/switches/${swid}` }),
    PATCH_SWITCH_MEMBERS: (swid) => ({ method: "PATCH", route: `/systems/@me/switches/${swid}/members` }),
    DELETE_SWITCH: (swid) => ({ method: "DELETE", route: `/systems/@me/switches/${swid}` }),
    GET_SYSTEM_SETTINGS: () => ({ method: "GET", route: `/systems/@me/settings` }),
    PATCH_SYSTEM_SETTINGS: () => ({ method: "PATCH", route: `/systems/@me/settings` }),
    GET_SYSTEM_GUILD_SETTINGS: (gid) => ({ method: "GET", route: `/systems/@me/guilds/${gid}` }),
    PATCH_SYSTEM_GUILD_SETTINGS: (gid) => ({ method: "PATCH", route: `/systems/@me/guilds/${gid}` }),
    GET_MEMBER_GUILD_SETTINGS: (mid, gid) => ({ method: "GET", route: `/members/${mid}/guilds/${gid}` }),
    PATCH_MEMBER_GUILD_SETTINGS: (mid, gid) => ({ method: "PATCH", route: `/members/${mid}/guilds/${gid}` }),
    GET_MESSAGE: (mid) => ({ method: "GET", route: `/messages/${mid}` })
  }
};
var routes_default = ROUTES;

// lib/index.js
var PKAPI = class {
  #token;
  #inst;
  #_base;
  #_version;
  #version_warning = false;
  constructor(data = {}) {
    this.#_base = data.base_url || "https://api.pluralkit.me";
    this.#_version = data.version || 2;
    this.#token = data.token;
    this.#inst = import_axios5.default.create({
      validateStatus: (s) => s < 300 && s > 100,
      baseURL: `${this.#_base}/v${this.#_version}`
    });
  }
  async getSystem(data = {}) {
    var token = this.#token || data.token;
    if (data.system == null && !token)
      throw new Error("Must provide a token or ID.");
    var sys;
    var resp;
    try {
      if (token) {
        resp = await this.handle(routes_default[this.#_version].GET_OWN_SYSTEM(), { token });
        sys = new System(this, resp.data);
      } else {
        if (data.system.length > 5)
          resp = await this.handle(routes_default[this.#_version].GET_ACCOUNT(data.system));
        else
          resp = await this.handle(routes_default[this.#_version].GET_SYSTEM(data.system));
        sys = new System(this, resp.data);
      }
      if (data.fetch) {
        if (data.fetch.includes("members"))
          sys.members = await sys.getMembers(token);
        if (data.fetch.includes("fronters"))
          sys.fronters = await sys.getFronters(token);
        if (data.fetch.includes("switches"))
          sys.switches = await sys.getSwitches(token, data.raw);
        if (data.fetch.includes("groups"))
          sys.groups = await sys.getGroups(token);
        if (data.fetch.includes("settings"))
          sys.config = await sys.getSettings(token);
      }
    } catch (e) {
      throw e;
    }
    return sys;
  }
  async getAccount(data = {}) {
    return await this.getSystem(data);
  }
  async patchSystem(data = {}) {
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    try {
      var sys = data instanceof System ? data : new System(this, data);
      var body = await sys.verify();
      sys = await this.handle(routes_default[this.#_version].PATCH_SYSTEM(), { token, body });
    } catch (e) {
      throw e;
    }
    return new System(this, sys.data);
  }
  async getSystemSettings(data = {}) {
    if (this.version < 2)
      throw new Error("System settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("Getting system settings requires a token.");
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_SYSTEM_SETTINGS(), { token });
    } catch (e) {
      throw e;
    }
    return new SystemSettings(this, resp.data);
  }
  async patchSystemSettings(data = {}) {
    if (this.version < 2)
      throw new Error("System settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    try {
      var settings = data instanceof SystemSettings ? data : new SystemSettings(this, data);
      var body = await settings.verify();
      settings = await this.handle(
        routes_default[this.#_version].PATCH_SYSTEM_SETTINGS(),
        { token, body }
      );
    } catch (e) {
      throw e;
    }
    return new SystemSettings(this, settings.data);
  }
  async getSystemGuildSettings(data = {}) {
    if (this.version < 2)
      throw new Error("Guild settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("Getting guild settings requires a token.");
    if (!data.guild)
      throw new Error("Must provide a guild ID.");
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_SYSTEM_GUILD_SETTINGS(data.guild), { token });
    } catch (e) {
      throw e;
    }
    return new SystemGuildSettings(this, { ...resp.data, guild: data.guild });
  }
  async patchSystemGuildSettings(data = {}) {
    if (this.version < 2)
      throw new Error("Guild settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    if (!data.guild)
      throw new Error("Must provide a guild ID.");
    try {
      var settings = data instanceof SystemGuildSettings ? data : new SystemGuildSettings(this, data);
      var body = await settings.verify();
      settings = await this.handle(
        routes_default[this.#_version].PATCH_SYSTEM_GUILD_SETTINGS(data.guild),
        { token, body }
      );
    } catch (e) {
      throw e;
    }
    return new SystemGuildSettings(this, { ...settings.data, guild: data.guild });
  }
  async createMember(data = {}) {
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    try {
      var mem = new Member(this, data);
      var body = await mem.verify();
      mem = await this.handle(routes_default[this.#_version].ADD_MEMBER(), { token, body });
    } catch (e) {
      throw e;
    }
    return new Member(this, mem.data);
  }
  async getMember(data = {}) {
    if (data.member == null)
      throw new Error("Must provide a member ID.");
    var token = this.#token || data.token;
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_MEMBER(data.member), { token });
    } catch (e) {
      throw e;
    }
    return new Member(this, resp.data);
  }
  async getMembers(data = {}) {
    var token = this.#token || data.token;
    var system = data.system ?? "@me";
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_MEMBERS(system), { token });
    } catch (e) {
      throw e;
    }
    var mems = resp.data.map((m) => [m.id, new Member(this, m)]);
    return new Map(mems);
  }
  async patchMember(data = {}) {
    if (data.member == null)
      throw new Error("Must provide a member ID.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    try {
      var mem = data instanceof Member ? data : new Member(this, data);
      var body = await mem.verify();
      mem = await this.handle(routes_default[this.#_version].PATCH_MEMBER(data.member), { token, body });
    } catch (e) {
      throw e;
    }
    return new Member(this, mem.data);
  }
  async deleteMember(data = {}) {
    if (data.member == null)
      throw new Error("Must provide a member ID.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("DELETE requires a token.");
    try {
      var resp = await this.handle(routes_default[this.#_version].DELETE_MEMBER(data.member), { token });
    } catch (e) {
      throw e;
    }
    return null;
  }
  async getMemberGroups(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!data.member)
      throw new Error("Must provide a member ID.");
    try {
      var resp = await this.handle(
        routes_default[this.#_version].GET_MEMBER_GROUPS(data.member),
        { token }
      );
    } catch (e) {
      throw e;
    }
    var groups = resp.data.map((g) => [g.id, new Group(this, g)]);
    return new Map(groups);
  }
  async addMemberGroups(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.member)
      throw new Error("Must provide a member ID.");
    if (!data.groups || !Array.isArray(data.groups))
      throw new Error("Must provide an array of groups.");
    var groups = data.groups;
    if (groups.find((g) => g instanceof Group))
      groups = groups.map((g) => g.id ?? g);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].ADD_MEMBER_GROUPS(data.member),
        { token, body: groups }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async removeMemberGroups(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.member)
      throw new Error("Must provide a member ID.");
    if (!data.groups || !Array.isArray(data.groups))
      throw new Error("Must provide an array of groups.");
    var groups = data.groups;
    if (groups.find((g) => g instanceof Group))
      groups = groups.map((g) => g.id ?? g);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].REMOVE_MEMBER_GROUPS(data.member),
        { token, body: groups }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async setMemberGroups(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.member)
      throw new Error("Must provide a member ID.");
    if (!data.groups || !Array.isArray(data.groups))
      throw new Error("Must provide an array of groups.");
    var groups = data.groups;
    if (groups.find((g) => g instanceof Group))
      groups = groups.map((g) => g.id ?? g);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].SET_MEMBER_GROUPS(data.member),
        { token, body: groups }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async getMemberGuildSettings(data = {}) {
    if (this.version < 2)
      throw new Error("Guild settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("Getting guild settings requires a token.");
    if (!data.member)
      throw new Error("Must provide a member ID.");
    if (!data.guild)
      throw new Error("Must provide a guild ID.");
    try {
      var resp = await this.handle(
        routes_default[this.#_version].GET_MEMBER_GUILD_SETTINGS(data.member, data.guild),
        { token }
      );
    } catch (e) {
      throw e;
    }
    return new MemberGuildSettings(this, { ...resp.data, guild: data.guild });
  }
  async patchMemberGuildSettings(data = {}) {
    if (this.version < 2)
      throw new Error("Guild settings are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("Getting guild settings requires a token.");
    if (!data.member)
      throw new Error("Must provide a member ID.");
    if (!data.guild)
      throw new Error("Must provide a guild ID.");
    try {
      var settings = data instanceof MemberGuildSettings ? data : new MemberGuildSettings(this, data);
      var body = await settings.verify();
      settings = await this.handle(
        routes_default[this.#_version].PATCH_MEMBER_GUILD_SETTINGS(data.member, data.guild),
        { token, body }
      );
    } catch (e) {
      throw e;
    }
    return new MemberGuildSettings(this, { ...settings.data, guild: data.guild });
  }
  async createGroup(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    try {
      var group = new Group(this, data);
      var body = await group.verify();
      group = await this.handle(routes_default[this.#_version].ADD_GROUP(), { token, body });
    } catch (e) {
      throw e;
    }
    return new Group(this, group.data);
  }
  async getGroups(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    var system = data.system ?? "@me";
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_GROUPS(system), { token });
    } catch (e) {
      throw e;
    }
    var groups = resp.data.map((g) => [g.id, new Group(this, g)]);
    return new Map(groups);
  }
  async getGroup(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!data.group)
      throw new Error("Must provide group ID.");
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_GROUP(data.group), { token });
      var group = new Group(this, resp.data);
      if (data.fetch_members)
        group.members = await group.getMembers();
    } catch (e) {
      throw e;
    }
    return group;
  }
  async patchGroup(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    if (data.group == null)
      throw new Error("Must provide a group ID.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    try {
      var group = data instanceof Group ? data : new Group(this, data);
      var body = await group.verify();
      group = await this.handle(routes_default[this.#_version].PATCH_GROUP(data.group), { token, body });
    } catch (e) {
      throw e;
    }
    return new Group(this, group.data);
  }
  async deleteGroup(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    if (data.group == null)
      throw new Error("Must provide a group ID.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("DELETE requires a token.");
    try {
      await this.handle(routes_default[this.#_version].DELETE_GROUP(data.group), { token });
    } catch (e) {
      throw e;
    }
    return;
  }
  async getGroupMembers(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!data.group)
      throw new Error("Must provide a group ID.");
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_GROUP_MEMBERS(data.group));
    } catch (e) {
      throw e;
    }
    var mems = resp.data.map((m) => [m.id, new Member(this, m)]);
    return new Map(mems);
  }
  async addGroupMembers(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.group)
      throw new Error("Must provide a group ID.");
    if (!data.members || !Array.isArray(data.members))
      throw new Error("Must provide an array of members.");
    var members = data.members;
    if (members.find((g) => g instanceof Member))
      members = members.map((m) => m.id ?? m);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].ADD_GROUP_MEMBERS(data.group),
        { token, body: members }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async removeGroupMembers(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.group)
      throw new Error("Must provide a group ID.");
    if (!data.members || !Array.isArray(data.members))
      throw new Error("Must provide an array of members.");
    var members = data.members;
    if (members.find((g) => g instanceof Member))
      members = members.map((m) => m.id ?? m);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].REMOVE_GROUP_MEMBERS(data.group),
        { token, body: members }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async setGroupMembers(data = {}) {
    if (this.version < 2)
      throw new Error("Groups are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    if (!data.group)
      throw new Error("Must provide a group ID.");
    if (!data.members || !Array.isArray(data.members))
      throw new Error("Must provide an array of members.");
    var members = data.members;
    if (members.find((g) => g instanceof Member))
      members = members.map((m) => m.id ?? m);
    try {
      var resp = await this.handle(
        routes_default[this.#_version].SET_GROUP_MEMBERS(data.group),
        { token, body: members }
      );
    } catch (e) {
      throw e;
    }
    return;
  }
  async createSwitch(data = {}) {
    var token = this.#token || data.token;
    if (!token)
      throw new Error("POST requires a token.");
    var body = { members: [] };
    if (data.members) {
      for (var m of data.members)
        body.members.push(m.id ?? m);
    }
    try {
      var resp = await this.handle(routes_default[this.#_version].ADD_SWITCH(), { token, body });
    } catch (e) {
      throw e;
    }
    if (this.#_version < 2)
      return;
    return new Switch(this, {
      ...resp.data,
      members: new Map(resp.data.members.map((m2) => [m2.id, new Member(this, m2)]))
    });
  }
  async getSwitches(data = {}) {
    var system = data.system ?? "@me";
    var token = this.#token || data.token;
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_SWITCHES(system), { token });
      if (!data.raw)
        var membs = await this.handle(routes_default[this.#_version].GET_MEMBERS(system), { token });
    } catch (e) {
      throw e;
    }
    if (!data.raw) {
      membs = new Map(membs.data.map((m2) => [m2.id, new Member(this, m2)]));
      var switches = [];
      for (var s of resp.data) {
        var members = /* @__PURE__ */ new Map();
        for (var m of s.members)
          if (membs.get(m))
            members.set(m, membs.get(m));
        s.members = members;
        switches.push(new Switch(this, s));
      }
    } else
      switches = resp.data.map((s2) => new Switch(this, s2));
    if (this.#_version < 2)
      return switches;
    else
      return new Map(switches.map((s2) => [s2.id, s2]));
  }
  async getSwitch(data = {}) {
    if (this.version < 2)
      throw new Error("Individual switches are only available for API version 2.");
    var token = this.#token || data.token;
    var system = data.system ?? "@me";
    if (!data.switch)
      throw new Error("Must provide a switch ID.");
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_SWITCH(system, data.switch));
    } catch (e) {
      throw e;
    }
    return new Switch(this, {
      ...resp.data,
      members: new Map(resp.data.members.map((m) => [m.id, new Member(this, m)]))
    });
  }
  async getFronters(data = {}) {
    var token = this.#token || data.token;
    var system = data.system ?? "@me";
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_FRONTERS(system), { token });
    } catch (e) {
      throw e;
    }
    return new Switch(this, {
      ...resp.data,
      members: new Map(resp.data.members.map((m) => [m.id, new Member(this, m)]))
    });
  }
  async patchSwitchTimestamp(data = {}) {
    if (this.version < 2)
      throw new Error("Individual switches are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    if (!data.switch)
      throw new Error("Must provide a switch ID.");
    if (!data.timestamp)
      throw new Error("Must provide a timestamp.");
    try {
      var sw = await this.handle(routes_default[this.#_version].PATCH_SWITCH(data.switch), {
        token,
        body: { timestamp: data.timestamp }
      });
    } catch (e) {
      throw e;
    }
    return new Switch(this, {
      ...sw.data,
      members: new Map(sw.data.members.map((m) => [m.id, new Member(this, m)]))
    });
  }
  async patchSwitchMembers(data = {}) {
    if (this.version < 2)
      throw new Error("Individual switches are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("PATCH requires a token.");
    if (!data.switch)
      throw new Error("Must provide a switch ID.");
    try {
      var s = data instanceof Switch ? data : new Switch(this, data);
      s = await s.verify();
      if (s.members && !Array.isArray(s.members))
        throw new Error("Members must be an array or map if provided.");
      var sw = await this.handle(routes_default[this.#_version].PATCH_SWITCH_MEMBERS(data.switch), {
        token,
        body: s.members ?? []
      });
    } catch (e) {
      throw e;
    }
    return new Switch(this, {
      ...sw.data,
      members: new Map(sw.data.members.map((m) => [m.id, new Member(this, m)]))
    });
  }
  async deleteSwitch(data = {}) {
    if (this.version < 2)
      throw new Error("Individual switches are only available for API version 2.");
    var token = this.#token || data.token;
    if (!token)
      throw new Error("DELETE requires a token.");
    if (!data.switch)
      throw new Error("Must provide a switch ID.");
    try {
      await this.handle(routes_default[this.#_version].DELETE_SWITCH(data.switch));
    } catch (e) {
      throw e;
    }
    return;
  }
  async getMessage(data = {}) {
    if (data.message == null)
      throw new Error("Must provide a message ID.");
    var token = this.#token || data.token;
    try {
      var resp = await this.handle(routes_default[this.#_version].GET_MESSAGE(data.message), { token });
    } catch (e) {
      throw e;
    }
    return new Message(this, resp.data);
  }
  async handle(path, options = {}) {
    var { route, method } = path;
    var headers = options.headers || {};
    var request = { method, headers };
    var token = this.#token || options.token;
    if (token)
      request.headers["Authorization"] = token;
    if (options.body) {
      request.headers["content-type"] = "application/json";
      request.data = JSON.stringify(options.body);
    }
    if (this.version == 1 && !this.#version_warning) {
      console.warn(
        "WARNING: API version 1 is considered officially deprecated. Support for this API version may be removed from this wrapper in a future version. Some methods may not fully work for v1 as well. USE v1 at your own risk!"
      );
      this.#version_warning = true;
    }
    try {
      var resp = await this.#inst(route, request);
    } catch (e) {
      console.log(e);
      throw new APIError(this, e.response);
    }
    return resp;
  }
  set base_url(s) {
    this.#_base = s;
    this.#inst.defaults.baseURL = `${this._base}/v${this._version}`;
  }
  get base_url() {
    return this.#_base;
  }
  set version(n) {
    this.#_version = n;
    this.#inst.defaults.baseURL = `${this._base}/v${this._version}`;
  }
  get version() {
    return this.#_version;
  }
  set token(t) {
    this.#token = t;
  }
  get token() {
    return this.#token;
  }
};
var lib_default = PKAPI;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=index.js.map
