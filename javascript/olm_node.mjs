
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
function(moduleArg = {}) {
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

[ "__olm_error_to_string", "_free", "_malloc", "_olm_account", "_olm_account_fallback_key", "_olm_account_fallback_key_length", "_olm_account_forget_old_fallback_key", "_olm_account_generate_fallback_key", "_olm_account_generate_fallback_key_random_length", "_olm_account_generate_one_time_keys", "_olm_account_generate_one_time_keys_random_length", "_olm_account_identity_keys", "_olm_account_identity_keys_length", "_olm_account_last_error", "_olm_account_last_error_code", "_olm_account_mark_keys_as_published", "_olm_account_max_number_of_one_time_keys", "_olm_account_one_time_keys", "_olm_account_one_time_keys_length", "_olm_account_sign", "_olm_account_signature_length", "_olm_account_size", "_olm_account_unpublished_fallback_key", "_olm_account_unpublished_fallback_key_length", "_olm_clear_account", "_olm_clear_inbound_group_session", "_olm_clear_outbound_group_session", "_olm_clear_pk_decryption", "_olm_clear_pk_encryption", "_olm_clear_pk_signing", "_olm_clear_sas", "_olm_clear_session", "_olm_clear_utility", "_olm_create_account", "_olm_create_account_random_length", "_olm_create_inbound_session", "_olm_create_inbound_session_from", "_olm_create_outbound_session", "_olm_create_outbound_session_random_length", "_olm_create_sas", "_olm_create_sas_random_length", "_olm_decrypt", "_olm_decrypt_max_plaintext_length", "_olm_ed25519_verify", "_olm_encrypt", "_olm_encrypt_message_length", "_olm_encrypt_message_type", "_olm_encrypt_random_length", "_olm_error", "_olm_export_inbound_group_session", "_olm_export_inbound_group_session_length", "_olm_get_library_version", "_olm_group_decrypt", "_olm_group_decrypt_max_plaintext_length", "_olm_group_encrypt", "_olm_group_encrypt_message_length", "_olm_import_inbound_group_session", "_olm_inbound_group_session", "_olm_inbound_group_session_first_known_index", "_olm_inbound_group_session_id", "_olm_inbound_group_session_id_length", "_olm_inbound_group_session_is_verified", "_olm_inbound_group_session_last_error", "_olm_inbound_group_session_last_error_code", "_olm_inbound_group_session_size", "_olm_init_inbound_group_session", "_olm_init_outbound_group_session", "_olm_init_outbound_group_session_random_length", "_olm_matches_inbound_session", "_olm_matches_inbound_session_from", "_olm_outbound_group_session", "_olm_outbound_group_session_id", "_olm_outbound_group_session_id_length", "_olm_outbound_group_session_key", "_olm_outbound_group_session_key_length", "_olm_outbound_group_session_last_error", "_olm_outbound_group_session_last_error_code", "_olm_outbound_group_session_message_index", "_olm_outbound_group_session_size", "_olm_pickle_account", "_olm_pickle_account_length", "_olm_pickle_inbound_group_session", "_olm_pickle_inbound_group_session_length", "_olm_pickle_outbound_group_session", "_olm_pickle_outbound_group_session_length", "_olm_pickle_pk_decryption", "_olm_pickle_pk_decryption_length", "_olm_pickle_session", "_olm_pickle_session_length", "_olm_pk_ciphertext_length", "_olm_pk_decrypt", "_olm_pk_decryption", "_olm_pk_decryption_last_error", "_olm_pk_decryption_last_error_code", "_olm_pk_decryption_size", "_olm_pk_encrypt", "_olm_pk_encrypt_random_length", "_olm_pk_encryption", "_olm_pk_encryption_last_error", "_olm_pk_encryption_last_error_code", "_olm_pk_encryption_set_recipient_key", "_olm_pk_encryption_size", "_olm_pk_generate_key", "_olm_pk_generate_key_random_length", "_olm_pk_get_private_key", "_olm_pk_key_from_private", "_olm_pk_key_length", "_olm_pk_mac_length", "_olm_pk_max_plaintext_length", "_olm_pk_private_key_length", "_olm_pk_sign", "_olm_pk_signature_length", "_olm_pk_signing", "_olm_pk_signing_key_from_seed", "_olm_pk_signing_last_error", "_olm_pk_signing_last_error_code", "_olm_pk_signing_public_key_length", "_olm_pk_signing_seed_length", "_olm_pk_signing_size", "_olm_remove_one_time_keys", "_olm_sas", "_olm_sas_calculate_mac", "_olm_sas_calculate_mac_fixed_base64", "_olm_sas_calculate_mac_long_kdf", "_olm_sas_generate_bytes", "_olm_sas_get_pubkey", "_olm_sas_is_their_key_set", "_olm_sas_last_error", "_olm_sas_last_error_code", "_olm_sas_mac_length", "_olm_sas_pubkey_length", "_olm_sas_set_their_key", "_olm_sas_size", "_olm_session", "_olm_session_describe", "_olm_session_has_received_message", "_olm_session_id", "_olm_session_id_length", "_olm_session_last_error", "_olm_session_last_error_code", "_olm_session_size", "_olm_sha256", "_olm_sha256_length", "_olm_unpickle_account", "_olm_unpickle_inbound_group_session", "_olm_unpickle_outbound_group_session", "_olm_unpickle_pk_decryption", "_olm_unpickle_session", "_olm_utility", "_olm_utility_last_error", "_olm_utility_last_error_code", "_olm_utility_size", "_memory", "___indirect_function_table", "onRuntimeInitialized" ].forEach(prop => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort("You are getting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),
      set: () => abort("You are setting " + prop + " on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).
var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = true;

var ENVIRONMENT_IS_SHELL = false;

if (ENVIRONMENT_IS_NODE) {}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_pre.js
var get_random_values;

if (typeof window !== "undefined") {
  // We're in a browser (directly, via browserify, or via webpack).
  get_random_values = function(buf) {
    window.crypto.getRandomValues(buf);
  };
} else if (typeof module === "object" && module.exports) {
  // We're running in node.
  var nodeCrypto = require("crypto");
  get_random_values = function(buf) {
    // [''] syntax needed here rather than '.' to prevent
    // closure compiler from mangling the import(!)
    var bytes = nodeCrypto["randomBytes"](buf.length);
    buf.set(bytes);
  };
} else {
  throw new Error("Cannot find global to attach library to");
}

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
  OLM_ERROR = Module["_olm_error"]();
};

/* Optional custom abort hook – remove if unused */ // Module["onAbort"] = err => console.error(err);
// ---- async helper expected by the user ----
Module.initAsync = () => Module.ready;

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_pre.js
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
  if (typeof process == "undefined" || !process.release || process.release.name !== "node") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split(".").slice(0, 3);
  numericVersion = (numericVersion[0] * 1e4) + (numericVersion[1] * 100) + (numericVersion[2].split("-")[0] * 1);
  if (numericVersion < 16e4) {
    throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + nodeVersion + ")");
  }
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require("fs");
  var nodePath = require("path");
  // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
  // since there's no way getting the current absolute path of the module when
  // support for that is not available.
  if (!import.meta.url.startsWith("data:")) {
    scriptDirectory = nodePath.dirname(require("url").fileURLToPath(import.meta.url)) + "/";
  }
  // include: node_shell_read.js
  readBinary = filename => {
    // We need to re-wrap `file://` strings to URLs. Normalizing isn't
    // necessary in that case, the path should already be absolute.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    var ret = fs.readFileSync(filename);
    assert(ret.buffer);
    return ret;
  };
  readAsync = (filename, binary = true) => {
    // See the comment in the `readBinary` function.
    filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
        if (err) reject(err); else resolve(binary ? data.buffer : data);
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
} else if (ENVIRONMENT_IS_SHELL) {
  if ((typeof process == "object" && typeof require === "function") || typeof window == "object" || typeof WorkerGlobalScope != "undefined") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
} else // Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
{
  throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);

// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;

checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module["arguments"]) arguments_ = Module["arguments"];

legacyModuleProp("arguments", "arguments_");

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

legacyModuleProp("thisProgram", "thisProgram");

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] == "undefined", "Module.read option was removed");

assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");

assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");

legacyModuleProp("asm", "wasmExports");

legacyModuleProp("readAsync", "readAsync");

legacyModuleProp("readBinary", "readBinary");

legacyModuleProp("setWindowTitle", "setWindowTitle");

assert(!ENVIRONMENT_IS_WEB, "web environment detected but not enabled at build time.  Add `web` to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");

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

legacyModuleProp("wasmBinary", "wasmBinary");

if (typeof WebAssembly != "object") {
  err("no native wasm support detected");
}

// Wasm globals
var wasmMemory;

//========================================
// Runtime essentials
//========================================
// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */ function assert(condition, text) {
  if (!condition) {
    abort("Assertion failed" + (text ? ": " + text : ""));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
// Memory management
var /** @type {!Int8Array} */ HEAP8, /** @type {!Uint8Array} */ HEAPU8, /** @type {!Int16Array} */ HEAP16, /** @type {!Uint16Array} */ HEAPU16, /** @type {!Int32Array} */ HEAP32, /** @type {!Uint32Array} */ HEAPU32, /** @type {!Float32Array} */ HEAPF32, /** @type {!Float64Array} */ HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module["HEAP8"] = HEAP8 = new Int8Array(b);
  Module["HEAP16"] = HEAP16 = new Int16Array(b);
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
  Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
  Module["HEAP32"] = HEAP32 = new Int32Array(b);
  Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
  Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
  Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");

assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module["wasmMemory"], "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");

