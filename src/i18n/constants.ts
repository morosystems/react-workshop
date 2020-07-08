/**
 * Jméno modulu i18n. Slouží pro jednoznačnou identifikaci modulu.
 */
export const NAME = "i18n";

/**
 * Obsahuje hodnotu, která se použije místo lokalizovaného textu, pokud není požadovaný lokalizační klíč načtený.
 */
export const UNKNOWN_KEY_TEXT = "?¿?¿?¿";

/**
 * Pomocná funkce pro vytvoření typu akce
 * @param actionType Typ akce
 */
const createActionType = (actionType: string) => `${NAME}/${actionType}`;

/** Konstanty typů akcí */
export const SET_LOCALE_CODE = createActionType("SET_LOCALE_CODE");
export const SET_LOCALE_MESSAGES = createActionType("SET_LOCALE_MESSAGES");
