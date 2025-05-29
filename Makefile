#!/usr/bin/make -f

include common.mk
VERSION := $(MAJOR).$(MINOR).$(PATCH)
PREFIX ?= /usr/local
BUILD_DIR := build
RELEASE_OPTIMIZE_FLAGS ?= -O3
DEBUG_OPTIMIZE_FLAGS ?= -g -O0 -U_FORTIFY_SOURCE
JS_OPTIMIZE_FLAGS ?= -O3
FUZZER_OPTIMIZE_FLAGS ?= -O3
EMCC = emcc
EMAR = emar
AR = ar

UNAME := $(shell uname)
ifeq ($(UNAME),Darwin)
	SO := dylib
	OLM_LDFLAGS :=
else
	SO := so
	OLM_LDFLAGS := -Wl,-soname,libolm.so.$(MAJOR) \
                       -Wl,--version-script,version_script.ver
endif

RELEASE_TARGET := $(BUILD_DIR)/libolm.$(SO).$(VERSION)
STATIC_RELEASE_TARGET := $(BUILD_DIR)/libolm.a
DEBUG_TARGET := $(BUILD_DIR)/libolm_debug.$(SO).$(VERSION)
JS_WASM_TARGET := javascript/olm.js
JS_ASMJS_TARGET := javascript/olm_legacy.js
WASM_TARGET := $(BUILD_DIR)/wasm/libolm.a

# Define target filenames for ESM and CJS outputs
JS_ESM_FINAL_TARGET := javascript/olm.mjs
JS_ESM_NODE_TMP_TARGET := javascript/olm.node.mjs
JS_ESM_WEB_TMP_TARGET := javascript/olm.web.mjs
# Define CJS target filenames
JS_CJS_FINAL_TARGET := javascript/olm.cjs
JS_CJS_NODE_TMP_TARGET := javascript/olm.node.cjs
JS_CJS_WEB_TMP_TARGET := javascript/olm.web.cjs

JS_EXPORTED_FUNCTIONS := javascript/exported_functions.json
JS_EXPORTED_RUNTIME_METHODS := [ALLOC_STACK,stackAlloc,writeAsciiToMemory,stringToAscii,intArrayFromString,UTF8ToString,stringToUTF8]
JS_EXTERNS := javascript/externs.js

PUBLIC_HEADERS := include/olm/olm.h include/olm/outbound_group_session.h include/olm/inbound_group_session.h include/olm/pk.h include/olm/sas.h include/olm/error.h include/olm/olm_export.h

