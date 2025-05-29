let isInitialized = false;
let initializationPromise = null;

let OLM_EXPORTS = {};

async function initAsync(moduleArg = {}) {
    if (isInitialized) {
        return;
    }
    if (initializationPromise) {
        return initializationPromise;
    }

    initializationPromise = (async () => {
        var module = await Module(moduleArg);

        // Populate exported variables
        OLM_EXPORTS["Account"] = module.Account;
        OLM_EXPORTS["Session"] = module.Session;
        OLM_EXPORTS["Utility"] = module.Utility;
        OLM_EXPORTS["OutboundGroupSession"] = module.OutboundGroupSession;
        OLM_EXPORTS["InboundGroupSession"] = module.InboundGroupSession;
        OLM_EXPORTS["PkEncryption"] = module.PkEncryption;
        OLM_EXPORTS["PkDecryption"] = module.PkDecryption;
        OLM_EXPORTS["PkSigning"] = module.PkSigning;
        OLM_EXPORTS["SAS"] = module.SAS;
        OLM_EXPORTS["get_library_version"] = module.get_library_version;

        isInitialized = true;
        initializationPromise = null;
    })();

    return initializationPromise;
}

OLM_EXPORTS["initAsync"] = initAsync;
