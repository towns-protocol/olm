var get_random_values = function (buf) {
    window.crypto.getRandomValues(buf);
};

/* applications should define OLM_OPTIONS in the environment to override
 * emscripten module settings
 */
if (typeof OLM_OPTIONS !== "undefined") {
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
 */
var NULL_BYTE_PADDING_LENGTH = 1;

Module["onRuntimeInitialized"] = () => {
    OLM_ERROR = _olm_error();
};