assert(!Module["INITIAL_MEMORY"], "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max) >> 2)] = 34821223;
  HEAPU32[(((max) + (4)) >> 2)] = 2310721022;
  // Also test the global address 0 for integrity.
  HEAPU32[((0) >> 2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max) >> 2)];
  var cookie2 = HEAPU32[(((max) + (4)) >> 2)];
  if (cookie1 != 34821223 || cookie2 != 2310721022) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0) >> 2)] != 1668509029) /* 'emsc' */ {
    abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}

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
    if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  checkStackCookie();
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
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
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

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

// overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function addRunDependency(id) {
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != "undefined") {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err("still waiting on run dependencies:");
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err("(end of list)");
        }
      }, 1e4);
    }
  } else {
    err("warning: run dependency added without ID");
  }
}

function removeRunDependency(id) {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err("warning: run dependency removed without ID");
  }
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
// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM");
  },
  init() {
    FS.error();
  },
  createDataFile() {
    FS.error();
  },
  createPreloadedFile() {
    FS.error();
  },
  createLazyFile() {
    FS.error();
  },
  open() {
    FS.error();
  },
  mkdev() {
    FS.error();
  },
  registerDevice() {
    FS.error();
  },
  analyzePath() {
    FS.error();
  },
  ErrnoError() {
    FS.error();
  }
};

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = "data:application/octet-stream;base64,";

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */ var isDataURI = filename => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */ var isFileURI = filename => filename.startsWith("file://");

// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

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
    return readAsync(binaryFile).then(response => new Uint8Array(/** @type{!ArrayBuffer} */ (response)), // Fall back to getBinarySync if readAsync fails
    () => getBinarySync(binaryFile));
  }
  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then(binary => WebAssembly.instantiate(binary, imports)).then(receiver, reason => {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && // Avoid instantiateStreaming() on Node.js environment for now, as while
  // Node.js v18.1.0 implements it, it does not have a full fetch()
  // implementation yet.
  // Reference:
  //   https://github.com/emscripten-core/emscripten/pull/16917
  !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
    return fetch(binaryFile, {
      credentials: "same-origin"
    }).then(response => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */ var result = WebAssembly.instantiateStreaming(response, imports);
      return result.then(callback, function(reason) {
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
    "env": wasmImports,
    "wasi_snapshot_preview1": wasmImports
  };
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/ function receiveInstance(instance, module) {
    wasmExports = instance.exports;
    wasmMemory = wasmExports["memory"];
    assert(wasmMemory, "memory not found in wasm exports");
    updateMemoryViews();
    addOnInit(wasmExports["__wasm_call_ctors"]);
    removeRunDependency("wasm-instantiate");
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency("wasm-instantiate");
  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    trueModule = null;
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
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {};
}

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 25459;
  if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
})();

if (Module["ENVIRONMENT"]) {
  throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}

function legacyModuleProp(prop, newName, incoming = true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
  name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */ function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");

missingGlobal("asm", "Please use wasmExports instead");

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith("_")) {
      librarySymbol = "$" + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
    }
    warnOnce(msg);
  });
  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
        }
        abort(msg);
      }
    });
  }
}

// end include: runtime_debug.js
// === Body ===
// end include: preamble.js
class ExitStatus {
  name="ExitStatus";
  constructor(status) {
    this.message = `Program terminated with exit(${status})`;
    this.status = status;
  }
}

var callRuntimeCallbacks = callbacks => {
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
    return HEAP16[((ptr) >> 1)];

   case "i32":
    return HEAP32[((ptr) >> 2)];

   case "i64":
    abort("to do getValue(i64) use WASM_BIGINT");

   case "float":
    return HEAPF32[((ptr) >> 2)];

   case "double":
    return HEAPF64[((ptr) >> 3)];

   case "*":
    return HEAPU32[((ptr) >> 2)];

   default:
    abort(`invalid type for getValue: ${type}`);
  }
}

var noExitRuntime = Module["noExitRuntime"] || true;

var ptrToString = ptr => {
  assert(typeof ptr === "number");
  // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
  ptr >>>= 0;
  return "0x" + ptr.toString(16).padStart(8, "0");
};

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
    HEAP16[((ptr) >> 1)] = value;
    break;

   case "i32":
    HEAP32[((ptr) >> 2)] = value;
    break;

   case "i64":
    abort("to do setValue(i64) use WASM_BIGINT");

   case "float":
    HEAPF32[((ptr) >> 2)] = value;
    break;

   case "double":
    HEAPF64[((ptr) >> 3)] = value;
    break;

   case "*":
    HEAPU32[((ptr) >> 2)] = value;
    break;

   default:
    abort(`invalid type for setValue: ${type}`);
  }
}

var stackRestore = val => __emscripten_stack_restore(val);

var stackSave = () => _emscripten_stack_get_current();

var warnOnce = text => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
    err(text);
  }
};

var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

var abortOnCannotGrowMemory = requestedSize => {
  abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
};

var _emscripten_resize_heap = requestedSize => {
  var oldSize = HEAPU8.length;
  // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
  requestedSize >>>= 0;
  abortOnCannotGrowMemory(requestedSize);
};

var ALLOC_STACK = 1;

var stringToAscii = (str, buffer) => {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
    HEAP8[buffer++] = str.charCodeAt(i);
  }
  // Null-terminate the string
  HEAP8[buffer] = 0;
};

var lengthBytesUTF8 = str => {
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
  assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
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
      u = 65536 + ((u & 1023) << 10) | (u1 & 1023);
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
      if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
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

/** @type {function(string, boolean=, number=)} */ function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder : undefined;

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
      if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
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
     */ var UTF8ToString = (ptr, maxBytesToRead) => {
  assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
};

var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
  assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
};

function checkIncomingModuleAPI() {
  ignoredModuleProp("fetchSettings");
}

var wasmImports = {
  /** @export */ _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */ emscripten_resize_heap: _emscripten_resize_heap
};

var wasmExports = createWasm();

var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors", 0);

var _olm_get_library_version = Module["_olm_get_library_version"] = createExportWrapper("olm_get_library_version", 3);

var _olm_error = Module["_olm_error"] = createExportWrapper("olm_error", 0);

var _olm_account_last_error = Module["_olm_account_last_error"] = createExportWrapper("olm_account_last_error", 1);

var __olm_error_to_string = Module["__olm_error_to_string"] = createExportWrapper("_olm_error_to_string", 1);

var _olm_account_last_error_code = Module["_olm_account_last_error_code"] = createExportWrapper("olm_account_last_error_code", 1);

var _olm_session_last_error = Module["_olm_session_last_error"] = createExportWrapper("olm_session_last_error", 1);

var _olm_session_last_error_code = Module["_olm_session_last_error_code"] = createExportWrapper("olm_session_last_error_code", 1);

var _olm_utility_last_error = Module["_olm_utility_last_error"] = createExportWrapper("olm_utility_last_error", 1);

var _olm_utility_last_error_code = Module["_olm_utility_last_error_code"] = createExportWrapper("olm_utility_last_error_code", 1);

var _olm_account_size = Module["_olm_account_size"] = createExportWrapper("olm_account_size", 0);

var _olm_session_size = Module["_olm_session_size"] = createExportWrapper("olm_session_size", 0);

var _olm_utility_size = Module["_olm_utility_size"] = createExportWrapper("olm_utility_size", 0);

var _olm_account = Module["_olm_account"] = createExportWrapper("olm_account", 1);

var _olm_session = Module["_olm_session"] = createExportWrapper("olm_session", 1);

var _olm_utility = Module["_olm_utility"] = createExportWrapper("olm_utility", 1);

var _olm_clear_account = Module["_olm_clear_account"] = createExportWrapper("olm_clear_account", 1);

var _olm_clear_session = Module["_olm_clear_session"] = createExportWrapper("olm_clear_session", 1);

var _olm_clear_utility = Module["_olm_clear_utility"] = createExportWrapper("olm_clear_utility", 1);

var _olm_pickle_account_length = Module["_olm_pickle_account_length"] = createExportWrapper("olm_pickle_account_length", 1);

var _olm_pickle_session_length = Module["_olm_pickle_session_length"] = createExportWrapper("olm_pickle_session_length", 1);

var _olm_pickle_account = Module["_olm_pickle_account"] = createExportWrapper("olm_pickle_account", 5);

var _olm_pickle_session = Module["_olm_pickle_session"] = createExportWrapper("olm_pickle_session", 5);

var _olm_unpickle_account = Module["_olm_unpickle_account"] = createExportWrapper("olm_unpickle_account", 5);

var _olm_unpickle_session = Module["_olm_unpickle_session"] = createExportWrapper("olm_unpickle_session", 5);

var _olm_create_account_random_length = Module["_olm_create_account_random_length"] = createExportWrapper("olm_create_account_random_length", 1);

var _olm_create_account = Module["_olm_create_account"] = createExportWrapper("olm_create_account", 3);

var _olm_account_identity_keys_length = Module["_olm_account_identity_keys_length"] = createExportWrapper("olm_account_identity_keys_length", 1);

var _olm_account_identity_keys = Module["_olm_account_identity_keys"] = createExportWrapper("olm_account_identity_keys", 3);

var _olm_account_signature_length = Module["_olm_account_signature_length"] = createExportWrapper("olm_account_signature_length", 1);

var _olm_account_sign = Module["_olm_account_sign"] = createExportWrapper("olm_account_sign", 5);

