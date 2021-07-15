var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        return fulfil(data);
      }
      const encoding = h["content-encoding"] || "utf-8";
      fulfil(new TextDecoder(encoding).decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request2 = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request2(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request2.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request2;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: page2,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2.path)},
						query: new URLSearchParams(${s$1(page2.query.toString())}),
						params: ${s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page: page2,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          const request2 = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, request2);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page2.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page: page2
    });
  } catch (error3) {
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page: page2,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page: page2,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page: page2
    });
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = { ...headers, "content-type": "application/json" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// node_modules/svelte/store/index.mjs
var subscriber_queue2 = [];
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}

// .svelte-kit/output/server/app.js
var css$9 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title2 = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title2 = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$9);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title2)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n  <meta charset="utf-8" />\n  <link rel="icon" href="/favicon.svg" />\n  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0" />\n  ' + head + '\n</head>\n\n<body>\n  <div id="svelte">' + body + "</div>\n</body>\n\n</html>";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-6e059852.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-6e059852.js", "/./_app/chunks/vendor-355115f3.js", "/./_app/chunks/preload-helper-9f12a5fd.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "art/a-c1.jpeg", "size": 888549, "type": "image/jpeg" }, { "file": "art/a-c2.jpeg", "size": 752302, "type": "image/jpeg" }, { "file": "art/a-i1.jpeg", "size": 414163, "type": "image/jpeg" }, { "file": "art/p-e1.jpeg", "size": 772821, "type": "image/jpeg" }, { "file": "art/p-e2.jpeg", "size": 729817, "type": "image/jpeg" }, { "file": "art/p-h1.jpeg", "size": 4664057, "type": "image/jpeg" }, { "file": "art/p-t1.jpeg", "size": 1334606, "type": "image/jpeg" }, { "file": "favicon.svg", "size": 2183, "type": "image/svg+xml" }, { "file": "hint.min.css", "size": 9713, "type": "text/css" }, { "file": "icons/moon.svg", "size": 281, "type": "image/svg+xml" }, { "file": "icons/sun.svg", "size": 645, "type": "image/svg+xml" }, { "file": "images/flight-suit-full.png", "size": 3388091, "type": "image/png" }, { "file": "images/flight-suit.png", "size": 561439, "type": "image/png" }, { "file": "images/fsj.png", "size": 30287, "type": "image/png" }, { "file": "images/fsj.svg", "size": 2183, "type": "image/svg+xml" }, { "file": "main.scss", "size": 2225, "type": "text/x-scss" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/portfolio\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/portfolio.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/posts\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/posts/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/posts\/2020-09-08-what-does-radiolevity-mean\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/posts/2020-09-08-what-does-radiolevity-mean.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/posts\/2021-07-11-all-new-site\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/posts/2021-07-11-all-new-site.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/posts\/2021-05-04-new-domain\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/posts/2021-05-04-new-domain.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/posts\/2020-05-16-init\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/posts/2020-05-16-init.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/cv\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/cv.svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/portfolio.svelte": () => Promise.resolve().then(function() {
    return portfolio;
  }),
  "src/routes/posts/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/posts/2020-09-08-what-does-radiolevity-mean.md": () => Promise.resolve().then(function() {
    return _20200908WhatDoesRadiolevityMean;
  }),
  "src/routes/posts/2021-07-11-all-new-site.md": () => Promise.resolve().then(function() {
    return _20210711AllNewSite;
  }),
  "src/routes/posts/2021-05-04-new-domain.md": () => Promise.resolve().then(function() {
    return _20210504NewDomain;
  }),
  "src/routes/posts/2020-05-16-init.md": () => Promise.resolve().then(function() {
    return _20200516Init;
  }),
  "src/routes/cv.svelte": () => Promise.resolve().then(function() {
    return cv;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-0d0c4730.js", "css": ["/./_app/assets/pages/__layout.svelte-87212b72.css"], "js": ["/./_app/pages/__layout.svelte-0d0c4730.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/__error.svelte": { "entry": "/./_app/pages/__error.svelte-dcfe6767.js", "css": [], "js": ["/./_app/pages/__error.svelte-dcfe6767.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-3f8ce0a2.js", "css": ["/./_app/assets/pages/index.svelte-c5cd862f.css"], "js": ["/./_app/pages/index.svelte-3f8ce0a2.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/portfolio.svelte": { "entry": "/./_app/pages/portfolio.svelte-1d5eae73.js", "css": ["/./_app/assets/pages/portfolio.svelte-d0024b74.css"], "js": ["/./_app/pages/portfolio.svelte-1d5eae73.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/posts/index.svelte": { "entry": "/./_app/pages/posts/index.svelte-2eb855b7.js", "css": ["/./_app/assets/pages/posts/index.svelte-79ae5d49.css"], "js": ["/./_app/pages/posts/index.svelte-2eb855b7.js", "/./_app/chunks/preload-helper-9f12a5fd.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/posts/2020-09-08-what-does-radiolevity-mean.md": { "entry": "/./_app/pages/posts/2020-09-08-what-does-radiolevity-mean.md-6eb2ce0b.js", "css": [], "js": ["/./_app/pages/posts/2020-09-08-what-does-radiolevity-mean.md-6eb2ce0b.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/posts/2021-07-11-all-new-site.md": { "entry": "/./_app/pages/posts/2021-07-11-all-new-site.md-b791372b.js", "css": [], "js": ["/./_app/pages/posts/2021-07-11-all-new-site.md-b791372b.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/posts/2021-05-04-new-domain.md": { "entry": "/./_app/pages/posts/2021-05-04-new-domain.md-f99de187.js", "css": [], "js": ["/./_app/pages/posts/2021-05-04-new-domain.md-f99de187.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/posts/2020-05-16-init.md": { "entry": "/./_app/pages/posts/2020-05-16-init.md-4be5358e.js", "css": [], "js": ["/./_app/pages/posts/2020-05-16-init.md-4be5358e.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null }, "src/routes/cv.svelte": { "entry": "/./_app/pages/cv.svelte-384b7962.js", "css": ["/./_app/assets/pages/cv.svelte-81eb6507.css"], "js": ["/./_app/pages/cv.svelte-384b7962.js", "/./_app/chunks/vendor-355115f3.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({ paths: { "base": "", "assets": "/." } });
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var css$8 = {
  code: "footer.svelte-dy6fjt.svelte-dy6fjt{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;color:var(--med-light-gray);padding-bottom:1rem;min-height:6rem}footer.svelte-dy6fjt a.svelte-dy6fjt{color:var(--med-gray)}footer.svelte-dy6fjt a.svelte-dy6fjt:hover{color:var(--med-dark-gray)}footer.svelte-dy6fjt a.svelte-dy6fjt:active{color:var(--dark-gray)}footer.svelte-dy6fjt div.svelte-dy6fjt{text-align:center;margin:0;position:relative;padding:0.1rem}",
  map: '{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer>\\n  <div>\\n    This work licensed under\\n    <a href=\\"https://creativecommons.org/licenses/by-nc-sa/4.0\\">CC BY-NC-SA 4.0</a>\\n  </div>\\n</footer>\\n\\n<style lang=\\"scss\\">footer {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-end;\\n  align-items: center;\\n  color: var(--med-light-gray);\\n  padding-bottom: 1rem;\\n  min-height: 6rem;\\n}\\nfooter a {\\n  color: var(--med-gray);\\n}\\nfooter a:hover {\\n  color: var(--med-dark-gray);\\n}\\nfooter a:active {\\n  color: var(--dark-gray);\\n}\\nfooter div {\\n  text-align: center;\\n  margin: 0;\\n  position: relative;\\n  padding: 0.1rem;\\n}</style>\\n"],"names":[],"mappings":"AAOmB,MAAM,4BAAC,CAAC,AACzB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,QAAQ,CACzB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,gBAAgB,CAAC,CAC5B,cAAc,CAAE,IAAI,CACpB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,oBAAM,CAAC,CAAC,cAAC,CAAC,AACR,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC,AACD,oBAAM,CAAC,eAAC,MAAM,AAAC,CAAC,AACd,KAAK,CAAE,IAAI,eAAe,CAAC,AAC7B,CAAC,AACD,oBAAM,CAAC,eAAC,OAAO,AAAC,CAAC,AACf,KAAK,CAAE,IAAI,WAAW,CAAC,AACzB,CAAC,AACD,oBAAM,CAAC,GAAG,cAAC,CAAC,AACV,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,MAAM,AACjB,CAAC"}'
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<footer class="${"svelte-dy6fjt"}"><div class="${"svelte-dy6fjt"}">This work licensed under
    <a href="${"https://creativecommons.org/licenses/by-nc-sa/4.0"}" class="${"svelte-dy6fjt"}">CC BY-NC-SA 4.0</a></div>
</footer>`;
});
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function createColorMode() {
  const { subscribe: subscribe2, set, update } = writable2("");
  return {
    subscribe: subscribe2,
    toggle: () => update((a) => a === "light" || a === "" ? "dark" : "light"),
    setLightMode: () => set("light"),
    setDarkMode: () => set("dark"),
    setMode: (mode) => set(mode),
    reset: () => set("")
  };
}
var colorMode = createColorMode();
var css$7 = {
  code: '#header.svelte-1hzg3zr.svelte-1hzg3zr{display:flex;align-items:center;position:relative;padding-top:1rem;z-index:1}#color-mode-toggle.svelte-1hzg3zr.svelte-1hzg3zr{touch-action:manipulation;stroke:white;fill:var(--fg);display:inline-flex;justify-content:center;padding-left:1rem;cursor:pointer}#color-mode-toggle.svelte-1hzg3zr img.svelte-1hzg3zr{width:24px}#logo.svelte-1hzg3zr.svelte-1hzg3zr{touch-action:manipulation;transition:transform 100ms ease, filter 100ms ease;position:relative}#logo.svelte-1hzg3zr.svelte-1hzg3zr:hover{transition:transform 240ms cubic-bezier(0, 0.62, 0.34, 1);transform:scale(116%) rotate(-4deg)}#logo.svelte-1hzg3zr:hover #logo-shadow.svelte-1hzg3zr{top:0.2rem;opacity:0.2;transition:all 240ms cubic-bezier(0, 0.62, 0.34, 1)}#logo.svelte-1hzg3zr.svelte-1hzg3zr:active{transition:transform 100ms ease;transform:scale(112%) rotate(-3deg)}#logo.svelte-1hzg3zr:active #logo-shadow.svelte-1hzg3zr{transition:all 100ms ease;top:0.15rem;opacity:0.15}#logo.svelte-1hzg3zr #logo-shadow.svelte-1hzg3zr{left:0;top:0;position:absolute;z-index:-1;opacity:0;filter:brightness(0) blur(0.2rem);transition:all 100ms ease, filter 100ms ease}nav.svelte-1hzg3zr .nav-container.svelte-1hzg3zr{display:flex;align-items:center}nav.svelte-1hzg3zr button.svelte-1hzg3zr{background:none;border:none}nav.svelte-1hzg3zr #menu-icon.svelte-1hzg3zr{display:none}nav.svelte-1hzg3zr .nav-item.svelte-1hzg3zr{touch-action:manipulation;padding:1.2rem;text-decoration:none;font-variation-settings:"wght" 400, "CASL" 1, "slnt" -15;font-size:larger;transform:translateY(-4px);color:var(--fg);transition:font-variation-settings 100ms}nav.svelte-1hzg3zr .nav-item.svelte-1hzg3zr:first-of-type{padding-left:2.4rem}nav.svelte-1hzg3zr .nav-item.svelte-1hzg3zr:hover{font-variation-settings:"wght" 800, "CASL" 1, "slnt" -15}nav.svelte-1hzg3zr .nav-item.svelte-1hzg3zr:active{font-variation-settings:"wght" 800, "CASL" 1, "slnt" -15}nav.svelte-1hzg3zr .nav-item.active.svelte-1hzg3zr{color:var(--purple);font-variation-settings:"wght" 800, "CASL" 1, "slnt" -15}#menu-icon.svelte-1hzg3zr.svelte-1hzg3zr{touch-action:manipulation;display:none;height:3rem;width:3rem;cursor:pointer}#menu-icon.svelte-1hzg3zr div.svelte-1hzg3zr{visibility:hidden}#menu-icon.svelte-1hzg3zr.svelte-1hzg3zr:before,#menu-icon.svelte-1hzg3zr.svelte-1hzg3zr:after,#menu-icon.svelte-1hzg3zr div.svelte-1hzg3zr{background:var(--fg);content:"";display:block;height:8px;border-radius:100px;margin:3px 0;transition:0.5s cubic-bezier(0, 0.62, 0.34, 1)}.active.svelte-1hzg3zr #menu-icon.svelte-1hzg3zr:before{margin:7px 0;transform:translateY(12px) rotate(135deg)}.active.svelte-1hzg3zr #menu-icon.svelte-1hzg3zr:after{margin:7px 0;transform:translateY(-18px) rotate(-135deg)}#blur.svelte-1hzg3zr.svelte-1hzg3zr{pointer-events:none;z-index:-1;position:fixed;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity 300ms cubic-bezier(0, 0.62, 0.34, 1);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}@media screen and (max-width: 767px){nav.svelte-1hzg3zr.svelte-1hzg3zr{z-index:1;position:absolute;right:0.4rem;padding-right:0.8rem;flex-direction:row-reverse}nav.svelte-1hzg3zr .nav-container.svelte-1hzg3zr{flex-direction:column;align-items:flex-end;position:absolute;top:4rem;right:0;visibility:hidden}nav.svelte-1hzg3zr #menu-icon.svelte-1hzg3zr{display:block}nav.svelte-1hzg3zr .nav-item.svelte-1hzg3zr{font-size:x-large;font-variation-settings:"wght" 800, "CASL" 1, "slnt" -15;opacity:0;transform:translateX(6rem);transition:transform 300ms cubic-bezier(0, 0.62, 0.34, 1), opacity 300ms cubic-bezier(0, 0.62, 0.34, 1), visibility 300ms cubic-bezier(0, 0.62, 0.34, 1)}nav.svelte-1hzg3zr #color-mode-toggle img.svelte-1hzg3zr{width:32px}nav.active.svelte-1hzg3zr.svelte-1hzg3zr{position:fixed;right:calc(4% + 0.4rem)}nav.active.svelte-1hzg3zr .nav-item.svelte-1hzg3zr{transform:translateX(-0.5rem);visibility:visible;opacity:1;transition:transform 600ms cubic-bezier(0, 0.62, 0.34, 1), opacity 600ms cubic-bezier(0, 0.62, 0.34, 1), visibility 600ms cubic-bezier(0, 0.62, 0.34, 1)}nav.active.svelte-1hzg3zr #blur.svelte-1hzg3zr{opacity:1;pointer-events:auto}}',
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { colorMode } from \\"@/stores.ts\\";\\nconst nav = [\\n    { name: \\"CV\\", link: \\"/cv\\" },\\n    { name: \\"Posts\\", link: \\"/posts\\" },\\n    { name: \\"Portfolio\\", link: \\"/portfolio\\" }\\n];\\nlet menuOpen = false;\\n<\/script>\\n\\n<header id=\\"header\\">\\n  <div id=\\"logo\\">\\n    <a href=\\"/\\">\\n      <img id=\\"logo-svg\\" src=\\"/images/fsj.svg\\" alt=\\"fsj logo\\" width=\\"100\\" />\\n      <img id=\\"logo-shadow\\" src=\\"/images/fsj.svg\\" alt=\\"fsj logo\\" width=\\"100\\" />\\n    </a>\\n  </div>\\n  <nav class:active={menuOpen}>\\n    <div class=\\"nav-container\\">\\n      {#each nav as item, i}\\n        <a\\n          class=\\"nav-item\\"\\n          style=\\"transition-delay: {i * 32}ms\\"\\n          class:active={item.link === $page.path}\\n          on:click={() => (menuOpen = false)}\\n          href={item.link}\\n        >\\n          {item.name}\\n        </a>\\n      {/each}\\n      <button\\n        class=\\"nav-item\\"\\n        id=\\"color-mode-toggle\\"\\n        on:click={colorMode.toggle}\\n        style=\\"transition-delay: {nav.length * 32}ms\\"\\n      >\\n        <img src=\\"icons/{$colorMode === 'dark' ? 'sun' : 'moon'}.svg\\" alt=\\"toggle dark mode\\" />\\n      </button>\\n    </div>\\n    <button id=\\"menu-icon\\" on:click={() => (menuOpen = !menuOpen)}>\\n      <div />\\n    </button>\\n    <div id=\\"blur\\" />\\n  </nav>\\n</header>\\n\\n<style lang=\\"scss\\">#header {\\n  display: flex;\\n  align-items: center;\\n  position: relative;\\n  padding-top: 1rem;\\n  z-index: 1;\\n}\\n\\n#color-mode-toggle {\\n  touch-action: manipulation;\\n  stroke: white;\\n  fill: var(--fg);\\n  display: inline-flex;\\n  justify-content: center;\\n  padding-left: 1rem;\\n  cursor: pointer;\\n}\\n#color-mode-toggle img {\\n  width: 24px;\\n}\\n\\n#logo {\\n  touch-action: manipulation;\\n  transition: transform 100ms ease, filter 100ms ease;\\n  position: relative;\\n}\\n#logo:hover {\\n  transition: transform 240ms cubic-bezier(0, 0.62, 0.34, 1);\\n  transform: scale(116%) rotate(-4deg);\\n}\\n#logo:hover #logo-shadow {\\n  top: 0.2rem;\\n  opacity: 0.2;\\n  transition: all 240ms cubic-bezier(0, 0.62, 0.34, 1);\\n}\\n#logo:active {\\n  transition: transform 100ms ease;\\n  transform: scale(112%) rotate(-3deg);\\n}\\n#logo:active #logo-shadow {\\n  transition: all 100ms ease;\\n  top: 0.15rem;\\n  opacity: 0.15;\\n}\\n#logo #logo-shadow {\\n  left: 0;\\n  top: 0;\\n  position: absolute;\\n  z-index: -1;\\n  opacity: 0;\\n  filter: brightness(0) blur(0.2rem);\\n  transition: all 100ms ease, filter 100ms ease;\\n}\\n\\nnav .nav-container {\\n  display: flex;\\n  align-items: center;\\n}\\nnav button {\\n  background: none;\\n  border: none;\\n}\\nnav #menu-icon {\\n  display: none;\\n}\\nnav .nav-item {\\n  touch-action: manipulation;\\n  padding: 1.2rem;\\n  text-decoration: none;\\n  font-variation-settings: \\"wght\\" 400, \\"CASL\\" 1, \\"slnt\\" -15;\\n  font-size: larger;\\n  transform: translateY(-4px);\\n  color: var(--fg);\\n  transition: font-variation-settings 100ms;\\n}\\nnav .nav-item:first-of-type {\\n  padding-left: 2.4rem;\\n}\\nnav .nav-item:hover {\\n  font-variation-settings: \\"wght\\" 800, \\"CASL\\" 1, \\"slnt\\" -15;\\n}\\nnav .nav-item:active {\\n  font-variation-settings: \\"wght\\" 800, \\"CASL\\" 1, \\"slnt\\" -15;\\n}\\nnav .nav-item.active {\\n  color: var(--purple);\\n  font-variation-settings: \\"wght\\" 800, \\"CASL\\" 1, \\"slnt\\" -15;\\n}\\n\\n#menu-icon {\\n  touch-action: manipulation;\\n  display: none;\\n  height: 3rem;\\n  width: 3rem;\\n  cursor: pointer;\\n}\\n#menu-icon div {\\n  visibility: hidden;\\n}\\n#menu-icon:before, #menu-icon:after, #menu-icon div {\\n  background: var(--fg);\\n  content: \\"\\";\\n  display: block;\\n  height: 8px;\\n  border-radius: 100px;\\n  margin: 3px 0;\\n  transition: 0.5s cubic-bezier(0, 0.62, 0.34, 1);\\n}\\n\\n.active #menu-icon:before {\\n  margin: 7px 0;\\n  transform: translateY(12px) rotate(135deg);\\n}\\n.active #menu-icon:after {\\n  margin: 7px 0;\\n  transform: translateY(-18px) rotate(-135deg);\\n}\\n\\n#blur {\\n  pointer-events: none;\\n  z-index: -1;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  opacity: 0;\\n  transition: opacity 300ms cubic-bezier(0, 0.62, 0.34, 1);\\n  backdrop-filter: blur(16px);\\n  -webkit-backdrop-filter: blur(16px);\\n}\\n\\n@media screen and (max-width: 767px) {\\n  nav {\\n    z-index: 1;\\n    position: absolute;\\n    right: 0.4rem;\\n    padding-right: 0.8rem;\\n    flex-direction: row-reverse;\\n  }\\n  nav .nav-container {\\n    flex-direction: column;\\n    align-items: flex-end;\\n    position: absolute;\\n    top: 4rem;\\n    right: 0;\\n    visibility: hidden;\\n  }\\n  nav #menu-icon {\\n    display: block;\\n  }\\n  nav .nav-item {\\n    font-size: x-large;\\n    font-variation-settings: \\"wght\\" 800, \\"CASL\\" 1, \\"slnt\\" -15;\\n    opacity: 0;\\n    transform: translateX(6rem);\\n    transition: transform 300ms cubic-bezier(0, 0.62, 0.34, 1), opacity 300ms cubic-bezier(0, 0.62, 0.34, 1), visibility 300ms cubic-bezier(0, 0.62, 0.34, 1);\\n  }\\n  nav #color-mode-toggle img {\\n    width: 32px;\\n  }\\n  nav.active {\\n    position: fixed;\\n    right: calc(4% + 0.4rem);\\n  }\\n  nav.active .nav-item {\\n    transform: translateX(-0.5rem);\\n    visibility: visible;\\n    opacity: 1;\\n    transition: transform 600ms cubic-bezier(0, 0.62, 0.34, 1), opacity 600ms cubic-bezier(0, 0.62, 0.34, 1), visibility 600ms cubic-bezier(0, 0.62, 0.34, 1);\\n  }\\n  nav.active #blur {\\n    opacity: 1;\\n    pointer-events: auto;\\n  }\\n}</style>\\n"],"names":[],"mappings":"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"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $colorMode, $$unsubscribe_colorMode;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_colorMode = subscribe(colorMode, (value) => $colorMode = value);
  const nav = [
    { name: "CV", link: "/cv" },
    { name: "Posts", link: "/posts" },
    { name: "Portfolio", link: "/portfolio" }
  ];
  $$result.css.add(css$7);
  $$unsubscribe_page();
  $$unsubscribe_colorMode();
  return `<header id="${"header"}" class="${"svelte-1hzg3zr"}"><div id="${"logo"}" class="${"svelte-1hzg3zr"}"><a href="${"/"}"><img id="${"logo-svg"}" src="${"/images/fsj.svg"}" alt="${"fsj logo"}" width="${"100"}">
      <img id="${"logo-shadow"}" src="${"/images/fsj.svg"}" alt="${"fsj logo"}" width="${"100"}" class="${"svelte-1hzg3zr"}"></a></div>
  <nav class="${["svelte-1hzg3zr", ""].join(" ").trim()}"><div class="${"nav-container svelte-1hzg3zr"}">${each(nav, (item, i) => `<a class="${["nav-item svelte-1hzg3zr", item.link === $page.path ? "active" : ""].join(" ").trim()}" style="${"transition-delay: " + escape2(i * 32) + "ms"}"${add_attribute("href", item.link, 0)}>${escape2(item.name)}
        </a>`)}
      <button class="${"nav-item svelte-1hzg3zr"}" id="${"color-mode-toggle"}" style="${"transition-delay: " + escape2(nav.length * 32) + "ms"}"><img src="${"icons/" + escape2($colorMode === "dark" ? "sun" : "moon") + ".svg"}" alt="${"toggle dark mode"}" class="${"svelte-1hzg3zr"}"></button></div>
    <button id="${"menu-icon"}" class="${"svelte-1hzg3zr"}"><div class="${"svelte-1hzg3zr"}"></div></button>
    <div id="${"blur"}" class="${"svelte-1hzg3zr"}"></div></nav>
</header>`;
});
var css$6 = {
  code: '@import url("https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,MONO@-15..0,300..800,0..1,0..1&display=swap");:root{--break-width:768px;--bg:white;--fg:#1a101f;--white:white;--light-gray:#ccc;--med-light-gray:#aaa;--med-gray:#999;--med-dark-gray:#777;--dark-gray:#333;--light-purple:#e4d0ff;--purple:#a154ff;--dark-purple:#6421b6;--darker-purple:#41107c;--light-cyan:#a2eff1;--cyan:#2ddce2;--magenta:#ff68a5;--dark-magenta:#f04288}[data-color-mode=dark]{--bg:#1a101f;--fg:white;--dark-gray:#ccc;--med-dark-gray:#aaa;--med-gray:#999;--med-light-gray:#777;--light-gray:#333;--light-cyan:#a2eff1;--cyan:#2ddce2;--magenta:#ff68a5;--dark-magenta:#f04288}html,body{box-sizing:border-box;font-family:"Recursive", sans-serif;background-color:var(--bg);overflow-x:hidden}#svelte{background-color:var(--bg);color:var(--fg);transition:background-color 320ms}*,*:before,*:after{box-sizing:inherit}body{margin:0}h1,h2,h3,h4,h5,h6{position:relative;font-variation-settings:"wght" 800}@media screen and (min-width: 992px){h1:not(.no-hash)::before{position:absolute;color:var(--fg);opacity:0.4;font-variation-settings:"SLNT" -15, "wght" 600, "CASL" -15;content:"#";left:-1.9rem}}@media screen and (min-width: 992px) and (max-width: 36rem){h1:not(.no-hash)::before{display:none}}@media screen and (min-width: 992px){h2:not(.no-hash)::before{position:absolute;color:var(--fg);opacity:0.4;font-variation-settings:"SLNT" -15, "wght" 600, "CASL" -15;content:"##";left:-2.76rem}}@media screen and (min-width: 992px) and (max-width: 36rem){h2:not(.no-hash)::before{display:none}}@media screen and (min-width: 992px){h3:not(.no-hash)::before{position:absolute;color:var(--fg);opacity:0.4;font-variation-settings:"SLNT" -15, "wght" 600, "CASL" -15;content:"###";left:-3.14rem}}@media screen and (min-width: 992px) and (max-width: 36rem){h3:not(.no-hash)::before{display:none}}@media screen and (min-width: 992px){h4:not(.no-hash)::before{position:absolute;color:var(--fg);opacity:0.4;font-variation-settings:"SLNT" -15, "wght" 600, "CASL" -15;content:"####";left:-3.42rem}}@media screen and (min-width: 992px) and (max-width: 36rem){h4:not(.no-hash)::before{display:none}}content a{color:var(--purple);text-decoration-thickness:2px;transition:color 100ms linear;text-decoration-color:var(--magenta);font-weight:500}content a:hover{color:var(--dark-magenta)}content a:active{opacity:0.6}#svelte{height:100vh;width:100vw;padding:0;margin:0}.container{display:grid;grid-template-columns:minmax(4%, auto) minmax(auto, 42rem) minmax(4%, auto);grid-template-rows:auto 1fr;gap:0px 0px;height:100%;grid-template-areas:". hd ." ". main ."}header{grid-area:hd}main{grid-area:main;display:flex;flex-direction:column}content{flex:1 0 auto}footer{flex-shrink:0}',
  map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Footer from \\"$lib/Footer.svelte\\";\\nimport Header from \\"$lib/Header.svelte\\";\\nimport { page } from \\"$app/stores\\";\\nimport { colorMode } from \\"@/stores.ts\\";\\nimport { onDestroy, onMount } from \\"svelte\\";\\nfunction getInitialColorMode() {\\n    const persistedColorMode = window.localStorage.getItem(\\"color-mode\\");\\n    const hasPersistedColorMode = typeof persistedColorMode === \\"string\\";\\n    if (hasPersistedColorMode) {\\n        console.log(`loaded color mode: ${persistedColorMode}`);\\n        return persistedColorMode;\\n    }\\n    const mql = window.matchMedia(\\"(prefers-color-scheme: dark)\\");\\n    const hasMediaQueryPreference = typeof mql.matches === \\"boolean\\";\\n    if (hasMediaQueryPreference) {\\n        return mql.matches ? \\"dark\\" : \\"light\\";\\n    }\\n    return \\"light\\";\\n}\\nonMount(() => {\\n    let foo = colorMode.setMode(getInitialColorMode());\\n    setColorMode($colorMode);\\n});\\nlet unsubscribe = colorMode.subscribe((colorMode) => {\\n    try {\\n        setColorMode(colorMode);\\n    }\\n    catch (e) {\\n        if (!(e instanceof ReferenceError)) {\\n            throw e;\\n        }\\n    }\\n});\\nonDestroy(unsubscribe);\\nfunction setColorMode(newMode, localStorage = false) {\\n    if (newMode === \\"\\") {\\n        document.body.getAttribute(\\"data-color-mode\\") === \\"dark\\"\\n            ? (newMode = \\"light\\")\\n            : (newMode = \\"dark\\");\\n    }\\n    document.body.setAttribute(\\"data-color-mode\\", newMode);\\n    if (localStorage) {\\n        window.localStorage.setItem(\\"color-mode\\", newMode);\\n    }\\n}\\nfunction toggleMode() {\\n    colorMode.toggle();\\n    setColorMode($colorMode, false); // TODO: persist color mode?\\n}\\n<\/script>\\n\\n<svelte:head>\\n  <link href=\\"/hint.min.css\\" rel=\\"stylesheet\\" />\\n</svelte:head>\\n\\n<div class=\\"container\\">\\n  <Header />\\n  <main>\\n    <content>\\n      <slot />\\n    </content>\\n    {#if $page.path != \\"/\\"}\\n      <Footer />\\n    {/if}\\n  </main>\\n</div>\\n\\n<style lang=\\"scss\\" global>@import url(\\"https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,MONO@-15..0,300..800,0..1,0..1&display=swap\\");\\n:global(:root) {\\n  --break-width: 768px;\\n  --bg: white;\\n  --fg: #1a101f;\\n  --white: white;\\n  --light-gray: #ccc;\\n  --med-light-gray: #aaa;\\n  --med-gray: #999;\\n  --med-dark-gray: #777;\\n  --dark-gray: #333;\\n  --light-purple: #e4d0ff;\\n  --purple: #a154ff;\\n  --dark-purple: #6421b6;\\n  --darker-purple: #41107c;\\n  --light-cyan: #a2eff1;\\n  --cyan: #2ddce2;\\n  --magenta: #ff68a5;\\n  --dark-magenta: #f04288;\\n}\\n\\n:global([data-color-mode=dark]) {\\n  --bg: #1a101f;\\n  --fg: white;\\n  --dark-gray: #ccc;\\n  --med-dark-gray: #aaa;\\n  --med-gray: #999;\\n  --med-light-gray: #777;\\n  --light-gray: #333;\\n  --light-cyan: #a2eff1;\\n  --cyan: #2ddce2;\\n  --magenta: #ff68a5;\\n  --dark-magenta: #f04288;\\n}\\n\\n:global(html),\\n:global(body) {\\n  box-sizing: border-box;\\n  font-family: \\"Recursive\\", sans-serif;\\n  background-color: var(--bg);\\n  overflow-x: hidden;\\n}\\n\\n:global(#svelte) {\\n  background-color: var(--bg);\\n  color: var(--fg);\\n  transition: background-color 320ms;\\n}\\n\\n:global(*),\\n:global(*:before),\\n:global(*:after) {\\n  box-sizing: inherit;\\n}\\n\\n:global(body) {\\n  margin: 0;\\n}\\n\\n:global(h1),\\n:global(h2),\\n:global(h3),\\n:global(h4),\\n:global(h5),\\n:global(h6) {\\n  position: relative;\\n  font-variation-settings: \\"wght\\" 800;\\n}\\n\\n@media screen and (min-width: 992px) {\\n  :global(h1:not(.no-hash)::before) {\\n    position: absolute;\\n    color: var(--fg);\\n    opacity: 0.4;\\n    font-variation-settings: \\"SLNT\\" -15, \\"wght\\" 600, \\"CASL\\" -15;\\n    content: \\"#\\";\\n    left: -1.9rem;\\n  }\\n}\\n@media screen and (min-width: 992px) and (max-width: 36rem) {\\n  :global(h1:not(.no-hash)::before) {\\n    display: none;\\n  }\\n}\\n@media screen and (min-width: 992px) {\\n  :global(h2:not(.no-hash)::before) {\\n    position: absolute;\\n    color: var(--fg);\\n    opacity: 0.4;\\n    font-variation-settings: \\"SLNT\\" -15, \\"wght\\" 600, \\"CASL\\" -15;\\n    content: \\"##\\";\\n    left: -2.76rem;\\n  }\\n}\\n@media screen and (min-width: 992px) and (max-width: 36rem) {\\n  :global(h2:not(.no-hash)::before) {\\n    display: none;\\n  }\\n}\\n@media screen and (min-width: 992px) {\\n  :global(h3:not(.no-hash)::before) {\\n    position: absolute;\\n    color: var(--fg);\\n    opacity: 0.4;\\n    font-variation-settings: \\"SLNT\\" -15, \\"wght\\" 600, \\"CASL\\" -15;\\n    content: \\"###\\";\\n    left: -3.14rem;\\n  }\\n}\\n@media screen and (min-width: 992px) and (max-width: 36rem) {\\n  :global(h3:not(.no-hash)::before) {\\n    display: none;\\n  }\\n}\\n@media screen and (min-width: 992px) {\\n  :global(h4:not(.no-hash)::before) {\\n    position: absolute;\\n    color: var(--fg);\\n    opacity: 0.4;\\n    font-variation-settings: \\"SLNT\\" -15, \\"wght\\" 600, \\"CASL\\" -15;\\n    content: \\"####\\";\\n    left: -3.42rem;\\n  }\\n}\\n@media screen and (min-width: 992px) and (max-width: 36rem) {\\n  :global(h4:not(.no-hash)::before) {\\n    display: none;\\n  }\\n}\\n:global(content) :global(a) {\\n  color: var(--purple);\\n  text-decoration-thickness: 2px;\\n  transition: color 100ms linear;\\n  text-decoration-color: var(--magenta);\\n  font-weight: 500;\\n}\\n:global(content) :global(a:hover) {\\n  color: var(--dark-magenta);\\n}\\n:global(content) :global(a:active) {\\n  opacity: 0.6;\\n}\\n\\n:global(#svelte) {\\n  height: 100vh;\\n  width: 100vw;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n:global(.container) {\\n  display: grid;\\n  grid-template-columns: minmax(4%, auto) minmax(auto, 42rem) minmax(4%, auto);\\n  grid-template-rows: auto 1fr;\\n  gap: 0px 0px;\\n  height: 100%;\\n  grid-template-areas: \\". hd .\\" \\". main .\\";\\n}\\n\\n:global(header) {\\n  grid-area: hd;\\n}\\n\\n:global(main) {\\n  grid-area: main;\\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n:global(content) {\\n  flex: 1 0 auto;\\n}\\n\\n:global(footer) {\\n  flex-shrink: 0;\\n}</style>\\n"],"names":[],"mappings":"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"}'
};
function getInitialColorMode() {
  const persistedColorMode = window.localStorage.getItem("color-mode");
  const hasPersistedColorMode = typeof persistedColorMode === "string";
  if (hasPersistedColorMode) {
    console.log(`loaded color mode: ${persistedColorMode}`);
    return persistedColorMode;
  }
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  return "light";
}
function setColorMode(newMode, localStorage = false) {
  if (newMode === "") {
    document.body.getAttribute("data-color-mode") === "dark" ? newMode = "light" : newMode = "dark";
  }
  document.body.setAttribute("data-color-mode", newMode);
  if (localStorage) {
    window.localStorage.setItem("color-mode", newMode);
  }
}
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $colorMode, $$unsubscribe_colorMode;
  let $page, $$unsubscribe_page;
  $$unsubscribe_colorMode = subscribe(colorMode, (value) => $colorMode = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  onMount(() => {
    colorMode.setMode(getInitialColorMode());
    setColorMode($colorMode);
  });
  let unsubscribe = colorMode.subscribe((colorMode2) => {
    try {
      setColorMode(colorMode2);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  });
  onDestroy(unsubscribe);
  $$result.css.add(css$6);
  $$unsubscribe_colorMode();
  $$unsubscribe_page();
  return `${$$result.head += `<link href="${"/hint.min.css"}" rel="${"stylesheet"}" data-svelte="svelte-e93vg6">`, ""}

<div class="${"container"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  <main><content>${slots.default ? slots.default({}) : ``}</content>
    ${$page.path != "/" ? `${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}` : ``}</main>
</div>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
var load$1 = ({ error: error2, status }) => {
  return { props: { error: error2, status } };
};
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { error: error2 } = $$props;
  let { status } = $$props;
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  return `<h1>${escape2(status)}</h1>
<p>${escape2(error2.message)}</p>`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error,
  load: load$1
});
var css$5 = {
  code: "#email.svelte-1uzrjes.svelte-1uzrjes{border:none;border-radius:0.8rem;cursor:pointer;font-family:inherit;font-size:inherit;position:relative;padding:0;height:3rem;display:flex;align-items:center;background-color:var(--dark-purple);background-image:linear-gradient(to right, var(--darker-purple) 0, var(--dark-purple) 1rem, var(--dark-purple) calc(100% - 1rem), var(--darker-purple) 100%)}#email-front.svelte-1uzrjes.svelte-1uzrjes{padding:0.6rem 1.2rem;border-radius:inherit;color:var(--white);height:inherit;background:var(--purple);display:flex;align-items:center;will-change:transform, filter;transition:transform 420ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 420ms cubic-bezier(0.3, 0.7, 0.4, 1);transform:translateY(-4px);filter:brightness(100%)}#email.svelte-1uzrjes:hover #email-front.svelte-1uzrjes{transform:translateY(-8px);transition:transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.6), filter 250ms cubic-bezier(0.3, 0.7, 0.4, 1);filter:brightness(110%)}#email.svelte-1uzrjes:active #email-front.svelte-1uzrjes{transform:translateY(-4px);transition:transform 42ms}",
  map: '{"version":3,"file":"Email.svelte","sources":["Email.svelte"],"sourcesContent":["<script>\\n  const email = hex2a(\\"6865794066736a2e78797a\\"); // hex email address\\n\\n  const copy = () => {\\n    navigator.clipboard.writeText(email);\\n  };\\n\\n  function hex2a(hexx) {\\n    var hex = hexx.toString(); //force conversion\\n    var str = \\"\\";\\n    for (var i = 0; i < hex.length; i += 2) {\\n      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));\\n    }\\n    return str;\\n  }\\n<\/script>\\n\\n<button id=\\"email\\" on:click={copy}>\\n  <div id=\\"email-front\\">\\n    email: {email}\\n  </div>\\n</button>\\n\\n<style lang=\\"scss\\">#email {\\n  border: none;\\n  border-radius: 0.8rem;\\n  cursor: pointer;\\n  font-family: inherit;\\n  font-size: inherit;\\n  position: relative;\\n  padding: 0;\\n  height: 3rem;\\n  display: flex;\\n  align-items: center;\\n  background-color: var(--dark-purple);\\n  background-image: linear-gradient(to right, var(--darker-purple) 0, var(--dark-purple) 1rem, var(--dark-purple) calc(100% - 1rem), var(--darker-purple) 100%);\\n}\\n\\n#email-front {\\n  padding: 0.6rem 1.2rem;\\n  border-radius: inherit;\\n  color: var(--white);\\n  height: inherit;\\n  background: var(--purple);\\n  display: flex;\\n  align-items: center;\\n  will-change: transform, filter;\\n  transition: transform 420ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 420ms cubic-bezier(0.3, 0.7, 0.4, 1);\\n  transform: translateY(-4px);\\n  filter: brightness(100%);\\n}\\n\\n#email:hover #email-front {\\n  transform: translateY(-8px);\\n  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.6), filter 250ms cubic-bezier(0.3, 0.7, 0.4, 1);\\n  filter: brightness(110%);\\n}\\n\\n#email:active #email-front {\\n  transform: translateY(-4px);\\n  transition: transform 42ms;\\n}</style>\\n"],"names":[],"mappings":"AAuBmB,MAAM,8BAAC,CAAC,AACzB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,MAAM,CACrB,MAAM,CAAE,OAAO,CACf,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,OAAO,CAClB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,IAAI,CAAC,AAC/J,CAAC,AAED,YAAY,8BAAC,CAAC,AACZ,OAAO,CAAE,MAAM,CAAC,MAAM,CACtB,aAAa,CAAE,OAAO,CACtB,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,SAAS,CAAC,CAAC,MAAM,CAC9B,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACvG,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,MAAM,CAAE,WAAW,IAAI,CAAC,AAC1B,CAAC,AAED,qBAAM,MAAM,CAAC,YAAY,eAAC,CAAC,AACzB,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,MAAM,CAAC,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CACzG,MAAM,CAAE,WAAW,IAAI,CAAC,AAC1B,CAAC,AAED,qBAAM,OAAO,CAAC,YAAY,eAAC,CAAC,AAC1B,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,SAAS,CAAC,IAAI,AAC5B,CAAC"}'
};
function hex2a(hexx) {
  var hex = hexx.toString();
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
var Email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const email = hex2a("6865794066736a2e78797a");
  $$result.css.add(css$5);
  return `<button id="${"email"}" class="${"svelte-1uzrjes"}"><div id="${"email-front"}" class="${"svelte-1uzrjes"}">email: ${escape2(email)}</div>
</button>`;
});
var css$4 = {
  code: 'h1.svelte-wrm0rw{font-weight:bold;font-size:3.2rem;margin-top:1rem;margin-bottom:1.6rem;font-variation-settings:"wght" 800, "CASL" 1, "slnt" -15}p.svelte-wrm0rw{font-size:large;line-height:1.6rem;margin-bottom:1.6rem}.hint--top.svelte-wrm0rw::before{border-top-color:var(--fg)}.hint--top.svelte-wrm0rw::after{background-color:var(--fg);color:var(--bg);text-shadow:none !important}.bold.svelte-wrm0rw{font-variation-settings:"wght" 800}',
  map: '{"version":3,"file":"intro.md","sources":["intro.md"],"sourcesContent":["<script lang=\\"ts\\">import Email from \\"$lib/Email.svelte\\";\\n<\/script>\\n\\n<h1 class=\\"no-hash\\">Hey!</h1>\\n<p>My name is <span class=\\"bold hint--top hint--rounded\\" aria-label=\\"he/him, please\\">Finn James</span>. How\u2019s it going?</p>\\n<p>I am a frontend developer and amateur illustrator based in Chapel Hill, NC. I also write <a href=\\"https://github.com/finnsjames/threepio\\">software</a> for <a href=\\"https://skynet.unc.edu\\">telescopes</a>.</p>\\n<p><a href=\\"https://github.com/finnsjames\\" rel=\\"nofollow\\">GitHub</a> \u2022 <a href=\\"https://twitter.com/finnsjames\\" rel=\\"nofollow\\">Twitter</a> \u2022 <a href=\\"https://polywork.fsj.xyz\\" rel=\\"nofollow\\">Polywork</a></p>\\n<p style=\\"padding-top: 0.8rem; transform: translateX(-1px)\\">\\n  <Email />\\n</p>\\n<style lang=\\"scss\\">h1 {\\n  font-weight: bold;\\n  font-size: 3.2rem;\\n  margin-top: 1rem;\\n  margin-bottom: 1.6rem;\\n  font-variation-settings: \\"wght\\" 800, \\"CASL\\" 1, \\"slnt\\" -15;\\n}\\n\\np {\\n  font-size: large;\\n  line-height: 1.6rem;\\n  margin-bottom: 1.6rem;\\n}\\n\\n.hint--top {\\n  /* color: var(--bg); */\\n}\\n.hint--top::before {\\n  border-top-color: var(--fg);\\n}\\n.hint--top::after {\\n  background-color: var(--fg);\\n  color: var(--bg);\\n  text-shadow: none !important;\\n}\\n\\n.bold {\\n  font-variation-settings: \\"wght\\" 800;\\n}</style>\\n"],"names":[],"mappings":"AAUmB,EAAE,cAAC,CAAC,AACrB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,GAAG,AAC3D,CAAC,AAED,CAAC,cAAC,CAAC,AACD,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,MAAM,AACvB,CAAC,AAKD,wBAAU,QAAQ,AAAC,CAAC,AAClB,gBAAgB,CAAE,IAAI,IAAI,CAAC,AAC7B,CAAC,AACD,wBAAU,OAAO,AAAC,CAAC,AACjB,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,KAAK,CAAE,IAAI,IAAI,CAAC,CAChB,WAAW,CAAE,IAAI,CAAC,UAAU,AAC9B,CAAC,AAED,KAAK,cAAC,CAAC,AACL,uBAAuB,CAAE,MAAM,CAAC,GAAG,AACrC,CAAC"}'
};
var Intro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<h1 class="${"no-hash svelte-wrm0rw"}">Hey!</h1>
<p class="${"svelte-wrm0rw"}">My name is <span class="${"bold hint--top hint--rounded svelte-wrm0rw"}" aria-label="${"he/him, please"}">Finn James</span>. How\u2019s it going?</p>
<p class="${"svelte-wrm0rw"}">I am a frontend developer and amateur illustrator based in Chapel Hill, NC. I also write <a href="${"https://github.com/finnsjames/threepio"}">software</a> for <a href="${"https://skynet.unc.edu"}">telescopes</a>.</p>
<p class="${"svelte-wrm0rw"}"><a href="${"https://github.com/finnsjames"}" rel="${"nofollow"}">GitHub</a> \u2022 <a href="${"https://twitter.com/finnsjames"}" rel="${"nofollow"}">Twitter</a> \u2022 <a href="${"https://polywork.fsj.xyz"}" rel="${"nofollow"}">Polywork</a></p>
<p style="${"padding-top: 0.8rem; transform: translateX(-1px)"}" class="${"svelte-wrm0rw"}">${validate_component(Email, "Email").$$render($$result, {}, {}, {})}
</p>`;
});
var css$3 = {
  code: '.relative.svelte-7qkasq{position:relative}#splash.svelte-7qkasq{background-image:url("/images/flight-suit.png");background-size:auto 900px;background-repeat:no-repeat;position:fixed;right:calc(-24rem + 40vw);top:2.2rem;min-height:50rem;height:calc(100vh - 2rem);width:600px;user-select:none;pointer-events:none}.half.svelte-7qkasq{max-width:22rem;height:auto}@media screen and (max-width: 767px){#splash.svelte-7qkasq{width:100vw;position:relative;top:0;left:50%;right:50%;min-height:900px;margin-left:-50vw;margin-right:-50vw;display:block;background-position:calc(-300px + 50vw) 0}.half.svelte-7qkasq{max-width:none !important}}',
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Intro from \\"$markdown/intro.md\\";\\n<\/script>\\n\\n<svelte:head>\\n  <title>Finn James</title>\\n</svelte:head>\\n\\n<div class=\\"relative\\">\\n  <div class=\\"half\\">\\n    <Intro />\\n  </div>\\n  <div id=\\"splash\\" alt=\\"me in a flight suit\\" />\\n</div>\\n\\n<style lang=\\"scss\\">.relative {\\n  position: relative;\\n}\\n\\n#splash {\\n  background-image: url(\\"/images/flight-suit.png\\");\\n  background-size: auto 900px;\\n  background-repeat: no-repeat;\\n  position: fixed;\\n  right: calc(-24rem + 40vw);\\n  top: 2.2rem;\\n  min-height: 50rem;\\n  height: calc(100vh - 2rem);\\n  width: 600px;\\n  user-select: none;\\n  pointer-events: none;\\n}\\n\\n.half {\\n  max-width: 22rem;\\n  height: auto;\\n}\\n\\n@media screen and (max-width: 767px) {\\n  #splash {\\n    width: 100vw;\\n    position: relative;\\n    top: 0;\\n    left: 50%;\\n    right: 50%;\\n    min-height: 900px;\\n    margin-left: -50vw;\\n    margin-right: -50vw;\\n    display: block;\\n    background-position: calc(-300px + 50vw) 0;\\n  }\\n\\n  .half {\\n    max-width: none !important;\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAcmB,SAAS,cAAC,CAAC,AAC5B,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,OAAO,cAAC,CAAC,AACP,gBAAgB,CAAE,IAAI,yBAAyB,CAAC,CAChD,eAAe,CAAE,IAAI,CAAC,KAAK,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1B,GAAG,CAAE,MAAM,CACX,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1B,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,KAAK,cAAC,CAAC,AACL,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,OAAO,cAAC,CAAC,AACP,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,KAAK,CAClB,YAAY,CAAE,KAAK,CACnB,OAAO,CAAE,KAAK,CACd,mBAAmB,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,AAC5C,CAAC,AAED,KAAK,cAAC,CAAC,AACL,SAAS,CAAE,IAAI,CAAC,UAAU,AAC5B,CAAC,AACH,CAAC"}'
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `${$$result.head += `${$$result.title = `<title>Finn James</title>`, ""}`, ""}

<div class="${"relative svelte-7qkasq"}"><div class="${"half svelte-7qkasq"}">${validate_component(Intro, "Intro").$$render($$result, {}, {}, {})}</div>
  <div id="${"splash"}" alt="${"me in a flight suit"}" class="${"svelte-7qkasq"}"></div>
</div>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$2 = {
  code: "h1.svelte-wdp2xd{padding-top:2.4rem;margin-top:0rem}h1.svelte-wdp2xd:first-of-type{padding-top:1.4rem}img.svelte-wdp2xd{height:auto;max-height:90vh;max-width:100vw;margin-bottom:2.4rem}#portfolio.svelte-wdp2xd{display:flex;flex-direction:column;align-items:center;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}",
  map: '{"version":3,"file":"portfolio.svelte","sources":["portfolio.svelte"],"sourcesContent":["<svelte:head><title>Portfolio - Finn James</title></svelte:head>\\n\\n<div id=\\"portfolio\\">\\n  <h1 id=\\"photography\\" class=\\"no-hash\\">Photography</h1>\\n  <img alt=\\"Eszter 1\\" src=\\"/art/p-e2.jpeg\\" />\\n  <img alt=\\"Thomas\\" src=\\"/art/p-t1.jpeg\\" />\\n  <img alt=\\"Hannah\\" src=\\"/art/p-h1.jpeg\\" />\\n  <img alt=\\"Eszter 2\\" src=\\"/art/p-e1.jpeg\\" />\\n  <h1 id=\\"drawing\\" class=\\"no-hash\\">Drawing</h1>\\n  <img alt=\\"Charcoal drawing of my desk\\" class=\\"image\\" src=\\"/art/a-c1.jpeg\\" />\\n  <img alt=\\"Ink drawing in the style of Mucha\\" class=\\"image\\" src=\\"/art/a-i1.jpeg\\" />\\n  <img alt=\\"Charcoal drawings with a backlight\\" class=\\"image\\" src=\\"/art/a-c2.jpeg\\" />\\n</div>\\n\\n<style lang=\\"scss\\">h1 {\\n  padding-top: 2.4rem;\\n  margin-top: 0rem;\\n}\\nh1:first-of-type {\\n  padding-top: 1.4rem;\\n}\\n\\nimg {\\n  height: auto;\\n  max-height: 90vh;\\n  max-width: 100vw;\\n  margin-bottom: 2.4rem;\\n}\\n\\n#portfolio {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  width: 100vw;\\n  position: relative;\\n  left: 50%;\\n  right: 50%;\\n  margin-left: -50vw;\\n  margin-right: -50vw;\\n}</style>\\n"],"names":[],"mappings":"AAcmB,EAAE,cAAC,CAAC,AACrB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,gBAAE,cAAc,AAAC,CAAC,AAChB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,GAAG,cAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,KAAK,CAChB,aAAa,CAAE,MAAM,AACvB,CAAC,AAED,UAAU,cAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,KAAK,CAClB,YAAY,CAAE,KAAK,AACrB,CAAC"}'
};
var Portfolio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `${$$result.head += `${$$result.title = `<title>Portfolio - Finn James</title>`, ""}`, ""}

<div id="${"portfolio"}" class="${"svelte-wdp2xd"}"><h1 id="${"photography"}" class="${"no-hash svelte-wdp2xd"}">Photography</h1>
  <img alt="${"Eszter 1"}" src="${"/art/p-e2.jpeg"}" class="${"svelte-wdp2xd"}">
  <img alt="${"Thomas"}" src="${"/art/p-t1.jpeg"}" class="${"svelte-wdp2xd"}">
  <img alt="${"Hannah"}" src="${"/art/p-h1.jpeg"}" class="${"svelte-wdp2xd"}">
  <img alt="${"Eszter 2"}" src="${"/art/p-e1.jpeg"}" class="${"svelte-wdp2xd"}">
  <h1 id="${"drawing"}" class="${"no-hash svelte-wdp2xd"}">Drawing</h1>
  <img alt="${"Charcoal drawing of my desk"}" class="${"image svelte-wdp2xd"}" src="${"/art/a-c1.jpeg"}">
  <img alt="${"Ink drawing in the style of Mucha"}" class="${"image svelte-wdp2xd"}" src="${"/art/a-i1.jpeg"}">
  <img alt="${"Charcoal drawings with a backlight"}" class="${"image svelte-wdp2xd"}" src="${"/art/a-c2.jpeg"}">
</div>`;
});
var portfolio = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Portfolio
});
var css$1 = {
  code: ".posts.svelte-3bstvf.svelte-3bstvf{list-style:none;padding:0}.posts.svelte-3bstvf li.svelte-3bstvf{padding:1rem;padding-left:0}.posts.svelte-3bstvf li p.svelte-3bstvf{padding:0;margin-top:0;color:var(--med-gray)}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  const allPosts = import.meta.glob(\\"./*.md\\");\\n\\n  // console.log(allPosts);\\n  let promisedPosts = [];\\n  for (let path in allPosts) {\\n    promisedPosts.push(\\n      allPosts[path]().then(({ metadata }) => {\\n        // console.log(metadata);\\n        return { path, metadata };\\n      })\\n    );\\n  }\\n  export const load = async () => {\\n    let posts = await Promise.all(promisedPosts);\\n    posts = posts.sort((a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date));\\n    // console.log(posts);\\n\\n    return {\\n      props: {\\n        posts: posts\\n      }\\n    };\\n  };\\n<\/script>\\n\\n<script>\\n  export let posts;\\n<\/script>\\n\\n<svelte:head>\\n  <title>Posts - Finn James</title>\\n</svelte:head>\\n\\n<h1>Posts</h1>\\n\\n<ul class=\\"posts\\">\\n  {#each posts.reverse() as { path, metadata: { title, date } }}\\n    <li>\\n      <p>\\n        <a sveltekit:prefetch href={`/posts/${path.replace(\\".md\\", \\"\\").replace(\\".svx\\", \\"\\")}`}\\n          >{title}</a\\n        >\\n      </p>\\n      <!-- <p>{date}</p> -->\\n    </li>\\n  {/each}\\n</ul>\\n\\n<style lang=\\"scss\\">.posts {\\n  list-style: none;\\n  padding: 0;\\n}\\n.posts li {\\n  padding: 1rem;\\n  padding-left: 0;\\n}\\n.posts li p {\\n  padding: 0;\\n  margin-top: 0;\\n  color: var(--med-gray);\\n}</style>\\n"],"names":[],"mappings":"AAiDmB,MAAM,4BAAC,CAAC,AACzB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,oBAAM,CAAC,EAAE,cAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,CAAC,AACjB,CAAC,AACD,oBAAM,CAAC,EAAE,CAAC,CAAC,cAAC,CAAC,AACX,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,CAAC,CACb,KAAK,CAAE,IAAI,UAAU,CAAC,AACxB,CAAC"}'
};
var allPosts = { "./2020-05-16-init.md": () => Promise.resolve().then(function() {
  return _20200516Init;
}), "./2020-09-08-what-does-radiolevity-mean.md": () => Promise.resolve().then(function() {
  return _20200908WhatDoesRadiolevityMean;
}), "./2021-05-04-new-domain.md": () => Promise.resolve().then(function() {
  return _20210504NewDomain;
}), "./2021-07-11-all-new-site.md": () => Promise.resolve().then(function() {
  return _20210711AllNewSite;
}) };
var promisedPosts = [];
for (let path in allPosts) {
  promisedPosts.push(allPosts[path]().then(({ metadata: metadata2 }) => {
    return { path, metadata: metadata2 };
  }));
}
var load = async () => {
  let posts = await Promise.all(promisedPosts);
  posts = posts.sort((a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date));
  return { props: { posts } };
};
var Posts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Posts - Finn James</title>`, ""}`, ""}

<h1>Posts</h1>

<ul class="${"posts svelte-3bstvf"}">${each(posts.reverse(), ({ path, metadata: { title: title2, date: date2 } }) => `<li class="${"svelte-3bstvf"}"><p class="${"svelte-3bstvf"}"><a sveltekit:prefetch${add_attribute("href", `/posts/${path.replace(".md", "").replace(".svx", "")}`, 0)}>${escape2(title2)}</a></p>
      
    </li>`)}
</ul>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Posts,
  load
});
var metadata$3 = {
  "title": "What Does Radiolevity Mean?",
  "date": "2020-09-08 00:00:00 -0400",
  "categories": "blog"
};
var { title: title$3, date: date$3, categories: categories$3 } = metadata$3;
var _2020_09_08_what_does_radiolevity_mean = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>${escape2(title$3)}</h1>
<p>My username everywhere online is <strong>radiolevity</strong>. It doesn\u2019t really mean
anything in particular\u2014I was inspired by my radio-spectrum astronomy research,
my love of radio and podcasts, and my general desire to keep things
lighthearted. But at a certain point, I just wanted something that was easy to
say, spell, and remember. I made my radio logo by those same principles.</p>
<p>Another advantage is that my name is rather common, especially in Europe. This
makes my username slightly more recognizable than if I just used my name.
Furthermore, much to my chagrin, I cannot get \u201Cfinnjames\u201D as a username on most
of the major platforms anymore.</p>
<p>Lastly, I appreciate when someone has a consistent handle across many platforms,
because it means you can appreciate their work and find their voice in a number
of different contexts. This has the associated effect of degrading one\u2019s
anonymity\u2014my real name is deliberately very easy to find if you have my
username\u2014but this is not necessarily a bad thing. I appreciate that by linking
my name to a specific username I can more easily take credit and pride in my
work without worrying too much.</p>`;
});
var _20200908WhatDoesRadiolevityMean = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020_09_08_what_does_radiolevity_mean,
  metadata: metadata$3
});
var metadata$2 = {
  "title": "All New Site",
  "date": "2021-07-11 00:00:00 -0400",
  "categories": "blog"
};
var { title: title$2, date: date$2, categories: categories$2 } = metadata$2;
var _2021_07_11_all_new_site = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>${escape2(title$2)}</h1>
<p>As much as Jekyll + GitHub Pages served me well for my old static site, I have
decided to take the plunge into a modern framework-based version. This site is
made in the excellent <a href="${"https://kit.svelte.dev/"}" rel="${"nofollow"}">SvelteKit</a>. It isn\u2019t done, yet.
At time of this writing, the \u201CPosts\u201D and \u201CPortfolio\u201D pages still definitely need
some work. With that said, I am very happy with how the new site is working out.</p>
<p>I made a point with this rewrite to use as little code from the original version
as possible. Indeed, I think there is very, very little holdover from the
original\u2014the only things that spring to mind are the CSS that generates the
Markdown-esque header markers and the click-to-copy email button on the home
page.</p>
<p>The new version of this site is hosted on <a href="${"https://vercel.com/"}" rel="${"nofollow"}">Vercel</a>, using
the shockingly simple-to-use Svelte adapter for it. I\u2019ve been really impressed
with how simple and easy Vercel is to use.</p>
<h2>Why SvelteKit?</h2>
<p>I have been wanting to learn to use Svelte for a while now. I\u2019ve been using Vue
for over a year now, and while I really like its functionality and wide support,
I also like Svelte\u2019s opinionated approach to organization and syntax.
Furthermore, I wanted to try a static site generator framework and with
SvelteKit nearing a 1.0 release, I figured now was as good a time as any.  </p>
<p>Next (lol) on the docket are Next.js and Astro.</p>
<h2>So what\u2019s left?</h2>
<p>I am trying some new stuff with this site. I want to add a lot more details
before I really consider it to be \u201Cdone.\u201D One big example is dark mode support.
I would like to be able to choose \u201CAuto\u201D in addition to the current Light/Dark
toggle. Another one (as I mentioned above) is that I want the blog section to
get some more attention. It\u2019s pretty basic right now, which is fine, but I want
to enable photos, code snippets, interactive elements, searching articles, etc.
I also think it would be cool to have some sort of dashboard for editing my
site. Right now the whole site is made by me, so I\u2019d either have to find a
dashboard/CMS to connect up or write my own. In the mean time, VSCode will be my
CMS!</p>`;
});
var _20210711AllNewSite = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2021_07_11_all_new_site,
  metadata: metadata$2
});
var metadata$1 = {
  "title": "New Domain",
  "date": "2021-05-19 00:00:00 -0400",
  "categories": "blog"
};
var { title: title$1, date: date$1, categories: categories$1 } = metadata$1;
var _2021_05_04_new_domain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>${escape2(title$1)}</h1>
<p>I am excited to report that my new domain, <a href="${"https://fsj.xyz"}" rel="${"nofollow"}">fsj.xyz</a> is live.
In the endless quest to have a short domain name, I elected for the gTLD
<strong>.xyz</strong> and just my initials. It was remarkably difficult to secure a domain
name that I felt excited about, but I am very happy with this one. My old domain
(finnjames.dev) redirects to this site, now.</p>
<p>I do think it is easy to get obsessed with acquiring the perfect domain name. I
went through a lot of different options before settling on this one. I can\u2019t say
it was my very first choice, but as it turns out, fsj.com has been taken since
the 90s. I appreciate that this one is short, easy to say and write, and is
reasonably memorable.</p>
<p>I have also set up an email account for this domain. Try it out by sending an
email to \u201Chey\u201D at this domain!</p>`;
});
var _20210504NewDomain = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2021_05_04_new_domain,
  metadata: metadata$1
});
var metadata = {
  "title": "Hello World!",
  "date": "2020-05-16 00:00:00 -0400",
  "categories": "test"
};
var { title, date, categories } = metadata;
var _2020_05_16_init = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>${escape2(title)}</h1>
<p>This is the first post on this site. It\u2019s here for testing purposes.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Viverra tellus in hac habitasse
platea dictumst vestibulum rhoncus est. Odio ut enim blandit volutpat maecenas
volutpat. Felis eget velit aliquet sagittis id consectetur purus ut. Ac turpis
egestas integer eget aliquet nibh praesent tristique magna.</p>
<p>Vestibulum mattis ullamcorper velit sed. Urna cursus eget nunc scelerisque
viverra mauris. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula.
Ac turpis egestas sed tempus. Nulla at volutpat diam ut venenatis. Nisl
condimentum id venenatis a condimentum vitae sapien.</p>`;
});
var _20200516Init = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020_05_16_init,
  metadata
});
var css = {
  code: '.gray.svelte-1gtc8hs{opacity:0.5}.roman.svelte-1gtc8hs{font-variation-settings:"wght" 400}',
  map: '{"version":3,"file":"cv.md","sources":["cv.md"],"sourcesContent":["<script context=\\"module\\">\\n\\texport const metadata = {\\"title\\":\\"CV\\"};\\n\\tconst { title } = metadata;\\n<\/script>\\n<style lang=\\"scss\\">.gray {\\n  opacity: 0.5;\\n}\\n\\n.roman {\\n  font-variation-settings: \\"wght\\" 400;\\n}</style>\\n\\n\\n<h1>CV</h1>\\n<h2>Education</h2>\\n<h3>University of North Carolina at Chapel Hill</h3>\\n<p>Computer Science and Studio Art double major. GPA: 3.94. Expected graduation: May 2022.</p>\\n<h3>Honors Carolina</h3>\\n<p>I joined the UNC Honors Program in my first year.</p>\\n<h2>Grants & Honors</h2>\\n<h3>NC Space Grant for Undergraduate Research Fellowship</h3>\\n<span class=\\"gray\\">June 2020 - May 2021</span>\\n<p>My proposal for \u201CA New Test of General Relativity using Binary Supermassive Black Holes and Radio Telescopes\u201D was selected to receive funding so that I can develop and use sophisticated image processing systems for radio telescope observations of the OJ287 black hole system.</p>\\n<h3>Phi Beta Kappa</h3>\\n<span class=\\"gray\\">April 2021</span>\\n<p>I joined the Phi Beta Kappa honor society in April of 2021.</p>\\n<h3>UNC Nomination for Barry M. Goldwater Scholarship</h3>\\n<span class=\\"gray\\">January 2021</span>\\n<p>I was selected by my university for nomination for the Barry M. Goldwater Scholarship, a prestigious award for undergraduates to further their science and engineering research. The scholarship is particularly focused on supporting students in beginning their graduate school careers.</p>\\n<h3>ERIRA</h3>\\n<span class=\\"gray\\">August 2019</span>\\n<p>I was selected for the Educational Research In Radio Astronomy program. It is an intensive course at the Green Bank Observatory involving data collection, data analysis, deadline management, and teamwork.</p>\\n<h3>HackNC Second Place Winner</h3>\\n<span class=\\"gray\\">October 2019</span>\\n<p>I won second place for my hardware project at HackNC 2019. My team and I constructed a rig using Python and OpenCV to 3D track the position of objects in real time. As the team\u2019s software developer, I wrote the system that interpreted the dual input streams coming from the stereoscopic camera setup so that the depth of the objects could be calculated in real time. In this project, I led my team to each build a part of the project separately and combine them seamlessly.</p>\\n<h3>RYLA</h3>\\n<span class=\\"gray\\">April 2017</span>\\n<p>I was honored with the Rotary Youth Leadership Award for exhibiting leadership and initiative in my community service and schoolwork, and I attended the associated conference. The conference is an 18-hour-a-day high-energy event where the recipients work with each other to develop leadership and problem solving skills. I was sponsored by the East Chapel Hill Rotary Club.</p>\\n<h2>Work</h2>\\n<h3>SAS <span class=\\"roman\\">\u2014 UX Developer Intern</span></h3>\\n<span class=\\"gray\\">May 2021 \u2013 August 2021</span>\\n<p>I am creating a new internal application to improve interface accessibility and consistency.</p>\\n<h3>UNC Department of Physics & Astronomy <span class=\\"roman\\">\u2014 Research Assistant</span></h3>\\n<span class=\\"gray\\">August 2019 \u2013 Present</span>\\n<p>I do astrophysics research and software development with Dr. Dan Reichart in the Physics & Astronomy Department at UNC.</p>\\n<p>For my first project, I wrote <a\\n  href=\\"https://github.com/finnsjames/threepio\\"\\n  rel=\\"nofollow\\"\\n>an open source application</a> to interpret data coming from the 40\u2019 radio telescope at the Green Bank Observatory. I engineered the data logic to interface between sixty-year-old radio astronomy equipment and modern analysis programs. I designed the UI/UX to remain accessible to the students and scientists who use it for their research.</p>\\n<p>Now, I am building a new front-end application for the Skynet robotic telescope network, with a focus on the radio data interpretation and analysis tools.</p>\\n<h3>UNC Department of Computer Science <span class=\\"roman\\">\u2014 Learning Assistant</span></h3>\\n<span class=\\"gray\\">Spring 2021 \u2013 Present</span>\\n<p>I help teach undergraduate students in COMP541, an upper-level chip architecture course taught by Dr. Montek Singh.</p>\\n<h3>Radiolevity <span class=\\"roman\\">\u2014 Web Developer & Designer</span></h3>\\n<span class=\\"gray\\">June 2019 \u2013 Present</span>\\n<p>I am a freelance designer and full-stack web developer. I am a one-stop shop for local clients to create or overhaul their web presence. A portfolio example: the <a\\n  href=\\"https://chapelhillfriends.org\\"\\n  rel=\\"nofollow\\"\\n>Chapel Hill Friends Meeting website</a>.</p>\\n<h3>Carolina Friends School <span class=\\"roman\\">\u2014 Counselor</span></h3>\\n<span class=\\"gray\\">Summer 2016 \u2013 Summer 2019</span>\\n<p>I led activities with campers at Carolina Friends School Summer Programs to encourage teamwork, participation, and community.</p>\\n<h2>Skills</h2>\\n<h3>Computer Science</h3>\\n<p><strong>Proficient in:</strong> Python, C, Java, TypeScript, Vue, JavaScript, SystemVerilog, <span title=\\"source for this site on GitHub (finnsjames/fsj.xyz)\\">HTML/CSS</span></p>\\n<p><strong>Courses Completed by Summer 2021:</strong> Digital Logic & Computer Design, Models of Language & Computation, Data Structures, Computer Architecture, Digital Photography, Modern Web Development, UX Design & Usability</p>\\n<h3>Mathematics</h3>\\n<p><strong>Courses Completed by Summer 2021:</strong> Discrete Mathematics, Linear Algebra, Multivariable Calculus, Probability</p>\\n<p><strong>Familiarity with:</strong> Wolfram Mathematica, Microsoft Excel</p>\\n<h3>Astrophysics</h3>\\n<p><strong>Courses Completed by Summer 2021:</strong> Calculus-Based Mechanics & Relativity, Intro Astronomy & Lab, Intro Cosmology</p>\\n<p><strong>Familiarity with:</strong> Astropy, NumPy, Stellarium, Radio Cartographer, Afterglow</p>\\n<h3>Technology</h3>\\n<p><strong>IDEs & editors:</strong>\\nPyCharm, IntelliJ IDEA, Eclipse, VSCode, vim</p>\\n<p><strong>Tools:</strong>\\ngit, node, npm, zsh, bash</p>\\n<p><strong>Software:</strong>\\nPhotoshop, Illustrator, XD, InDesign, Premiere Pro, Audacity, Microsoft Office</p>\\n<p><strong>Operating Systems:</strong>\\nmacOS, Linux, Windows, iOS</p>\\n<h3>Foreign Language</h3>\\n<p><strong>Japanese:</strong>\\nI have completed three semesters of Japanese.</p>\\n<h2>Community Service</h2>\\n<h3>Cofounder, <span class=\\"roman\\">Project Recap</span></h3>\\n<span class=\\"gray\\">Spring 2018</span>\\n<p>I co-founded and managed a charitable program that continues today to collect, clean, and redistribute graduation paraphernalia to high school students.</p>\\n<h3>Creator & Instructor, <span class=\\"roman\\">CodeBuilders Programming Course</span></h3>\\n<span class=\\"gray\\">Spring 2017</span>\\n<p>I created and taught an intro programming class for middle-school-aged students. We covered Python and Web development. I designed the course to focus on fundamentals so that the students would feel more comfortable coding and working with computers.</p>\\n<h3>Instructor, <span class=\\"roman\\">Durham Public Library</span></h3>\\n<span class=\\"gray\\">Summer 2016</span>\\n<p>I volunteered with the Durham Public Library Techno Saturdays Program, where I taught programming and computer science to children who might otherwise not have had exposure to computers. </p>\\n<h2>Interests</h2>\\n<h4>Photography</h4>\\n<p>A few of my recent images may be found in my <a\\n  href=\\"/portfolio#photography\\"\\n>Portfolio</a>.</p>\\n<h4>Drawing & Painting</h4>\\n<p>Likewise, a few of my drawings <a\\n  href=\\"/portfolio#drawing\\"\\n>may also be found there</a>.</p>\\n<h4>Martial Arts</h4>\\n<p>I have practiced martial arts for years and have achieved a second degree black belt in the Japanese martial art <em>toshindo</em>.</p>\\n<h4>Reading</h4>\\n<p>My favorite books include <em>The Brief Wondrous Life of Oscar Wao</em> by Junot D\xEDaz, <em>Jane Eyre</em> by Charlotte Bront\xEB, and <em>Going Postal</em> by Terry Pratchett.</p>\\n<h4>Architecture</h4>\\n<p>I am a fan of modern architecture and minimalist spaces. I particularly appreciate the works of Ludwig Mies van der Rohe.</p>\\n<h4>Cooking</h4>\\n<p>I love to cook, especially Japanese and Italian cuisine. I also once threw a Latke\u2013Hamantash Debate event in the style of <a\\n  href=\\"https://en.wikipedia.org/wiki/Latke%E2%80%93Hamantash_Debate\\"\\n  rel=\\"nofollow\\"\\n>the original</a>, which involved both making and arguing about the relative metaphysical merits of both foods.</p>\\n<br />\\n<br />\\n<span class=\\"gray\\">Updated June 2021</span>\\n"],"names":[],"mappings":"AAImB,KAAK,eAAC,CAAC,AACxB,OAAO,CAAE,GAAG,AACd,CAAC,AAED,MAAM,eAAC,CAAC,AACN,uBAAuB,CAAE,MAAM,CAAC,GAAG,AACrC,CAAC"}'
};
var Cv$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1>CV</h1>
<h2>Education</h2>
<h3>University of North Carolina at Chapel Hill</h3>
<p>Computer Science and Studio Art double major. GPA: 3.94. Expected graduation: May 2022.</p>
<h3>Honors Carolina</h3>
<p>I joined the UNC Honors Program in my first year.</p>
<h2>Grants &amp; Honors</h2>
<h3>NC Space Grant for Undergraduate Research Fellowship</h3>
<span class="${"gray svelte-1gtc8hs"}">June 2020 - May 2021</span>
<p>My proposal for \u201CA New Test of General Relativity using Binary Supermassive Black Holes and Radio Telescopes\u201D was selected to receive funding so that I can develop and use sophisticated image processing systems for radio telescope observations of the OJ287 black hole system.</p>
<h3>Phi Beta Kappa</h3>
<span class="${"gray svelte-1gtc8hs"}">April 2021</span>
<p>I joined the Phi Beta Kappa honor society in April of 2021.</p>
<h3>UNC Nomination for Barry M. Goldwater Scholarship</h3>
<span class="${"gray svelte-1gtc8hs"}">January 2021</span>
<p>I was selected by my university for nomination for the Barry M. Goldwater Scholarship, a prestigious award for undergraduates to further their science and engineering research. The scholarship is particularly focused on supporting students in beginning their graduate school careers.</p>
<h3>ERIRA</h3>
<span class="${"gray svelte-1gtc8hs"}">August 2019</span>
<p>I was selected for the Educational Research In Radio Astronomy program. It is an intensive course at the Green Bank Observatory involving data collection, data analysis, deadline management, and teamwork.</p>
<h3>HackNC Second Place Winner</h3>
<span class="${"gray svelte-1gtc8hs"}">October 2019</span>
<p>I won second place for my hardware project at HackNC 2019. My team and I constructed a rig using Python and OpenCV to 3D track the position of objects in real time. As the team\u2019s software developer, I wrote the system that interpreted the dual input streams coming from the stereoscopic camera setup so that the depth of the objects could be calculated in real time. In this project, I led my team to each build a part of the project separately and combine them seamlessly.</p>
<h3>RYLA</h3>
<span class="${"gray svelte-1gtc8hs"}">April 2017</span>
<p>I was honored with the Rotary Youth Leadership Award for exhibiting leadership and initiative in my community service and schoolwork, and I attended the associated conference. The conference is an 18-hour-a-day high-energy event where the recipients work with each other to develop leadership and problem solving skills. I was sponsored by the East Chapel Hill Rotary Club.</p>
<h2>Work</h2>
<h3>SAS <span class="${"roman svelte-1gtc8hs"}">\u2014 UX Developer Intern</span></h3>
<span class="${"gray svelte-1gtc8hs"}">May 2021 \u2013 August 2021</span>
<p>I am creating a new internal application to improve interface accessibility and consistency.</p>
<h3>UNC Department of Physics &amp; Astronomy <span class="${"roman svelte-1gtc8hs"}">\u2014 Research Assistant</span></h3>
<span class="${"gray svelte-1gtc8hs"}">August 2019 \u2013 Present</span>
<p>I do astrophysics research and software development with Dr. Dan Reichart in the Physics &amp; Astronomy Department at UNC.</p>
<p>For my first project, I wrote <a href="${"https://github.com/finnsjames/threepio"}" rel="${"nofollow"}">an open source application</a> to interpret data coming from the 40\u2019 radio telescope at the Green Bank Observatory. I engineered the data logic to interface between sixty-year-old radio astronomy equipment and modern analysis programs. I designed the UI/UX to remain accessible to the students and scientists who use it for their research.</p>
<p>Now, I am building a new front-end application for the Skynet robotic telescope network, with a focus on the radio data interpretation and analysis tools.</p>
<h3>UNC Department of Computer Science <span class="${"roman svelte-1gtc8hs"}">\u2014 Learning Assistant</span></h3>
<span class="${"gray svelte-1gtc8hs"}">Spring 2021 \u2013 Present</span>
<p>I help teach undergraduate students in COMP541, an upper-level chip architecture course taught by Dr. Montek Singh.</p>
<h3>Radiolevity <span class="${"roman svelte-1gtc8hs"}">\u2014 Web Developer &amp; Designer</span></h3>
<span class="${"gray svelte-1gtc8hs"}">June 2019 \u2013 Present</span>
<p>I am a freelance designer and full-stack web developer. I am a one-stop shop for local clients to create or overhaul their web presence. A portfolio example: the <a href="${"https://chapelhillfriends.org"}" rel="${"nofollow"}">Chapel Hill Friends Meeting website</a>.</p>
<h3>Carolina Friends School <span class="${"roman svelte-1gtc8hs"}">\u2014 Counselor</span></h3>
<span class="${"gray svelte-1gtc8hs"}">Summer 2016 \u2013 Summer 2019</span>
<p>I led activities with campers at Carolina Friends School Summer Programs to encourage teamwork, participation, and community.</p>
<h2>Skills</h2>
<h3>Computer Science</h3>
<p><strong>Proficient in:</strong> Python, C, Java, TypeScript, Vue, JavaScript, SystemVerilog, <span title="${"source for this site on GitHub (finnsjames/fsj.xyz)"}">HTML/CSS</span></p>
<p><strong>Courses Completed by Summer 2021:</strong> Digital Logic &amp; Computer Design, Models of Language &amp; Computation, Data Structures, Computer Architecture, Digital Photography, Modern Web Development, UX Design &amp; Usability</p>
<h3>Mathematics</h3>
<p><strong>Courses Completed by Summer 2021:</strong> Discrete Mathematics, Linear Algebra, Multivariable Calculus, Probability</p>
<p><strong>Familiarity with:</strong> Wolfram Mathematica, Microsoft Excel</p>
<h3>Astrophysics</h3>
<p><strong>Courses Completed by Summer 2021:</strong> Calculus-Based Mechanics &amp; Relativity, Intro Astronomy &amp; Lab, Intro Cosmology</p>
<p><strong>Familiarity with:</strong> Astropy, NumPy, Stellarium, Radio Cartographer, Afterglow</p>
<h3>Technology</h3>
<p><strong>IDEs &amp; editors:</strong>
PyCharm, IntelliJ IDEA, Eclipse, VSCode, vim</p>
<p><strong>Tools:</strong>
git, node, npm, zsh, bash</p>
<p><strong>Software:</strong>
Photoshop, Illustrator, XD, InDesign, Premiere Pro, Audacity, Microsoft Office</p>
<p><strong>Operating Systems:</strong>
macOS, Linux, Windows, iOS</p>
<h3>Foreign Language</h3>
<p><strong>Japanese:</strong>
I have completed three semesters of Japanese.</p>
<h2>Community Service</h2>
<h3>Cofounder, <span class="${"roman svelte-1gtc8hs"}">Project Recap</span></h3>
<span class="${"gray svelte-1gtc8hs"}">Spring 2018</span>
<p>I co-founded and managed a charitable program that continues today to collect, clean, and redistribute graduation paraphernalia to high school students.</p>
<h3>Creator &amp; Instructor, <span class="${"roman svelte-1gtc8hs"}">CodeBuilders Programming Course</span></h3>
<span class="${"gray svelte-1gtc8hs"}">Spring 2017</span>
<p>I created and taught an intro programming class for middle-school-aged students. We covered Python and Web development. I designed the course to focus on fundamentals so that the students would feel more comfortable coding and working with computers.</p>
<h3>Instructor, <span class="${"roman svelte-1gtc8hs"}">Durham Public Library</span></h3>
<span class="${"gray svelte-1gtc8hs"}">Summer 2016</span>
<p>I volunteered with the Durham Public Library Techno Saturdays Program, where I taught programming and computer science to children who might otherwise not have had exposure to computers. </p>
<h2>Interests</h2>
<h4>Photography</h4>
<p>A few of my recent images may be found in my <a href="${"/portfolio#photography"}">Portfolio</a>.</p>
<h4>Drawing &amp; Painting</h4>
<p>Likewise, a few of my drawings <a href="${"/portfolio#drawing"}">may also be found there</a>.</p>
<h4>Martial Arts</h4>
<p>I have practiced martial arts for years and have achieved a second degree black belt in the Japanese martial art <em>toshindo</em>.</p>
<h4>Reading</h4>
<p>My favorite books include <em>The Brief Wondrous Life of Oscar Wao</em> by Junot D\xEDaz, <em>Jane Eyre</em> by Charlotte Bront\xEB, and <em>Going Postal</em> by Terry Pratchett.</p>
<h4>Architecture</h4>
<p>I am a fan of modern architecture and minimalist spaces. I particularly appreciate the works of Ludwig Mies van der Rohe.</p>
<h4>Cooking</h4>
<p>I love to cook, especially Japanese and Italian cuisine. I also once threw a Latke\u2013Hamantash Debate event in the style of <a href="${"https://en.wikipedia.org/wiki/Latke%E2%80%93Hamantash_Debate"}" rel="${"nofollow"}">the original</a>, which involved both making and arguing about the relative metaphysical merits of both foods.</p>
<br>
<br>
<span class="${"gray svelte-1gtc8hs"}">Updated June 2021</span>`;
});
var Cv = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>CV - Finn James</title>`, ""}`, ""}

${validate_component(Cv$1, "CV").$$render($$result, {}, {}, {})}`;
});
var cv = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Cv
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
