/**
 * validateName
 * @param {string} value
 * @returns {boolean}
 */
export const validateName = (value) => {
    if (value.trim().length > 2) return true;
    return false;
};

/**
 * validateMessage
 * @param {string} value
 * @returns {boolean}
 */
export const validateMessage = (value) => {
    if (value.trim().length > 10) return true;
    return false;
};

/**
 * validateEmail
 * @param {string} address
 * @returns {boolean}
 */
export function validateEmail(address) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)) {
        return true;
    }
    return false;
}
