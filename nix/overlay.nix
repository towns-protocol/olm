final: prev: {
  olm-gcc-cmake = prev.gccStdenv.mkDerivation {
    name = "olm_gcc_cmake";

    src = ./..;

    nativeBuildInputs = [ prev.cmake ];
    doCheck = true;
    checkPhase = ''
      (cd tests && ctest . -j $NIX_BUILD_CORES)
    '';
  };

  olm-clang-cmake = prev.clangStdenv.mkDerivation {
    name = "olm_clang_cmake";

    src = ./..;

    nativeBuildInputs = [ prev.cmake ];

    doCheck = true;
    checkPhase = ''
      (cd tests && ctest . -j $NIX_BUILD_CORES)
    '';
  };

  olm-gcc-make = prev.gccStdenv.mkDerivation {
    name = "olm";

    src = ./..;

    doCheck = true;
    makeFlags = [ "PREFIX=$out" ];
  };

  olm-javascript = final.buildEmscriptenPackage {
    pname = "olm_javascript";
    inherit (builtins.fromJSON (builtins.readFile ../javascript/package.json)) version;

    src = ./..;

    nativeBuildInputs = with prev; [ gnumake python3 nodejs nodePackages.pnpm cacert ];
    # FIXME: Disabling checks temporarily because the build process was changed
    # (wrappers not bundled) and the existing `npm test` checkPhase fails.
    # Re-enable and fix the checkPhase below once the JS wrappers/tests are updated.
    doCheck = true;

    postPatch = ''
      patchShebangs .
    '';

    configurePhase = false;

    buildPhase = ''
      echo "emcc --version"
      emcc --version &>/dev/stdout
      export EM_CACHE=$TMPDIR
      make javascript/exported_functions.json
      make js
    '';

    installPhase = ''
    
      mkdir -p $out/javascript
      cd javascript
      echo sha256: > checksums.txt
      sha256sum olm.mjs olm.wasm >> checksums.txt
      echo sha512: >> checksums.txt
      sha512sum olm.mjs olm.wasm >> checksums.txt
      cp package.json olm.mjs olm.wasm index.d.ts README.md checksums.txt $out/javascript

      # Copy test directory to output
      if [ -d "test" ]; then
        cp -r test $out/javascript/
      fi
      cd ..
    '';

    checkPhase = ''
      cd javascript
      export HOME=$TMPDIR
      pnpm install
      pnpm test
      cd ..
    '';
  };

}
