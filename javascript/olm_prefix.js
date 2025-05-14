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
        const module = await Module(moduleArg);

        // Populate exported variables
        Account = module.Account;
        Session = module.Session;
        Utility = module.Utility;
        OutboundGroupSession = module.OutboundGroupSession;
        InboundGroupSession = module.InboundGroupSession;
        PkEncryption = module.PkEncryption;
        PkDecryption = module.PkDecryption;
        PkSigning = module.PkSigning;
        SAS = module.SAS;
        get_library_version = module.get_library_version;

        isInitialized = true;
        initializationPromise = null;
    })();

    return initializationPromise;
}