SOURCES := $(wildcard src/*.cpp) $(wildcard src/*.c) \
    lib/crypto-algorithms/sha256.c \
    lib/crypto-algorithms/aes.c \
    lib/curve25519-donna/curve25519-donna.c

FUZZER_SOURCES := $(wildcard fuzzing/fuzzers/fuzz_*.cpp) $(wildcard fuzzing/fuzzers/fuzz_*.c)
TEST_SOURCES := $(wildcard tests/test_*.cpp) $(wildcard tests/test_*.c)

OBJECTS := $(patsubst %.c,%.o,$(patsubst %.cpp,%.o,$(SOURCES)))
RELEASE_OBJECTS := $(addprefix $(BUILD_DIR)/release/,$(OBJECTS))
DEBUG_OBJECTS := $(addprefix $(BUILD_DIR)/debug/,$(OBJECTS))
FUZZER_OBJECTS := $(addprefix $(BUILD_DIR)/fuzzers/objects/,$(OBJECTS))
FUZZER_ASAN_OBJECTS := $(addprefix $(BUILD_DIR)/fuzzers/objects/,$(addprefix asan_,$(OBJECTS)))
FUZZER_MSAN_OBJECTS := $(addprefix $(BUILD_DIR)/fuzzers/objects/,$(addprefix msan_,$(OBJECTS)))
FUZZER_DEBUG_OBJECTS := $(addprefix $(BUILD_DIR)/fuzzers/objects/,$(addprefix debug_,$(OBJECTS)))
FUZZER_BINARIES := $(addprefix $(BUILD_DIR)/fuzzers/,$(basename $(notdir $(FUZZER_SOURCES))))
FUZZER_ASAN_BINARIES := $(addsuffix _asan,$(FUZZER_BINARIES))
FUZZER_MSAN_BINARIES := $(addsuffix _msan,$(FUZZER_BINARIES))
FUZZER_DEBUG_BINARIES := $(patsubst $(BUILD_DIR)/fuzzers/fuzz_%,$(BUILD_DIR)/fuzzers/debug_%,$(FUZZER_BINARIES))
TEST_BINARIES := $(patsubst tests/%,$(BUILD_DIR)/tests/%,$(basename $(TEST_SOURCES)))
JS_OBJECTS := $(addprefix $(BUILD_DIR)/javascript/,$(OBJECTS))
WASM_OBJECTS := $(addprefix $(BUILD_DIR)/wasm/,$(OBJECTS))

# pre & post are the js-pre/js-post options to emcc.
# They are injected inside the modularised code and
# processed by the optimiser.
JS_PRE_NODE := javascript/olm_pre_node.js
JS_PRE_WEB := javascript/olm_pre.js
JS_POST := javascript/olm_outbound_group_session.js \
    javascript/olm_inbound_group_session.js \
    javascript/olm_pk.js \
    javascript/olm_sas.js \
    javascript/olm_post.js

# The prefix & suffix are just added onto the start & end
# of what comes out emcc, so are outside of the modularised
# code and not seen by the opimiser.
JS_PREFIX_ESM := javascript/olm_prefix_esm.js
JS_PREFIX_CJS := javascript/olm_prefix_cjs.js
JS_POSTFIX_CJS := javascript/olm_postfix_cjs.js
JS_POSTFIX_ESM := javascript/olm_postfix_esm.js

DOCS := tracing/README.html \
    docs/megolm.html \
    docs/olm.html \
    docs/signing.html \
    README.html \
    CHANGELOG.html

CPPFLAGS += -Iinclude -Ilib \
    -DOLMLIB_VERSION_MAJOR=$(MAJOR) -DOLMLIB_VERSION_MINOR=$(MINOR) \
    -DOLMLIB_VERSION_PATCH=$(PATCH)

# we rely on <stdint.h>, which was introduced in C99
CFLAGS += -Wall -Werror -std=c99
CXXFLAGS += -Wall -Werror -std=c++11
LDFLAGS += -Wall -Werror

CFLAGS_NATIVE = -fPIC
CXXFLAGS_NATIVE = -fPIC

EMCCFLAGS = --closure 0 -O3  -s NO_FILESYSTEM=1  -s INVOKE_RUN=0 -s -sMODULARIZE=1 -Wno-error=closure -Wno-error=experimental -Wno-deprecated

# Flags specific to ESM build (Wasm)
# Olm generally doesn't need a lot of memory to encrypt / decrypt its usual
# payloads (ie. Matrix messages), but we do need about 128K of heap to encrypt
# a 64K event (enough to store the ciphertext and the plaintext, bearing in
# mind that the plaintext can only be 48K because base64). We also have about
# 36K of statics. So let's have 256K of memory.
# (This can't be changed by the app with wasm since it's baked into the wasm).
# EMCCFLAGS_ESM += -s TOTAL_STACK=65536 -s TOTAL_MEMORY=262144 -s ALLOW_MEMORY_GROWTH=0 -sEXPORT_ES6=1 -sENVIRONMENT=web,worker
EMCCFLAGS_COMMON := -s TOTAL_STACK=1048576 -s TOTAL_MEMORY=2097152 -s ALLOW_MEMORY_GROWTH=1 
EMCCFLAGS_ESM_NODE := $(EMCCFLAGS_COMMON) -sENVIRONMENT=node -sEXPORT_ES6=1
EMCCFLAGS_ESM_WEB := $(EMCCFLAGS_COMMON) -sENVIRONMENT=web,worker -sEXPORT_ES6=1

EMCCFLAGS_CJS_NODE := $(EMCCFLAGS_COMMON) -sENVIRONMENT=node -sEXPORT_ES6=0
EMCCFLAGS_CJS_WEB := $(EMCCFLAGS_COMMON) -sENVIRONMENT=web,worker -sEXPORT_ES6=0

EMCC.c = $(EMCC) $(CFLAGS) $(CPPFLAGS) -c -DNDEBUG -DOLM_STATIC_DEFINE=1
EMCC.cc = $(EMCC) $(CXXFLAGS) $(CPPFLAGS) -c -DNDEBUG -DOLM_STATIC_DEFINE=1
# Common linker invocation base
EMCC_LINK = $(EMCC) $(LDFLAGS) $(EMCCFLAGS)

AFL_CC = afl-clang-fast
AFL_CXX = afl-clang-fast++

AFL.c = $(AFL_CC) $(CFLAGS) $(CPPFLAGS) -c
AFL.cc = $(AFL_CXX) $(CXXFLAGS) $(CPPFLAGS) -c
AFL_LINK.c = $(AFL_CC) $(LDFLAGS) $(CFLAGS) $(CPPFLAGS)
AFL_LINK.cc = $(AFL_CXX) $(LDFLAGS) $(CXXFLAGS) $(CPPFLAGS)
AFL_ASAN.c = AFL_USE_ASAN=1 $(AFL_CC) -m32 $(CFLAGS) $(CPPFLAGS) -c
AFL_ASAN.cc = AFL_USE_ASAN=1 $(AFL_CXX) -m32 $(CXXFLAGS) $(CPPFLAGS) -c
AFL_LINK_ASAN.c = AFL_USE_ASAN=1 $(AFL_CC) -m32 $(LDFLAGS) $(CFLAGS) $(CPPFLAGS)
AFL_LINK_ASAN.cc = AFL_USE_ASAN=1 $(AFL_CXX) -m32 $(LDFLAGS) $(CXXFLAGS) $(CPPFLAGS)
AFL_MSAN.c = AFL_USE_MSAN=1 $(AFL_CC) $(CFLAGS) $(CPPFLAGS) -c
AFL_MSAN.cc = AFL_USE_MSAN=1 $(AFL_CXX) $(CXXFLAGS) $(CPPFLAGS) -c
AFL_LINK_MSAN.c = AFL_USE_MSAN=1 $(AFL_CC) $(LDFLAGS) $(CFLAGS) $(CPPFLAGS)
AFL_LINK_MSAN.cc = AFL_USE_MSAN=1 $(AFL_CXX) $(LDFLAGS) $(CXXFLAGS) $(CPPFLAGS)

# generate .d files when compiling
CPPFLAGS += -MMD

### per-target variables

$(RELEASE_OBJECTS): CFLAGS += $(RELEASE_OPTIMIZE_FLAGS) $(CFLAGS_NATIVE)
$(RELEASE_OBJECTS): CXXFLAGS += $(RELEASE_OPTIMIZE_FLAGS) $(CXXFLAGS_NATIVE)
$(RELEASE_TARGET): LDFLAGS += $(RELEASE_OPTIMIZE_FLAGS)

$(DEBUG_OBJECTS): CFLAGS += $(DEBUG_OPTIMIZE_FLAGS) $(CFLAGS_NATIVE)
$(DEBUG_OBJECTS): CXXFLAGS += $(DEBUG_OPTIMIZE_FLAGS) $(CXXFLAGS_NATIVE)
$(DEBUG_TARGET): LDFLAGS += $(DEBUG_OPTIMIZE_FLAGS)

$(TEST_BINARIES): CPPFLAGS += -Itests/include
$(TEST_BINARIES): LDFLAGS += $(DEBUG_OPTIMIZE_FLAGS) -L$(BUILD_DIR)

$(FUZZER_OBJECTS): CFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1
$(FUZZER_OBJECTS): CXXFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1
$(FUZZER_DEBUG_OBJECTS): CFLAGS += $(DEBUG_OPTIMIZE_FLAGS) $(CFLAGS_NATIVE) -D OLM_FUZZING=1
$(FUZZER_DEBUG_OBJECTS): CXXFLAGS += $(DEBUG_OPTIMIZE_FLAGS) $(CXXFLAGS_NATIVE) -D OLM_FUZZING=1
$(FUZZER_ASAN_OBJECTS): CFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1
$(FUZZER_ASAN_OBJECTS): CXXFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1
$(FUZZER_MSAN_OBJECTS): CFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1
$(FUZZER_MSAN_OBJECTS): CXXFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -D OLM_FUZZING=1

$(FUZZER_BINARIES): CPPFLAGS += -Ifuzzing/fuzzers/include
$(FUZZER_BINARIES): LDFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -L$(BUILD_DIR) -lstdc++
$(FUZZER_ASAN_BINARIES): CPPFLAGS += -Ifuzzing/fuzzers/include
$(FUZZER_ASAN_BINARIES): LDFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -L$(BUILD_DIR) -lstdc++
$(FUZZER_MSAN_BINARIES): CPPFLAGS += -Ifuzzing/fuzzers/include
$(FUZZER_MSAN_BINARIES): LDFLAGS += $(FUZZER_OPTIMIZE_FLAGS) -L$(BUILD_DIR) -lstdc++
$(FUZZER_DEBUG_BINARIES): CPPFLAGS += -Ifuzzing/fuzzers/include
$(FUZZER_DEBUG_BINARIES): LDFLAGS += $(DEBUG_OPTIMIZE_FLAGS) -lstdc++

$(JS_OBJECTS): CFLAGS += $(JS_OPTIMIZE_FLAGS)
$(JS_OBJECTS): CXXFLAGS += $(JS_OPTIMIZE_FLAGS)
$(JS_WASM_TARGET): LDFLAGS += $(JS_OPTIMIZE_FLAGS)
$(JS_ASMJS_TARGET): LDFLAGS += $(JS_OPTIMIZE_FLAGS)
$(JS_ESM_NODE_TMP_TARGET) $(JS_ESM_WEB_TMP_TARGET): LDFLAGS += $(JS_OPTIMIZE_FLAGS)

### Fix to make mkdir work on windows and linux
ifeq ($(shell echo "check_quotes"),"check_quotes")
   WINDOWS := yes
else
   WINDOWS := no
endif

ifeq ($(WINDOWS),yes)
   mkdir = mkdir $(subst /,\,$(1)) > nul 2>&1 || (exit 0)
else
   mkdir = mkdir -p $(1)
endif

### top-level targets

lib: $(RELEASE_TARGET)
.PHONY: lib

$(RELEASE_TARGET): $(RELEASE_OBJECTS)
	@echo
	@echo '****************************************************************************'
	@echo '* WARNING: Building olm with make is deprecated. Please use cmake instead. *'
	@echo '****************************************************************************'
	@echo

	$(CXX) $(LDFLAGS) --shared -fPIC \
            $(OLM_LDFLAGS) \
            $(OUTPUT_OPTION) $(RELEASE_OBJECTS)
	ln -sf libolm.$(SO).$(VERSION) $(BUILD_DIR)/libolm.$(SO).$(MAJOR)
	ln -sf libolm.$(SO).$(VERSION) $(BUILD_DIR)/libolm.$(SO)

debug: $(DEBUG_TARGET)
.PHONY: debug

$(DEBUG_TARGET): $(DEBUG_OBJECTS)
	$(CXX) $(LDFLAGS) --shared -fPIC \
            $(OLM_LDFLAGS) \
            $(OUTPUT_OPTION) $(DEBUG_OBJECTS)
	ln -sf libolm_debug.$(SO).$(VERSION) $(BUILD_DIR)/libolm_debug.$(SO).$(MAJOR)

static: $(STATIC_RELEASE_TARGET)
.PHONY: static

$(STATIC_RELEASE_TARGET): $(RELEASE_OBJECTS)
	$(AR) rcs $@ $^

js_node: $(JS_ESM_NODE_TMP_TARGET)
	@echo "Building Node ESM module..."
	@$(call mkdir,$(dir $(JS_ESM_FINAL_TARGET)))
	@echo "Node ESM module available at $(JS_ESM_NODE_TMP_TARGET)"
.PHONY: js_node

js_web: $(JS_ESM_WEB_TMP_TARGET)
	@echo "Building Web ESM module..."
	@$(call mkdir,$(dir $(JS_ESM_FINAL_TARGET)))
	@echo "Web ESM module available at $(JS_ESM_WEB_TMP_TARGET)"
.PHONY: js_web

js_node_cjs: $(JS_CJS_NODE_TMP_TARGET)
	@echo "Building Node CJS module..."
	@$(call mkdir,$(dir $(JS_CJS_FINAL_TARGET)))
	@echo "Node CJS module available at $(JS_CJS_NODE_TMP_TARGET)"
.PHONY: js_node_cjs

js_web_cjs: $(JS_CJS_WEB_TMP_TARGET)
	@echo "Building Web CJS module..."
	@$(call mkdir,$(dir $(JS_CJS_FINAL_TARGET)))
	@echo "Web CJS module available at $(JS_CJS_WEB_TMP_TARGET)"
.PHONY: js_web_cjs

js: js_node js_node_cjs js_web js_web_cjs
.PHONY: js

wasm: $(WASM_TARGET)
.PHONY: wasm

$(WASM_TARGET): $(WASM_OBJECTS)
	$(EMAR) rcs $@ $^

# Rule for Node ESM temporary target
$(JS_ESM_NODE_TMP_TARGET): $(JS_OBJECTS) $(JS_PRE_NODE) $(JS_POST) $(JS_EXPORTED_FUNCTIONS) $(JS_PREFIX_ESM) Makefile
	@$(call mkdir,$(dir $@))
	$(EMCC_LINK) \
	    $(EMCCFLAGS_ESM_NODE) \
	    $(foreach f,$(JS_PRE_NODE),--pre-js $(f)) \
	    $(foreach f,$(JS_POST),--post-js $(f)) \
	    $(foreach f,$(JS_PREFIX_ESM),--extern-pre-js $(f)) \
	    $(foreach f,$(JS_POSTFIX_ESM),--extern-post-js $(f)) \
	    -sSINGLE_FILE=0 \
	    -sEXPORTED_FUNCTIONS=@$(JS_EXPORTED_FUNCTIONS) \
	    -sEXPORTED_RUNTIME_METHODS='$(JS_EXPORTED_RUNTIME_METHODS)' \
	    $(JS_OBJECTS) -o $@

$(JS_ESM_WEB_TMP_TARGET): $(JS_OBJECTS) $(JS_PRE_WEB) $(JS_POST) $(JS_EXPORTED_FUNCTIONS) $(JS_PREFIX_ESM) Makefile
	@$(call mkdir,$(dir $@))
	$(EMCC_LINK) \
	    $(EMCCFLAGS_ESM_WEB) \
	    $(foreach f,$(JS_PRE_WEB),--pre-js $(f)) \
	    $(foreach f,$(JS_POST),--post-js $(f)) \
	    $(foreach f,$(JS_PREFIX_ESM),--extern-pre-js $(f)) \
	    $(foreach f,$(JS_POSTFIX_ESM),--extern-post-js $(f)) \
	    -sSINGLE_FILE=0 \
	    -sEXPORTED_FUNCTIONS=@$(JS_EXPORTED_FUNCTIONS) \
	    -sEXPORTED_RUNTIME_METHODS='$(JS_EXPORTED_RUNTIME_METHODS)' \
	    $(JS_OBJECTS) -o $@

# Rule for Node CJS target
$(JS_CJS_NODE_TMP_TARGET): $(JS_OBJECTS) $(JS_PRE_NODE) $(JS_POST) $(JS_EXPORTED_FUNCTIONS) $(JS_PREFIX_CJS) $(JS_POSTFIX_CJS) Makefile
	@$(call mkdir,$(dir $@))
	$(EMCC_LINK) \
	    $(EMCCFLAGS_CJS_NODE) \
	    $(foreach f,$(JS_PRE_NODE),--pre-js $(f)) \
	    $(foreach f,$(JS_POST),--post-js $(f)) \
	    $(foreach f,$(JS_PREFIX_CJS),--extern-pre-js $(f)) \
	    $(foreach f,$(JS_POSTFIX_CJS),--extern-post-js $(f)) \
	    -sSINGLE_FILE=0 \
	    -sEXPORTED_FUNCTIONS=@$(JS_EXPORTED_FUNCTIONS) \
	    -sEXPORTED_RUNTIME_METHODS='$(JS_EXPORTED_RUNTIME_METHODS)' \
	    $(JS_OBJECTS) -o $@

$(JS_CJS_WEB_TMP_TARGET): $(JS_OBJECTS) $(JS_PRE_NODE) $(JS_POST) $(JS_EXPORTED_FUNCTIONS) $(JS_PREFIX_CJS) $(JS_POSTFIX_CJS) Makefile
	@$(call mkdir,$(dir $@))
	$(EMCC_LINK) \
	    $(EMCCFLAGS_CJS_WEB) \
	    $(foreach f,$(JS_PRE_NODE),--pre-js $(f)) \
	    $(foreach f,$(JS_POST),--post-js $(f)) \
	    $(foreach f,$(JS_PREFIX_CJS),--extern-pre-js $(f)) \
	    $(foreach f,$(JS_POSTFIX_CJS),--extern-post-js $(f)) \
	    -sSINGLE_FILE=0 \
	    -sEXPORTED_FUNCTIONS=@$(JS_EXPORTED_FUNCTIONS) \
	    -sEXPORTED_RUNTIME_METHODS='$(JS_EXPORTED_RUNTIME_METHODS)' \
	    $(JS_OBJECTS) -o $@

build_tests: $(TEST_BINARIES)

test: build_tests
	for i in $(TEST_BINARIES); do \
	    echo $$i; \
	    $$i || exit $$?; \
	done

test_mem: build_tests
	for i in $(TEST_BINARIES); do \
	    echo $$i; \
	    valgrind -q --leak-check=yes --exit-on-first-error=yes --error-exitcode=1 $$i || exit $$?; \
	done

fuzzers: $(FUZZER_BINARIES) $(FUZZER_ASAN_BINARIES) $(FUZZER_MSAN_BINARIES) $(FUZZER_DEBUG_BINARIES)
.PHONY: fuzzers

$(JS_EXPORTED_FUNCTIONS): $(PUBLIC_HEADERS)
	./exports.py $^ > $@.tmp
	mv $@.tmp $@

all: test js lib debug doc
.PHONY: all

install-headers: $(PUBLIC_HEADERS)
	test -d $(DESTDIR)$(PREFIX)/include/olm || $(call mkdir,$(DESTDIR)$(PREFIX)/include/olm)
	install $(PUBLIC_HEADERS) $(DESTDIR)$(PREFIX)/include/olm/
.PHONY: install-headers

install-debug: debug install-headers
	test -d $(DESTDIR)$(PREFIX)/lib || $(call mkdir,$(DESTDIR)$(PREFIX)/lib)
	install $(DEBUG_TARGET) $(DESTDIR)$(PREFIX)/lib/libolm_debug.$(SO).$(VERSION)
	ln -sf libolm_debug.$(SO).$(VERSION) $(DESTDIR)$(PREFIX)/lib/libolm_debug.$(SO).$(MAJOR)
	ln -sf libolm_debug.$(SO).$(VERSION) $(DESTDIR)$(PREFIX)/lib/libolm_debug.$(SO)
.PHONY: install-debug

install: lib install-headers
	test -d $(DESTDIR)$(PREFIX)/lib || $(call mkdir,$(DESTDIR)$(PREFIX)/lib)
	install $(RELEASE_TARGET) $(DESTDIR)$(PREFIX)/lib/libolm.$(SO).$(VERSION)
	ln -sf libolm.$(SO).$(VERSION) $(DESTDIR)$(PREFIX)/lib/libolm.$(SO).$(MAJOR)
	ln -sf libolm.$(SO).$(VERSION) $(DESTDIR)$(PREFIX)/lib/libolm.$(SO)
.PHONY: install

clean:;
	rm -rf $(BUILD_DIR) $(DOCS)
.PHONY: clean

doc: $(DOCS)
.PHONY: doc

### rules for building objects
$(BUILD_DIR)/release/%.o: %.c
	$(call mkdir,$(dir $@))
	$(COMPILE.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/release/%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(COMPILE.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/debug/%.o: %.c
	$(call mkdir,$(dir $@))
	$(COMPILE.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/debug/%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(COMPILE.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/javascript/%.o: %.c
	$(call mkdir,$(dir $@))
	$(EMCC.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/javascript/%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(EMCC.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/wasm/%.o: %.c
	$(call mkdir,$(dir $@))
	$(EMCC.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/wasm/%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(EMCC.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/tests/%: tests/%.c $(DEBUG_OBJECTS)
	$(call mkdir,$(dir $@))
	$(LINK.c) -o $@ $< $(DEBUG_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/tests/%: tests/%.cpp $(DEBUG_OBJECTS)
	$(call mkdir,$(dir $@))
	$(LINK.cc) -o $@ $< $(DEBUG_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/objects/%.o: %.c
	$(call mkdir,$(dir $@))
	$(AFL.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(AFL.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/asan_%.o: %.c
	$(call mkdir,$(dir $@))
	$(AFL_ASAN.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/asan_%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(AFL_ASAN.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/msan_%.o: %.c
	$(call mkdir,$(dir $@))
	$(AFL_MSAN.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/msan_%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(AFL_MSAN.cc) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/debug_%.o: %.c
	$(call mkdir,$(dir $@))
	$(COMPILE.c) $(OUTPUT_OPTION) $<

$(BUILD_DIR)/fuzzers/objects/debug_%.o: %.cpp
	$(call mkdir,$(dir $@))
	$(COMPILE.cc) $(OUTPUT_OPTION) $<


$(BUILD_DIR)/fuzzers/fuzz_%: fuzzing/fuzzers/fuzz_%.c $(FUZZER_OBJECTS)
	$(AFL_LINK.c) -o $@ $< $(FUZZER_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/fuzz_%: fuzzing/fuzzers/fuzz_%.cpp $(FUZZER_OBJECTS)
	$(AFL_LINK.cc) -o $@ $< $(FUZZER_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/debug_%: fuzzing/fuzzers/fuzz_%.c $(FUZZER_DEBUG_OBJECTS)
	$(LINK.c) -o $@ $< $(FUZZER_DEBUG_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/debug_%: fuzzing/fuzzers/fuzz_%.cpp $(FUZZER_DEBUG_OBJECTS)
	$(LINK.cc) -o $@ $< $(FUZZER_DEBUG_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/fuzz_%_asan: fuzzing/fuzzers/fuzz_%.c $(FUZZER_ASAN_OBJECTS)
	$(AFL_LINK_ASAN.c) -o $@ $< $(FUZZER_ASAN_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/fuzz_%_asan: fuzzing/fuzzers/fuzz_%.cpp $(FUZZER_ASAN_OBJECTS)
	$(AFL_LINK_ASAN.cc) -o $@ $< $(FUZZER_ASAN_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/fuzz_%_msan: fuzzing/fuzzers/fuzz_%.c $(FUZZER_MSAN_OBJECTS)
	$(AFL_LINK_MSAN.c) -o $@ $< $(FUZZER_MSAN_OBJECTS) $(LOADLIBES) $(LDLIBS)

$(BUILD_DIR)/fuzzers/fuzz_%_msan: fuzzing/fuzzers/fuzz_%.cpp $(FUZZER_MSAN_OBJECTS)
	$(AFL_LINK_MSAN.cc) -o $@ $< $(FUZZER_MSAN_OBJECTS) $(LOADLIBES) $(LDLIBS)

%.html: %.rst
	rst2html $< $@

%.html: %.md
	pandoc --from markdown --to html5 --standalone --lua-filter gitlab-math.lua --katex -o $@ $<

### dependencies

-include $(RELEASE_OBJECTS:.o=.d)
-include $(DEBUG_OBJECTS:.o=.d)
-include $(JS_OBJECTS:.o=.d)
-include $(TEST_BINARIES:=.d)
-include $(FUZZER_OBJECTS:.o=.d)
-include $(FUZZER_DEBUG_OBJECTS:.o=.d)
-include $(FUZZER_ASAN_OBJECTS:.o=.d)
-include $(FUZZER_MSAN_OBJECTS:.o=.d)
-include $(FUZZER_BINARIES:=.d)
-include $(FUZZER_ASAN_BINARIES:=.d)
-include $(FUZZER_MSAN_BINARIES:=.d)
-include $(FUZZER_DEBUG_BINARIES:=.d)
