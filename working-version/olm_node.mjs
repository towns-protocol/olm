import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Declare and export variables that will be populated after initialization
export let Account;
export let Session;
export let Utility;
export let OutboundGroupSession;
export let InboundGroupSession;
export let PkEncryption;
export let PkDecryption;
export let PkSigning;
export let SAS;
export let get_library_version;
// Keep _scriptName if it's used by internalInit, otherwise it can be removed.
// For now, assume it might be needed by the Emscripten-generated shell.
var _scriptName = import.meta.url;

let isInitialized = false;
let initializationPromise = null;

export async function initAsync(moduleArg = {}) {
  if (isInitialized) {
    return;
  }
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    const Module = await internalInit(moduleArg);

    // Populate exported variables
    Account = Module.Account;
    Session = Module.Session;
    Utility = Module.Utility;
    OutboundGroupSession = Module.OutboundGroupSession;
    InboundGroupSession = Module.InboundGroupSession;
    PkEncryption = Module.PkEncryption;
    PkDecryption = Module.PkDecryption;
    PkSigning = Module.PkSigning;
    SAS = Module.SAS;
    get_library_version = Module.get_library_version;

    isInitialized = true;
    initializationPromise = null; // Clear the promise once resolved
    // No need to return Module itself from initAsync if the goal is named imports
  })();

  return initializationPromise;
}

