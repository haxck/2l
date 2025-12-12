var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};

// .dev/devConfig.js
var devConfig_exports = {};
__export(devConfig_exports, {
  default: () => devConfig_default
});
var devConfig_default;
var init_devConfig = __esm({
  ".dev/devConfig.js"() {
    devConfig_default = {
      "1765523891081": {
        "entry": "D:\\project\\t\\2l\\src\\app\\function\\index.js",
        "port": 18081,
        "localUpstream": ""
      }
    };
  }
});

// .dev/devEntry-1765523891081.js
import { blue, green, yellow, red, magenta, bold } from "https://deno.land/std@0.177.0/fmt/colors.ts";

// src/app/function/index.js
var function_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;
    if (!pathname.startsWith("/api")) {
      return new Response("Not Found", {
        status: 404
      });
    }
    switch (pathname) {
      case "/api/get-key":
        return handleGetKey(request, url);
      case "/api/put-key":
        return handlePutKey(request, url);
      case "/api/delete-key":
        return handleDeleteKey(request, url);
      default:
        return new Response("Invalid API Path", {
          status: 400
        });
    }
  }
};

// .dev/mock/cache.js
var MockCache = class _MockCache {
  constructor(instance) {
    this.mockCache = instance;
  }
  static async init(cacheName) {
    const instance = await _MockCache.open(cacheName);
    return new _MockCache(instance);
  }
  static open(cacheName) {
    return caches.open(cacheName);
  }
  static has(cacheName) {
    return caches.has(cacheName);
  }
  static delete(cacheName) {
    return caches.delete(cacheName);
  }
  match(reqOrUrl, options) {
    return this.mockCache.match(reqOrUrl, options);
  }
  delete(reqOrUrl, options) {
    return this.mockCache.delete(reqOrUrl, options);
  }
  put(reqOrUrl, response) {
    return this.mockCache.put(reqOrUrl, response);
  }
  get(reqOrUrl, options) {
    return this.match(reqOrUrl, options);
  }
};
var cache_default = MockCache;

// .dev/mock/kv.js
import * as path from "https://deno.land/std/path/mod.ts";
var mockKV = class {
  namespace;
  filePath;
  allData;
  constructor(options) {
    this.namespace = options.namespace;
    this.filePath = path.join(this.getRoot(), ".dev/.kv");
    this.allData = {};
  }
  getRoot(root) {
    if (typeof root === "undefined") {
      root = Deno.cwd();
    }
    if (root === "/") {
      return Deno.cwd();
    }
    const file = path.join(root, "cliconfig.toml");
    const prev = path.resolve(root, "../");
    try {
      const hasToml = fs.existsSync(file);
      if (hasToml) {
        return root;
      } else {
        return this.getRoot(prev);
      }
    } catch (err) {
      return this.getRoot(prev);
    }
  }
  async _loadData() {
    try {
      const fileData = await Deno.readTextFile(this.filePath);
      this.allData = JSON.parse(fileData);
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        console.error("Error reading KV file:", error);
      }
    }
  }
  async get(key, options) {
    await this._loadData();
    const namespaceData = this.allData[this.namespace] || {};
    if (!(key in namespaceData)) {
      return void 0;
    }
    const value = namespaceData[key];
    const type = options?.type || "text";
    switch (type) {
      case "text":
        return value;
      case "json":
        try {
          return JSON.parse(value);
        } catch (error) {
          throw new Error("Failed to parse JSON");
        }
      case "arrayBuffer":
        const encoder = new TextEncoder();
        const uint8Array = encoder.encode(value);
        return uint8Array.buffer;
      default:
        throw new Error("Invalid type option");
    }
  }
  async put(key, value) {
    const namespaceData = this.allData[this.namespace] || {};
    namespaceData[key] = value;
    this.allData[this.namespace] = namespaceData;
    await this._saveData();
  }
  async delete(key) {
    const namespaceData = this.allData[this.namespace] || {};
    delete namespaceData[key];
    this.allData[this.namespace] = namespaceData;
    await this._saveData();
  }
  async _saveData() {
    try {
      await Deno.writeTextFile(this.filePath, JSON.stringify(this.allData));
    } catch (error) {
      console.error("Error writing KV file:", error);
    }
  }
};
var kv_default = mockKV;

// .dev/devEntry-1765523891081.js
var id = Deno.args[0];
var getColorForStatusCode = (statusCode, message) => {
  if (statusCode >= 100 && statusCode < 200) {
    return blue(`${statusCode} ${message}`);
  } else if (statusCode >= 200 && statusCode < 300) {
    return green(`${statusCode} ${message}`);
  } else if (statusCode >= 300 && statusCode < 400) {
    return yellow(`${statusCode} ${message}`);
  } else if (statusCode >= 400 && statusCode < 500) {
    return red(`${statusCode} ${message}`);
  } else if (statusCode >= 500) {
    return magenta(bold(`${statusCode} ${message}`));
  } else {
    return `${statusCode} ${message}`;
  }
};
var dev = async () => {
  try {
    const configs = (await Promise.resolve().then(() => (init_devConfig(), devConfig_exports))).default;
    const config = configs[id] ?? {};
    const cacheInstance = await cache_default.init("mock");
    globalThis.mockCache = cacheInstance;
    globalThis.mockKV = kv_default;
    if (!function_default || !function_default.fetch) {
      throw new Error("Invalid ER code.");
    }
    Deno.serve({
      port: config.port,
      handler: async request => {
        const url = new URL(request.url);
        let nextRequest = request;
        if (config.localUpstream) {
          const nextUrl = `${config.localUpstream}${url.pathname}${url.search}${url.hash}`;
          nextRequest = new Request(nextUrl, request);
        }
        try {
          const res = await function_default.fetch(nextRequest);
          const status = res.status;
          console.log(`[ESA Dev] ${request.method} ${url.pathname} ${getColorForStatusCode(status, res.statusText)}`);
          return res;
        } catch (err) {
          console.error(err);
          console.log(`[ESA Dev] ${request.method} ${url.pathname} ${getColorForStatusCode(500, "Internal Server Error")}`);
          return new Response("Internal Server Error", {
            status: 500
          });
        }
      }
    });
  } catch (err) {
    console.log("\n");
    console.error(red(err));
  }
};
dev();