var _olm_account_one_time_keys_length = Module["_olm_account_one_time_keys_length"] = createExportWrapper("olm_account_one_time_keys_length", 1);

var _olm_account_one_time_keys = Module["_olm_account_one_time_keys"] = createExportWrapper("olm_account_one_time_keys", 3);

var _olm_account_mark_keys_as_published = Module["_olm_account_mark_keys_as_published"] = createExportWrapper("olm_account_mark_keys_as_published", 1);

var _olm_account_max_number_of_one_time_keys = Module["_olm_account_max_number_of_one_time_keys"] = createExportWrapper("olm_account_max_number_of_one_time_keys", 1);

var _olm_account_generate_one_time_keys_random_length = Module["_olm_account_generate_one_time_keys_random_length"] = createExportWrapper("olm_account_generate_one_time_keys_random_length", 2);

var _olm_account_generate_one_time_keys = Module["_olm_account_generate_one_time_keys"] = createExportWrapper("olm_account_generate_one_time_keys", 4);

var _olm_account_generate_fallback_key_random_length = Module["_olm_account_generate_fallback_key_random_length"] = createExportWrapper("olm_account_generate_fallback_key_random_length", 1);

var _olm_account_generate_fallback_key = Module["_olm_account_generate_fallback_key"] = createExportWrapper("olm_account_generate_fallback_key", 3);

var _olm_account_fallback_key_length = Module["_olm_account_fallback_key_length"] = createExportWrapper("olm_account_fallback_key_length", 1);

var _olm_account_fallback_key = Module["_olm_account_fallback_key"] = createExportWrapper("olm_account_fallback_key", 3);

var _olm_account_unpublished_fallback_key_length = Module["_olm_account_unpublished_fallback_key_length"] = createExportWrapper("olm_account_unpublished_fallback_key_length", 1);

var _olm_account_unpublished_fallback_key = Module["_olm_account_unpublished_fallback_key"] = createExportWrapper("olm_account_unpublished_fallback_key", 3);

var _olm_account_forget_old_fallback_key = Module["_olm_account_forget_old_fallback_key"] = createExportWrapper("olm_account_forget_old_fallback_key", 1);

var _olm_create_outbound_session_random_length = Module["_olm_create_outbound_session_random_length"] = createExportWrapper("olm_create_outbound_session_random_length", 1);

var _olm_create_outbound_session = Module["_olm_create_outbound_session"] = createExportWrapper("olm_create_outbound_session", 8);

var _olm_create_inbound_session = Module["_olm_create_inbound_session"] = createExportWrapper("olm_create_inbound_session", 4);

var _olm_create_inbound_session_from = Module["_olm_create_inbound_session_from"] = createExportWrapper("olm_create_inbound_session_from", 6);

var _olm_session_id_length = Module["_olm_session_id_length"] = createExportWrapper("olm_session_id_length", 1);

var _olm_session_id = Module["_olm_session_id"] = createExportWrapper("olm_session_id", 3);

var _olm_session_has_received_message = Module["_olm_session_has_received_message"] = createExportWrapper("olm_session_has_received_message", 1);

var _olm_session_describe = Module["_olm_session_describe"] = createExportWrapper("olm_session_describe", 3);

var _olm_matches_inbound_session = Module["_olm_matches_inbound_session"] = createExportWrapper("olm_matches_inbound_session", 3);

var _olm_matches_inbound_session_from = Module["_olm_matches_inbound_session_from"] = createExportWrapper("olm_matches_inbound_session_from", 5);

var _olm_remove_one_time_keys = Module["_olm_remove_one_time_keys"] = createExportWrapper("olm_remove_one_time_keys", 2);

var _olm_encrypt_message_type = Module["_olm_encrypt_message_type"] = createExportWrapper("olm_encrypt_message_type", 1);

var _olm_encrypt_random_length = Module["_olm_encrypt_random_length"] = createExportWrapper("olm_encrypt_random_length", 1);

var _olm_encrypt_message_length = Module["_olm_encrypt_message_length"] = createExportWrapper("olm_encrypt_message_length", 2);

var _olm_encrypt = Module["_olm_encrypt"] = createExportWrapper("olm_encrypt", 7);

var _olm_decrypt_max_plaintext_length = Module["_olm_decrypt_max_plaintext_length"] = createExportWrapper("olm_decrypt_max_plaintext_length", 4);

var _olm_decrypt = Module["_olm_decrypt"] = createExportWrapper("olm_decrypt", 6);

var _olm_sha256_length = Module["_olm_sha256_length"] = createExportWrapper("olm_sha256_length", 1);

var _olm_sha256 = Module["_olm_sha256"] = createExportWrapper("olm_sha256", 5);

var _olm_ed25519_verify = Module["_olm_ed25519_verify"] = createExportWrapper("olm_ed25519_verify", 7);

var _olm_pk_encryption_last_error = Module["_olm_pk_encryption_last_error"] = createExportWrapper("olm_pk_encryption_last_error", 1);

var _olm_pk_encryption_last_error_code = Module["_olm_pk_encryption_last_error_code"] = createExportWrapper("olm_pk_encryption_last_error_code", 1);

var _olm_pk_encryption_size = Module["_olm_pk_encryption_size"] = createExportWrapper("olm_pk_encryption_size", 0);

var _olm_pk_encryption = Module["_olm_pk_encryption"] = createExportWrapper("olm_pk_encryption", 1);

var _olm_clear_pk_encryption = Module["_olm_clear_pk_encryption"] = createExportWrapper("olm_clear_pk_encryption", 1);

var _olm_pk_encryption_set_recipient_key = Module["_olm_pk_encryption_set_recipient_key"] = createExportWrapper("olm_pk_encryption_set_recipient_key", 3);

var _olm_pk_key_length = Module["_olm_pk_key_length"] = createExportWrapper("olm_pk_key_length", 0);

var _olm_pk_ciphertext_length = Module["_olm_pk_ciphertext_length"] = createExportWrapper("olm_pk_ciphertext_length", 2);

var _olm_pk_mac_length = Module["_olm_pk_mac_length"] = createExportWrapper("olm_pk_mac_length", 1);

var _olm_pk_encrypt_random_length = Module["_olm_pk_encrypt_random_length"] = createExportWrapper("olm_pk_encrypt_random_length", 1);

var _olm_pk_encrypt = Module["_olm_pk_encrypt"] = createExportWrapper("olm_pk_encrypt", 11);

var _olm_pk_decryption_last_error = Module["_olm_pk_decryption_last_error"] = createExportWrapper("olm_pk_decryption_last_error", 1);

var _olm_pk_decryption_last_error_code = Module["_olm_pk_decryption_last_error_code"] = createExportWrapper("olm_pk_decryption_last_error_code", 1);

var _olm_pk_decryption_size = Module["_olm_pk_decryption_size"] = createExportWrapper("olm_pk_decryption_size", 0);

var _olm_pk_decryption = Module["_olm_pk_decryption"] = createExportWrapper("olm_pk_decryption", 1);

var _olm_clear_pk_decryption = Module["_olm_clear_pk_decryption"] = createExportWrapper("olm_clear_pk_decryption", 1);

var _olm_pk_private_key_length = Module["_olm_pk_private_key_length"] = createExportWrapper("olm_pk_private_key_length", 0);

var _olm_pk_generate_key_random_length = Module["_olm_pk_generate_key_random_length"] = createExportWrapper("olm_pk_generate_key_random_length", 0);

var _olm_pk_key_from_private = Module["_olm_pk_key_from_private"] = createExportWrapper("olm_pk_key_from_private", 5);

var _olm_pk_generate_key = Module["_olm_pk_generate_key"] = createExportWrapper("olm_pk_generate_key", 5);

var _olm_pickle_pk_decryption_length = Module["_olm_pickle_pk_decryption_length"] = createExportWrapper("olm_pickle_pk_decryption_length", 1);

var _olm_pickle_pk_decryption = Module["_olm_pickle_pk_decryption"] = createExportWrapper("olm_pickle_pk_decryption", 5);

var _olm_unpickle_pk_decryption = Module["_olm_unpickle_pk_decryption"] = createExportWrapper("olm_unpickle_pk_decryption", 7);

var _olm_pk_max_plaintext_length = Module["_olm_pk_max_plaintext_length"] = createExportWrapper("olm_pk_max_plaintext_length", 2);

var _olm_pk_decrypt = Module["_olm_pk_decrypt"] = createExportWrapper("olm_pk_decrypt", 9);

var _olm_pk_get_private_key = Module["_olm_pk_get_private_key"] = createExportWrapper("olm_pk_get_private_key", 3);

var _olm_pk_signing_size = Module["_olm_pk_signing_size"] = createExportWrapper("olm_pk_signing_size", 0);

var _olm_pk_signing = Module["_olm_pk_signing"] = createExportWrapper("olm_pk_signing", 1);

var _olm_pk_signing_last_error = Module["_olm_pk_signing_last_error"] = createExportWrapper("olm_pk_signing_last_error", 1);

var _olm_pk_signing_last_error_code = Module["_olm_pk_signing_last_error_code"] = createExportWrapper("olm_pk_signing_last_error_code", 1);

var _olm_clear_pk_signing = Module["_olm_clear_pk_signing"] = createExportWrapper("olm_clear_pk_signing", 1);

var _olm_pk_signing_seed_length = Module["_olm_pk_signing_seed_length"] = createExportWrapper("olm_pk_signing_seed_length", 0);

var _olm_pk_signing_public_key_length = Module["_olm_pk_signing_public_key_length"] = createExportWrapper("olm_pk_signing_public_key_length", 0);