// Rename the original init function to internalInit and remove export default
async function internalInit(moduleArg = {}) {
  var moduleRtn;

  // include: shell.js
  // The Module object: Our interface to the outside world. We import
  // and export values on it. There are various ways Module can be used:
  // 1. Not defined. We create it here
  // 2. A function parameter, function(moduleArg) => Promise<Module>
  // 3. pre-run appended it, var Module = {}; ..generated code..
  // 4. External script tag defines var Module.
  // We need to check if Module already exists (e.g. case 3 above).
  // Substitution will be replaced with actual code on later stage of the build,
  // this way Closure Compiler will not mangle it (e.g. case 4. above).
  // Note that if you want to run closure, and also to use Module
  // after the generated code, you will need to define   var Module = {};
  // before the code. Then that object will be used in the code, and you
  // can continue to use Module afterwards as well.
  var Module = moduleArg;

  // Set up the promise that indicates the Module is initialized
  var readyPromiseResolve, readyPromiseReject;

  var readyPromise = new Promise((resolve, reject) => {
    readyPromiseResolve = resolve;
    readyPromiseReject = reject;
  });

  var ENVIRONMENT_IS_NODE = true;

  if (ENVIRONMENT_IS_NODE) {
  }

  // --pre-jses are emitted after the Module integration code, so that they can
  // refer to Module (if they choose; they can also define Module)
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_pre.js
  var nodeCrypto = require("crypto");

  var get_random_values = function (buf) {
    var bytes = nodeCrypto["randomBytes"](buf.length);
    buf.set(bytes);
  };

  /* applications should define OLM_OPTIONS in the environment to override
   * emscripten module settings
   */ if (typeof OLM_OPTIONS !== "undefined") {
    for (var olm_option_key in OLM_OPTIONS) {
      if (OLM_OPTIONS.hasOwnProperty(olm_option_key)) {
        Module[olm_option_key] = OLM_OPTIONS[olm_option_key];
      }
    }
  }

  /* The 'length' argument to Pointer_stringify doesn't work if the input
   * includes characters >= 128, which makes Pointer_stringify unreliable. We
   * could use it on strings which are known to be ascii, but that seems
   * dangerous. Instead we add a NULL character to all of our strings and just
   * use UTF8ToString.
   */ var NULL_BYTE_PADDING_LENGTH = 1;

  Module["onRuntimeInitialized"] = () => {
    OLM_ERROR = _olm_error();
  };

  /* Optional custom abort hook – remove if unused */ // Module["onAbort"] = err => console.error(err);
  // ---- async helper expected by the user ----
  // Module.initAsync = () => Module.ready; // This line will be removed

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_pre.js
  // Sometimes an existing Module object exists with properties
  // meant to overwrite the default module functionality. Here
  // we collect those properties and reapply _after_ we configure
  // the current environment's defaults to avoid having to be so
  // defensive during initialization.
  var moduleOverrides = Object.assign({}, Module);

  var arguments_ = [];

  var thisProgram = "./this.program";

  var quit_ = (status, toThrow) => {
    throw toThrow;
  };

  // `/` should be present at the end if `scriptDirectory` is not empty
  var scriptDirectory = "";

  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
  }

  // Hooks that are implemented differently in different runtime environments.
  var readAsync, readBinary;

  if (ENVIRONMENT_IS_NODE) {
    // These modules will usually be used on Node.js. Load them eagerly to avoid
    // the complexity of lazy-loading.
    var fs = require("fs");
    var nodePath = require("path");
    // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
    // since there's no way getting the current absolute path of the module when
    // support for that is not available.
    if (!import.meta.url.startsWith("data:")) {
      scriptDirectory =
        nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/";
    }
    // include: node_shell_read.js
    readBinary = (filename) => {
      // We need to re-wrap `file://` strings to URLs. Normalizing isn't
      // necessary in that case, the path should already be absolute.
      filename = isFileURI(filename)
        ? new URL(filename)
        : nodePath.normalize(filename);
      var ret = fs.readFileSync(filename);
      return ret;
    };
    readAsync = (filename, binary = true) => {
      // See the comment in the `readBinary` function.
      filename = isFileURI(filename)
        ? new URL(filename)
        : nodePath.normalize(filename);
      return new Promise((resolve, reject) => {
        fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
          if (err) reject(err);
          else resolve(binary ? data.buffer : data);
        });
      });
    };
    // end include: node_shell_read.js
    if (!Module["thisProgram"] && process.argv.length > 1) {
      thisProgram = process.argv[1].replace(/\\/g, "/");
    }
    arguments_ = process.argv.slice(2);
    // MODULARIZE will export the module in the proper place outside, we don't need to export here
    quit_ = (status, toThrow) => {
      process.exitCode = status;
      throw toThrow;
    };
  } // Note that this includes Node.js workers when relevant (pthreads is enabled).
  // Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
  // ENVIRONMENT_IS_NODE.
  else {
  }

  var out = Module["print"] || console.log.bind(console);

  var err = Module["printErr"] || console.error.bind(console);

  // Merge back in the overrides
  Object.assign(Module, moduleOverrides);

  // Free the object hierarchy contained in the overrides, this lets the GC
  // reclaim data used.
  moduleOverrides = null;

  // Emit code to handle expected values on the Module object. This applies Module.x
  // to the proper local x. This has two benefits: first, we only emit it if it is
  // expected to arrive, and second, by using a local everywhere else that can be
  // minified.
  if (Module["arguments"]) arguments_ = Module["arguments"];

  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

  // perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
  // end include: shell.js
  // include: preamble.js
  // === Preamble library stuff ===
  // Documentation for the public APIs defined in this file must be updated in:
  //    site/source/docs/api_reference/preamble.js.rst
  // A prebuilt local version of the documentation is available at:
  //    site/build/text/docs/api_reference/preamble.js.txt
  // You can also build docs locally as HTML or other formats in site/
  // An online HTML version (which may be of a different version of Emscripten)
  //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html
  var wasmBinary = Module["wasmBinary"];

  // Wasm globals
  var wasmMemory;

  //========================================
  // Runtime essentials
  //========================================
  // whether we are quitting the application. no code should run after this.
  // set in exit() and abort()
  var ABORT = false;

  // Memory management
  var /** @type {!Int8Array} */ HEAP8,
    /** @type {!Uint8Array} */ HEAPU8,
    /** @type {!Int16Array} */ HEAP16,
    /** @type {!Uint16Array} */ HEAPU16,
    /** @type {!Int32Array} */ HEAP32,
    /** @type {!Uint32Array} */ HEAPU32,
    /** @type {!Float32Array} */ HEAPF32,
    /** @type {!Float64Array} */ HEAPF64;

  // include: runtime_shared.js
  function updateMemoryViews() {
    var b = wasmMemory.buffer;
    __exp_HEAP8 = HEAP8 = new Int8Array(b);
    __exp_HEAP16 = HEAP16 = new Int16Array(b);
    __exp_HEAPU8 = HEAPU8 = new Uint8Array(b);
    __exp_HEAPU16 = HEAPU16 = new Uint16Array(b);
    __exp_HEAP32 = HEAP32 = new Int32Array(b);
    __exp_HEAPU32 = HEAPU32 = new Uint32Array(b);
    __exp_HEAPF32 = HEAPF32 = new Float32Array(b);
    __exp_HEAPF64 = HEAPF64 = new Float64Array(b);
  }

  // end include: runtime_shared.js
  // include: runtime_stack_check.js
  // end include: runtime_stack_check.js
  var __ATPRERUN__ = [];

  // functions called before the runtime is initialized
  var __ATINIT__ = [];

  // functions called during shutdown
  var __ATPOSTRUN__ = [];

  // functions called after the main() is called
  var runtimeInitialized = false;

  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function")
        Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }

  function initRuntime() {
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
  }

  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function")
        Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }

  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }

  function addOnInit(cb) {
    __ATINIT__.unshift(cb);
  }

  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }

  // include: runtime_math.js
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
  // end include: runtime_math.js
  // A counter of dependencies for calling run(). If we need to
  // do asynchronous work before running, increment this and
  // decrement it. Incrementing must happen in a place like
  // Module.preRun (used by emcc to add file preloading).
  // Note that you can add dependencies in preRun, even though
  // it happens right before run - run will be postponed until
  // the dependencies are met.
  var runDependencies = 0;

  var runDependencyWatcher = null;

  var dependenciesFulfilled = null;

  function addRunDependency(id) {
    runDependencies++;
    Module["monitorRunDependencies"]?.(runDependencies);
  }

  function removeRunDependency(id) {
    runDependencies--;
    Module["monitorRunDependencies"]?.(runDependencies);
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }

  /** @param {string|number=} what */ function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    // TODO(sbc): Should we remove printing and leave it up to whoever
    // catches the exception?
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    // Use a wasm runtime error, because a JS error might be seen as a foreign
    // exception, which means we'd run destructors on it. We need the error to
    // simply make the program stop.
    // FIXME This approach does not work in Wasm EH because it currently does not assume
    // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
    // a trap or not based on a hidden field within the object. So at the moment
    // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
    // allows this in the wasm spec.
    // Suppress closure compiler warning here. Closure compiler's builtin extern
    // definition for WebAssembly.RuntimeError claims it takes no arguments even
    // though it can.
    // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
    /** @suppress {checkTypes} */ var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject(e);
    // Throw the error whether or not MODULARIZE is set because abort is used
    // in code paths apart from instantiation where an exception is expected
    // to be thrown when abort is called.
    throw e;
  }

  // include: memoryprofiler.js
  // end include: memoryprofiler.js
  // include: URIUtils.js
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  var dataURIPrefix = "data:application/octet-stream;base64,";

  /**
   * Indicates whether filename is a base64 data URI.
   * @noinline
   */ var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

  /**
   * Indicates whether filename is delivered via file protocol (as opposed to http/https)
   * @noinline
   */ var isFileURI = (filename) => filename.startsWith("file://");

  // end include: URIUtils.js
  // include: runtime_exceptions.js
  // end include: runtime_exceptions.js
  function findWasmBinary() {
    if (Module["locateFile"]) {
      var f = "olm.wasm";
      if (!isDataURI(f)) {
        return locateFile(f);
      }
      return f;
    }
    // Use bundler-friendly `new URL(..., import.meta.url)` pattern; works in browsers too.
    return new URL("olm.wasm", import.meta.url).href;
  }

  var wasmBinaryFile;

  function getBinarySync(file) {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    }
    throw "both async and sync fetching of the wasm failed";
  }

  function getBinaryPromise(binaryFile) {
    // If we don't have the binary yet, load it asynchronously using readAsync.
    if (!wasmBinary) {
      // Fetch the binary using readAsync
      return readAsync(binaryFile).then(
        (response) => new Uint8Array(/** @type{!ArrayBuffer} */ (response)), // Fall back to getBinarySync if readAsync fails
        () => getBinarySync(binaryFile)
      );
    }
    // Otherwise, getBinarySync should be able to get it synchronously
    return Promise.resolve().then(() => getBinarySync(binaryFile));
  }

  function instantiateArrayBuffer(binaryFile, imports, receiver) {
    return getBinaryPromise(binaryFile)
      .then((binary) => WebAssembly.instantiate(binary, imports))
      .then(receiver, (reason) => {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      });
  }

  function instantiateAsync(binary, binaryFile, imports, callback) {
    if (
      !binary &&
      typeof WebAssembly.instantiateStreaming == "function" &&
      !isDataURI(binaryFile) && // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == "function"
    ) {
      return fetch(binaryFile, {
        credentials: "same-origin",
      }).then((response) => {
        // Suppress closure warning here since the upstream definition for
        // instantiateStreaming only allows Promise<Repsponse> rather than
        // an actual Response.
        // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
        /** @suppress {checkTypes} */ var result =
          WebAssembly.instantiateStreaming(response, imports);
        return result.then(callback, function (reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err("falling back to ArrayBuffer instantiation");
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
      });
    }
    return instantiateArrayBuffer(binaryFile, imports, callback);
  }

  function getWasmImports() {
    // prepare imports
    return {
      a: wasmImports,
    };
  }

  // Create the wasm instance.
  // Receives the wasm imports, returns the exports.
  function createWasm() {
    // Load the wasm module and create an instance of using native support in the JS engine.
    // handle a generated wasm instance, receiving its exports and
    // performing other necessary setup
    /** @param {WebAssembly.Module=} module*/ function receiveInstance(
      instance,
      module
    ) {
      wasmExports = instance.exports;
      wasmMemory = wasmExports["c"];
      updateMemoryViews();
      addOnInit(wasmExports["d"]);
      removeRunDependency("wasm-instantiate");
      return wasmExports;
    }
    // wait for the pthread pool (if any)
    addRunDependency("wasm-instantiate");
    // Prefer streaming instantiation if available.
    function receiveInstantiationResult(result) {
      // 'result' is a ResultObject object which has both the module and instance.
      // receiveInstance() will swap in the exports (to Module.asm) so they can be called
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
      // When the regression is fixed, can restore the above PTHREADS-enabled path.
      receiveInstance(result["instance"]);
    }
    var info = getWasmImports();
    // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
    // to manually instantiate the Wasm module themselves. This allows pages to
    // run the instantiation parallel to any other async startup actions they are
    // performing.
    // Also pthreads and wasm workers initialize the wasm instance through this
    // path.
    if (Module["instantiateWasm"]) {
      try {
        return Module["instantiateWasm"](info, receiveInstance);
      } catch (e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
      }
    }
    wasmBinaryFile ??= findWasmBinary();
    // If instantiation fails, reject the module ready promise.
    instantiateAsync(
      wasmBinary,
      wasmBinaryFile,
      info,
      receiveInstantiationResult
    ).catch(readyPromiseReject);
    return {};
  }

  // include: runtime_debug.js
  // end include: runtime_debug.js
  // === Body ===
  // end include: preamble.js
  class ExitStatus {
    name = "ExitStatus";
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }

  var callRuntimeCallbacks = (callbacks) => {
    while (callbacks.length > 0) {
      // Pass the module as the first argument.
      callbacks.shift()(Module);
    }
  };

  /**
   * @param {number} ptr
   * @param {string} type
   */ function getValue(ptr, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        return HEAP8[ptr];

      case "i8":
        return HEAP8[ptr];

      case "i16":
        return HEAP16[ptr >> 1];

      case "i32":
        return HEAP32[ptr >> 2];

      case "i64":
        abort("to do getValue(i64) use WASM_BIGINT");

      case "float":
        return HEAPF32[ptr >> 2];

      case "double":
        return HEAPF64[ptr >> 3];

      case "*":
        return HEAPU32[ptr >> 2];

      default:
        abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module["noExitRuntime"] || true;

  /**
   * @param {number} ptr
   * @param {number} value
   * @param {string} type
   */ function setValue(ptr, value, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        HEAP8[ptr] = value;
        break;

      case "i8":
        HEAP8[ptr] = value;
        break;

      case "i16":
        HEAP16[ptr >> 1] = value;
        break;

      case "i32":
        HEAP32[ptr >> 2] = value;
        break;

      case "i64":
        abort("to do setValue(i64) use WASM_BIGINT");

      case "float":
        HEAPF32[ptr >> 2] = value;
        break;

      case "double":
        HEAPF64[ptr >> 3] = value;
        break;

      case "*":
        HEAPU32[ptr >> 2] = value;
        break;

      default:
        abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var __emscripten_memcpy_js = (dest, src, num) =>
    HEAPU8.copyWithin(dest, src, src + num);

  var abortOnCannotGrowMemory = (requestedSize) => {
    abort("OOM");
  };

  var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
    requestedSize >>>= 0;
    abortOnCannotGrowMemory(requestedSize);
  };

  var ALLOC_STACK = 1;

  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);

  /** @param {boolean=} dontAddNull */ var writeAsciiToMemory = (
    str,
    buffer,
    dontAddNull
  ) => {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++] = str.charCodeAt(i);
    }
    // Null-terminate the string
    if (!dontAddNull) HEAP8[buffer] = 0;
  };

  var stringToAscii = (str, buffer) => {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++] = str.charCodeAt(i);
    }
    // Null-terminate the string
    HEAP8[buffer] = 0;
  };

  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
      // unit, not a Unicode code point of the character! So decode
      // UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      var c = str.charCodeAt(i);
      // possibly a lead surrogate
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i;
      } else {
        len += 3;
      }
    }
    return len;
  };

  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
    // undefined and false each don't write out any bytes.
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    // -1 for string null terminator.
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
      // unit, not a Unicode code point of the character! So decode
      // UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
      // and https://www.ietf.org/rfc/rfc2279.txt
      // and https://tools.ietf.org/html/rfc3629
      var u = str.charCodeAt(i);
      // possibly a lead surrogate
      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i);
        u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
      }
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | (u >> 6);
        heap[outIdx++] = 128 | (u & 63);
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | (u >> 12);
        heap[outIdx++] = 128 | ((u >> 6) & 63);
        heap[outIdx++] = 128 | (u & 63);
      } else {
        if (outIdx + 3 >= endIdx) break;
        heap[outIdx++] = 240 | (u >> 18);
        heap[outIdx++] = 128 | ((u >> 12) & 63);
        heap[outIdx++] = 128 | ((u >> 6) & 63);
        heap[outIdx++] = 128 | (u & 63);
      }
    }
    // Null-terminate the pointer to the buffer.
    heap[outIdx] = 0;
    return outIdx - startIdx;
  };

  /** @type {function(string, boolean=, number=)} */ function intArrayFromString(
    stringy,
    dontAddNull,
    length
  ) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(
      stringy,
      u8array,
      0,
      u8array.length
    );
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }

  var UTF8Decoder =
    typeof TextDecoder != "undefined" ? new TextDecoder() : undefined;

  /**
   * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
   * array that contains uint8 values, returns a copy of that string as a
   * Javascript String object.
   * heapOrArray is either a regular array, or a JavaScript typed array view.
   * @param {number=} idx
   * @param {number=} maxBytesToRead
   * @return {string}
   */ var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    // TextDecoder needs to know the byte length in advance, it doesn't stop on
    // null terminator by itself.  Also, use the length info to avoid running tiny
    // strings through TextDecoder, since .subarray() allocates garbage.
    // (As a tiny code save trick, compare endPtr against endIdx using a negation,
    // so that undefined/NaN means Infinity)
    while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    // If building with TextDecoder, we have already computed the string length
    // above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode(((u0 & 31) << 6) | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u0 =
          ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
      }
    }
    return str;
  };

  /**
   * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
   * emscripten HEAP, returns a copy of that string as a Javascript String object.
   *
   * @param {number} ptr
   * @param {number=} maxBytesToRead - An optional length that specifies the
   *   maximum number of bytes to read. You can omit this parameter to scan the
   *   string until the first 0 byte. If maxBytesToRead is passed, and the string
   *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
   *   string will cut short at that byte index (i.e. maxBytesToRead will not
   *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
   *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
   *   JS JIT optimizations off, so it is worth to consider consistently using one
   * @return {string}
   */ var UTF8ToString = (ptr, maxBytesToRead) =>
    ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";

  var stringToUTF8 = (str, outPtr, maxBytesToWrite) =>
    stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);

  var wasmImports = {
    /** @export */ b: __emscripten_memcpy_js,
    /** @export */ a: _emscripten_resize_heap,
  };

  var wasmExports = createWasm();

  var ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports["d"])();

  var _olm_get_library_version = (__exp__olm_get_library_version = (
    a0,
    a1,
    a2
  ) => (_olm_get_library_version = wasmExports["f"])(a0, a1, a2));

  var _olm_error = (__exp__olm_error = () => (_olm_error = wasmExports["g"])());

  var _olm_account_last_error = (__exp__olm_account_last_error = (a0) =>
    (_olm_account_last_error = wasmExports["h"])(a0));

  var __olm_error_to_string = (__exp___olm_error_to_string = (a0) =>
    (__olm_error_to_string = wasmExports["i"])(a0));

  var _olm_account_last_error_code = (__exp__olm_account_last_error_code = (
    a0
  ) => (_olm_account_last_error_code = wasmExports["j"])(a0));

  var _olm_session_last_error = (__exp__olm_session_last_error = (a0) =>
    (_olm_session_last_error = wasmExports["k"])(a0));

  var _olm_session_last_error_code = (__exp__olm_session_last_error_code = (
    a0
  ) => (_olm_session_last_error_code = wasmExports["l"])(a0));

  var _olm_utility_last_error = (__exp__olm_utility_last_error = (a0) =>
    (_olm_utility_last_error = wasmExports["m"])(a0));

  var _olm_utility_last_error_code = (__exp__olm_utility_last_error_code = (
    a0
  ) => (_olm_utility_last_error_code = wasmExports["n"])(a0));

  var _olm_account_size = (__exp__olm_account_size = () =>
    (_olm_account_size = wasmExports["o"])());

  var _olm_session_size = (__exp__olm_session_size = () =>
    (_olm_session_size = wasmExports["p"])());

  var _olm_utility_size = (__exp__olm_utility_size = () =>
    (_olm_utility_size = wasmExports["q"])());

  var _olm_account = (__exp__olm_account = (a0) =>
    (_olm_account = wasmExports["r"])(a0));

  var _olm_session = (__exp__olm_session = (a0) =>
    (_olm_session = wasmExports["s"])(a0));

  var _olm_utility = (__exp__olm_utility = (a0) =>
    (_olm_utility = wasmExports["t"])(a0));

  var _olm_clear_account = (__exp__olm_clear_account = (a0) =>
    (_olm_clear_account = wasmExports["u"])(a0));

  var _olm_clear_session = (__exp__olm_clear_session = (a0) =>
    (_olm_clear_session = wasmExports["v"])(a0));

  var _olm_clear_utility = (__exp__olm_clear_utility = (a0) =>
    (_olm_clear_utility = wasmExports["w"])(a0));

  var _olm_pickle_account_length = (__exp__olm_pickle_account_length = (a0) =>
    (_olm_pickle_account_length = wasmExports["x"])(a0));

  var _olm_pickle_session_length = (__exp__olm_pickle_session_length = (a0) =>
    (_olm_pickle_session_length = wasmExports["y"])(a0));

  var _olm_pickle_account = (__exp__olm_pickle_account = (a0, a1, a2, a3, a4) =>
    (_olm_pickle_account = wasmExports["z"])(a0, a1, a2, a3, a4));

  var _olm_pickle_session = (__exp__olm_pickle_session = (a0, a1, a2, a3, a4) =>
    (_olm_pickle_session = wasmExports["A"])(a0, a1, a2, a3, a4));

  var _olm_unpickle_account = (__exp__olm_unpickle_account = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_unpickle_account = wasmExports["B"])(a0, a1, a2, a3, a4));

  var _olm_unpickle_session = (__exp__olm_unpickle_session = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_unpickle_session = wasmExports["C"])(a0, a1, a2, a3, a4));

  var _olm_create_account_random_length =
    (__exp__olm_create_account_random_length = (a0) =>
      (_olm_create_account_random_length = wasmExports["D"])(a0));

  var _olm_create_account = (__exp__olm_create_account = (a0, a1, a2) =>
    (_olm_create_account = wasmExports["E"])(a0, a1, a2));

  var _olm_account_identity_keys_length =
    (__exp__olm_account_identity_keys_length = (a0) =>
      (_olm_account_identity_keys_length = wasmExports["F"])(a0));

  var _olm_account_identity_keys = (__exp__olm_account_identity_keys = (
    a0,
    a1,
    a2
  ) => (_olm_account_identity_keys = wasmExports["G"])(a0, a1, a2));

  var _olm_account_signature_length = (__exp__olm_account_signature_length = (
    a0
  ) => (_olm_account_signature_length = wasmExports["H"])(a0));

  var _olm_account_sign = (__exp__olm_account_sign = (a0, a1, a2, a3, a4) =>
    (_olm_account_sign = wasmExports["I"])(a0, a1, a2, a3, a4));

  var _olm_account_one_time_keys_length =
    (__exp__olm_account_one_time_keys_length = (a0) =>
      (_olm_account_one_time_keys_length = wasmExports["J"])(a0));

  var _olm_account_one_time_keys = (__exp__olm_account_one_time_keys = (
    a0,
    a1,
    a2
  ) => (_olm_account_one_time_keys = wasmExports["K"])(a0, a1, a2));

  var _olm_account_mark_keys_as_published =
    (__exp__olm_account_mark_keys_as_published = (a0) =>
      (_olm_account_mark_keys_as_published = wasmExports["L"])(a0));

  var _olm_account_max_number_of_one_time_keys =
    (__exp__olm_account_max_number_of_one_time_keys = (a0) =>
      (_olm_account_max_number_of_one_time_keys = wasmExports["M"])(a0));

  var _olm_account_generate_one_time_keys_random_length =
    (__exp__olm_account_generate_one_time_keys_random_length = (a0, a1) =>
      (_olm_account_generate_one_time_keys_random_length = wasmExports["N"])(
        a0,
        a1
      ));

  var _olm_account_generate_one_time_keys =
    (__exp__olm_account_generate_one_time_keys = (a0, a1, a2, a3) =>
      (_olm_account_generate_one_time_keys = wasmExports["O"])(a0, a1, a2, a3));

  var _olm_account_generate_fallback_key_random_length =
    (__exp__olm_account_generate_fallback_key_random_length = (a0) =>
      (_olm_account_generate_fallback_key_random_length = wasmExports["P"])(
        a0
      ));

  var _olm_account_generate_fallback_key =
    (__exp__olm_account_generate_fallback_key = (a0, a1, a2) =>
      (_olm_account_generate_fallback_key = wasmExports["Q"])(a0, a1, a2));

  var _olm_account_fallback_key_length =
    (__exp__olm_account_fallback_key_length = (a0) =>
      (_olm_account_fallback_key_length = wasmExports["R"])(a0));

  var _olm_account_fallback_key = (__exp__olm_account_fallback_key = (
    a0,
    a1,
    a2
  ) => (_olm_account_fallback_key = wasmExports["S"])(a0, a1, a2));

  var _olm_account_unpublished_fallback_key_length =
    (__exp__olm_account_unpublished_fallback_key_length = (a0) =>
      (_olm_account_unpublished_fallback_key_length = wasmExports["T"])(a0));

  var _olm_account_unpublished_fallback_key =
    (__exp__olm_account_unpublished_fallback_key = (a0, a1, a2) =>
      (_olm_account_unpublished_fallback_key = wasmExports["U"])(a0, a1, a2));

  var _olm_account_forget_old_fallback_key =
    (__exp__olm_account_forget_old_fallback_key = (a0) =>
      (_olm_account_forget_old_fallback_key = wasmExports["V"])(a0));

  var _olm_create_outbound_session_random_length =
    (__exp__olm_create_outbound_session_random_length = (a0) =>
      (_olm_create_outbound_session_random_length = wasmExports["W"])(a0));

  var _olm_create_outbound_session = (__exp__olm_create_outbound_session = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7
  ) =>
    (_olm_create_outbound_session = wasmExports["X"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7
    ));

  var _olm_create_inbound_session = (__exp__olm_create_inbound_session = (
    a0,
    a1,
    a2,
    a3
  ) => (_olm_create_inbound_session = wasmExports["Y"])(a0, a1, a2, a3));

  var _olm_create_inbound_session_from =
    (__exp__olm_create_inbound_session_from = (a0, a1, a2, a3, a4, a5) =>
      (_olm_create_inbound_session_from = wasmExports["Z"])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5
      ));

  var _olm_session_id_length = (__exp__olm_session_id_length = (a0) =>
    (_olm_session_id_length = wasmExports["_"])(a0));

  var _olm_session_id = (__exp__olm_session_id = (a0, a1, a2) =>
    (_olm_session_id = wasmExports["$"])(a0, a1, a2));

  var _olm_session_has_received_message =
    (__exp__olm_session_has_received_message = (a0) =>
      (_olm_session_has_received_message = wasmExports["aa"])(a0));

  var _olm_session_describe = (__exp__olm_session_describe = (a0, a1, a2) =>
    (_olm_session_describe = wasmExports["ba"])(a0, a1, a2));

  var _olm_matches_inbound_session = (__exp__olm_matches_inbound_session = (
    a0,
    a1,
    a2
  ) => (_olm_matches_inbound_session = wasmExports["ca"])(a0, a1, a2));

  var _olm_matches_inbound_session_from =
    (__exp__olm_matches_inbound_session_from = (a0, a1, a2, a3, a4) =>
      (_olm_matches_inbound_session_from = wasmExports["da"])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));

  var _olm_remove_one_time_keys = (__exp__olm_remove_one_time_keys = (a0, a1) =>
    (_olm_remove_one_time_keys = wasmExports["ea"])(a0, a1));

  var _olm_encrypt_message_type = (__exp__olm_encrypt_message_type = (a0) =>
    (_olm_encrypt_message_type = wasmExports["fa"])(a0));

  var _olm_encrypt_random_length = (__exp__olm_encrypt_random_length = (a0) =>
    (_olm_encrypt_random_length = wasmExports["ga"])(a0));

  var _olm_encrypt_message_length = (__exp__olm_encrypt_message_length = (
    a0,
    a1
  ) => (_olm_encrypt_message_length = wasmExports["ha"])(a0, a1));

  var _olm_encrypt = (__exp__olm_encrypt = (a0, a1, a2, a3, a4, a5, a6) =>
    (_olm_encrypt = wasmExports["ia"])(a0, a1, a2, a3, a4, a5, a6));

  var _olm_decrypt_max_plaintext_length =
    (__exp__olm_decrypt_max_plaintext_length = (a0, a1, a2, a3) =>
      (_olm_decrypt_max_plaintext_length = wasmExports["ja"])(a0, a1, a2, a3));

  var _olm_decrypt = (__exp__olm_decrypt = (a0, a1, a2, a3, a4, a5) =>
    (_olm_decrypt = wasmExports["ka"])(a0, a1, a2, a3, a4, a5));

  var _olm_sha256_length = (__exp__olm_sha256_length = (a0) =>
    (_olm_sha256_length = wasmExports["la"])(a0));

  var _olm_sha256 = (__exp__olm_sha256 = (a0, a1, a2, a3, a4) =>
    (_olm_sha256 = wasmExports["ma"])(a0, a1, a2, a3, a4));

  var _olm_ed25519_verify = (__exp__olm_ed25519_verify = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6
  ) => (_olm_ed25519_verify = wasmExports["na"])(a0, a1, a2, a3, a4, a5, a6));

  var _olm_pk_encryption_last_error = (__exp__olm_pk_encryption_last_error = (
    a0
  ) => (_olm_pk_encryption_last_error = wasmExports["oa"])(a0));

  var _olm_pk_encryption_last_error_code =
    (__exp__olm_pk_encryption_last_error_code = (a0) =>
      (_olm_pk_encryption_last_error_code = wasmExports["pa"])(a0));

  var _olm_pk_encryption_size = (__exp__olm_pk_encryption_size = () =>
    (_olm_pk_encryption_size = wasmExports["qa"])());

  var _olm_pk_encryption = (__exp__olm_pk_encryption = (a0) =>
    (_olm_pk_encryption = wasmExports["ra"])(a0));

  var _olm_clear_pk_encryption = (__exp__olm_clear_pk_encryption = (a0) =>
    (_olm_clear_pk_encryption = wasmExports["sa"])(a0));

  var _olm_pk_encryption_set_recipient_key =
    (__exp__olm_pk_encryption_set_recipient_key = (a0, a1, a2) =>
      (_olm_pk_encryption_set_recipient_key = wasmExports["ta"])(a0, a1, a2));

  var _olm_pk_key_length = (__exp__olm_pk_key_length = () =>
    (_olm_pk_key_length = wasmExports["ua"])());

  var _olm_pk_ciphertext_length = (__exp__olm_pk_ciphertext_length = (a0, a1) =>
    (_olm_pk_ciphertext_length = wasmExports["va"])(a0, a1));

  var _olm_pk_mac_length = (__exp__olm_pk_mac_length = (a0) =>
    (_olm_pk_mac_length = wasmExports["wa"])(a0));

  var _olm_pk_encrypt_random_length = (__exp__olm_pk_encrypt_random_length = (
    a0
  ) => (_olm_pk_encrypt_random_length = wasmExports["xa"])(a0));

  var _olm_pk_encrypt = (__exp__olm_pk_encrypt = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10
  ) =>
    (_olm_pk_encrypt = wasmExports["ya"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10
    ));

  var _olm_pk_decryption_last_error = (__exp__olm_pk_decryption_last_error = (
    a0
  ) => (_olm_pk_decryption_last_error = wasmExports["za"])(a0));

  var _olm_pk_decryption_last_error_code =
    (__exp__olm_pk_decryption_last_error_code = (a0) =>
      (_olm_pk_decryption_last_error_code = wasmExports["Aa"])(a0));

  var _olm_pk_decryption_size = (__exp__olm_pk_decryption_size = () =>
    (_olm_pk_decryption_size = wasmExports["Ba"])());

  var _olm_pk_decryption = (__exp__olm_pk_decryption = (a0) =>
    (_olm_pk_decryption = wasmExports["Ca"])(a0));

  var _olm_clear_pk_decryption = (__exp__olm_clear_pk_decryption = (a0) =>
    (_olm_clear_pk_decryption = wasmExports["Da"])(a0));

  var _olm_pk_private_key_length = (__exp__olm_pk_private_key_length = () =>
    (_olm_pk_private_key_length = wasmExports["Ea"])());

  var _olm_pk_generate_key_random_length =
    (__exp__olm_pk_generate_key_random_length = () =>
      (_olm_pk_generate_key_random_length = wasmExports["Fa"])());

  var _olm_pk_key_from_private = (__exp__olm_pk_key_from_private = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_pk_key_from_private = wasmExports["Ga"])(a0, a1, a2, a3, a4));

  var _olm_pk_generate_key = (__exp__olm_pk_generate_key = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_pk_generate_key = wasmExports["Ha"])(a0, a1, a2, a3, a4));

  var _olm_pickle_pk_decryption_length =
    (__exp__olm_pickle_pk_decryption_length = (a0) =>
      (_olm_pickle_pk_decryption_length = wasmExports["Ia"])(a0));

  var _olm_pickle_pk_decryption = (__exp__olm_pickle_pk_decryption = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_pickle_pk_decryption = wasmExports["Ja"])(a0, a1, a2, a3, a4));

  var _olm_unpickle_pk_decryption = (__exp__olm_unpickle_pk_decryption = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6
  ) =>
    (_olm_unpickle_pk_decryption = wasmExports["Ka"])(
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6
    ));

  var _olm_pk_max_plaintext_length = (__exp__olm_pk_max_plaintext_length = (
    a0,
    a1
  ) => (_olm_pk_max_plaintext_length = wasmExports["La"])(a0, a1));

  var _olm_pk_decrypt = (__exp__olm_pk_decrypt = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8
  ) =>
    (_olm_pk_decrypt = wasmExports["Ma"])(a0, a1, a2, a3, a4, a5, a6, a7, a8));

  var _olm_pk_get_private_key = (__exp__olm_pk_get_private_key = (a0, a1, a2) =>
    (_olm_pk_get_private_key = wasmExports["Na"])(a0, a1, a2));

  var _olm_pk_signing_size = (__exp__olm_pk_signing_size = () =>
    (_olm_pk_signing_size = wasmExports["Oa"])());

  var _olm_pk_signing = (__exp__olm_pk_signing = (a0) =>
    (_olm_pk_signing = wasmExports["Pa"])(a0));

  var _olm_pk_signing_last_error = (__exp__olm_pk_signing_last_error = (a0) =>
    (_olm_pk_signing_last_error = wasmExports["Qa"])(a0));

  var _olm_pk_signing_last_error_code = (__exp__olm_pk_signing_last_error_code =
    (a0) => (_olm_pk_signing_last_error_code = wasmExports["Ra"])(a0));

  var _olm_clear_pk_signing = (__exp__olm_clear_pk_signing = (a0) =>
    (_olm_clear_pk_signing = wasmExports["Sa"])(a0));

  var _olm_pk_signing_seed_length = (__exp__olm_pk_signing_seed_length = () =>
    (_olm_pk_signing_seed_length = wasmExports["Ta"])());

  var _olm_pk_signing_public_key_length =
    (__exp__olm_pk_signing_public_key_length = () =>
      (_olm_pk_signing_public_key_length = wasmExports["Ua"])());

  var _olm_pk_signing_key_from_seed = (__exp__olm_pk_signing_key_from_seed = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_pk_signing_key_from_seed = wasmExports["Va"])(a0, a1, a2, a3, a4));

  var _olm_pk_signature_length = (__exp__olm_pk_signature_length = () =>
    (_olm_pk_signature_length = wasmExports["Wa"])());

  var _olm_pk_sign = (__exp__olm_pk_sign = (a0, a1, a2, a3, a4) =>
    (_olm_pk_sign = wasmExports["Xa"])(a0, a1, a2, a3, a4));

  var _olm_inbound_group_session_size = (__exp__olm_inbound_group_session_size =
    () => (_olm_inbound_group_session_size = wasmExports["Ya"])());

  var _olm_inbound_group_session = (__exp__olm_inbound_group_session = (a0) =>
    (_olm_inbound_group_session = wasmExports["Za"])(a0));

  var _olm_clear_inbound_group_session =
    (__exp__olm_clear_inbound_group_session = (a0) =>
      (_olm_clear_inbound_group_session = wasmExports["_a"])(a0));

  var _olm_inbound_group_session_last_error =
    (__exp__olm_inbound_group_session_last_error = (a0) =>
      (_olm_inbound_group_session_last_error = wasmExports["$a"])(a0));

  var _olm_inbound_group_session_last_error_code =
    (__exp__olm_inbound_group_session_last_error_code = (a0) =>
      (_olm_inbound_group_session_last_error_code = wasmExports["ab"])(a0));

  var _olm_init_inbound_group_session = (__exp__olm_init_inbound_group_session =
    (a0, a1, a2) =>
      (_olm_init_inbound_group_session = wasmExports["bb"])(a0, a1, a2));

  var _olm_import_inbound_group_session =
    (__exp__olm_import_inbound_group_session = (a0, a1, a2) =>
      (_olm_import_inbound_group_session = wasmExports["cb"])(a0, a1, a2));

  var _olm_pickle_inbound_group_session_length =
    (__exp__olm_pickle_inbound_group_session_length = (a0) =>
      (_olm_pickle_inbound_group_session_length = wasmExports["db"])(a0));

  var _olm_pickle_inbound_group_session =
    (__exp__olm_pickle_inbound_group_session = (a0, a1, a2, a3, a4) =>
      (_olm_pickle_inbound_group_session = wasmExports["eb"])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));

  var _olm_unpickle_inbound_group_session =
    (__exp__olm_unpickle_inbound_group_session = (a0, a1, a2, a3, a4) =>
      (_olm_unpickle_inbound_group_session = wasmExports["fb"])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));

  var _olm_group_decrypt_max_plaintext_length =
    (__exp__olm_group_decrypt_max_plaintext_length = (a0, a1, a2) =>
      (_olm_group_decrypt_max_plaintext_length = wasmExports["gb"])(
        a0,
        a1,
        a2
      ));

  var _olm_group_decrypt = (__exp__olm_group_decrypt = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5
  ) => (_olm_group_decrypt = wasmExports["hb"])(a0, a1, a2, a3, a4, a5));

  var _olm_inbound_group_session_id_length =
    (__exp__olm_inbound_group_session_id_length = (a0) =>
      (_olm_inbound_group_session_id_length = wasmExports["ib"])(a0));

  var _olm_inbound_group_session_id = (__exp__olm_inbound_group_session_id = (
    a0,
    a1,
    a2
  ) => (_olm_inbound_group_session_id = wasmExports["jb"])(a0, a1, a2));

  var _olm_inbound_group_session_first_known_index =
    (__exp__olm_inbound_group_session_first_known_index = (a0) =>
      (_olm_inbound_group_session_first_known_index = wasmExports["kb"])(a0));

  var _olm_inbound_group_session_is_verified =
    (__exp__olm_inbound_group_session_is_verified = (a0) =>
      (_olm_inbound_group_session_is_verified = wasmExports["lb"])(a0));

  var _olm_export_inbound_group_session_length =
    (__exp__olm_export_inbound_group_session_length = (a0) =>
      (_olm_export_inbound_group_session_length = wasmExports["mb"])(a0));

  var _olm_export_inbound_group_session =
    (__exp__olm_export_inbound_group_session = (a0, a1, a2, a3) =>
      (_olm_export_inbound_group_session = wasmExports["nb"])(a0, a1, a2, a3));

  var _olm_outbound_group_session_size =
    (__exp__olm_outbound_group_session_size = () =>
      (_olm_outbound_group_session_size = wasmExports["ob"])());

  var _olm_outbound_group_session = (__exp__olm_outbound_group_session = (a0) =>
    (_olm_outbound_group_session = wasmExports["pb"])(a0));

  var _olm_clear_outbound_group_session =
    (__exp__olm_clear_outbound_group_session = (a0) =>
      (_olm_clear_outbound_group_session = wasmExports["qb"])(a0));

  var _olm_outbound_group_session_last_error =
    (__exp__olm_outbound_group_session_last_error = (a0) =>
      (_olm_outbound_group_session_last_error = wasmExports["rb"])(a0));

  var _olm_outbound_group_session_last_error_code =
    (__exp__olm_outbound_group_session_last_error_code = (a0) =>
      (_olm_outbound_group_session_last_error_code = wasmExports["sb"])(a0));

  var _olm_pickle_outbound_group_session_length =
    (__exp__olm_pickle_outbound_group_session_length = (a0) =>
      (_olm_pickle_outbound_group_session_length = wasmExports["tb"])(a0));

  var _olm_pickle_outbound_group_session =
    (__exp__olm_pickle_outbound_group_session = (a0, a1, a2, a3, a4) =>
      (_olm_pickle_outbound_group_session = wasmExports["ub"])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));

  var _olm_unpickle_outbound_group_session =
    (__exp__olm_unpickle_outbound_group_session = (a0, a1, a2, a3, a4) =>
      (_olm_unpickle_outbound_group_session = wasmExports["vb"])(
        a0,
        a1,
        a2,
        a3,
        a4
      ));

  var _olm_init_outbound_group_session_random_length =
    (__exp__olm_init_outbound_group_session_random_length = (a0) =>
      (_olm_init_outbound_group_session_random_length = wasmExports["wb"])(a0));

  var _olm_init_outbound_group_session =
    (__exp__olm_init_outbound_group_session = (a0, a1, a2) =>
      (_olm_init_outbound_group_session = wasmExports["xb"])(a0, a1, a2));

  var _olm_group_encrypt_message_length =
    (__exp__olm_group_encrypt_message_length = (a0, a1) =>
      (_olm_group_encrypt_message_length = wasmExports["yb"])(a0, a1));

  var _olm_group_encrypt = (__exp__olm_group_encrypt = (a0, a1, a2, a3, a4) =>
    (_olm_group_encrypt = wasmExports["zb"])(a0, a1, a2, a3, a4));

  var _olm_outbound_group_session_id_length =
    (__exp__olm_outbound_group_session_id_length = (a0) =>
      (_olm_outbound_group_session_id_length = wasmExports["Ab"])(a0));

  var _olm_outbound_group_session_id = (__exp__olm_outbound_group_session_id = (
    a0,
    a1,
    a2
  ) => (_olm_outbound_group_session_id = wasmExports["Bb"])(a0, a1, a2));

  var _olm_outbound_group_session_message_index =
    (__exp__olm_outbound_group_session_message_index = (a0) =>
      (_olm_outbound_group_session_message_index = wasmExports["Cb"])(a0));

  var _olm_outbound_group_session_key_length =
    (__exp__olm_outbound_group_session_key_length = (a0) =>
      (_olm_outbound_group_session_key_length = wasmExports["Db"])(a0));

  var _olm_outbound_group_session_key = (__exp__olm_outbound_group_session_key =
    (a0, a1, a2) =>
      (_olm_outbound_group_session_key = wasmExports["Eb"])(a0, a1, a2));

  var _olm_sas_last_error = (__exp__olm_sas_last_error = (a0) =>
    (_olm_sas_last_error = wasmExports["Fb"])(a0));

  var _olm_sas_last_error_code = (__exp__olm_sas_last_error_code = (a0) =>
    (_olm_sas_last_error_code = wasmExports["Gb"])(a0));

  var _olm_sas_size = (__exp__olm_sas_size = () =>
    (_olm_sas_size = wasmExports["Hb"])());

  var _olm_sas = (__exp__olm_sas = (a0) => (_olm_sas = wasmExports["Ib"])(a0));

  var _olm_clear_sas = (__exp__olm_clear_sas = (a0) =>
    (_olm_clear_sas = wasmExports["Jb"])(a0));

  var _olm_create_sas_random_length = (__exp__olm_create_sas_random_length = (
    a0
  ) => (_olm_create_sas_random_length = wasmExports["Kb"])(a0));

  var _olm_create_sas = (__exp__olm_create_sas = (a0, a1, a2) =>
    (_olm_create_sas = wasmExports["Lb"])(a0, a1, a2));

  var _olm_sas_pubkey_length = (__exp__olm_sas_pubkey_length = (a0) =>
    (_olm_sas_pubkey_length = wasmExports["Mb"])(a0));

  var _olm_sas_get_pubkey = (__exp__olm_sas_get_pubkey = (a0, a1, a2) =>
    (_olm_sas_get_pubkey = wasmExports["Nb"])(a0, a1, a2));

  var _olm_sas_set_their_key = (__exp__olm_sas_set_their_key = (a0, a1, a2) =>
    (_olm_sas_set_their_key = wasmExports["Ob"])(a0, a1, a2));

  var _olm_sas_is_their_key_set = (__exp__olm_sas_is_their_key_set = (a0) =>
    (_olm_sas_is_their_key_set = wasmExports["Pb"])(a0));

  var _olm_sas_generate_bytes = (__exp__olm_sas_generate_bytes = (
    a0,
    a1,
    a2,
    a3,
    a4
  ) => (_olm_sas_generate_bytes = wasmExports["Qb"])(a0, a1, a2, a3, a4));

  var _olm_sas_mac_length = (__exp__olm_sas_mac_length = (a0) =>
    (_olm_sas_mac_length = wasmExports["Rb"])(a0));

  var _olm_sas_calculate_mac_fixed_base64 =
    (__exp__olm_sas_calculate_mac_fixed_base64 = (a0, a1, a2, a3, a4, a5, a6) =>
      (_olm_sas_calculate_mac_fixed_base64 = wasmExports["Sb"])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));

  var _olm_sas_calculate_mac = (__exp__olm_sas_calculate_mac = (
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6
  ) =>
    (_olm_sas_calculate_mac = wasmExports["Tb"])(a0, a1, a2, a3, a4, a5, a6));

  var _olm_sas_calculate_mac_long_kdf = (__exp__olm_sas_calculate_mac_long_kdf =
    (a0, a1, a2, a3, a4, a5, a6) =>
      (_olm_sas_calculate_mac_long_kdf = wasmExports["Ub"])(
        a0,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6
      ));

  var _malloc = (__exp__malloc = (a0) => (_malloc = wasmExports["Vb"])(a0));

  var _free = (__exp__free = (a0) => (_free = wasmExports["Wb"])(a0));

  var __emscripten_stack_restore = (a0) =>
    (__emscripten_stack_restore = wasmExports["Xb"])(a0);

  var __emscripten_stack_alloc = (a0) =>
    (__emscripten_stack_alloc = wasmExports["Yb"])(a0);

  var _emscripten_stack_get_current = () =>
    (_emscripten_stack_get_current = wasmExports["Zb"])();

  // include: postamble.js
  // === Auto-generated postamble setup entry stuff ===
  __exp_stackAlloc = stackAlloc;

  __exp_UTF8ToString = UTF8ToString;

  __exp_stringToUTF8 = stringToUTF8;

  __exp_intArrayFromString = intArrayFromString;

  __exp_stringToAscii = stringToAscii;

  __exp_ALLOC_STACK = ALLOC_STACK;

  __exp_writeAsciiToMemory = writeAsciiToMemory;

  var calledRun;

  dependenciesFulfilled = function runCaller() {
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!calledRun) run();
    if (!calledRun) dependenciesFulfilled = runCaller;
  };

  // try this again later, after new deps are fulfilled
  function run() {
    if (runDependencies > 0) {
      return;
    }
    preRun();
    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
    function doRun() {
      // run may have just been called through dependencies being fulfilled just in this very frame,
      // or while the async setStatus time below was happening
      if (calledRun) return;
      calledRun = true;
      Module["calledRun"] = true;
      if (ABORT) return;
      initRuntime();
      readyPromiseResolve(Module);
      Module["onRuntimeInitialized"]?.();
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(() => {
        setTimeout(() => Module["setStatus"](""), 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }

  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function")
      Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
      Module["preInit"].pop()();
    }
  }

  run();

  // end include: postamble.js
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_outbound_group_session.js
  /** @constructor */ function OutboundGroupSession() {
    var size = _olm_outbound_group_session_size();
    this.buf = malloc(size);
    this.ptr = _olm_outbound_group_session(this.buf);
  }

  function outbound_group_session_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(
          _olm_outbound_group_session_last_error(arguments[0])
        );
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  OutboundGroupSession.prototype["free"] = function () {
    _olm_clear_outbound_group_session(this.ptr);
    free(this.ptr);
  };

  OutboundGroupSession.prototype["pickle"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var pickle_length = outbound_group_session_method(
      _olm_pickle_outbound_group_session_length
    )(this.ptr);
    var key_buffer = stack(key_array);
    var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
    try {
      outbound_group_session_method(_olm_pickle_outbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(pickle_buffer, pickle_length);
  });

  OutboundGroupSession.prototype["unpickle"] = restore_stack(function (
    key,
    pickle
  ) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var pickle_array = array_from_string(pickle);
    var pickle_buffer = stack(pickle_array);
    try {
      outbound_group_session_method(_olm_unpickle_outbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_array.length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  OutboundGroupSession.prototype["create"] = restore_stack(function () {
    var random_length = outbound_group_session_method(
      _olm_init_outbound_group_session_random_length
    )(this.ptr);
    var random = random_stack(random_length);
    try {
      outbound_group_session_method(_olm_init_outbound_group_session)(
        this.ptr,
        random,
        random_length
      );
    } finally {
      // clear the random buffer
      bzero(random, random_length);
    }
  });

  OutboundGroupSession.prototype["encrypt"] = function (plaintext) {
    var plaintext_buffer, message_buffer, plaintext_length;
    try {
      plaintext_length = lengthBytesUTF8(plaintext);
      var message_length = outbound_group_session_method(
        _olm_group_encrypt_message_length
      )(this.ptr, plaintext_length);
      // need to allow space for the terminator (which stringToUTF8 always
      // writes), hence + 1.
      plaintext_buffer = malloc(plaintext_length + 1);
      stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
      message_buffer = malloc(message_length + NULL_BYTE_PADDING_LENGTH);
      outbound_group_session_method(_olm_group_encrypt)(
        this.ptr,
        plaintext_buffer,
        plaintext_length,
        message_buffer,
        message_length
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(message_buffer + message_length, 0, "i8");
      return UTF8ToString(message_buffer, message_length);
    } finally {
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, plaintext_length + 1);
        free(plaintext_buffer);
      }
      if (message_buffer !== undefined) {
        free(message_buffer);
      }
    }
  };

  OutboundGroupSession.prototype["session_id"] = restore_stack(function () {
    var length = outbound_group_session_method(
      _olm_outbound_group_session_id_length
    )(this.ptr);
    var session_id = stack(length + NULL_BYTE_PADDING_LENGTH);
    outbound_group_session_method(_olm_outbound_group_session_id)(
      this.ptr,
      session_id,
      length
    );
    return UTF8ToString(session_id, length);
  });

  OutboundGroupSession.prototype["session_key"] = restore_stack(function () {
    var key_length = outbound_group_session_method(
      _olm_outbound_group_session_key_length
    )(this.ptr);
    var key = stack(key_length + NULL_BYTE_PADDING_LENGTH);
    outbound_group_session_method(_olm_outbound_group_session_key)(
      this.ptr,
      key,
      key_length
    );
    var key_str = UTF8ToString(key, key_length);
    bzero(key, key_length);
    // clear out our copy of the key
    return key_str;
  });

  OutboundGroupSession.prototype["message_index"] = function () {
    var idx = outbound_group_session_method(
      _olm_outbound_group_session_message_index
    )(this.ptr);
    return idx;
  };

  Module["OutboundGroupSession"] = OutboundGroupSession;

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_outbound_group_session.js
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_inbound_group_session.js
  /** @constructor */ function InboundGroupSession() {
    var size = _olm_inbound_group_session_size();
    this.buf = malloc(size);
    this.ptr = _olm_inbound_group_session(this.buf);
  }

  function inbound_group_session_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(
          _olm_inbound_group_session_last_error(arguments[0])
        );
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  InboundGroupSession.prototype["free"] = function () {
    _olm_clear_inbound_group_session(this.ptr);
    free(this.ptr);
  };

  InboundGroupSession.prototype["pickle"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var pickle_length = inbound_group_session_method(
      _olm_pickle_inbound_group_session_length
    )(this.ptr);
    var key_buffer = stack(key_array);
    var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
    try {
      inbound_group_session_method(_olm_pickle_inbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(pickle_buffer, pickle_length);
  });

  InboundGroupSession.prototype["unpickle"] = restore_stack(function (
    key,
    pickle
  ) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var pickle_array = array_from_string(pickle);
    var pickle_buffer = stack(pickle_array);
    try {
      inbound_group_session_method(_olm_unpickle_inbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_array.length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  InboundGroupSession.prototype["create"] = restore_stack(function (
    session_key
  ) {
    var key_array = array_from_string(session_key);
    var key_buffer = stack(key_array);
    try {
      inbound_group_session_method(_olm_init_inbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length
      );
    } finally {
      // clear out copies of the key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  InboundGroupSession.prototype["import_session"] = restore_stack(function (
    session_key
  ) {
    var key_array = array_from_string(session_key);
    var key_buffer = stack(key_array);
    try {
      inbound_group_session_method(_olm_import_inbound_group_session)(
        this.ptr,
        key_buffer,
        key_array.length
      );
    } finally {
      // clear out copies of the key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  InboundGroupSession.prototype["decrypt"] = restore_stack(function (message) {
    var message_buffer, plaintext_buffer, plaintext_length;
    try {
      message_buffer = malloc(message.length);
      stringToAscii(message, message_buffer, true);
      var max_plaintext_length = inbound_group_session_method(
        _olm_group_decrypt_max_plaintext_length
      )(this.ptr, message_buffer, message.length);
      // caculating the length destroys the input buffer, so we need to re-copy it.
      stringToAscii(message, message_buffer, true);
      plaintext_buffer = malloc(
        max_plaintext_length + NULL_BYTE_PADDING_LENGTH
      );
      var message_index = stack(4);
      plaintext_length = inbound_group_session_method(_olm_group_decrypt)(
        this.ptr,
        message_buffer,
        message.length,
        plaintext_buffer,
        max_plaintext_length,
        message_index
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(plaintext_buffer + plaintext_length, 0, "i8");
      return {
        plaintext: UTF8ToString(plaintext_buffer, plaintext_length),
        message_index: getValue(message_index, "i32"),
      };
    } finally {
      if (message_buffer !== undefined) {
        free(message_buffer);
      }
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, plaintext_length);
        free(plaintext_buffer);
      }
    }
  });

  InboundGroupSession.prototype["session_id"] = restore_stack(function () {
    var length = inbound_group_session_method(
      _olm_inbound_group_session_id_length
    )(this.ptr);
    var session_id = stack(length + NULL_BYTE_PADDING_LENGTH);
    inbound_group_session_method(_olm_inbound_group_session_id)(
      this.ptr,
      session_id,
      length
    );
    return UTF8ToString(session_id, length);
  });

  InboundGroupSession.prototype["first_known_index"] = restore_stack(
    function () {
      return inbound_group_session_method(
        _olm_inbound_group_session_first_known_index
      )(this.ptr);
    }
  );

  InboundGroupSession.prototype["export_session"] = restore_stack(function (
    message_index
  ) {
    var key_length = inbound_group_session_method(
      _olm_export_inbound_group_session_length
    )(this.ptr);
    var key = stack(key_length + NULL_BYTE_PADDING_LENGTH);
    outbound_group_session_method(_olm_export_inbound_group_session)(
      this.ptr,
      key,
      key_length,
      message_index
    );
    var key_str = UTF8ToString(key, key_length);
    bzero(key, key_length);
    // clear out a copy of the key
    return key_str;
  });

  Module["InboundGroupSession"] = InboundGroupSession;

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_inbound_group_session.js
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_pk.js
  /** @constructor */ function PkEncryption() {
    var size = _olm_pk_encryption_size();
    this.buf = malloc(size);
    this.ptr = _olm_pk_encryption(this.buf);
  }

  function pk_encryption_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_pk_encryption_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  PkEncryption.prototype["free"] = function () {
    _olm_clear_pk_encryption(this.ptr);
    free(this.ptr);
  };

  PkEncryption.prototype["set_recipient_key"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    pk_encryption_method(_olm_pk_encryption_set_recipient_key)(
      this.ptr,
      key_buffer,
      key_array.length
    );
  });

  PkEncryption.prototype["encrypt"] = restore_stack(function (plaintext) {
    var plaintext_buffer,
      ciphertext_buffer,
      plaintext_length,
      random,
      random_length;
    try {
      plaintext_length = lengthBytesUTF8(plaintext);
      plaintext_buffer = malloc(plaintext_length + 1);
      stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
      random_length = pk_encryption_method(_olm_pk_encrypt_random_length)();
      random = random_stack(random_length);
      var ciphertext_length = pk_encryption_method(_olm_pk_ciphertext_length)(
        this.ptr,
        plaintext_length
      );
      ciphertext_buffer = malloc(ciphertext_length + NULL_BYTE_PADDING_LENGTH);
      var mac_length = pk_encryption_method(_olm_pk_mac_length)(this.ptr);
      var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
      setValue(mac_buffer + mac_length, 0, "i8");
      var ephemeral_length = pk_encryption_method(_olm_pk_key_length)();
      var ephemeral_buffer = stack(ephemeral_length + NULL_BYTE_PADDING_LENGTH);
      setValue(ephemeral_buffer + ephemeral_length, 0, "i8");
      pk_encryption_method(_olm_pk_encrypt)(
        this.ptr,
        plaintext_buffer,
        plaintext_length,
        ciphertext_buffer,
        ciphertext_length,
        mac_buffer,
        mac_length,
        ephemeral_buffer,
        ephemeral_length,
        random,
        random_length
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(ciphertext_buffer + ciphertext_length, 0, "i8");
      return {
        ciphertext: UTF8ToString(ciphertext_buffer, ciphertext_length),
        mac: UTF8ToString(mac_buffer, mac_length),
        ephemeral: UTF8ToString(ephemeral_buffer, ephemeral_length),
      };
    } finally {
      if (random !== undefined) {
        // clear out the random buffer, since it is key data
        bzero(random, random_length);
      }
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, plaintext_length + 1);
        free(plaintext_buffer);
      }
      if (ciphertext_buffer !== undefined) {
        free(ciphertext_buffer);
      }
    }
  });

  /** @constructor */ function PkDecryption() {
    var size = _olm_pk_decryption_size();
    this.buf = malloc(size);
    this.ptr = _olm_pk_decryption(this.buf);
  }

  function pk_decryption_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_pk_decryption_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  PkDecryption.prototype["free"] = function () {
    _olm_clear_pk_decryption(this.ptr);
    free(this.ptr);
  };

  PkDecryption.prototype["init_with_private_key"] = restore_stack(function (
    private_key
  ) {
    var private_key_buffer = stack(private_key.length);
    HEAPU8.set(private_key, private_key_buffer);
    var pubkey_length = pk_decryption_method(_olm_pk_key_length)();
    var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
    try {
      pk_decryption_method(_olm_pk_key_from_private)(
        this.ptr,
        pubkey_buffer,
        pubkey_length,
        private_key_buffer,
        private_key.length
      );
    } finally {
      // clear out our copy of the private key
      bzero(private_key_buffer, private_key.length);
    }
    return UTF8ToString(pubkey_buffer, pubkey_length);
  });

  PkDecryption.prototype["generate_key"] = restore_stack(function () {
    var random_length = pk_decryption_method(_olm_pk_private_key_length)();
    var random_buffer = random_stack(random_length);
    var pubkey_length = pk_decryption_method(_olm_pk_key_length)();
    var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
    try {
      pk_decryption_method(_olm_pk_key_from_private)(
        this.ptr,
        pubkey_buffer,
        pubkey_length,
        random_buffer,
        random_length
      );
    } finally {
      // clear out the random buffer (= private key)
      bzero(random_buffer, random_length);
    }
    return UTF8ToString(pubkey_buffer, pubkey_length);
  });

  PkDecryption.prototype["get_private_key"] = restore_stack(function () {
    var privkey_length = pk_encryption_method(_olm_pk_private_key_length)();
    var privkey_buffer = stack(privkey_length);
    pk_decryption_method(_olm_pk_get_private_key)(
      this.ptr,
      privkey_buffer,
      privkey_length
    );
    // The inner Uint8Array creates a view of the buffer.  The outer Uint8Array
    // copies it to a new array to return, since the original buffer will get
    // deallocated from the stack and could get overwritten.
    var key_arr = new Uint8Array(
      new Uint8Array(HEAPU8.buffer, privkey_buffer, privkey_length)
    );
    bzero(privkey_buffer, privkey_length);
    // clear out our copy of the key
    return key_arr;
  });

  PkDecryption.prototype["pickle"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var pickle_length = pk_decryption_method(_olm_pickle_pk_decryption_length)(
      this.ptr
    );
    var key_buffer = stack(key_array);
    var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
    try {
      pk_decryption_method(_olm_pickle_pk_decryption)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(pickle_buffer, pickle_length);
  });

  PkDecryption.prototype["unpickle"] = restore_stack(function (key, pickle) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var pickle_array = array_from_string(pickle);
    var pickle_buffer = stack(pickle_array);
    var ephemeral_length = pk_decryption_method(_olm_pk_key_length)();
    var ephemeral_buffer = stack(ephemeral_length + NULL_BYTE_PADDING_LENGTH);
    try {
      pk_decryption_method(_olm_unpickle_pk_decryption)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_array.length,
        ephemeral_buffer,
        ephemeral_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(ephemeral_buffer, ephemeral_length);
  });

  PkDecryption.prototype["decrypt"] = restore_stack(function (
    ephemeral_key,
    mac,
    ciphertext
  ) {
    var plaintext_buffer, ciphertext_buffer, plaintext_max_length;
    try {
      var ciphertext_length = lengthBytesUTF8(ciphertext);
      ciphertext_buffer = malloc(ciphertext_length + 1);
      stringToUTF8(ciphertext, ciphertext_buffer, ciphertext_length + 1);
      var ephemeralkey_array = array_from_string(ephemeral_key);
      var ephemeralkey_buffer = stack(ephemeralkey_array);
      var mac_array = array_from_string(mac);
      var mac_buffer = stack(mac_array);
      plaintext_max_length = pk_decryption_method(_olm_pk_max_plaintext_length)(
        this.ptr,
        ciphertext_length
      );
      plaintext_buffer = malloc(
        plaintext_max_length + NULL_BYTE_PADDING_LENGTH
      );
      var plaintext_length = pk_decryption_method(_olm_pk_decrypt)(
        this.ptr,
        ephemeralkey_buffer,
        ephemeralkey_array.length,
        mac_buffer,
        mac_array.length,
        ciphertext_buffer,
        ciphertext_length,
        plaintext_buffer,
        plaintext_max_length
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(plaintext_buffer + plaintext_length, 0, "i8");
      return UTF8ToString(plaintext_buffer, plaintext_length);
    } finally {
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, plaintext_length + 1);
        free(plaintext_buffer);
      }
      if (ciphertext_buffer !== undefined) {
        free(ciphertext_buffer);
      }
    }
  });

  /** @constructor */ function PkSigning() {
    var size = _olm_pk_signing_size();
    this.buf = malloc(size);
    this.ptr = _olm_pk_signing(this.buf);
  }

  function pk_signing_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_pk_signing_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  PkSigning.prototype["free"] = function () {
    _olm_clear_pk_signing(this.ptr);
    free(this.ptr);
  };

  PkSigning.prototype["init_with_seed"] = restore_stack(function (seed) {
    var seed_buffer = stack(seed.length);
    HEAPU8.set(seed, seed_buffer);
    var pubkey_length = pk_signing_method(_olm_pk_signing_public_key_length)();
    var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
    try {
      pk_signing_method(_olm_pk_signing_key_from_seed)(
        this.ptr,
        pubkey_buffer,
        pubkey_length,
        seed_buffer,
        seed.length
      );
    } finally {
      // clear out our copy of the seed
      bzero(seed_buffer, seed.length);
    }
    return UTF8ToString(pubkey_buffer, pubkey_length);
  });

  PkSigning.prototype["generate_seed"] = restore_stack(function () {
    var random_length = pk_signing_method(_olm_pk_signing_seed_length)();
    var random_buffer = random_stack(random_length);
    var key_arr = new Uint8Array(
      new Uint8Array(HEAPU8.buffer, random_buffer, random_length)
    );
    bzero(random_buffer, random_length);
    return key_arr;
  });

  PkSigning.prototype["sign"] = restore_stack(function (message) {
    // XXX: Should be able to sign any bytes rather than just strings,
    // but this is consistent with encrypt for now.
    //var message_buffer = stack(message.length);
    //HEAPU8'].set(message, message_buffer);
    var message_buffer, message_length;
    try {
      message_length = lengthBytesUTF8(message);
      message_buffer = malloc(message_length + 1);
      stringToUTF8(message, message_buffer, message_length + 1);
      var sig_length = pk_signing_method(_olm_pk_signature_length)();
      var sig_buffer = stack(sig_length + NULL_BYTE_PADDING_LENGTH);
      pk_signing_method(_olm_pk_sign)(
        this.ptr,
        message_buffer,
        message_length,
        sig_buffer,
        sig_length
      );
      return UTF8ToString(sig_buffer, sig_length);
    } finally {
      if (message_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(message_buffer, message_length + 1);
        free(message_buffer);
      }
    }
  });

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_pk.js
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_sas.js
  /** @constructor */ function SAS() {
    var size = _olm_sas_size();
    var random_length = _olm_create_sas_random_length();
    var random = random_stack(random_length);
    this.buf = malloc(size);
    this.ptr = _olm_sas(this.buf);
    _olm_create_sas(this.ptr, random, random_length);
    bzero(random, random_length);
  }

  function sas_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_sas_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  SAS.prototype["free"] = function () {
    _olm_clear_sas(this.ptr);
    free(this.ptr);
  };

  SAS.prototype["get_pubkey"] = restore_stack(function () {
    var pubkey_length = sas_method(_olm_sas_pubkey_length)(this.ptr);
    var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
    sas_method(_olm_sas_get_pubkey)(this.ptr, pubkey_buffer, pubkey_length);
    return UTF8ToString(pubkey_buffer, pubkey_length);
  });

  SAS.prototype["set_their_key"] = restore_stack(function (their_key) {
    var their_key_array = array_from_string(their_key);
    var their_key_buffer = stack(their_key_array);
    sas_method(_olm_sas_set_their_key)(
      this.ptr,
      their_key_buffer,
      their_key_array.length
    );
  });

  SAS.prototype["is_their_key_set"] = restore_stack(function () {
    return sas_method(_olm_sas_is_their_key_set)(this.ptr) ? true : false;
  });

  SAS.prototype["generate_bytes"] = restore_stack(function (info, length) {
    var info_array = array_from_string(info);
    var info_buffer = stack(info_array);
    var output_buffer = stack(length);
    sas_method(_olm_sas_generate_bytes)(
      this.ptr,
      info_buffer,
      info_array.length,
      output_buffer,
      length
    );
    // The inner Uint8Array creates a view of the buffer.  The outer Uint8Array
    // copies it to a new array to return, since the original buffer will get
    // deallocated from the stack and could get overwritten.
    var output_arr = new Uint8Array(
      new Uint8Array(HEAPU8.buffer, output_buffer, length)
    );
    return output_arr;
  });

  SAS.prototype["calculate_mac"] = restore_stack(function (input, info) {
    var input_array = array_from_string(input);
    var input_buffer = stack(input_array);
    var info_array = array_from_string(info);
    var info_buffer = stack(info_array);
    var mac_length = sas_method(_olm_sas_mac_length)(this.ptr);
    var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
    sas_method(_olm_sas_calculate_mac)(
      this.ptr,
      input_buffer,
      input_array.length,
      info_buffer,
      info_array.length,
      mac_buffer,
      mac_length
    );
    return UTF8ToString(mac_buffer, mac_length);
  });

  SAS.prototype["calculate_mac_fixed_base64"] = restore_stack(function (
    input,
    info
  ) {
    var input_array = array_from_string(input);
    var input_buffer = stack(input_array);
    var info_array = array_from_string(info);
    var info_buffer = stack(info_array);
    var mac_length = sas_method(_olm_sas_mac_length)(this.ptr);
    var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
    sas_method(_olm_sas_calculate_mac_fixed_base64)(
      this.ptr,
      input_buffer,
      input_array.length,
      info_buffer,
      info_array.length,
      mac_buffer,
      mac_length
    );
    return UTF8ToString(mac_buffer, mac_length);
  });

  SAS.prototype["calculate_mac_long_kdf"] = restore_stack(function (
    input,
    info
  ) {
    var input_array = array_from_string(input);
    var input_buffer = stack(input_array);
    var info_array = array_from_string(info);
    var info_buffer = stack(info_array);
    var mac_length = sas_method(_olm_sas_mac_length)(this.ptr);
    var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
    sas_method(_olm_sas_calculate_mac_long_kdf)(
      this.ptr,
      input_buffer,
      input_array.length,
      info_buffer,
      info_array.length,
      mac_buffer,
      mac_length
    );
    return UTF8ToString(mac_buffer, mac_length);
  });

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_sas.js
  // include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_post.js
  var malloc = _malloc;

  var free = _free;

  var OLM_ERROR;

  function filled_stack(size, filler) {
    var ptr = stackAlloc(size);
    filler(new Uint8Array(HEAPU8.buffer, ptr, size));
    return ptr;
  }

  /* allocate a number of bytes of storage on the stack.
   *
   * If size_or_array is a Number, allocates that number of zero-initialised bytes.
   */ function stack(size_or_array) {
    return typeof size_or_array == "number"
      ? filled_stack(size_or_array, function (x) {
          x.fill(0);
        })
      : filled_stack(size_or_array.length, function (x) {
          x.set(size_or_array);
        });
  }

  function array_from_string(string) {
    return string instanceof Uint8Array
      ? string
      : intArrayFromString(string, true);
  }

  function random_stack(size) {
    return filled_stack(size, get_random_values);
  }

  function restore_stack(wrapped) {
    return function () {
      var sp = stackSave();
      try {
        return wrapped.apply(this, arguments);
      } finally {
        stackRestore(sp);
      }
    };
  }

  /* set a memory area to zero */ function bzero(ptr, n) {
    while (n-- > 0) {
      HEAP8[ptr++] = 0;
    }
  }

  /** @constructor */ function Account() {
    var size = _olm_account_size();
    this.buf = malloc(size);
    this.ptr = _olm_account(this.buf);
  }

  function account_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_account_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  Account.prototype["free"] = function () {
    _olm_clear_account(this.ptr);
    free(this.ptr);
  };

  Account.prototype["create"] = restore_stack(function () {
    var random_length = account_method(_olm_create_account_random_length)(
      this.ptr
    );
    var random = random_stack(random_length);
    try {
      account_method(_olm_create_account)(this.ptr, random, random_length);
    } finally {
      // clear the random buffer
      bzero(random, random_length);
    }
  });

  Account.prototype["identity_keys"] = restore_stack(function () {
    var keys_length = account_method(_olm_account_identity_keys_length)(
      this.ptr
    );
    var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
    account_method(_olm_account_identity_keys)(this.ptr, keys, keys_length);
    return UTF8ToString(keys, keys_length);
  });

  Account.prototype["sign"] = restore_stack(function (message) {
    var signature_length = account_method(_olm_account_signature_length)(
      this.ptr
    );
    var message_array = array_from_string(message);
    var message_buffer = stack(message_array);
    var signature_buffer = stack(signature_length + NULL_BYTE_PADDING_LENGTH);
    try {
      account_method(_olm_account_sign)(
        this.ptr,
        message_buffer,
        message_array.length,
        signature_buffer,
        signature_length
      );
    } finally {
      // clear out copies of the message, which may be plaintext
      bzero(message_buffer, message_array.length);
      for (var i = 0; i < message_array.length; i++) {
        message_array[i] = 0;
      }
    }
    return UTF8ToString(signature_buffer, signature_length);
  });

  Account.prototype["one_time_keys"] = restore_stack(function () {
    var keys_length = account_method(_olm_account_one_time_keys_length)(
      this.ptr
    );
    var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
    account_method(_olm_account_one_time_keys)(this.ptr, keys, keys_length);
    return UTF8ToString(keys, keys_length);
  });

  Account.prototype["mark_keys_as_published"] = restore_stack(function () {
    account_method(_olm_account_mark_keys_as_published)(this.ptr);
  });

  Account.prototype["max_number_of_one_time_keys"] = restore_stack(function () {
    return account_method(_olm_account_max_number_of_one_time_keys)(this.ptr);
  });

  Account.prototype["generate_one_time_keys"] = restore_stack(function (
    number_of_keys
  ) {
    var random_length = account_method(
      _olm_account_generate_one_time_keys_random_length
    )(this.ptr, number_of_keys);
    var random = random_stack(random_length);
    try {
      account_method(_olm_account_generate_one_time_keys)(
        this.ptr,
        number_of_keys,
        random,
        random_length
      );
    } finally {
      // clear the random buffer
      bzero(random, random_length);
    }
  });

  Account.prototype["remove_one_time_keys"] = restore_stack(function (session) {
    account_method(_olm_remove_one_time_keys)(this.ptr, session.ptr);
  });

  Account.prototype["generate_fallback_key"] = restore_stack(function () {
    var random_length = account_method(
      _olm_account_generate_fallback_key_random_length
    )(this.ptr);
    var random = random_stack(random_length);
    try {
      account_method(_olm_account_generate_fallback_key)(
        this.ptr,
        random,
        random_length
      );
    } finally {
      // clear the random buffer
      bzero(random, random_length);
    }
  });

  Account.prototype["fallback_key"] = restore_stack(function () {
    var keys_length = account_method(_olm_account_fallback_key_length)(
      this.ptr
    );
    var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
    account_method(_olm_account_fallback_key)(this.ptr, keys, keys_length);
    return UTF8ToString(keys, keys_length);
  });

  Account.prototype["unpublished_fallback_key"] = restore_stack(function () {
    var keys_length = account_method(
      _olm_account_unpublished_fallback_key_length
    )(this.ptr);
    var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
    account_method(_olm_account_unpublished_fallback_key)(
      this.ptr,
      keys,
      keys_length
    );
    return UTF8ToString(keys, keys_length);
  });

  Account.prototype["forget_old_fallback_key"] = restore_stack(function () {
    account_method(_olm_account_forget_old_fallback_key)(this.ptr);
  });

  Account.prototype["pickle"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var pickle_length = account_method(_olm_pickle_account_length)(this.ptr);
    var key_buffer = stack(key_array);
    var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
    try {
      account_method(_olm_pickle_account)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(pickle_buffer, pickle_length);
  });

  Account.prototype["unpickle"] = restore_stack(function (key, pickle) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var pickle_array = array_from_string(pickle);
    var pickle_buffer = stack(pickle_array);
    try {
      account_method(_olm_unpickle_account)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_array.length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  /** @constructor */ function Session() {
    var size = _olm_session_size();
    this.buf = malloc(size);
    this.ptr = _olm_session(this.buf);
  }

  function session_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_session_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  Session.prototype["free"] = function () {
    _olm_clear_session(this.ptr);
    free(this.ptr);
  };

  Session.prototype["pickle"] = restore_stack(function (key) {
    var key_array = array_from_string(key);
    var pickle_length = session_method(_olm_pickle_session_length)(this.ptr);
    var key_buffer = stack(key_array);
    var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
    try {
      session_method(_olm_pickle_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
    return UTF8ToString(pickle_buffer, pickle_length);
  });

  Session.prototype["unpickle"] = restore_stack(function (key, pickle) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var pickle_array = array_from_string(pickle);
    var pickle_buffer = stack(pickle_array);
    try {
      session_method(_olm_unpickle_session)(
        this.ptr,
        key_buffer,
        key_array.length,
        pickle_buffer,
        pickle_array.length
      );
    } finally {
      // clear out copies of the pickle key
      bzero(key_buffer, key_array.length);
      for (var i = 0; i < key_array.length; i++) {
        key_array[i] = 0;
      }
    }
  });

  Session.prototype["create_outbound"] = restore_stack(function (
    account,
    their_identity_key,
    their_one_time_key
  ) {
    var random_length = session_method(
      _olm_create_outbound_session_random_length
    )(this.ptr);
    var random = random_stack(random_length);
    var identity_key_array = array_from_string(their_identity_key);
    var one_time_key_array = array_from_string(their_one_time_key);
    var identity_key_buffer = stack(identity_key_array);
    var one_time_key_buffer = stack(one_time_key_array);
    try {
      session_method(_olm_create_outbound_session)(
        this.ptr,
        account.ptr,
        identity_key_buffer,
        identity_key_array.length,
        one_time_key_buffer,
        one_time_key_array.length,
        random,
        random_length
      );
    } finally {
      // clear the random buffer, which is key data
      bzero(random, random_length);
    }
  });

  Session.prototype["create_inbound"] = restore_stack(function (
    account,
    one_time_key_message
  ) {
    var message_array = array_from_string(one_time_key_message);
    var message_buffer = stack(message_array);
    try {
      session_method(_olm_create_inbound_session)(
        this.ptr,
        account.ptr,
        message_buffer,
        message_array.length
      );
    } finally {
      // clear out copies of the key
      bzero(message_buffer, message_array.length);
      for (var i = 0; i < message_array.length; i++) {
        message_array[i] = 0;
      }
    }
  });

  Session.prototype["create_inbound_from"] = restore_stack(function (
    account,
    identity_key,
    one_time_key_message
  ) {
    var identity_key_array = array_from_string(identity_key);
    var identity_key_buffer = stack(identity_key_array);
    var message_array = array_from_string(one_time_key_message);
    var message_buffer = stack(message_array);
    try {
      session_method(_olm_create_inbound_session_from)(
        this.ptr,
        account.ptr,
        identity_key_buffer,
        identity_key_array.length,
        message_buffer,
        message_array.length
      );
    } finally {
      // clear out copies of the key
      bzero(message_buffer, message_array.length);
      for (var i = 0; i < message_array.length; i++) {
        message_array[i] = 0;
      }
    }
  });

  Session.prototype["session_id"] = restore_stack(function () {
    var id_length = session_method(_olm_session_id_length)(this.ptr);
    var id_buffer = stack(id_length + NULL_BYTE_PADDING_LENGTH);
    session_method(_olm_session_id)(this.ptr, id_buffer, id_length);
    return UTF8ToString(id_buffer, id_length);
  });

  Session.prototype["has_received_message"] = function () {
    return session_method(_olm_session_has_received_message)(this.ptr)
      ? true
      : false;
  };

  Session.prototype["matches_inbound"] = restore_stack(function (
    one_time_key_message
  ) {
    var message_array = array_from_string(one_time_key_message);
    var message_buffer = stack(message_array);
    return session_method(_olm_matches_inbound_session)(
      this.ptr,
      message_buffer,
      message_array.length
    )
      ? true
      : false;
  });

  Session.prototype["matches_inbound_from"] = restore_stack(function (
    identity_key,
    one_time_key_message
  ) {
    var identity_key_array = array_from_string(identity_key);
    var identity_key_buffer = stack(identity_key_array);
    var message_array = array_from_string(one_time_key_message);
    var message_buffer = stack(message_array);
    return session_method(_olm_matches_inbound_session_from)(
      this.ptr,
      identity_key_buffer,
      identity_key_array.length,
      message_buffer,
      message_array.length
    )
      ? true
      : false;
  });

  Session.prototype["encrypt"] = restore_stack(function (plaintext) {
    var plaintext_buffer,
      message_buffer,
      plaintext_length,
      random,
      random_length;
    try {
      random_length = session_method(_olm_encrypt_random_length)(this.ptr);
      var message_type = session_method(_olm_encrypt_message_type)(this.ptr);
      plaintext_length = lengthBytesUTF8(plaintext);
      var message_length = session_method(_olm_encrypt_message_length)(
        this.ptr,
        plaintext_length
      );
      random = random_stack(random_length);
      // need to allow space for the terminator (which stringToUTF8 always
      // writes), hence + 1.
      plaintext_buffer = malloc(plaintext_length + 1);
      stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
      message_buffer = malloc(message_length + NULL_BYTE_PADDING_LENGTH);
      session_method(_olm_encrypt)(
        this.ptr,
        plaintext_buffer,
        plaintext_length,
        random,
        random_length,
        message_buffer,
        message_length
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(message_buffer + message_length, 0, "i8");
      return {
        type: message_type,
        body: UTF8ToString(message_buffer, message_length),
      };
    } finally {
      if (random !== undefined) {
        // clear out the random buffer, since it is the private key
        bzero(random, random_length);
      }
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, plaintext_length + 1);
        free(plaintext_buffer);
      }
      if (message_buffer !== undefined) {
        free(message_buffer);
      }
    }
  });

  Session.prototype["decrypt"] = restore_stack(function (
    message_type,
    message
  ) {
    var message_buffer, plaintext_buffer, max_plaintext_length;
    try {
      message_buffer = malloc(message.length);
      writeAsciiToMemory(message, message_buffer, true);
      max_plaintext_length = session_method(_olm_decrypt_max_plaintext_length)(
        this.ptr,
        message_type,
        message_buffer,
        message.length
      );
      // caculating the length destroys the input buffer, so we need to re-copy it.
      writeAsciiToMemory(message, message_buffer, true);
      plaintext_buffer = malloc(
        max_plaintext_length + NULL_BYTE_PADDING_LENGTH
      );
      var plaintext_length = session_method(_olm_decrypt)(
        this.ptr,
        message_type,
        message_buffer,
        message.length,
        plaintext_buffer,
        max_plaintext_length
      );
      // UTF8ToString requires a null-terminated argument, so add the
      // null terminator.
      setValue(plaintext_buffer + plaintext_length, 0, "i8");
      return UTF8ToString(plaintext_buffer, plaintext_length);
    } finally {
      if (message_buffer !== undefined) {
        free(message_buffer);
      }
      if (plaintext_buffer !== undefined) {
        // don't leave a copy of the plaintext in the heap.
        bzero(plaintext_buffer, max_plaintext_length);
        free(plaintext_buffer);
      }
    }
  });

  Session.prototype["describe"] = restore_stack(function () {
    var description_buf;
    try {
      description_buf = malloc(256);
      session_method(_olm_session_describe)(this.ptr, description_buf, 256);
      return UTF8ToString(description_buf);
    } finally {
      if (description_buf !== undefined) free(description_buf);
    }
  });

  /** @constructor */ function Utility() {
    var size = _olm_utility_size();
    this.buf = malloc(size);
    this.ptr = _olm_utility(this.buf);
  }

  function utility_method(wrapped) {
    return function () {
      var result = wrapped.apply(this, arguments);
      if (result === OLM_ERROR) {
        var message = UTF8ToString(_olm_utility_last_error(arguments[0]));
        throw new Error("OLM." + message);
      }
      return result;
    };
  }

  Utility.prototype["free"] = function () {
    _olm_clear_utility(this.ptr);
    free(this.ptr);
  };

  Utility.prototype["sha256"] = restore_stack(function (input) {
    var output_length = utility_method(_olm_sha256_length)(this.ptr);
    var input_array = array_from_string(input);
    var input_buffer = stack(input_array);
    var output_buffer = stack(output_length + NULL_BYTE_PADDING_LENGTH);
    try {
      utility_method(_olm_sha256)(
        this.ptr,
        input_buffer,
        input_array.length,
        output_buffer,
        output_length
      );
    } finally {
      // clear out copies of the input buffer, which may be plaintext
      bzero(input_buffer, input_array.length);
      for (var i = 0; i < input_array.length; i++) {
        input_array[i] = 0;
      }
    }
    return UTF8ToString(output_buffer, output_length);
  });

  Utility.prototype["ed25519_verify"] = restore_stack(function (
    key,
    message,
    signature
  ) {
    var key_array = array_from_string(key);
    var key_buffer = stack(key_array);
    var message_array = array_from_string(message);
    var message_buffer = stack(message_array);
    var signature_array = array_from_string(signature);
    var signature_buffer = stack(signature_array);
    try {
      utility_method(_olm_ed25519_verify)(
        this.ptr,
        key_buffer,
        key_array.length,
        message_buffer,
        message_array.length,
        signature_buffer,
        signature_array.length
      );
    } finally {
      // clear out copies of the input buffer, which may be plaintext
      bzero(message_buffer, message_array.length);
      for (var i = 0; i < message_array.length; i++) {
        message_array[i] = 0;
      }
    }
  });

  Module["Account"] = Account;

  Module["Session"] = Session;

  Module["Utility"] = Utility;

  Module["PkEncryption"] = PkEncryption;

  Module["PkDecryption"] = PkDecryption;

  Module["PkSigning"] = PkSigning;

  Module["SAS"] = SAS;

  Module["get_library_version"] = restore_stack(function () {
    var buf = stack(3);
    _olm_get_library_version(buf, buf + 1, buf + 2);
    return [
      getValue(buf, "i8"),
      getValue(buf + 1, "i8"),
      getValue(buf + 2, "i8"),
    ];
  });

  // end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/zlrsqrnpmrfdp6xhj5vib4jv5q2wfi9q-source/javascript/olm_post.js
  // include: postamble_modularize.js
  // In MODULARIZE mode we wrap the generated code in a factory function
  // and return either the Module itself, or a promise of the module.
  // We assign to the `moduleRtn` global here and configure closure to see
  // this as and extern so it won't get minified.
  moduleRtn = readyPromise;

  return await moduleRtn;
}

var __exp___olm_error_to_string,
  __exp__free,
  __exp__malloc,
  __exp__olm_account,
  __exp__olm_account_fallback_key,
  __exp__olm_account_fallback_key_length,
  __exp__olm_account_forget_old_fallback_key,
  __exp__olm_account_generate_fallback_key,
  __exp__olm_account_generate_fallback_key_random_length,
  __exp__olm_account_generate_one_time_keys,
  __exp__olm_account_generate_one_time_keys_random_length,
  __exp__olm_account_identity_keys,
  __exp__olm_account_identity_keys_length,
  __exp__olm_account_last_error,
  __exp__olm_account_last_error_code,
  __exp__olm_account_mark_keys_as_published,
  __exp__olm_account_max_number_of_one_time_keys,
  __exp__olm_account_one_time_keys,
  __exp__olm_account_one_time_keys_length,
  __exp__olm_account_sign,
  __exp__olm_account_signature_length,
  __exp__olm_account_size,
  __exp__olm_account_unpublished_fallback_key,
  __exp__olm_account_unpublished_fallback_key_length,
  __exp__olm_clear_account,
  __exp__olm_clear_inbound_group_session,
  __exp__olm_clear_outbound_group_session,
  __exp__olm_clear_pk_decryption,
  __exp__olm_clear_pk_encryption,
  __exp__olm_clear_pk_signing,
  __exp__olm_clear_sas,
  __exp__olm_clear_session,
  __exp__olm_clear_utility,
  __exp__olm_create_account,
  __exp__olm_create_account_random_length,
  __exp__olm_create_inbound_session,
  __exp__olm_create_inbound_session_from,
  __exp__olm_create_outbound_session,
  __exp__olm_create_outbound_session_random_length,
  __exp__olm_create_sas,
  __exp__olm_create_sas_random_length,
  __exp__olm_decrypt,
  __exp__olm_decrypt_max_plaintext_length,
  __exp__olm_ed25519_verify,
  __exp__olm_encrypt,
  __exp__olm_encrypt_message_length,
  __exp__olm_encrypt_message_type,
  __exp__olm_encrypt_random_length,
  __exp__olm_error,
  __exp__olm_export_inbound_group_session,
  __exp__olm_export_inbound_group_session_length,
  __exp__olm_get_library_version,
  __exp__olm_group_decrypt,
  __exp__olm_group_decrypt_max_plaintext_length,
  __exp__olm_group_encrypt,
  __exp__olm_group_encrypt_message_length,
  __exp__olm_import_inbound_group_session,
  __exp__olm_inbound_group_session,
  __exp__olm_inbound_group_session_first_known_index,
  __exp__olm_inbound_group_session_id,
  __exp__olm_inbound_group_session_id_length,
  __exp__olm_inbound_group_session_is_verified,
  __exp__olm_inbound_group_session_last_error,
  __exp__olm_inbound_group_session_last_error_code,
  __exp__olm_inbound_group_session_size,
  __exp__olm_init_inbound_group_session,
  __exp__olm_init_outbound_group_session,
  __exp__olm_init_outbound_group_session_random_length,
  __exp__olm_matches_inbound_session,
  __exp__olm_matches_inbound_session_from,
  __exp__olm_outbound_group_session,
  __exp__olm_outbound_group_session_id,
  __exp__olm_outbound_group_session_id_length,
  __exp__olm_outbound_group_session_key,
  __exp__olm_outbound_group_session_key_length,
  __exp__olm_outbound_group_session_last_error,
  __exp__olm_outbound_group_session_last_error_code,
  __exp__olm_outbound_group_session_message_index,
  __exp__olm_outbound_group_session_size,
  __exp__olm_pickle_account,
  __exp__olm_pickle_account_length,
  __exp__olm_pickle_inbound_group_session,
  __exp__olm_pickle_inbound_group_session_length,
  __exp__olm_pickle_outbound_group_session,
  __exp__olm_pickle_outbound_group_session_length,
  __exp__olm_pickle_pk_decryption,
  __exp__olm_pickle_pk_decryption_length,
  __exp__olm_pickle_session,
  __exp__olm_pickle_session_length,
  __exp__olm_pk_ciphertext_length,
  __exp__olm_pk_decrypt,
  __exp__olm_pk_decryption,
  __exp__olm_pk_decryption_last_error,
  __exp__olm_pk_decryption_last_error_code,
  __exp__olm_pk_decryption_size,
  __exp__olm_pk_encrypt,
  __exp__olm_pk_encrypt_random_length,
  __exp__olm_pk_encryption,
  __exp__olm_pk_encryption_last_error,
  __exp__olm_pk_encryption_last_error_code,
  __exp__olm_pk_encryption_set_recipient_key,
  __exp__olm_pk_encryption_size,
  __exp__olm_pk_generate_key,
  __exp__olm_pk_generate_key_random_length,
  __exp__olm_pk_get_private_key,
  __exp__olm_pk_key_from_private,
  __exp__olm_pk_key_length,
  __exp__olm_pk_mac_length,
  __exp__olm_pk_max_plaintext_length,
  __exp__olm_pk_private_key_length,
  __exp__olm_pk_sign,
  __exp__olm_pk_signature_length,
  __exp__olm_pk_signing,
  __exp__olm_pk_signing_key_from_seed,
  __exp__olm_pk_signing_last_error,
  __exp__olm_pk_signing_last_error_code,
  __exp__olm_pk_signing_public_key_length,
  __exp__olm_pk_signing_seed_length,
  __exp__olm_pk_signing_size,
  __exp__olm_remove_one_time_keys,
  __exp__olm_sas,
  __exp__olm_sas_calculate_mac,
  __exp__olm_sas_calculate_mac_fixed_base64,
  __exp__olm_sas_calculate_mac_long_kdf,
  __exp__olm_sas_generate_bytes,
  __exp__olm_sas_get_pubkey,
  __exp__olm_sas_is_their_key_set,
  __exp__olm_sas_last_error,
  __exp__olm_sas_last_error_code,
  __exp__olm_sas_mac_length,
  __exp__olm_sas_pubkey_length,
  __exp__olm_sas_set_their_key,
  __exp__olm_sas_size,
  __exp__olm_session,
  __exp__olm_session_describe,
  __exp__olm_session_has_received_message,
  __exp__olm_session_id,
  __exp__olm_session_id_length,
  __exp__olm_session_last_error,
  __exp__olm_session_last_error_code,
  __exp__olm_session_size,
  __exp__olm_sha256,
  __exp__olm_sha256_length,
  __exp__olm_unpickle_account,
  __exp__olm_unpickle_inbound_group_session,
  __exp__olm_unpickle_outbound_group_session,
  __exp__olm_unpickle_pk_decryption,
  __exp__olm_unpickle_session,
  __exp__olm_utility,
  __exp__olm_utility_last_error,
  __exp__olm_utility_last_error_code,
  __exp__olm_utility_size,
  __exp__memory,
  __exp____indirect_function_table,
  __exp_ALLOC_STACK,
  __exp_stackAlloc,
  __exp_writeAsciiToMemory,
  __exp_stringToAscii,
  __exp_intArrayFromString,
  __exp_UTF8ToString,
  __exp_stringToUTF8,
  __exp_HEAPF32,
  __exp_HEAPF64,
  __exp_HEAP_DATA_VIEW,
  __exp_HEAP8,
  __exp_HEAPU8,
  __exp_HEAP16,
  __exp_HEAPU16,
  __exp_HEAP32,
  __exp_HEAPU32,
  __exp_HEAP64,
  __exp_HEAPU64;
export {
  __exp___olm_error_to_string as __olm_error_to_string,
  __exp__free as _free,
  __exp__malloc as _malloc,
  __exp__olm_account as _olm_account,
  __exp__olm_account_fallback_key as _olm_account_fallback_key,
  __exp__olm_account_fallback_key_length as _olm_account_fallback_key_length,
  __exp__olm_account_forget_old_fallback_key as _olm_account_forget_old_fallback_key,
  __exp__olm_account_generate_fallback_key as _olm_account_generate_fallback_key,
  __exp__olm_account_generate_fallback_key_random_length as _olm_account_generate_fallback_key_random_length,
  __exp__olm_account_generate_one_time_keys as _olm_account_generate_one_time_keys,
  __exp__olm_account_generate_one_time_keys_random_length as _olm_account_generate_one_time_keys_random_length,
  __exp__olm_account_identity_keys as _olm_account_identity_keys,
  __exp__olm_account_identity_keys_length as _olm_account_identity_keys_length,
  __exp__olm_account_last_error as _olm_account_last_error,
  __exp__olm_account_last_error_code as _olm_account_last_error_code,
  __exp__olm_account_mark_keys_as_published as _olm_account_mark_keys_as_published,
  __exp__olm_account_max_number_of_one_time_keys as _olm_account_max_number_of_one_time_keys,
  __exp__olm_account_one_time_keys as _olm_account_one_time_keys,
  __exp__olm_account_one_time_keys_length as _olm_account_one_time_keys_length,
  __exp__olm_account_sign as _olm_account_sign,
  __exp__olm_account_signature_length as _olm_account_signature_length,
  __exp__olm_account_size as _olm_account_size,
  __exp__olm_account_unpublished_fallback_key as _olm_account_unpublished_fallback_key,
  __exp__olm_account_unpublished_fallback_key_length as _olm_account_unpublished_fallback_key_length,
  __exp__olm_clear_account as _olm_clear_account,
  __exp__olm_clear_inbound_group_session as _olm_clear_inbound_group_session,
  __exp__olm_clear_outbound_group_session as _olm_clear_outbound_group_session,
  __exp__olm_clear_pk_decryption as _olm_clear_pk_decryption,
  __exp__olm_clear_pk_encryption as _olm_clear_pk_encryption,
  __exp__olm_clear_pk_signing as _olm_clear_pk_signing,
  __exp__olm_clear_sas as _olm_clear_sas,
  __exp__olm_clear_session as _olm_clear_session,
  __exp__olm_clear_utility as _olm_clear_utility,
  __exp__olm_create_account as _olm_create_account,
  __exp__olm_create_account_random_length as _olm_create_account_random_length,
  __exp__olm_create_inbound_session as _olm_create_inbound_session,
  __exp__olm_create_inbound_session_from as _olm_create_inbound_session_from,
  __exp__olm_create_outbound_session as _olm_create_outbound_session,
  __exp__olm_create_outbound_session_random_length as _olm_create_outbound_session_random_length,
  __exp__olm_create_sas as _olm_create_sas,
  __exp__olm_create_sas_random_length as _olm_create_sas_random_length,
  __exp__olm_decrypt as _olm_decrypt,
  __exp__olm_decrypt_max_plaintext_length as _olm_decrypt_max_plaintext_length,
  __exp__olm_ed25519_verify as _olm_ed25519_verify,
  __exp__olm_encrypt as _olm_encrypt,
  __exp__olm_encrypt_message_length as _olm_encrypt_message_length,
  __exp__olm_encrypt_message_type as _olm_encrypt_message_type,
  __exp__olm_encrypt_random_length as _olm_encrypt_random_length,
  __exp__olm_error as _olm_error,
  __exp__olm_export_inbound_group_session as _olm_export_inbound_group_session,
  __exp__olm_export_inbound_group_session_length as _olm_export_inbound_group_session_length,
  __exp__olm_get_library_version as _olm_get_library_version,
  __exp__olm_group_decrypt as _olm_group_decrypt,
  __exp__olm_group_decrypt_max_plaintext_length as _olm_group_decrypt_max_plaintext_length,
  __exp__olm_group_encrypt as _olm_group_encrypt,
  __exp__olm_group_encrypt_message_length as _olm_group_encrypt_message_length,
  __exp__olm_import_inbound_group_session as _olm_import_inbound_group_session,
  __exp__olm_inbound_group_session as _olm_inbound_group_session,
  __exp__olm_inbound_group_session_first_known_index as _olm_inbound_group_session_first_known_index,
  __exp__olm_inbound_group_session_id as _olm_inbound_group_session_id,
  __exp__olm_inbound_group_session_id_length as _olm_inbound_group_session_id_length,
  __exp__olm_inbound_group_session_is_verified as _olm_inbound_group_session_is_verified,
  __exp__olm_inbound_group_session_last_error as _olm_inbound_group_session_last_error,
  __exp__olm_inbound_group_session_last_error_code as _olm_inbound_group_session_last_error_code,
  __exp__olm_inbound_group_session_size as _olm_inbound_group_session_size,
  __exp__olm_init_inbound_group_session as _olm_init_inbound_group_session,
  __exp__olm_init_outbound_group_session as _olm_init_outbound_group_session,
  __exp__olm_init_outbound_group_session_random_length as _olm_init_outbound_group_session_random_length,
  __exp__olm_matches_inbound_session as _olm_matches_inbound_session,
  __exp__olm_matches_inbound_session_from as _olm_matches_inbound_session_from,
  __exp__olm_outbound_group_session as _olm_outbound_group_session,
  __exp__olm_outbound_group_session_id as _olm_outbound_group_session_id,
  __exp__olm_outbound_group_session_id_length as _olm_outbound_group_session_id_length,
  __exp__olm_outbound_group_session_key as _olm_outbound_group_session_key,
  __exp__olm_outbound_group_session_key_length as _olm_outbound_group_session_key_length,
  __exp__olm_outbound_group_session_last_error as _olm_outbound_group_session_last_error,
  __exp__olm_outbound_group_session_last_error_code as _olm_outbound_group_session_last_error_code,
  __exp__olm_outbound_group_session_message_index as _olm_outbound_group_session_message_index,
  __exp__olm_outbound_group_session_size as _olm_outbound_group_session_size,
  __exp__olm_pickle_account as _olm_pickle_account,
  __exp__olm_pickle_account_length as _olm_pickle_account_length,
  __exp__olm_pickle_inbound_group_session as _olm_pickle_inbound_group_session,
  __exp__olm_pickle_inbound_group_session_length as _olm_pickle_inbound_group_session_length,
  __exp__olm_pickle_outbound_group_session as _olm_pickle_outbound_group_session,
  __exp__olm_pickle_outbound_group_session_length as _olm_pickle_outbound_group_session_length,
  __exp__olm_pickle_pk_decryption as _olm_pickle_pk_decryption,
  __exp__olm_pickle_pk_decryption_length as _olm_pickle_pk_decryption_length,
  __exp__olm_pickle_session as _olm_pickle_session,
  __exp__olm_pickle_session_length as _olm_pickle_session_length,
  __exp__olm_pk_ciphertext_length as _olm_pk_ciphertext_length,
  __exp__olm_pk_decrypt as _olm_pk_decrypt,
  __exp__olm_pk_decryption as _olm_pk_decryption,
  __exp__olm_pk_decryption_last_error as _olm_pk_decryption_last_error,
  __exp__olm_pk_decryption_last_error_code as _olm_pk_decryption_last_error_code,
  __exp__olm_pk_decryption_size as _olm_pk_decryption_size,
  __exp__olm_pk_encrypt as _olm_pk_encrypt,
  __exp__olm_pk_encrypt_random_length as _olm_pk_encrypt_random_length,
  __exp__olm_pk_encryption as _olm_pk_encryption,
  __exp__olm_pk_encryption_last_error as _olm_pk_encryption_last_error,
  __exp__olm_pk_encryption_last_error_code as _olm_pk_encryption_last_error_code,
  __exp__olm_pk_encryption_set_recipient_key as _olm_pk_encryption_set_recipient_key,
  __exp__olm_pk_encryption_size as _olm_pk_encryption_size,
  __exp__olm_pk_generate_key as _olm_pk_generate_key,
  __exp__olm_pk_generate_key_random_length as _olm_pk_generate_key_random_length,
  __exp__olm_pk_get_private_key as _olm_pk_get_private_key,
  __exp__olm_pk_key_from_private as _olm_pk_key_from_private,
  __exp__olm_pk_key_length as _olm_pk_key_length,
  __exp__olm_pk_mac_length as _olm_pk_mac_length,
  __exp__olm_pk_max_plaintext_length as _olm_pk_max_plaintext_length,
  __exp__olm_pk_private_key_length as _olm_pk_private_key_length,
  __exp__olm_pk_sign as _olm_pk_sign,
  __exp__olm_pk_signature_length as _olm_pk_signature_length,
  __exp__olm_pk_signing as _olm_pk_signing,
  __exp__olm_pk_signing_key_from_seed as _olm_pk_signing_key_from_seed,
  __exp__olm_pk_signing_last_error as _olm_pk_signing_last_error,
  __exp__olm_pk_signing_last_error_code as _olm_pk_signing_last_error_code,
  __exp__olm_pk_signing_public_key_length as _olm_pk_signing_public_key_length,
  __exp__olm_pk_signing_seed_length as _olm_pk_signing_seed_length,
  __exp__olm_pk_signing_size as _olm_pk_signing_size,
  __exp__olm_remove_one_time_keys as _olm_remove_one_time_keys,
  __exp__olm_sas as _olm_sas,
  __exp__olm_sas_calculate_mac as _olm_sas_calculate_mac,
  __exp__olm_sas_calculate_mac_fixed_base64 as _olm_sas_calculate_mac_fixed_base64,
  __exp__olm_sas_calculate_mac_long_kdf as _olm_sas_calculate_mac_long_kdf,
  __exp__olm_sas_generate_bytes as _olm_sas_generate_bytes,
  __exp__olm_sas_get_pubkey as _olm_sas_get_pubkey,
  __exp__olm_sas_is_their_key_set as _olm_sas_is_their_key_set,
  __exp__olm_sas_last_error as _olm_sas_last_error,
  __exp__olm_sas_last_error_code as _olm_sas_last_error_code,
  __exp__olm_sas_mac_length as _olm_sas_mac_length,
  __exp__olm_sas_pubkey_length as _olm_sas_pubkey_length,
  __exp__olm_sas_set_their_key as _olm_sas_set_their_key,
  __exp__olm_sas_size as _olm_sas_size,
  __exp__olm_session as _olm_session,
  __exp__olm_session_describe as _olm_session_describe,
  __exp__olm_session_has_received_message as _olm_session_has_received_message,
  __exp__olm_session_id as _olm_session_id,
  __exp__olm_session_id_length as _olm_session_id_length,
  __exp__olm_session_last_error as _olm_session_last_error,
  __exp__olm_session_last_error_code as _olm_session_last_error_code,
  __exp__olm_session_size as _olm_session_size,
  __exp__olm_sha256 as _olm_sha256,
  __exp__olm_sha256_length as _olm_sha256_length,
  __exp__olm_unpickle_account as _olm_unpickle_account,
  __exp__olm_unpickle_inbound_group_session as _olm_unpickle_inbound_group_session,
  __exp__olm_unpickle_outbound_group_session as _olm_unpickle_outbound_group_session,
  __exp__olm_unpickle_pk_decryption as _olm_unpickle_pk_decryption,
  __exp__olm_unpickle_session as _olm_unpickle_session,
  __exp__olm_utility as _olm_utility,
  __exp__olm_utility_last_error as _olm_utility_last_error,
  __exp__olm_utility_last_error_code as _olm_utility_last_error_code,
  __exp__olm_utility_size as _olm_utility_size,
  __exp__memory as _memory,
  __exp____indirect_function_table as ___indirect_function_table,
  __exp_ALLOC_STACK as ALLOC_STACK,
  __exp_stackAlloc as stackAlloc,
  __exp_writeAsciiToMemory as writeAsciiToMemory,
  __exp_stringToAscii as stringToAscii,
  __exp_intArrayFromString as intArrayFromString,
  __exp_UTF8ToString as UTF8ToString,
  __exp_stringToUTF8 as stringToUTF8,
  __exp_HEAPF32 as HEAPF32,
  __exp_HEAPF64 as HEAPF64,
  __exp_HEAP_DATA_VIEW as HEAP_DATA_VIEW,
  __exp_HEAP8 as HEAP8,
  __exp_HEAPU8 as HEAPU8,
  __exp_HEAP16 as HEAP16,
  __exp_HEAPU16 as HEAPU16,
  __exp_HEAP32 as HEAP32,
  __exp_HEAPU32 as HEAPU32,
  __exp_HEAP64 as HEAP64,
  __exp_HEAPU64 as HEAPU64,
};
