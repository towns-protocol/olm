var isInitialized = false;
var initializationPromise = null;

var OLM_EXPORTS = {};

/**
 * Asynchronously initializes the cryptographic module and populates exported components.
 *
 * Prevents duplicate initializations by returning the same promise if initialization is already in progress, and does nothing if already initialized. On first invocation, loads the module with the provided arguments and assigns its exported classes and functions to the global export object.
 *
 * @param {Object} [moduleArg={}] - Optional configuration object passed to the module loader.
 * @returns {Promise<void>} Resolves when initialization is complete.
 */
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