var _olm_pk_signing_key_from_seed = Module["_olm_pk_signing_key_from_seed"] = createExportWrapper("olm_pk_signing_key_from_seed", 5);

var _olm_pk_signature_length = Module["_olm_pk_signature_length"] = createExportWrapper("olm_pk_signature_length", 0);

var _olm_pk_sign = Module["_olm_pk_sign"] = createExportWrapper("olm_pk_sign", 5);

var _olm_inbound_group_session_size = Module["_olm_inbound_group_session_size"] = createExportWrapper("olm_inbound_group_session_size", 0);

var _olm_inbound_group_session = Module["_olm_inbound_group_session"] = createExportWrapper("olm_inbound_group_session", 1);

var _olm_clear_inbound_group_session = Module["_olm_clear_inbound_group_session"] = createExportWrapper("olm_clear_inbound_group_session", 1);

var _olm_inbound_group_session_last_error = Module["_olm_inbound_group_session_last_error"] = createExportWrapper("olm_inbound_group_session_last_error", 1);

var _olm_inbound_group_session_last_error_code = Module["_olm_inbound_group_session_last_error_code"] = createExportWrapper("olm_inbound_group_session_last_error_code", 1);

var _olm_init_inbound_group_session = Module["_olm_init_inbound_group_session"] = createExportWrapper("olm_init_inbound_group_session", 3);

var _olm_import_inbound_group_session = Module["_olm_import_inbound_group_session"] = createExportWrapper("olm_import_inbound_group_session", 3);

var _olm_pickle_inbound_group_session_length = Module["_olm_pickle_inbound_group_session_length"] = createExportWrapper("olm_pickle_inbound_group_session_length", 1);

var _olm_pickle_inbound_group_session = Module["_olm_pickle_inbound_group_session"] = createExportWrapper("olm_pickle_inbound_group_session", 5);

var _olm_unpickle_inbound_group_session = Module["_olm_unpickle_inbound_group_session"] = createExportWrapper("olm_unpickle_inbound_group_session", 5);

var _olm_group_decrypt_max_plaintext_length = Module["_olm_group_decrypt_max_plaintext_length"] = createExportWrapper("olm_group_decrypt_max_plaintext_length", 3);

var _olm_group_decrypt = Module["_olm_group_decrypt"] = createExportWrapper("olm_group_decrypt", 6);

var _olm_inbound_group_session_id_length = Module["_olm_inbound_group_session_id_length"] = createExportWrapper("olm_inbound_group_session_id_length", 1);

var _olm_inbound_group_session_id = Module["_olm_inbound_group_session_id"] = createExportWrapper("olm_inbound_group_session_id", 3);

var _olm_inbound_group_session_first_known_index = Module["_olm_inbound_group_session_first_known_index"] = createExportWrapper("olm_inbound_group_session_first_known_index", 1);

var _olm_inbound_group_session_is_verified = Module["_olm_inbound_group_session_is_verified"] = createExportWrapper("olm_inbound_group_session_is_verified", 1);

var _olm_export_inbound_group_session_length = Module["_olm_export_inbound_group_session_length"] = createExportWrapper("olm_export_inbound_group_session_length", 1);

var _olm_export_inbound_group_session = Module["_olm_export_inbound_group_session"] = createExportWrapper("olm_export_inbound_group_session", 4);

var _olm_outbound_group_session_size = Module["_olm_outbound_group_session_size"] = createExportWrapper("olm_outbound_group_session_size", 0);

var _olm_outbound_group_session = Module["_olm_outbound_group_session"] = createExportWrapper("olm_outbound_group_session", 1);

var _olm_clear_outbound_group_session = Module["_olm_clear_outbound_group_session"] = createExportWrapper("olm_clear_outbound_group_session", 1);

var _olm_outbound_group_session_last_error = Module["_olm_outbound_group_session_last_error"] = createExportWrapper("olm_outbound_group_session_last_error", 1);

var _olm_outbound_group_session_last_error_code = Module["_olm_outbound_group_session_last_error_code"] = createExportWrapper("olm_outbound_group_session_last_error_code", 1);

var _olm_pickle_outbound_group_session_length = Module["_olm_pickle_outbound_group_session_length"] = createExportWrapper("olm_pickle_outbound_group_session_length", 1);

var _olm_pickle_outbound_group_session = Module["_olm_pickle_outbound_group_session"] = createExportWrapper("olm_pickle_outbound_group_session", 5);

var _olm_unpickle_outbound_group_session = Module["_olm_unpickle_outbound_group_session"] = createExportWrapper("olm_unpickle_outbound_group_session", 5);

var _olm_init_outbound_group_session_random_length = Module["_olm_init_outbound_group_session_random_length"] = createExportWrapper("olm_init_outbound_group_session_random_length", 1);

var _olm_init_outbound_group_session = Module["_olm_init_outbound_group_session"] = createExportWrapper("olm_init_outbound_group_session", 3);

var _olm_group_encrypt_message_length = Module["_olm_group_encrypt_message_length"] = createExportWrapper("olm_group_encrypt_message_length", 2);

var _olm_group_encrypt = Module["_olm_group_encrypt"] = createExportWrapper("olm_group_encrypt", 5);

var _olm_outbound_group_session_id_length = Module["_olm_outbound_group_session_id_length"] = createExportWrapper("olm_outbound_group_session_id_length", 1);

var _olm_outbound_group_session_id = Module["_olm_outbound_group_session_id"] = createExportWrapper("olm_outbound_group_session_id", 3);

var _olm_outbound_group_session_message_index = Module["_olm_outbound_group_session_message_index"] = createExportWrapper("olm_outbound_group_session_message_index", 1);

var _olm_outbound_group_session_key_length = Module["_olm_outbound_group_session_key_length"] = createExportWrapper("olm_outbound_group_session_key_length", 1);

var _olm_outbound_group_session_key = Module["_olm_outbound_group_session_key"] = createExportWrapper("olm_outbound_group_session_key", 3);

var _olm_sas_last_error = Module["_olm_sas_last_error"] = createExportWrapper("olm_sas_last_error", 1);

var _olm_sas_last_error_code = Module["_olm_sas_last_error_code"] = createExportWrapper("olm_sas_last_error_code", 1);

var _olm_sas_size = Module["_olm_sas_size"] = createExportWrapper("olm_sas_size", 0);

var _olm_sas = Module["_olm_sas"] = createExportWrapper("olm_sas", 1);

var _olm_clear_sas = Module["_olm_clear_sas"] = createExportWrapper("olm_clear_sas", 1);

var _olm_create_sas_random_length = Module["_olm_create_sas_random_length"] = createExportWrapper("olm_create_sas_random_length", 1);

var _olm_create_sas = Module["_olm_create_sas"] = createExportWrapper("olm_create_sas", 3);

var _olm_sas_pubkey_length = Module["_olm_sas_pubkey_length"] = createExportWrapper("olm_sas_pubkey_length", 1);

var _olm_sas_get_pubkey = Module["_olm_sas_get_pubkey"] = createExportWrapper("olm_sas_get_pubkey", 3);

var _olm_sas_set_their_key = Module["_olm_sas_set_their_key"] = createExportWrapper("olm_sas_set_their_key", 3);

var _olm_sas_is_their_key_set = Module["_olm_sas_is_their_key_set"] = createExportWrapper("olm_sas_is_their_key_set", 1);

var _olm_sas_generate_bytes = Module["_olm_sas_generate_bytes"] = createExportWrapper("olm_sas_generate_bytes", 5);

var _olm_sas_mac_length = Module["_olm_sas_mac_length"] = createExportWrapper("olm_sas_mac_length", 1);

var _olm_sas_calculate_mac_fixed_base64 = Module["_olm_sas_calculate_mac_fixed_base64"] = createExportWrapper("olm_sas_calculate_mac_fixed_base64", 7);

var _olm_sas_calculate_mac = Module["_olm_sas_calculate_mac"] = createExportWrapper("olm_sas_calculate_mac", 7);

var _olm_sas_calculate_mac_long_kdf = Module["_olm_sas_calculate_mac_long_kdf"] = createExportWrapper("olm_sas_calculate_mac_long_kdf", 7);

var _malloc = Module["_malloc"] = createExportWrapper("malloc", 1);

var _free = Module["_free"] = createExportWrapper("free", 1);

var _fflush = createExportWrapper("fflush", 1);

var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();

var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();

var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();

var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();

var __emscripten_stack_restore = a0 => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);

var __emscripten_stack_alloc = a0 => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);

var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();

// include: postamble.js
// === Auto-generated postamble setup entry stuff ===
Module["UTF8ToString"] = UTF8ToString;

Module["stringToUTF8"] = stringToUTF8;

Module["intArrayFromString"] = intArrayFromString;

Module["stringToAscii"] = stringToAscii;

Module["ALLOC_STACK"] = ALLOC_STACK;

