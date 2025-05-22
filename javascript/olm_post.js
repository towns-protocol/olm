var malloc = _malloc;
var free = _free;
var OLM_ERROR;

/**
 * Allocates stack memory of the specified size and fills it using a provided callback.
 *
 * @param {number} size - Number of bytes to allocate on the stack.
 * @param {function(Uint8Array):void} filler - Callback that receives a Uint8Array view of the allocated memory to fill it as needed.
 * @returns {number} Pointer to the start of the allocated and filled stack memory.
 */
function filled_stack(size, filler) {
    var ptr = stackAlloc(size);
    filler(new Uint8Array(HEAPU8.buffer, ptr, size));
    return ptr;
}

/**
 * Allocates stack memory and initializes it with zeros or the contents of an array.
 *
 * If given a number, allocates that many zero-initialized bytes. If given an array or typed array, allocates memory of the same length and copies the array's contents into it.
 *
 * @param {number|Array|Uint8Array} size_or_array - Number of bytes to allocate, or an array whose contents will be copied into the allocated memory.
 * @returns {Uint8Array} A view of the allocated stack memory.
 */
function stack(size_or_array) {
    return typeof size_or_array == "number"
        ? filled_stack(size_or_array, function (x) {
              x.fill(0);
          })
        : filled_stack(size_or_array.length, function (x) {
              x.set(size_or_array);
          });
}

/**
 * Converts a string to a UTF-8 encoded Uint8Array, or returns the input if it is already a Uint8Array.
 *
 * @param {string|Uint8Array} string - The input string or Uint8Array.
 * @returns {Uint8Array} The UTF-8 encoded byte array representation of the input.
 */
function array_from_string(string) {
    return string instanceof Uint8Array
        ? string
        : intArrayFromString(string, true);
}

/**
 * Allocates stack memory of the specified size and fills it with cryptographically secure random bytes.
 *
 * @param {number} size - The number of bytes to allocate and fill with random data.
 * @returns {Uint8Array} A buffer containing random bytes of the requested size.
 */
function random_stack(size) {
    return filled_stack(size, get_random_values);
}

/**
 * Wraps a function to save and restore the stack pointer before and after its execution.
 *
 * Ensures that any stack allocations made within the wrapped function do not affect the stack state outside its scope.
 *
 * @param {Function} wrapped - The function to execute with stack pointer preservation.
 * @returns {Function} A new function that preserves the stack pointer around the execution of {@link wrapped}.
 */
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

/**
 * Overwrites a block of memory with zeros.
 *
 * @param {number} ptr - The starting memory address.
 * @param {number} n - The number of bytes to set to zero.
 */
function bzero(ptr, n) {
    while (n-- > 0) {
        HEAP8[ptr++] = 0;
    }
}

/**
 * Constructs a new Olm account, allocating and initializing the required memory.
 *
 * @remark The account must be freed with {@link Account#free} when no longer needed to prevent memory leaks.
 */
function Account() {
    var size = _olm_account_size();
    this.buf = malloc(size);
    this.ptr = _olm_account(this.buf);
}

/**
 * Wraps an account-related Olm function to throw a JavaScript error if the underlying Olm call fails.
 *
 * @param {Function} wrapped - The Olm account method to wrap.
 * @returns {Function} A function that invokes {@link wrapped} and throws an error if the result indicates failure.
 *
 * @throws {Error} If the wrapped Olm account function returns {@link OLM_ERROR}, with the last error message from the Olm account.
 */
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

/**
 * Constructs a new Olm session object, allocating memory for cryptographic session state.
 */
function Session() {
    var size = _olm_session_size();
    this.buf = malloc(size);
    this.ptr = _olm_session(this.buf);
}

/**
 * Wraps a session-related Olm function to throw an error if the operation fails.
 *
 * If the wrapped function returns {@link OLM_ERROR}, this wrapper extracts the last error message from the session and throws a JavaScript {@link Error} with the message.
 *
 * @param {Function} wrapped - The Olm session function to wrap.
 * @returns {Function} A function that invokes {@link wrapped} and throws on error.
 */
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

Session.prototype["decrypt"] = restore_stack(function (message_type, message) {
    var message_buffer, plaintext_buffer, max_plaintext_length;

    try {
        message_buffer = malloc(message.length);
        writeAsciiToMemory(message, message_buffer, true);

        max_plaintext_length = session_method(
            _olm_decrypt_max_plaintext_length
        )(this.ptr, message_type, message_buffer, message.length);

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

/**
 * Constructs a Utility object for performing cryptographic utility operations using the Olm library.
 *
 * Allocates and initializes the underlying Olm utility structure in memory.
 */
function Utility() {
    var size = _olm_utility_size();
    this.buf = malloc(size);
    this.ptr = _olm_utility(this.buf);
}

/**
 * Wraps a utility-related Olm function to throw a JavaScript error if the underlying Olm call fails.
 *
 * @param {Function} wrapped - The Olm utility function to wrap.
 * @returns {Function} A function that calls {@link wrapped} and throws an error with the Olm error message if the result indicates failure.
 */
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
