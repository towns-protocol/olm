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
      ls -la&>/dev/stdout

      mv olm.web.wasm olm.wasm

      # remove export default async function init -> async function init
      sed -i 's/export default async function init/async function init/' olm.web.mjs
      sed -i 's/export default async function init/async function init/' olm.node.mjs
      
      sed -i 's/olm.web.wasm/olm.wasm/g' olm.web.mjs
      sed -i 's/olm.node.wasm/olm.wasm/g' olm.node.mjs

      # Copy test directory to output
      if [ -d "test" ]; then
        cp -r test $out/javascript/
      fi

      pnpm install
      pnpm build:bundle

      cp -r dist/* $out/javascript
      cp package.json olm.wasm index.d.ts README.md $out/javascript

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