var missingLibrarySymbols = [ "writeI53ToI64", "writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "readI53FromI64", "readI53FromU64", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "stackAlloc", "getTempRet0", "setTempRet0", "zeroMemory", "exitJS", "growMemory", "strError", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "emscriptenLog", "readEmAsmArgs", "jstoi_q", "getExecutableName", "listenOnce", "autoResumeAudioContext", "dynCallLegacy", "getDynCaller", "dynCall", "handleException", "keepRuntimeAlive", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "asmjsMangle", "asyncLoad", "mmapAlloc", "HandleAllocator", "getNativeTypeSize", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayToString", "AsciiToString", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "stringToNewUTF8", "stringToUTF8OnStack", "writeArrayToMemory", "registerKeyEventCallback", "maybeCStringToJsString", "findEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "hideEverythingExceptGivenElement", "restoreHiddenElements", "setLetterbox", "softFullscreenResizeWebGLRenderTarget", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "registerPointerlockErrorEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "setCanvasElementSize", "getCanvasElementSize", "jsStackTrace", "getCallstack", "convertPCtoSourceLocation", "getEnvStrings", "checkWasiClock", "flush_NO_FILESYSTEM", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "initRandomFill", "randomFill", "safeSetTimeout", "setImmediateWrapped", "safeRequestAnimationFrame", "clearImmediateWrapped", "polyfillSetImmediate", "registerPostMainLoop", "registerPreMainLoop", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "ExceptionInfo", "findMatchingCatch", "Browser_asyncPrepareDataCounter", "isLeapYear", "ydayFromDate", "arraySum", "addDays", "getSocketFromFD", "getSocketAddress", "heapObjectForWebGLType", "toTypedArrayIndex", "webgl_enable_ANGLE_instanced_arrays", "webgl_enable_OES_vertex_array_object", "webgl_enable_WEBGL_draw_buffers", "webgl_enable_WEBGL_multi_draw", "webgl_enable_EXT_polygon_offset_clamp", "webgl_enable_EXT_clip_control", "webgl_enable_WEBGL_polygon_mode", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "writeGLArray", "registerWebGlEventCallback", "runAndAbortIfError", "ALLOC_NORMAL", "allocate", "writeStringToMemory", "writeAsciiToMemory", "setErrNo", "demangle", "stackTrace" ];

missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [ "run", "addOnPreRun", "addOnInit", "addOnPreMain", "addOnExit", "addOnPostRun", "addRunDependency", "removeRunDependency", "out", "err", "callMain", "abort", "wasmMemory", "wasmExports", "writeStackCookie", "checkStackCookie", "stackSave", "stackRestore", "ptrToString", "getHeapMax", "abortOnCannotGrowMemory", "ENV", "ERRNO_CODES", "DNS", "Protocols", "Sockets", "timers", "warnOnce", "readEmAsmArgsArray", "jstoi_s", "alignMemory", "wasmTable", "noExitRuntime", "freeTableIndexes", "functionsInTableMap", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "stringToUTF8Array", "lengthBytesUTF8", "UTF16Decoder", "JSEvents", "specialHTMLTargets", "findCanvasEventTarget", "currentFullscreenStrategy", "restoreOldWindowedStyle", "UNWIND_CACHE", "ExitStatus", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "Browser", "getPreloadedImageData__data", "wget", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "SYSCALLS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "GL", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "SDL", "SDL_gfx", "allocateUTF8", "allocateUTF8OnStack", "print", "printErr" ];

unexportedSymbols.forEach(unexportedRuntimeSymbol);

var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller;
};

// try this again later, after new deps are fulfilled
function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {
  if (runDependencies > 0) {
    return;
  }
  stackCheckInit();
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
    assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
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
  checkStackCookie();
}

if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}

run();

// end include: postamble.js
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_outbound_group_session.js
/** @constructor */ function OutboundGroupSession() {
  var size = Module["_olm_outbound_group_session_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_outbound_group_session"](this.buf);
}

function outbound_group_session_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_outbound_group_session_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

OutboundGroupSession.prototype["free"] = function() {
  Module["_olm_clear_outbound_group_session"](this.ptr);
  free(this.ptr);
};

