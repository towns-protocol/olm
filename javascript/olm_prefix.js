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
        const Module = await init(moduleArg);

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