OutboundGroupSession.prototype["pickle"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var pickle_length = outbound_group_session_method(Module["_olm_pickle_outbound_group_session_length"])(this.ptr);
  var key_buffer = stack(key_array);
  var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
  try {
    outbound_group_session_method(Module["_olm_pickle_outbound_group_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(pickle_buffer, pickle_length);
});

OutboundGroupSession.prototype["unpickle"] = restore_stack(function(key, pickle) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var pickle_array = array_from_string(pickle);
  var pickle_buffer = stack(pickle_array);
  try {
    outbound_group_session_method(Module["_olm_unpickle_outbound_group_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_array.length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

OutboundGroupSession.prototype["create"] = restore_stack(function() {
  var random_length = outbound_group_session_method(Module["_olm_init_outbound_group_session_random_length"])(this.ptr);
  var random = random_stack(random_length);
  try {
    outbound_group_session_method(Module["_olm_init_outbound_group_session"])(this.ptr, random, random_length);
  } finally {
    // clear the random buffer
    bzero(random, random_length);
  }
});

OutboundGroupSession.prototype["encrypt"] = function(plaintext) {
  var plaintext_buffer, message_buffer, plaintext_length;
  try {
    plaintext_length = lengthBytesUTF8(plaintext);
    var message_length = outbound_group_session_method(Module["_olm_group_encrypt_message_length"])(this.ptr, plaintext_length);
    // need to allow space for the terminator (which stringToUTF8 always
    // writes), hence + 1.
    plaintext_buffer = malloc(plaintext_length + 1);
    stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
    message_buffer = malloc(message_length + NULL_BYTE_PADDING_LENGTH);
    outbound_group_session_method(Module["_olm_group_encrypt"])(this.ptr, plaintext_buffer, plaintext_length, message_buffer, message_length);
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

OutboundGroupSession.prototype["session_id"] = restore_stack(function() {
  var length = outbound_group_session_method(Module["_olm_outbound_group_session_id_length"])(this.ptr);
  var session_id = stack(length + NULL_BYTE_PADDING_LENGTH);
  outbound_group_session_method(Module["_olm_outbound_group_session_id"])(this.ptr, session_id, length);
  return UTF8ToString(session_id, length);
});

OutboundGroupSession.prototype["session_key"] = restore_stack(function() {
  var key_length = outbound_group_session_method(Module["_olm_outbound_group_session_key_length"])(this.ptr);
  var key = stack(key_length + NULL_BYTE_PADDING_LENGTH);
  outbound_group_session_method(Module["_olm_outbound_group_session_key"])(this.ptr, key, key_length);
  var key_str = UTF8ToString(key, key_length);
  bzero(key, key_length);
  // clear out our copy of the key
  return key_str;
});

OutboundGroupSession.prototype["message_index"] = function() {
  var idx = outbound_group_session_method(Module["_olm_outbound_group_session_message_index"])(this.ptr);
  return idx;
};

Module["OutboundGroupSession"] = OutboundGroupSession;

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_outbound_group_session.js
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_inbound_group_session.js
/** @constructor */ function InboundGroupSession() {
  var size = Module["_olm_inbound_group_session_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_inbound_group_session"](this.buf);
}

function inbound_group_session_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_inbound_group_session_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

InboundGroupSession.prototype["free"] = function() {
  Module["_olm_clear_inbound_group_session"](this.ptr);
  free(this.ptr);
};

InboundGroupSession.prototype["pickle"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var pickle_length = inbound_group_session_method(Module["_olm_pickle_inbound_group_session_length"])(this.ptr);
  var key_buffer = stack(key_array);
  var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
  try {
    inbound_group_session_method(Module["_olm_pickle_inbound_group_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(pickle_buffer, pickle_length);
});

InboundGroupSession.prototype["unpickle"] = restore_stack(function(key, pickle) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var pickle_array = array_from_string(pickle);
  var pickle_buffer = stack(pickle_array);
  try {
    inbound_group_session_method(Module["_olm_unpickle_inbound_group_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_array.length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

InboundGroupSession.prototype["create"] = restore_stack(function(session_key) {
  var key_array = array_from_string(session_key);
  var key_buffer = stack(key_array);
  try {
    inbound_group_session_method(Module["_olm_init_inbound_group_session"])(this.ptr, key_buffer, key_array.length);
  } finally {
    // clear out copies of the key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

InboundGroupSession.prototype["import_session"] = restore_stack(function(session_key) {
  var key_array = array_from_string(session_key);
  var key_buffer = stack(key_array);
  try {
    inbound_group_session_method(Module["_olm_import_inbound_group_session"])(this.ptr, key_buffer, key_array.length);
  } finally {
    // clear out copies of the key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

InboundGroupSession.prototype["decrypt"] = restore_stack(function(message) {
  var message_buffer, plaintext_buffer, plaintext_length;
  try {
    message_buffer = malloc(message.length);
    stringToAscii(message, message_buffer, true);
    var max_plaintext_length = inbound_group_session_method(Module["_olm_group_decrypt_max_plaintext_length"])(this.ptr, message_buffer, message.length);
    // caculating the length destroys the input buffer, so we need to re-copy it.
    stringToAscii(message, message_buffer, true);
    plaintext_buffer = malloc(max_plaintext_length + NULL_BYTE_PADDING_LENGTH);
    var message_index = stack(4);
    plaintext_length = inbound_group_session_method(Module["_olm_group_decrypt"])(this.ptr, message_buffer, message.length, plaintext_buffer, max_plaintext_length, message_index);
    // UTF8ToString requires a null-terminated argument, so add the
    // null terminator.
    setValue(plaintext_buffer + plaintext_length, 0, "i8");
    return {
      plaintext: UTF8ToString(plaintext_buffer, plaintext_length),
      message_index: getValue(message_index, "i32")
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

InboundGroupSession.prototype["session_id"] = restore_stack(function() {
  var length = inbound_group_session_method(Module["_olm_inbound_group_session_id_length"])(this.ptr);
  var session_id = stack(length + NULL_BYTE_PADDING_LENGTH);
  inbound_group_session_method(Module["_olm_inbound_group_session_id"])(this.ptr, session_id, length);
  return UTF8ToString(session_id, length);
});

InboundGroupSession.prototype["first_known_index"] = restore_stack(function() {
  return inbound_group_session_method(Module["_olm_inbound_group_session_first_known_index"])(this.ptr);
});

InboundGroupSession.prototype["export_session"] = restore_stack(function(message_index) {
  var key_length = inbound_group_session_method(Module["_olm_export_inbound_group_session_length"])(this.ptr);
  var key = stack(key_length + NULL_BYTE_PADDING_LENGTH);
  outbound_group_session_method(Module["_olm_export_inbound_group_session"])(this.ptr, key, key_length, message_index);
  var key_str = UTF8ToString(key, key_length);
  bzero(key, key_length);
  // clear out a copy of the key
  return key_str;
});

Module["InboundGroupSession"] = InboundGroupSession;

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_inbound_group_session.js
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_pk.js
/** @constructor */ function PkEncryption() {
  var size = Module["_olm_pk_encryption_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_pk_encryption"](this.buf);
}

function pk_encryption_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_pk_encryption_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

PkEncryption.prototype["free"] = function() {
  Module["_olm_clear_pk_encryption"](this.ptr);
  free(this.ptr);
};

PkEncryption.prototype["set_recipient_key"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  pk_encryption_method(Module["_olm_pk_encryption_set_recipient_key"])(this.ptr, key_buffer, key_array.length);
});

PkEncryption.prototype["encrypt"] = restore_stack(function(plaintext) {
  var plaintext_buffer, ciphertext_buffer, plaintext_length, random, random_length;
  try {
    plaintext_length = lengthBytesUTF8(plaintext);
    plaintext_buffer = malloc(plaintext_length + 1);
    stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
    random_length = pk_encryption_method(Module["_olm_pk_encrypt_random_length"])();
    random = random_stack(random_length);
    var ciphertext_length = pk_encryption_method(Module["_olm_pk_ciphertext_length"])(this.ptr, plaintext_length);
    ciphertext_buffer = malloc(ciphertext_length + NULL_BYTE_PADDING_LENGTH);
    var mac_length = pk_encryption_method(Module["_olm_pk_mac_length"])(this.ptr);
    var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
    setValue(mac_buffer + mac_length, 0, "i8");
    var ephemeral_length = pk_encryption_method(Module["_olm_pk_key_length"])();
    var ephemeral_buffer = stack(ephemeral_length + NULL_BYTE_PADDING_LENGTH);
    setValue(ephemeral_buffer + ephemeral_length, 0, "i8");
    pk_encryption_method(Module["_olm_pk_encrypt"])(this.ptr, plaintext_buffer, plaintext_length, ciphertext_buffer, ciphertext_length, mac_buffer, mac_length, ephemeral_buffer, ephemeral_length, random, random_length);
    // UTF8ToString requires a null-terminated argument, so add the
    // null terminator.
    setValue(ciphertext_buffer + ciphertext_length, 0, "i8");
    return {
      "ciphertext": UTF8ToString(ciphertext_buffer, ciphertext_length),
      "mac": UTF8ToString(mac_buffer, mac_length),
      "ephemeral": UTF8ToString(ephemeral_buffer, ephemeral_length)
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
  var size = Module["_olm_pk_decryption_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_pk_decryption"](this.buf);
}

function pk_decryption_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_pk_decryption_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

PkDecryption.prototype["free"] = function() {
  Module["_olm_clear_pk_decryption"](this.ptr);
  free(this.ptr);
};

PkDecryption.prototype["init_with_private_key"] = restore_stack(function(private_key) {
  var private_key_buffer = stack(private_key.length);
  Module["HEAPU8"].set(private_key, private_key_buffer);
  var pubkey_length = pk_decryption_method(Module["_olm_pk_key_length"])();
  var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
  try {
    pk_decryption_method(Module["_olm_pk_key_from_private"])(this.ptr, pubkey_buffer, pubkey_length, private_key_buffer, private_key.length);
  } finally {
    // clear out our copy of the private key
    bzero(private_key_buffer, private_key.length);
  }
  return UTF8ToString(pubkey_buffer, pubkey_length);
});

PkDecryption.prototype["generate_key"] = restore_stack(function() {
  var random_length = pk_decryption_method(Module["_olm_pk_private_key_length"])();
  var random_buffer = random_stack(random_length);
  var pubkey_length = pk_decryption_method(Module["_olm_pk_key_length"])();
  var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
  try {
    pk_decryption_method(Module["_olm_pk_key_from_private"])(this.ptr, pubkey_buffer, pubkey_length, random_buffer, random_length);
  } finally {
    // clear out the random buffer (= private key)
    bzero(random_buffer, random_length);
  }
  return UTF8ToString(pubkey_buffer, pubkey_length);
});

PkDecryption.prototype["get_private_key"] = restore_stack(function() {
  var privkey_length = pk_encryption_method(Module["_olm_pk_private_key_length"])();
  var privkey_buffer = stack(privkey_length);
  pk_decryption_method(Module["_olm_pk_get_private_key"])(this.ptr, privkey_buffer, privkey_length);
  // The inner Uint8Array creates a view of the buffer.  The outer Uint8Array
  // copies it to a new array to return, since the original buffer will get
  // deallocated from the stack and could get overwritten.
  var key_arr = new Uint8Array(new Uint8Array(Module["HEAPU8"].buffer, privkey_buffer, privkey_length));
  bzero(privkey_buffer, privkey_length);
  // clear out our copy of the key
  return key_arr;
});

PkDecryption.prototype["pickle"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var pickle_length = pk_decryption_method(Module["_olm_pickle_pk_decryption_length"])(this.ptr);
  var key_buffer = stack(key_array);
  var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
  try {
    pk_decryption_method(Module["_olm_pickle_pk_decryption"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(pickle_buffer, pickle_length);
});

PkDecryption.prototype["unpickle"] = restore_stack(function(key, pickle) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var pickle_array = array_from_string(pickle);
  var pickle_buffer = stack(pickle_array);
  var ephemeral_length = pk_decryption_method(Module["_olm_pk_key_length"])();
  var ephemeral_buffer = stack(ephemeral_length + NULL_BYTE_PADDING_LENGTH);
  try {
    pk_decryption_method(Module["_olm_unpickle_pk_decryption"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_array.length, ephemeral_buffer, ephemeral_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(ephemeral_buffer, ephemeral_length);
});

PkDecryption.prototype["decrypt"] = restore_stack(function(ephemeral_key, mac, ciphertext) {
  var plaintext_buffer, ciphertext_buffer, plaintext_max_length;
  try {
    var ciphertext_length = lengthBytesUTF8(ciphertext);
    ciphertext_buffer = malloc(ciphertext_length + 1);
    stringToUTF8(ciphertext, ciphertext_buffer, ciphertext_length + 1);
    var ephemeralkey_array = array_from_string(ephemeral_key);
    var ephemeralkey_buffer = stack(ephemeralkey_array);
    var mac_array = array_from_string(mac);
    var mac_buffer = stack(mac_array);
    plaintext_max_length = pk_decryption_method(Module["_olm_pk_max_plaintext_length"])(this.ptr, ciphertext_length);
    plaintext_buffer = malloc(plaintext_max_length + NULL_BYTE_PADDING_LENGTH);
    var plaintext_length = pk_decryption_method(Module["_olm_pk_decrypt"])(this.ptr, ephemeralkey_buffer, ephemeralkey_array.length, mac_buffer, mac_array.length, ciphertext_buffer, ciphertext_length, plaintext_buffer, plaintext_max_length);
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
  var size = Module["_olm_pk_signing_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_pk_signing"](this.buf);
}

function pk_signing_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_pk_signing_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

PkSigning.prototype["free"] = function() {
  Module["_olm_clear_pk_signing"](this.ptr);
  free(this.ptr);
};

PkSigning.prototype["init_with_seed"] = restore_stack(function(seed) {
  var seed_buffer = stack(seed.length);
  Module["HEAPU8"].set(seed, seed_buffer);
  var pubkey_length = pk_signing_method(Module["_olm_pk_signing_public_key_length"])();
  var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
  try {
    pk_signing_method(Module["_olm_pk_signing_key_from_seed"])(this.ptr, pubkey_buffer, pubkey_length, seed_buffer, seed.length);
  } finally {
    // clear out our copy of the seed
    bzero(seed_buffer, seed.length);
  }
  return UTF8ToString(pubkey_buffer, pubkey_length);
});

PkSigning.prototype["generate_seed"] = restore_stack(function() {
  var random_length = pk_signing_method(Module["_olm_pk_signing_seed_length"])();
  var random_buffer = random_stack(random_length);
  var key_arr = new Uint8Array(new Uint8Array(Module["HEAPU8"].buffer, random_buffer, random_length));
  bzero(random_buffer, random_length);
  return key_arr;
});

PkSigning.prototype["sign"] = restore_stack(function(message) {
  // XXX: Should be able to sign any bytes rather than just strings,
  // but this is consistent with encrypt for now.
  //var message_buffer = stack(message.length);
  //Module['HEAPU8'].set(message, message_buffer);
  var message_buffer, message_length;
  try {
    message_length = lengthBytesUTF8(message);
    message_buffer = malloc(message_length + 1);
    stringToUTF8(message, message_buffer, message_length + 1);
    var sig_length = pk_signing_method(Module["_olm_pk_signature_length"])();
    var sig_buffer = stack(sig_length + NULL_BYTE_PADDING_LENGTH);
    pk_signing_method(Module["_olm_pk_sign"])(this.ptr, message_buffer, message_length, sig_buffer, sig_length);
    return UTF8ToString(sig_buffer, sig_length);
  } finally {
    if (message_buffer !== undefined) {
      // don't leave a copy of the plaintext in the heap.
      bzero(message_buffer, message_length + 1);
      free(message_buffer);
    }
  }
});

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_pk.js
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_sas.js
/** @constructor */ function SAS() {
  var size = Module["_olm_sas_size"]();
  var random_length = Module["_olm_create_sas_random_length"]();
  var random = random_stack(random_length);
  this.buf = malloc(size);
  this.ptr = Module["_olm_sas"](this.buf);
  Module["_olm_create_sas"](this.ptr, random, random_length);
  bzero(random, random_length);
}

function sas_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_sas_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

SAS.prototype["free"] = function() {
  Module["_olm_clear_sas"](this.ptr);
  free(this.ptr);
};

SAS.prototype["get_pubkey"] = restore_stack(function() {
  var pubkey_length = sas_method(Module["_olm_sas_pubkey_length"])(this.ptr);
  var pubkey_buffer = stack(pubkey_length + NULL_BYTE_PADDING_LENGTH);
  sas_method(Module["_olm_sas_get_pubkey"])(this.ptr, pubkey_buffer, pubkey_length);
  return UTF8ToString(pubkey_buffer, pubkey_length);
});

SAS.prototype["set_their_key"] = restore_stack(function(their_key) {
  var their_key_array = array_from_string(their_key);
  var their_key_buffer = stack(their_key_array);
  sas_method(Module["_olm_sas_set_their_key"])(this.ptr, their_key_buffer, their_key_array.length);
});

SAS.prototype["is_their_key_set"] = restore_stack(function() {
  return sas_method(Module["_olm_sas_is_their_key_set"])(this.ptr) ? true : false;
});

SAS.prototype["generate_bytes"] = restore_stack(function(info, length) {
  var info_array = array_from_string(info);
  var info_buffer = stack(info_array);
  var output_buffer = stack(length);
  sas_method(Module["_olm_sas_generate_bytes"])(this.ptr, info_buffer, info_array.length, output_buffer, length);
  // The inner Uint8Array creates a view of the buffer.  The outer Uint8Array
  // copies it to a new array to return, since the original buffer will get
  // deallocated from the stack and could get overwritten.
  var output_arr = new Uint8Array(new Uint8Array(Module["HEAPU8"].buffer, output_buffer, length));
  return output_arr;
});

SAS.prototype["calculate_mac"] = restore_stack(function(input, info) {
  var input_array = array_from_string(input);
  var input_buffer = stack(input_array);
  var info_array = array_from_string(info);
  var info_buffer = stack(info_array);
  var mac_length = sas_method(Module["_olm_sas_mac_length"])(this.ptr);
  var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
  sas_method(Module["_olm_sas_calculate_mac"])(this.ptr, input_buffer, input_array.length, info_buffer, info_array.length, mac_buffer, mac_length);
  return UTF8ToString(mac_buffer, mac_length);
});

SAS.prototype["calculate_mac_fixed_base64"] = restore_stack(function(input, info) {
  var input_array = array_from_string(input);
  var input_buffer = stack(input_array);
  var info_array = array_from_string(info);
  var info_buffer = stack(info_array);
  var mac_length = sas_method(Module["_olm_sas_mac_length"])(this.ptr);
  var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
  sas_method(Module["_olm_sas_calculate_mac_fixed_base64"])(this.ptr, input_buffer, input_array.length, info_buffer, info_array.length, mac_buffer, mac_length);
  return UTF8ToString(mac_buffer, mac_length);
});

SAS.prototype["calculate_mac_long_kdf"] = restore_stack(function(input, info) {
  var input_array = array_from_string(input);
  var input_buffer = stack(input_array);
  var info_array = array_from_string(info);
  var info_buffer = stack(info_array);
  var mac_length = sas_method(Module["_olm_sas_mac_length"])(this.ptr);
  var mac_buffer = stack(mac_length + NULL_BYTE_PADDING_LENGTH);
  sas_method(Module["_olm_sas_calculate_mac_long_kdf"])(this.ptr, input_buffer, input_array.length, info_buffer, info_array.length, mac_buffer, mac_length);
  return UTF8ToString(mac_buffer, mac_length);
});

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_sas.js
// include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_post.js
var malloc = Module["_malloc"];

var free = Module["_free"];

var OLM_ERROR;

function filled_stack(size, filler) {
  var ptr = stackAlloc(size);
  filler(new Uint8Array(Module["HEAPU8"].buffer, ptr, size));
  return ptr;
}

/* allocate a number of bytes of storage on the stack.
 *
 * If size_or_array is a Number, allocates that number of zero-initialised bytes.
 */ function stack(size_or_array) {
  return typeof size_or_array == "number" ? filled_stack(size_or_array, function(x) {
    x.fill(0);
  }) : filled_stack(size_or_array.length, function(x) {
    x.set(size_or_array);
  });
}

function array_from_string(string) {
  return string instanceof Uint8Array ? string : intArrayFromString(string, true);
}

function random_stack(size) {
  return filled_stack(size, get_random_values);
}

function restore_stack(wrapped) {
  return function() {
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
    Module["HEAP8"][ptr++] = 0;
  }
}

/** @constructor */ function Account() {
  var size = Module["_olm_account_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_account"](this.buf);
}

function account_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_account_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

Account.prototype["free"] = function() {
  Module["_olm_clear_account"](this.ptr);
  free(this.ptr);
};

Account.prototype["create"] = restore_stack(function() {
  var random_length = account_method(Module["_olm_create_account_random_length"])(this.ptr);
  var random = random_stack(random_length);
  try {
    account_method(Module["_olm_create_account"])(this.ptr, random, random_length);
  } finally {
    // clear the random buffer
    bzero(random, random_length);
  }
});

Account.prototype["identity_keys"] = restore_stack(function() {
  var keys_length = account_method(Module["_olm_account_identity_keys_length"])(this.ptr);
  var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
  account_method(Module["_olm_account_identity_keys"])(this.ptr, keys, keys_length);
  return UTF8ToString(keys, keys_length);
});

Account.prototype["sign"] = restore_stack(function(message) {
  var signature_length = account_method(Module["_olm_account_signature_length"])(this.ptr);
  var message_array = array_from_string(message);
  var message_buffer = stack(message_array);
  var signature_buffer = stack(signature_length + NULL_BYTE_PADDING_LENGTH);
  try {
    account_method(Module["_olm_account_sign"])(this.ptr, message_buffer, message_array.length, signature_buffer, signature_length);
  } finally {
    // clear out copies of the message, which may be plaintext
    bzero(message_buffer, message_array.length);
    for (var i = 0; i < message_array.length; i++) {
      message_array[i] = 0;
    }
  }
  return UTF8ToString(signature_buffer, signature_length);
});

Account.prototype["one_time_keys"] = restore_stack(function() {
  var keys_length = account_method(Module["_olm_account_one_time_keys_length"])(this.ptr);
  var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
  account_method(Module["_olm_account_one_time_keys"])(this.ptr, keys, keys_length);
  return UTF8ToString(keys, keys_length);
});

Account.prototype["mark_keys_as_published"] = restore_stack(function() {
  account_method(Module["_olm_account_mark_keys_as_published"])(this.ptr);
});

Account.prototype["max_number_of_one_time_keys"] = restore_stack(function() {
  return account_method(Module["_olm_account_max_number_of_one_time_keys"])(this.ptr);
});

Account.prototype["generate_one_time_keys"] = restore_stack(function(number_of_keys) {
  var random_length = account_method(Module["_olm_account_generate_one_time_keys_random_length"])(this.ptr, number_of_keys);
  var random = random_stack(random_length);
  try {
    account_method(Module["_olm_account_generate_one_time_keys"])(this.ptr, number_of_keys, random, random_length);
  } finally {
    // clear the random buffer
    bzero(random, random_length);
  }
});

Account.prototype["remove_one_time_keys"] = restore_stack(function(session) {
  account_method(Module["_olm_remove_one_time_keys"])(this.ptr, session.ptr);
});

Account.prototype["generate_fallback_key"] = restore_stack(function() {
  var random_length = account_method(Module["_olm_account_generate_fallback_key_random_length"])(this.ptr);
  var random = random_stack(random_length);
  try {
    account_method(Module["_olm_account_generate_fallback_key"])(this.ptr, random, random_length);
  } finally {
    // clear the random buffer
    bzero(random, random_length);
  }
});

Account.prototype["fallback_key"] = restore_stack(function() {
  var keys_length = account_method(Module["_olm_account_fallback_key_length"])(this.ptr);
  var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
  account_method(Module["_olm_account_fallback_key"])(this.ptr, keys, keys_length);
  return UTF8ToString(keys, keys_length);
});

Account.prototype["unpublished_fallback_key"] = restore_stack(function() {
  var keys_length = account_method(Module["_olm_account_unpublished_fallback_key_length"])(this.ptr);
  var keys = stack(keys_length + NULL_BYTE_PADDING_LENGTH);
  account_method(Module["_olm_account_unpublished_fallback_key"])(this.ptr, keys, keys_length);
  return UTF8ToString(keys, keys_length);
});

Account.prototype["forget_old_fallback_key"] = restore_stack(function() {
  account_method(Module["_olm_account_forget_old_fallback_key"])(this.ptr);
});

Account.prototype["pickle"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var pickle_length = account_method(Module["_olm_pickle_account_length"])(this.ptr);
  var key_buffer = stack(key_array);
  var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
  try {
    account_method(Module["_olm_pickle_account"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(pickle_buffer, pickle_length);
});

Account.prototype["unpickle"] = restore_stack(function(key, pickle) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var pickle_array = array_from_string(pickle);
  var pickle_buffer = stack(pickle_array);
  try {
    account_method(Module["_olm_unpickle_account"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_array.length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

/** @constructor */ function Session() {
  var size = Module["_olm_session_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_session"](this.buf);
}

function session_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_session_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

Session.prototype["free"] = function() {
  Module["_olm_clear_session"](this.ptr);
  free(this.ptr);
};

Session.prototype["pickle"] = restore_stack(function(key) {
  var key_array = array_from_string(key);
  var pickle_length = session_method(Module["_olm_pickle_session_length"])(this.ptr);
  var key_buffer = stack(key_array);
  var pickle_buffer = stack(pickle_length + NULL_BYTE_PADDING_LENGTH);
  try {
    session_method(Module["_olm_pickle_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
  return UTF8ToString(pickle_buffer, pickle_length);
});

Session.prototype["unpickle"] = restore_stack(function(key, pickle) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var pickle_array = array_from_string(pickle);
  var pickle_buffer = stack(pickle_array);
  try {
    session_method(Module["_olm_unpickle_session"])(this.ptr, key_buffer, key_array.length, pickle_buffer, pickle_array.length);
  } finally {
    // clear out copies of the pickle key
    bzero(key_buffer, key_array.length);
    for (var i = 0; i < key_array.length; i++) {
      key_array[i] = 0;
    }
  }
});

Session.prototype["create_outbound"] = restore_stack(function(account, their_identity_key, their_one_time_key) {
  var random_length = session_method(Module["_olm_create_outbound_session_random_length"])(this.ptr);
  var random = random_stack(random_length);
  var identity_key_array = array_from_string(their_identity_key);
  var one_time_key_array = array_from_string(their_one_time_key);
  var identity_key_buffer = stack(identity_key_array);
  var one_time_key_buffer = stack(one_time_key_array);
  try {
    session_method(Module["_olm_create_outbound_session"])(this.ptr, account.ptr, identity_key_buffer, identity_key_array.length, one_time_key_buffer, one_time_key_array.length, random, random_length);
  } finally {
    // clear the random buffer, which is key data
    bzero(random, random_length);
  }
});

Session.prototype["create_inbound"] = restore_stack(function(account, one_time_key_message) {
  var message_array = array_from_string(one_time_key_message);
  var message_buffer = stack(message_array);
  try {
    session_method(Module["_olm_create_inbound_session"])(this.ptr, account.ptr, message_buffer, message_array.length);
  } finally {
    // clear out copies of the key
    bzero(message_buffer, message_array.length);
    for (var i = 0; i < message_array.length; i++) {
      message_array[i] = 0;
    }
  }
});

Session.prototype["create_inbound_from"] = restore_stack(function(account, identity_key, one_time_key_message) {
  var identity_key_array = array_from_string(identity_key);
  var identity_key_buffer = stack(identity_key_array);
  var message_array = array_from_string(one_time_key_message);
  var message_buffer = stack(message_array);
  try {
    session_method(Module["_olm_create_inbound_session_from"])(this.ptr, account.ptr, identity_key_buffer, identity_key_array.length, message_buffer, message_array.length);
  } finally {
    // clear out copies of the key
    bzero(message_buffer, message_array.length);
    for (var i = 0; i < message_array.length; i++) {
      message_array[i] = 0;
    }
  }
});

Session.prototype["session_id"] = restore_stack(function() {
  var id_length = session_method(Module["_olm_session_id_length"])(this.ptr);
  var id_buffer = stack(id_length + NULL_BYTE_PADDING_LENGTH);
  session_method(Module["_olm_session_id"])(this.ptr, id_buffer, id_length);
  return UTF8ToString(id_buffer, id_length);
});

Session.prototype["has_received_message"] = function() {
  return session_method(Module["_olm_session_has_received_message"])(this.ptr) ? true : false;
};

Session.prototype["matches_inbound"] = restore_stack(function(one_time_key_message) {
  var message_array = array_from_string(one_time_key_message);
  var message_buffer = stack(message_array);
  return session_method(Module["_olm_matches_inbound_session"])(this.ptr, message_buffer, message_array.length) ? true : false;
});

Session.prototype["matches_inbound_from"] = restore_stack(function(identity_key, one_time_key_message) {
  var identity_key_array = array_from_string(identity_key);
  var identity_key_buffer = stack(identity_key_array);
  var message_array = array_from_string(one_time_key_message);
  var message_buffer = stack(message_array);
  return session_method(Module["_olm_matches_inbound_session_from"])(this.ptr, identity_key_buffer, identity_key_array.length, message_buffer, message_array.length) ? true : false;
});

Session.prototype["encrypt"] = restore_stack(function(plaintext) {
  var plaintext_buffer, message_buffer, plaintext_length, random, random_length;
  try {
    random_length = session_method(Module["_olm_encrypt_random_length"])(this.ptr);
    var message_type = session_method(Module["_olm_encrypt_message_type"])(this.ptr);
    plaintext_length = lengthBytesUTF8(plaintext);
    var message_length = session_method(Module["_olm_encrypt_message_length"])(this.ptr, plaintext_length);
    random = random_stack(random_length);
    // need to allow space for the terminator (which stringToUTF8 always
    // writes), hence + 1.
    plaintext_buffer = malloc(plaintext_length + 1);
    stringToUTF8(plaintext, plaintext_buffer, plaintext_length + 1);
    message_buffer = malloc(message_length + NULL_BYTE_PADDING_LENGTH);
    session_method(Module["_olm_encrypt"])(this.ptr, plaintext_buffer, plaintext_length, random, random_length, message_buffer, message_length);
    // UTF8ToString requires a null-terminated argument, so add the
    // null terminator.
    setValue(message_buffer + message_length, 0, "i8");
    return {
      type: message_type,
      body: UTF8ToString(message_buffer, message_length)
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

Session.prototype["decrypt"] = restore_stack(function(message_type, message) {
  var message_buffer, plaintext_buffer, max_plaintext_length;
  try {
    message_buffer = malloc(message.length);
    writeAsciiToMemory(message, message_buffer, true);
    max_plaintext_length = session_method(Module["_olm_decrypt_max_plaintext_length"])(this.ptr, message_type, message_buffer, message.length);
    // caculating the length destroys the input buffer, so we need to re-copy it.
    writeAsciiToMemory(message, message_buffer, true);
    plaintext_buffer = malloc(max_plaintext_length + NULL_BYTE_PADDING_LENGTH);
    var plaintext_length = session_method(Module["_olm_decrypt"])(this.ptr, message_type, message_buffer, message.length, plaintext_buffer, max_plaintext_length);
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

Session.prototype["describe"] = restore_stack(function() {
  var description_buf;
  try {
    description_buf = malloc(256);
    session_method(Module["_olm_session_describe"])(this.ptr, description_buf, 256);
    return UTF8ToString(description_buf);
  } finally {
    if (description_buf !== undefined) free(description_buf);
  }
});

/** @constructor */ function Utility() {
  var size = Module["_olm_utility_size"]();
  this.buf = malloc(size);
  this.ptr = Module["_olm_utility"](this.buf);
}

function utility_method(wrapped) {
  return function() {
    var result = wrapped.apply(this, arguments);
    if (result === OLM_ERROR) {
      var message = UTF8ToString(Module["_olm_utility_last_error"](arguments[0]));
      throw new Error("OLM." + message);
    }
    return result;
  };
}

Utility.prototype["free"] = function() {
  Module["_olm_clear_utility"](this.ptr);
  free(this.ptr);
};

Utility.prototype["sha256"] = restore_stack(function(input) {
  var output_length = utility_method(Module["_olm_sha256_length"])(this.ptr);
  var input_array = array_from_string(input);
  var input_buffer = stack(input_array);
  var output_buffer = stack(output_length + NULL_BYTE_PADDING_LENGTH);
  try {
    utility_method(Module["_olm_sha256"])(this.ptr, input_buffer, input_array.length, output_buffer, output_length);
  } finally {
    // clear out copies of the input buffer, which may be plaintext
    bzero(input_buffer, input_array.length);
    for (var i = 0; i < input_array.length; i++) {
      input_array[i] = 0;
    }
  }
  return UTF8ToString(output_buffer, output_length);
});

Utility.prototype["ed25519_verify"] = restore_stack(function(key, message, signature) {
  var key_array = array_from_string(key);
  var key_buffer = stack(key_array);
  var message_array = array_from_string(message);
  var message_buffer = stack(message_array);
  var signature_array = array_from_string(signature);
  var signature_buffer = stack(signature_array);
  try {
    utility_method(Module["_olm_ed25519_verify"])(this.ptr, key_buffer, key_array.length, message_buffer, message_array.length, signature_buffer, signature_array.length);
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

Module["get_library_version"] = restore_stack(function() {
  var buf = stack(3);
  Module["_olm_get_library_version"](buf, buf + 1, buf + 2);
  return [ getValue(buf, "i8"), getValue(buf + 1, "i8"), getValue(buf + 2, "i8") ];
});

// end include: /private/tmp/nix-build-emscripten-olm_javascript-3.2.16.drv-0/w3z8lgh1qg70ag23zdsb2824lksbjiwh-source/javascript/olm_post.js
// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.
moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
      }
    });
  }
}


  return moduleRtn;
}
);
})();
export default Module;
